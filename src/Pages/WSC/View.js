import React, { useRef, useState } from 'react';
import { Box, Button, Container, Grid, Dialog, Stack } from '@mui/material';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useLocation, useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import HeaderPrint from 'Component/CustomPrints/HeaderPrintV3';

import BodyPrint from './PrintDoc/BodyPrint';

function View() {
	const location = useLocation();
	const { dataRow } = location.state;
	const history = useHistory();
	const componentRef = useRef();

	// state
	const [dialogPrint, setDialogPrint] = useState(false);

	const handleOpenPrint = () => {
		setDialogPrint(true);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Logbook Workshop Control Room (WSC)"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Detail Workshop Control Room"
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<BodyPrint dataId={dataRow} />
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
					>
						<Button variant="outlined" onClick={() => history.goBack()}>
							Kembali
						</Button>
						<Button variant="contained" onClick={handleOpenPrint}>
							Cetak
						</Button>
					</Grid>
				</Grid>
			</Container>

			<Dialog open={dialogPrint} fullScreen>
				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={2}
					sx={{ m: 3 }}
				>
					<Button
						sx={{ width: '100px' }}
						variant="outlined"
						onClick={() => setDialogPrint(false)}
					>
						Kembali
					</Button>
					<Button
						sx={{ width: '100px' }}
						variant="contained"
						onClick={handlePrintDoc}
						startIcon={<PrintOutlinedIcon />}
					>
						Print
					</Button>
				</Stack>
				<div ref={componentRef} style={{ padding: '10px' }}>
					<HeaderPrint
						title="Form Logbook Workshop Control (WSP)"
						number="LRTJ-FR-POP-028"
						revisi="00"
						page="Page 5 of 6"
					/>
					<BodyPrint dataId={dataRow} />
					{/* <FooterPrint dataId={rowData} /> */}
				</div>
			</Dialog>
		</Box>
	);
}

export default View;
