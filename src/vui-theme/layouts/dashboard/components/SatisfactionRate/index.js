import * as GradientProgress from '@delowar/react-circle-progressbar';
import { Card } from '@mui/material';
import React from 'react';
import { IoHappy } from 'react-icons/io5';
import colors from 'vui-theme/assets/theme/base/colors';
import linearGradient from 'vui-theme/assets/theme/functions/linearGradient';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';

const SatisfactionRate = () => {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  return (
    <Card sx={{ height: '340px' }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
          Satisfaction Rate
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
          From all projects
        </VuiTypography>
        <VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
          <GradientProgress
            percent={80}
            viewport
            size={200}
            isGradient
            gradient={{
              angle: 90,
              startColor: 'rgba(0, 117, 255, 0)',
              stopColor: info.main,
            }}
            emptyColor="#22234B"
          >
            <VuiBox
              sx={{
                background: info.main,
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IoHappy size="30px" color="#fff" />
            </VuiBox>
          </GradientProgress>
        </VuiBox>
        <VuiBox
          sx={({ breakpoints }) => ({
            width: '90%',
            padding: '18px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: '82px',
            mx: 'auto',
            borderRadius: '20px',
            background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
            transform: 'translateY(-90%)',
            zIndex: '1000',
          })}
        >
          <VuiTypography color="text" variant="caption" display="inline-block" fontWeight="regular">
            0%
          </VuiTypography>
          <VuiBox
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: '80px' }}
          >
            <VuiTypography color="white" variant="h3">
              95%
            </VuiTypography>
            <VuiTypography color="text" variant="caption" fontWeight="regular">
              Based on likes
            </VuiTypography>
          </VuiBox>
          <VuiTypography color="text" variant="caption" display="inline-block" fontWeight="regular">
            100%
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default SatisfactionRate;
