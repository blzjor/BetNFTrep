import { Link } from 'react-router-dom';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';

export default function Jumbotron() {
  return (
    <VuiBox py={3}>
      <VuiTypography textAlign="start" variant="h2" fontWeight="bold" color="white" mb="15px">
        Bet NFTs
      </VuiTypography>
      <VuiTypography textAlign="start" variant="h5" fontWeight="light" color="white" mb="20px">
        {/* NFT Marketplace on the Flow Blockchain */}
      </VuiTypography>
      <VuiBox display="flex">
        <VuiBox mr={1.5}>
          <VuiButton
            className="mr-2"
            component={Link}
            to="/items"
            variant="contained"
            color="info"
            fontWeight="medium"
          >
            Bet Explore
          </VuiButton>
        </VuiBox>
        <VuiButton component={Link} to="/create" variant="contained" color="success">
          Create Bet
        </VuiButton>
      </VuiBox>
    </VuiBox>
  );
}
