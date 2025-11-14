import React, {
	useState,
	Fragment,
	useEffect,
	useContext,
	forwardRef,
	useRef,
} from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
	Alert,
	Typography,
	Container,
	Grid,
	Box,
	Paper,
	ButtonBase,
	Card,
	Button,
	Stack,
	FormGroup,
	FormControlLabel,
	IconButton,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	CardContent,
	Table,
	Switch,
	TextField,
	Divider,
	InputAdornment,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useHistory } from 'react-router-dom';

//styles
import useStyles from './Styles';
import StaticVar from 'Config/StaticVar';
import UseDailyIncident from 'Hooks/DailyIncident/useDailyIncident';
import Contact from '../../Component/Card/index';
import UseDailyWork from 'Hooks/DailyWork/useDailyWork';
import moment from 'moment';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import useUploadImg from 'Hooks/Upload/useUploadImg';
import FormDailyIncident from './Form';
import html2pdf from 'html2pdf.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#BB7E36',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'theme.palette.action.hover',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function DailyIncident() {
	const classes = useStyles();
	const history = useHistory();

	const {
		handleSelect,
		selectedData,
		handleClose,
		getDataDailyIncident,
		openDialog,
		handleFilterDate,
		date,
		setDate,
		handleDelete,
		dailyIncident,
	} = UseDailyIncident();

	const { getDailyWorkByTrainDriver } = UseDailyWork();

	const { setLoader, loader } = useUploadImg();
	var element = useRef([]);
	var opt = {
		filename: `kejadianharian-${moment().format('YYYYMMDDHHmmss')}.pdf`,
		html2canvas: { dpi: 300, letterRendering: true, useCORS: true },
		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
	};

	const handlePrint = async condition => {
		switch (condition) {
			case 1:
				setTimeout(() => {
					setLoader(false);
					if (element?.current.length > 0) {
						element.current.map((item, index) =>
							html2pdf().from(element.current[index]).set(opt).save()
						);
					}
				}, 5000);
				break;
			default:
				html2pdf().from(element.current[0]).set(opt).save();
				break;
		}
	};

	const Content = forwardRef((props, ref) => {
		return (
			<div ref={ref}>
				<FormDailyIncident dataDetail={props?.dataDetail} action="detail" />
			</div>
		);
	});

	const fetchData = async () => {
		let createAt = moment().format('YYYY-MM-DD');
		let monthly = moment().format('YYYY-MM');
		let timeIncident = moment().format('YYYY-MM-DD');
		// let createBy = JSON.parse(localStorage.getItem('profile'))?._id;
		let createBy = '';
		await getDailyWorkByTrainDriver(createBy, createAt);
		// if (JSON.parse(localStorage.getItem('user'))?.role === 'supervisor') {
		//   getDataDailyIncident({ monthly })
		// }
		getDataDailyIncident();
	};

	useEffect(() => {
		fetchData();
	}, []);

	// function validateYouTubeUrl(url)
	// {
	//         if (url != undefined || url != '') {
	//             var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
	//             var match = url.match(regExp);
	//             if (match && match[2].length == 11) {
	//                 // Do anything for being valid
	//                 // if need to change the url to embed url then use below line
	//                 return true
	//             }
	//             else {
	//               return false
	//                 // Do anything for not being valid
	//             }
	//         }
	// }

	return (
		<>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				scroll="paper"
				maxWidth={'lg'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogContent sx={{ width: 600 }}>
					<Typography>
						Apakah anda yakin menghapus dengan Accindent :{' '}
						{selectedData?.reporterName}
					</Typography>
				</DialogContent>
				<DialogActions sx={{ m: 1 }}>
					<Button
						variant="contained"
						color="inherit"
						sx={{
							color: '#000',
							textTransform: 'none',
						}}
						onClick={handleClose}
					>
						Tutup
					</Button>
					<Button
						variant="contained"
						color="error"
						sx={{
							color: '#fff',
							textTransform: 'none',
						}}
						onClick={handleDelete}
					>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>

			{/* Loader */}
			<Backdrop
				sx={{ color: '#fff', zIndex: 99999 }}
				open={loader}
				onClick={() => setLoader(false)}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			{/* <div className={'print-source'}>
				{dailyIncident?.length > 0
					? dailyIncident.map((row, index) => (
							<Content
								ref={el => {
									element.current[index] = el;
								}}
								dataDetail={row}
							/>
					  ))
					: null}
			</div> */}

			<Container maxWidth="xl" sx={{ pt: 13 }}>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} sx={{ paddingRight: '20px' }}>
						<Contact />
					</Grid>
				</Grid>
			</Container>
			<div
				style={{
					width: '100%',
					backgroundColor: '#A2A2A2',
					height: 50,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 50,
				}}
			>
				<Typography sx={{ color: '#fff', fontSize: 15 }}>
					Kejadian Harian
				</Typography>
			</div>
			{/* {JSON.parse(localStorage.getItem('user'))?.role === 'supervisor' && ( */}
			<Container maxWidth="xl" sx={{ mt: 2, pb: 5 }}>
				<Grid container justifyContent={'flex-end'}>
					<div style={{ marginRight: 10 }}>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Typography sx={{ mb: 2, mr: 1 }}>Pilih Tanggal : </Typography>
							<TextField
								type="date"
								value={date}
								InputProps={{
									style: {
										width: 300,
										fontSize: 12,
										height: 33,
										backgroundColor: '#fff',
										border: 'none',
										borderRadius: 7,
										boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
									},
								}}
								sx={{
									width: 300,
									mb: 2,
								}}
								onChange={event => setDate(event.target.value)}
							/>
						</Grid>
					</div>
					<div style={{ marginRight: 10 }}>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Button
								onClick={handleFilterDate}
								variant="contained"
								sx={{ mb: 2, width: 150, textDecoration: 'none' }}
							>
								Cari
							</Button>
						</Grid>
					</div>
					{/* <div>
						<Button
							fullWidth
							variant="contained"
							color="success"
							onClick={async () => {
								setLoader(true);
								await handlePrint(1);
							}}
						>
							Download
						</Button>
					</div> */}
					{/* <div>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Button
								onClick={async () => {
									history.push(
										'/app/operational/dailyincident/form?action=add'
									);
								}}
								variant="contained"
								sx={{ mb: 2, width: 150, textDecoration: 'none' }}
							>
								Tambah
							</Button>
						</Grid>
					</div> */}
				</Grid>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell width={20}>No.</StyledTableCell>
								<StyledTableCell align="left" width={100}>
									Nama Pelapor
								</StyledTableCell>
								<StyledTableCell align="left" width={200}>
									File
								</StyledTableCell>
								<StyledTableCell align="left" width={130}>
									Waktu Kejadian
								</StyledTableCell>
								<StyledTableCell align="left" width={100}>
									Lokasi
								</StyledTableCell>
								<StyledTableCell align="left" width={150}>
									Lokasi Spesifik
								</StyledTableCell>
								<StyledTableCell align="left" width={100}>
									Equipment
								</StyledTableCell>
								<StyledTableCell align="left" width={50}>
									Status
								</StyledTableCell>
								<StyledTableCell align="left" width={150}>
									Log
								</StyledTableCell>
								<StyledTableCell align="center" width={50}>
									Aksi
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dailyIncident?.length > 0 ? (
								dailyIncident?.map((row, index) => {
									const fileDisplay = !Array.isArray(row?.file)
										? row?.file?.uploadedFiles?.length ?? 0
										: 0;
									const locationDisplay = Array.isArray(row?.location)
										? row?.location.length > 0
											? row?.location.map(loc => loc.name).join(', ')
											: '-'
										: row?.location?.trim()
										? row?.location
										: '-';
									const locationSpecificDisplay = Array.isArray(
										row?.locationSpecific
									)
										? row?.locationSpecific.length > 0
											? row?.locationSpecific.map(loc => loc.name).join(', ')
											: '-'
										: row?.locationSpecific?.trim()
										? row?.locationSpecific
										: '-';
									const equipmentDisplay = Array.isArray(row?.equipment)
										? row?.equipment.length > 0
											? row?.equipment.map(loc => loc.name).join(', ')
											: '-'
										: row?.equipment?.trim()
										? row?.equipment
										: '-';
									const statusDisplay = Array.isArray(row?.status)
										? row?.status.length > 0
											? row?.status.map(loc => loc.name).join(', ')
											: '-'
										: row?.status?.trim()
										? row?.status
										: '-';
									return (
										<StyledTableRow key={row.reporterName}>
											<StyledTableCell component="th" scope="row">
												{index + 1}
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{row?.reporterName}</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{fileDisplay} File</Typography>
												{/* <Typography>
													{row?.file.length > 0 ? (
														<Box
															sx={{
																flexDirection: 'column',
																width: 150,
																height: 120,
																borderRadius: 2,
																backgroundColor: '#F2F2F2',
																textTransform: 'none',
																p: 0,
																overflow: 'hidden',
																display: 'flex',
																justifyContent: 'center',
															}}
														>
															{row?.file[0].type === 'video'
																? row?.file.map(val => (
																		<Player
																			playsInline
																			src={
																				StaticVar.URL_API +
																				'/upload/' +
																				val?.file
																			}
																			fluid={true}
																			controls
																			width={150}
																			height={80}
																		/>
																  ))
																: row?.file.map(val => (
																		<img
																			src={
																				StaticVar.URL_API +
																				'/upload/' +
																				val.file
																			}
																			style={{
																				width: '100%',
																				objectFit: 'contain',
																			}}
																		/>
																  ))}
														</Box>
													) : (
														'Tidak Ada File'
													)}
												</Typography> */}
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>
													{row?.timeIncident
														? moment(row?.timeIncident).format(
																'DD-MM-YYYY HH:mm'
														  ) + ' WIB'
														: '-'}
												</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{locationDisplay}</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{locationSpecificDisplay}</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{equipmentDisplay}</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{statusDisplay}</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												Dibuat : <br />{' '}
												<i>
													{moment(row?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
												</i>
												<br />
												{row?.updated ? 'Diperbarui :' : null}
												<br />
												<i>
													{' '}
													{row?.updated
														? moment(row?.updated).format('DD-MM-YYYY HH:mm:ss')
														: null}
												</i>
											</StyledTableCell>
											<StyledTableCell align="center">
												<Button
													sx={{ mt: 1, color: '#fff', width: 100 }}
													variant="contained"
													onClick={() =>
														history.push(
															'/app/operational/dailyincident/view?id=' +
																row?._id
														)
													}
												>
													Detail
												</Button>
												{row?.createBy?._id ===
												JSON.parse(localStorage.getItem('profile'))?._id ? (
													<>
														<Button
															sx={{ mt: 1, color: '#fff', width: 100 }}
															variant="contained"
															color="warning"
															onClick={() =>
																history.push(
																	'/app/operational/dailyincident/form?id=' +
																		row?._id +
																		'&action=edit'
																)
															}
														>
															Edit
														</Button>
														<Button
															sx={{ mt: 1, color: '#fff', width: 100 }}
															variant="contained"
															color="error"
															onClick={() => handleSelect(row)}
														>
															Hapus
														</Button>
													</>
												) : null}
											</StyledTableCell>
										</StyledTableRow>
									);
								})
							) : (
								<StyledTableRow>
									<StyledTableCell
										align="center"
										component="th"
										scope="row"
										colSpan={9}
									>
										Tidak ada data
									</StyledTableCell>
								</StyledTableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
			{/* )} */}
		</>
	);
}

{
	/*  */
}
