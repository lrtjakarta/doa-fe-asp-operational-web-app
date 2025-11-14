import { Box, Grid, Stack } from '@mui/material';
import Typography14 from 'Component/Typography/Typography14';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import React from 'react';

function FooterPrint({ dataId }) {
	console.log('data footer', dataId);
	return (
		<Box sx={{ mt: '15px' }}>
			{/* <Grid container>
        <Grid item xs={12} sm={4}>
        <Stack direction="column" alignItems='center'>
            <Typography14 title='Masinis' />
            {
				dataId?.driverProfile?.officerId !== '' && (
					<GenerateQr dataId={dataId?.driverProfile?.officerId} />
				)
			}
            <Typography14 title={"NIK." + " " + dataId?.driverProfile?.officerNumber} />
            </Stack>
        </Grid>
        <Grid item xs={0} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
        <Stack direction="column" alignItems='center'>
            <Typography14 title='Penyelia' />
            {
				dataId?.supervisorProfile?.officerId !== '' && (
					<GenerateQr dataId={dataId?.supervisorProfile?.officerId} />
				)
			}
            <Typography14 title={"NIK." + " " + dataId?.supervisorProfile?.officerNumber} />
            </Stack>
        </Grid>
      </Grid> */}
		</Box>
	);
}

export default FooterPrint;
