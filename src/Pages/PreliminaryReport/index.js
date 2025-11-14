import React, {
	useState,
	Fragment,
	useEffect,
	forwardRef,
	useContext,
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
	Snackbar,
	Avatar,
	Tab,
	Tabs,
	CardMedia,
	CardActions,
	DialogContentText,
	ImageListItem,
	ImageList,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useHistory } from 'react-router-dom';

//img
import logo from '../../Assets/Images/org.png';

//styles
import {
	boxIcon,
	paperContent,
	noteStyles,
	submitBtnStyle,
	TabStyle,
} from './Styles';
import useStyles from './Styles';
import StaticVar from 'Config/StaticVar';
import useUploadImg from 'Hooks/Upload/useUploadImg';
import UsePreliminaryReport from 'Hooks/PreliminaryReport/usePreliminaryReport';
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material';
import Contact from '../../Component/Card/index';
import NotFound from '../../Assets/Images/NotFound.png';
import UseDailyWork from 'Hooks/DailyWork/useDailyWork';
import moment from 'moment';
import FormPreliminaryReport from './Form';
import html2pdf from 'html2pdf.js';
import { UserProfilContext } from 'Context';

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

export default function PreliminaryReport() {
	const classes = useStyles();
	const history = useHistory();

	const { setLoader, loader } = useUploadImg();

	const { getUserProfilById, userProfile, userWorkorder } =
		useContext(UserProfilContext);

	const {
		submitDataPreliminaryReport,
		handleSelect,
		selectedData,
		handleClose,
		getDataPreliminaryReport,
		openDialog,
		handleFilterDate,
		date,
		setDate,
		handleDelete,
		preliminaryReport,
	} = UsePreliminaryReport();

	const fetchData = async () => {
		let createAt = moment().format('YYYY-MM-DD');
		let monthly = moment().format('YYYY-MM');
		// let createBy = JSON.parse(localStorage.getItem('profile'))?._id
		// await getDailyWorkByTrainDriver(createBy,createAt)
		// if (JSON.parse(localStorage.getItem('user'))?.role === 'supervisor') {
		getDataPreliminaryReport();
		// }
	};

	useEffect(() => {
		fetchData();
	}, []);

	var element = useRef([]);
	var opt = {
		filename: `preliminaryreport-${moment().format('YYYYMMDDHHmmss')}.pdf`,
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
				<FormPreliminaryReport dataDetail={props?.dataDetail} action="detail" />
			</div>
		);
	});

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
						{selectedData?.accident}
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
						onClick={() => handleDelete()}
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

			<div className={'print-source'}>
				{preliminaryReport?.length > 0
					? preliminaryReport.map((row, index) => (
							<Content
								ref={el => {
									element.current[index] = el;
								}}
								dataDetail={row}
							/>
					  ))
					: null}
			</div>

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
					Preliminary Incident Report
				</Typography>
			</div>
			{/* {JSON.parse(localStorage.getItem('user'))?.role === 'supervisor' && ( */}
			<Container maxWidth="xl" sx={{ mt: 2, pb: 5 }}>
				<Grid container justifyContent={'flex-end'}>
					<div style={{ marginRight: 10 }}>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Typography sx={{ mb: 2, mr: 1 }}>
								Tanggal Dilaporkan :{' '}
							</Typography>
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

					{/* <div style={{ marginRight: 10 }}>
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
					<div>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Button
								onClick={async () => {
									const response = await submitDataPreliminaryReport();
									if (response.status === 'OK') {
										history.push(
											'/app/operational/preliminaryreport/form?id=' +
												response?.result?._id +
												'&action=add'
										);
									}
								}}
								variant="contained"
								sx={{ mb: 2, width: 150, textDecoration: 'none' }}
							>
								Tambah
							</Button>
						</Grid>
					</div>
				</Grid>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell width={20}>No.</StyledTableCell>
								<StyledTableCell align="left" width={100}>
									Accident
								</StyledTableCell>
								<StyledTableCell align="left" width={100}>
									Penyelia
								</StyledTableCell>
								<StyledTableCell align="left" width={150}>
									Informasi Kerugian
								</StyledTableCell>
								<StyledTableCell align="left" width={200}>
									Tanggal
								</StyledTableCell>
								<StyledTableCell align="left" width={200}>
									Foto
								</StyledTableCell>
								<StyledTableCell align="left" width={150}>
									Log
								</StyledTableCell>
								<StyledTableCell align="center" width={40}>
									Aksi
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* {JSON.stringify(preliminaryReport)} */}
							{preliminaryReport?.length > 0 ? (
								preliminaryReport.map((row, index) => {
									return (
										<StyledTableRow key={row.name}>
											<StyledTableCell component="th" scope="row">
												{index + 1}
											</StyledTableCell>
											<StyledTableCell align="left">
												Kecelakaan : {row?.accident}
												<br />
												Lokasi : {row?.location}
											</StyledTableCell>
											<StyledTableCell align="left">
												Nama : {row?.createBy?.name}
												<br />
												Nik : {row?.createBy?.nik}
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography>{row?.lossInformation}</Typography>
											</StyledTableCell>

											<StyledTableCell align="left">
												<Typography>
													Tanggal dan Waktu Kejadian:
													<br />
													{row?.dateOccurence
														? moment(row?.dateOccurence).format(
																'DD-MM-YYYY HH:mm'
														  )
														: '-'}
												</Typography>
												<Typography>
													Tanggal Dilaporkan
													<br />
													{row?.dateReport
														? moment(row?.dateReport).format('DD-MM-YYYY HH:mm')
														: '-'}
												</Typography>
											</StyledTableCell>
											<StyledTableCell align="left">
												<Grid container>
													{row?.file.length > 0
														? row?.file.map((item, index) => (
																<CardMedia
																	key={index}
																	component="img"
																	sx={{ width: 100, mr: 1, maxHeight: 70 }}
																	image={
																		item
																			? StaticVar.URL_API + '/upload/' + item
																			: NotFound
																	}
																	onError={e => (
																		(e.target.onerror = null),
																		(e.target.src = NotFound)
																	)}
																	alt="Foto Riwayat"
																/>
														  ))
														: null}
												</Grid>
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
													// onClick={() =>
													// 	history.push(
													// 		'/app/operational/preliminaryreport/form?id=' +
													// 			row?._id +
													// 			'&action=detail'
													// 	)
													// }
													onClick={() =>
														history.push(
															'/app/operational/preliminaryreport/view?id=' +
																row?._id
														)
													}
												>
													Detail
												</Button>
												{row?.createBy?._id === userProfile?._id ? (
													<>
														<Button
															sx={{ mt: 1, color: '#fff', width: 100 }}
															variant="contained"
															color="warning"
															onClick={() =>
																history.push(
																	'/app/operational/preliminaryreport/form?id=' +
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
