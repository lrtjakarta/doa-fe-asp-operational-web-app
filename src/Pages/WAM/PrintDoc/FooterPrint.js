import React from 'react';
import './DataTable.css';
import Typography14 from 'Component/Typography/Typography14';
import { Stack, Grid, Box } from '@mui/material';

import GenerateQr from 'Component/GenerateQRCode/GenerateQr';

function FooterPrint({ dataId }) {
	return (
		<>
			<Grid container>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
						<Typography14 title={dataId?.createBy?.jobRole} />
						<Box sx={{ minHeight: '70px' }}>
							{dataId?.createBy?.name !== '' && (
								<GenerateQr dataId={dataId?.createBy?.name} />
							)}
						</Box>

						<Typography14 title={dataId?.createBy?.name} fontWeight={700} />
					</Stack>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					// sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Typography14 title="Tembusan:" />
					<Typography14 title="1. Direksi PT. LRT Jakarta" />
					<Typography14 title="2. Divisi Prasarana" />
					<Typography14 title="3. Divisi Sarana" />
					<Typography14 title="4. Divisi Mutu, Keamanan, Kesehatan, dan Lingkungan" />
				</Grid>
			</Grid>
		</>
	);
}

export default FooterPrint;
