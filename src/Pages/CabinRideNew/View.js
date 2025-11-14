import React, { useRef, useState, useContext, useEffect } from 'react';
import { Box, Button, Container, Grid, Dialog, Stack } from '@mui/material';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import { useLocation, useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import HeaderPrint from 'Component/CustomPrints/HeaderPrint';
import Typography14 from 'Component/Typography/Typography14';

import BodyPrintV2 from './Print/BodyPrintV2';
import Dokumentasi from './Print/Dokumentasi';
import FooterPrintV2 from './Print/FooterPrintV2';

import { UserProfilContext } from 'Context';
import { CabinRideNewContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';
import DokumenPrint from './Print/DokumenPrint';

function View() {
	const location = useLocation();
	const history = useHistory();
	const componentRef = useRef();
	const { dataRow } = location.state;

	// context
	const { userProfile } = useContext(UserProfilContext);
	const { cabinRideById, getDataCabinRideNewId } =
		useContext(CabinRideNewContext);

	const [dialogPrint, setDialogPrint] = useState(false);
	const [dialogKonfir, setDialogKonfir] = useState(false);

	const handleOpenPrint = () => {
		setDialogPrint(true);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleKonfirmasi = () => {
		setDialogKonfir(true);
	};

	const handleSubmit = async () => {
		const _information = dataRow?.information;
		const _lrv = _information?.vehicleNumber;

		const postData = {
			...dataRow?.information,
			status: 'Konfirmasi',
		};

		const otherData = cabinRideById?.information.filter(
			x => x.vehicleNumber?._id !== _lrv?._id
		);

		const newData = {
			...cabinRideById,
			information: [...otherData, postData],
		};

		const respon = await ApiOperational.putCabinRideNew(dataRow?._id, newData);
		if (respon) {
			setDialogKonfir(false);
			history.goBack();
		}
		// console.log('data information', newData);
	};

	useEffect(() => {
		if (dataRow) {
			getDataCabinRideNewId(dataRow?._id);
		}
	}, [dataRow]);

	// console.log('data by id', cabinRideById, dataRow);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid
					container
					justifyContent="space-between"
					alignItems={'center'}
					spacing={2}
				>
					<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
						<HeaderV1
							title="Cabin Ride"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Detail Cabin Ride"
						/>
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
						<BodyPrintV2 dataId={dataRow} />
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
						<Dokumentasi dataId={dataRow} />
					</Grid>

					{dataRow?.information?.status === 'Konfirmasi' && (
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
						>
							<Button
								variant="outlined"
								color="error"
								onClick={() => history.goBack()}
							>
								Kembali
							</Button>
							<Button variant="contained" onClick={handleOpenPrint}>
								Print
							</Button>
						</Grid>
					)}

					{userProfile?.officerPosition === 'Masinis' &&
					dataRow?.information?.status !== 'Konfirmasi' ? (
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
						>
							<Button
								variant="outlined"
								color="error"
								onClick={() => history.goBack()}
							>
								Kembali
							</Button>
							<Button variant="contained" onClick={handleKonfirmasi}>
								Konfirmasi
							</Button>
						</Grid>
					) : null}
				</Grid>

				{/* Dialog Print */}
				<Dialog fullScreen open={dialogPrint}>
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
					<div ref={componentRef} style={{ padding: '30px' }}>
						<HeaderPrint
							title="FORMULIR CABIN RIDE"
							number="LRTJ-FR-ASP-008"
							revisi="02"
							page="Page 3 of 4"
						/>
						<BodyPrintV2 dataId={dataRow} />
						<FooterPrintV2 dataId={dataRow} />
						<div style={{ pageBreakBefore: 'always', marginTop: '30px' }}>
							<DokumenPrint dataId={dataRow} />
						</div>
					</div>
				</Dialog>

				{/* Dialog Konfirmasi */}
				<Dialog fullWidth maxWidth="xs" open={dialogKonfir}>
					<Box
						sx={{
							padding: '30px 20px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography14
							title={
								'Apakah Anda yakin ingin mengkonfirmasi data' +
								' ' +
								dataRow?.information?.vehicleNumber?.numberLrv +
								'?'
							}
						/>
						<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
							<Button
								sx={{ width: '100px' }}
								variant="outlined"
								onClick={() => setDialogKonfir(false)}
								color="error"
							>
								Tidak
							</Button>
							<Button
								sx={{ width: '100px' }}
								variant="contained"
								onClick={handleSubmit}
							>
								Ya
							</Button>
						</Stack>
					</Box>
				</Dialog>
			</Container>
		</Box>
	);
}

export default View;
