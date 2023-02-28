import { Grid } from '@mui/material';
import { insertActivity } from 'api/activities';
import { getUserNFTs } from 'flow/getUserNFTs';
import { mint } from 'flow/mint';
import { setupUser } from 'flow/setupUser';
import { loginWallet } from 'flow/wallet';
import { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from 'state/context';
import { handleInputChange, useNestedState } from 'utils/hooks';
import { constructActivityDoc } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiInput from 'vui-theme/components/VuiInput';
import VuiTypography from 'vui-theme/components/VuiTypography';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateItem() {
  const navigate = useNavigate();
  const {
    state: { user, loggedIn, collectionReady, ipfsAPIKey },
    dispatch,
  } = useGlobalContext();
  const [item, setItem] = useNestedState({
    name: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState();
  const addStartDate = (date) =>{
    const itemData = {
      ...item,
      startDate:date,
    };
    setItem(itemData)
    console.log("new Date(date).toUTCString()",new Date(date).toUTCString())
  }
  const onUploadImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
      setItem({ image: files[0] });
    }
  };

  const createItem = async () => {
    const itemData = {
      ...item,
      mintedDate: new Date().toUTCString(),
      startDate:new Date(item.startDate).toUTCString()
    };
    console.log("itemData",itemData)
    try {
      const ipfsHash = await mint(ipfsAPIKey, itemData, dispatch);
      await getUserNFTs(dispatch, user?.addr);
      await insertActivity(
        dispatch,
        constructActivityDoc('MINT', null, { ...itemData, ipfsHash }, user?.addr)
      );
      toast.success('Success! Your NFT has been minted.');
      navigate('/collection');
    } catch (err) {
      toast.error(`Error while minting NFT. Please try again.`);
      console.log('Error while minting: ' + err);
    }
  };

  return user && loggedIn && collectionReady ? (
    <VuiBox py={3} sx={{ minHeight: '80vh' }}>
      <VuiBox mb={3}>
        <VuiTypography color="white" fontWeight="bold">
          Create New Bet
        </VuiTypography>
      </VuiBox>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <VuiTypography color="white" variant="body2">
                Bet Name
              </VuiTypography>
              <VuiInput
                id="name"
                name="name"
                value={item.name}
                onChange={(e) => handleInputChange(e, setItem)}
                placeholder="Bet Name"
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item md={12}>
              <VuiTypography color="white" variant="body2">
                Bet Price (FLOW)
              </VuiTypography>
              <VuiInput
                id="price"
                name="price"
                value={item.price}
                onChange={(e) => handleInputChange(e, setItem)}
                placeholder="Bet Price (FLOW)"
                fullWidth
                size="medium"
                type="number"
              />
            </Grid>
	   		<Grid item md={12}>
              <VuiTypography color="white" variant="body2">
                Bet Date
              </VuiTypography>
              <DatePicker selected={item.startDate} onChange={(date) => addStartDate(date)} dateFormat="yyyy/MM/dd" className="MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth css-xhvqcz-MuiInputBase-root" />
             {/* <VuiInput
                id="bet_date"
                name="bet_date"
                value={item.bet_date}
                onChange={(e) => handleInputChange(e, setItem)}
                placeholder="Bet Date"
                fullWidth
                size="medium"
              /> */}
            </Grid>
            <Grid item md={12}>
              <VuiTypography color="white" variant="body2">
                Bet Details{' '}
                <VuiTypography display="inline" color="dark" variant="p" sx={{ fontSize: '12px' }}>
                  (Optional)
                </VuiTypography>
              </VuiTypography>
              <VuiInput
                id="description"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(e, setItem)}
                multiline
                rows={3}
                placeholder="Bet Details"
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item md={12}>
              <VuiButton onClick={createItem} color="info" variant="contained">
                Create Item
              </VuiButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <VuiTypography color="white" variant="body2">
            Image
          </VuiTypography>
          <input
            accept="image/*"
            id="file-input"
            type="file"
            onChange={onUploadImage}
            style={{ display: 'none' }}
            hidden
          />
          <label htmlFor="file-input">
            <VuiButton variant="contained" color="primary" component="span">
              <IoCloudUploadOutline style={{ marginRight: '5px' }} /> Upload Image
            </VuiButton>
          </label>
          <VuiBox mt={3}>
            {imagePreview && <img src={imagePreview} style={{ maxWidth: '100%' }} />}
          </VuiBox>
        </Grid>
      </Grid>
    </VuiBox>
  ) : !user || !loggedIn ? (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Please connect to your wallet
      </VuiTypography>
      <VuiButton
        onClick={() => loginWallet(dispatch)}
        color="success"
        variant="contained"
        sx={{ marginTop: '10px' }}
      >
        Connect to wallet
      </VuiButton>
    </VuiBox>
  ) : !collectionReady ? (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Your collection needs to be set up first
      </VuiTypography>
      <VuiButton
        onClick={() => setupUser(dispatch)}
        color="success"
        variant="contained"
        sx={{ marginTop: '10px' }}
      >
        Setup Collection
      </VuiButton>
    </VuiBox>
  ) : (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Please refresh the page.
      </VuiTypography>
    </VuiBox>
  );
}
