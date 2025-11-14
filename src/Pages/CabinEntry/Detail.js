import React, { useContext, useRef, useState } from 'react';

import {
	Box,
	Button,
	Container,
	Grid,
	TableCell,
	TableRow,
	Typography,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	Dialog,
	Stack,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography14 from 'Component/Typography/Typography14';
import Typography16 from 'Component/Typography/Typography16';

import useStyles, {
	tableCellStyle,
	tableCellStyleRight,
	tableCellStyleLeft,
} from './Styles';

import ApiOperational from 'Services/ApiOperational';
import { UserProfilContext } from 'Context';
import Print from './Print';

function Detail() {
	const location = useLocation();
	const { dataRow } = location.state.state;
	const history = useHistory();
	const componentRef = useRef();

	// context
	const { userProfile } = useContext(UserProfilContext);

	const _start = moment(dataRow?.startDate).format('DD/MM/YYYY');
	const _end = moment(dataRow?.endDate).format('DD/MM/YYYY');

	// state
	const [loading, setLoading] = useState(false);
	const [dialogPrint, setDialogPrint] = useState(false);

	const handleSubmit = async type => {
		const postData = {
			status: type,
			approver: {
				...userProfile,
				date: new Date(),
			},
		};
		setLoading(true);

		const respon = await ApiOperational.updateCabinEntry(
			dataRow?._id,
			postData
		);

		if (respon.statusText === 'OK') {
			setLoading(false);
			history.goBack();
			console.log('Data Berhasil Diperbaharui');
		} else {
			console.log('Error');
			setLoading(false);
		}
	};

	const handleDialogPrint = () => {
		setDialogPrint(true);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	// console.log('data row', dataRow)

	return (
		<Box sx={{ backgroundColor: '#fff', minHeight: '100vh', p: '30px' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="Izin Masuk Kabin Masinis"
						sub1="Home -"
						sub2="Operasional -"
						sub3="Izin Masuk Kabin Masinis"
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={3}>
							<Typography14 title="Kepentingan" fontWeight={700} color="gray" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + dataRow?.priority} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="Waktu" fontWeight={700} color="gray" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + dataRow?.time} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14
								title="Kegiatan Berlangsung"
								fontWeight={700}
								color="gray"
							/>
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + _start + ' - ' + _end} />
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={6}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={12}>
									<Typography16 title="Penanggung Jawab" fontWeight={700} />
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14 title="Nama" fontWeight={700} color="gray" />
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={': ' + ' ' + dataRow?.responsiblePerson?.officerName}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14 title="Email" fontWeight={700} color="gray" />
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={
											': ' + ' ' + dataRow?.responsiblePerson?.officerEmail
										}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14
										title="No. Telepon"
										fontWeight={700}
										color="gray"
									/>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={
											': ' +
											' ' +
											dataRow?.responsiblePerson?.officerPhoneNumber
										}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={12}>
									<Typography16 title="Pemohon" fontWeight={700} />
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14 title="Nama" fontWeight={700} color="gray" />
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={': ' + ' ' + dataRow?.requester?.officerName}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14 title="Email" fontWeight={700} color="gray" />
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={': ' + ' ' + dataRow?.requester?.officerEmail}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Typography14
										title="No. Telepon"
										fontWeight={700}
										color="gray"
									/>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography14
										title={': ' + ' ' + dataRow?.requester?.officerPhoneNumber}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<TableContainer
						sx={{
							padding: '10px',
						}}
						component={Paper}
					>
						<Table
							sx={{
								minWidth: 250,
								borderCollapse: 'separate',
								borderSpacing: '0px 5px',
							}}
						>
							<TableHead>
								<TableRow
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										bgcolor: '#464748',
										color: '#fff',
										borderRadius: '10px',
										pt: '10px',
									}}
								>
									<TableCell sx={tableCellStyleLeft}>
										<p>No.</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Nama</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>NIK</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Jabatan</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Departemen</p>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{dataRow?.participants.length > 0 && (
									<>
										{dataRow?.participants.map((item, index) => {
											return (
												<TableRow>
													<TableCell align="center">{index + 1}</TableCell>
													<TableCell align="center">
														{item?.officerName}
													</TableCell>
													<TableCell align="center">{item?.idNumber}</TableCell>
													<TableCell align="center">
														{item?.officerPosition}
													</TableCell>
													<TableCell align="center">
														{item?.officerDepartemen}
													</TableCell>
												</TableRow>
											);
										})}
									</>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>

				{dataRow?.status === 'Disetujui' ? (
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ mt: 2, mb: 7, display: 'flex', justifyContent: 'flex-end' }}
					>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="contained"
								color="error"
								onClick={() => handleSubmit('Ditolak')}
							>
								Tolak
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => handleSubmit('Konfirmasi')}
							>
								Konfirmasi
							</Button>
						</Box>
					</Grid>
				) : dataRow?.status === 'Konfirmasi' ? (
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ mt: 2, mb: 7, display: 'flex', justifyContent: 'flex-end' }}
					>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleDialogPrint}
							>
								Cetak
							</Button>
						</Box>
					</Grid>
				) : null}
			</Grid>

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
						onClick={handlePrint}
						startIcon={<PrintOutlinedIcon />}
					>
						Print
					</Button>
				</Stack>
				<div ref={componentRef}>
					<Print dataId={dataRow} />
				</div>
			</Dialog>
		</Box>
	);
}

export default Detail;
