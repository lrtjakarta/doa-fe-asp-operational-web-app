import { Box, Grid, Stack } from '@mui/material';
import Typography14 from 'Component/Typography/Typography14';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import React from 'react';

function FooterPrintV2({ dataId }) {
	// console.log('data footer', dataId);
	const _information = dataId?.information;
	const _penyelia = _information?.supervisorProfile;
	const _status = _information?.status;

	return (
		<Box sx={{ mt: '15px' }}>
			<Grid container>
				<Grid item xs={12} sm={4}>
					<Stack direction="column" alignItems="center">
						<Typography14 title="Masinis" />
						{_status === 'Konfirmasi' ? (
							<>
								{dataId?.driverProfile?.officerId !== '' && (
									<GenerateQr dataId={dataId?.driverProfile?.officerId} />
								)}
								<Typography14
									title={'NIK.' + ' ' + dataId?.driverProfile?.officerNumber}
								/>
							</>
						) : null}
					</Stack>
				</Grid>
				<Grid item xs={0} sm={4}></Grid>
				<Grid item xs={12} sm={4}>
					<Stack direction="column" alignItems="center">
						<Typography14 title="Penyelia" />
						{_penyelia?.officerId !== '' && (
							<GenerateQr dataId={_penyelia?.officerId} />
						)}
						<Typography14 title={'NIK.' + ' ' + _penyelia?.officerNumber} />
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default FooterPrintV2;
