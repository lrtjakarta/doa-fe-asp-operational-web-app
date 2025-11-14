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
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
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
import { WAMContext } from 'Context';

import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useReactToPrint } from 'react-to-print';
import HeaderPrint from './PrintDoc/HeaderPrint';
import BodyPrint from './PrintDoc/BodyPrint';
import FooterPrint from './PrintDoc/FooterPrint';

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

export default function WAMList() {
	const classes = useStyles();
	const history = useHistory();
	const componentRef = useRef();

	const { setLoader, loader } = useUploadImg();
	const { getDataWAM, dataWAM, postDataWAM, putDataWAM, deleteDataWAM } =
		useContext(WAMContext);
	const [date, setDate] = useState();
	const fetchData = async () => {
		let createAt = moment().format('YYYY-MM-DD');
		let monthly = moment().format('YYYY-MM');
		getDataWAM();
	};

	const handleClose = () => {
		setOpenDialog(false);
		setSelectedData({});
	};

	const [openDialog, setOpenDialog] = useState(false);
	const [selectedData, setSelectedData] = useState({});

	const [dialogPrint, setDialogPrint] = useState(false);
	const [rowData, setRowData] = useState(null);

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

	const handleOpenPrint = row => {
		// console.log('data row', row);
		setDialogPrint(true);
		setRowData(row);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
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
						Apakah anda yakin menghapus dengan WAM Tgl: {selectedData?.wamDate}
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
						onClick={() => {
							deleteDataWAM(selectedData._id);
							handleClose();
						}}
					>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>
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
					Warta Marklumat
				</Typography>
			</div>
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
								onChange={e => setDate(e.target.value)}
							/>
						</Grid>
					</div>
					<div style={{ marginRight: 10 }}>
						<Button
							fullWidth
							variant="contained"
							color="success"
							onClick={async () => {
								if (date) {
									getDataWAM({ wamDate: moment(date).format('YYYY-MM-DD') });
								} else {
									getDataWAM();
								}
							}}
						>
							Cari
						</Button>
					</div>
					<div>
						<Grid container justifyContent={'flex-end'} alignItems="center">
							<Button
								onClick={async () => {
									history.push('/app/operational/WAM/form?action=add');
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
								<StyledTableCell align="center" width={120}>
									Tanggal
								</StyledTableCell>
								<StyledTableCell align="center" width={180}>
									Nomor
								</StyledTableCell>
								<StyledTableCell align="left" width={300}>
									Perihal
								</StyledTableCell>
								<StyledTableCell>Perubahan Jadwal Perjalan</StyledTableCell>
								<StyledTableCell align="center" width={150}>
									Aksi
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dataWAM?.length > 0 ? (
								dataWAM.map((row, index) => {
									return (
										<StyledTableRow key={row.name}>
											<StyledTableCell component="th" scope="row">
												{index + 1}
											</StyledTableCell>
											<StyledTableCell align="center">
												{row.wamDate}
											</StyledTableCell>
											<StyledTableCell align="center">
												{row.wamNumber}
											</StyledTableCell>
											<StyledTableCell align="left">
												{row.regardingNote}
											</StyledTableCell>
											<StyledTableCell align="left">
												<Typography
													dangerouslySetInnerHTML={{ __html: row.wamNote }}
												/>
											</StyledTableCell>
											<StyledTableCell align="center">
												<IconButton
													size="small"
													onClick={() => handleOpenPrint(row)}
												>
													<PrintIcon />
												</IconButton>
												<IconButton
													// edge="end"
													size="small"
													aria-label="edit"
													onClick={() => {
														history.push(
															'/app/operational/WAM/form?action=edit&id=' +
																row._id
														);
													}}
												>
													<EditIcon />
												</IconButton>
												<IconButton
													size="small"
													aria-label="delete"
													onClick={() => {
														setOpenDialog(true);
														setSelectedData(row);
													}}
												>
													<DeleteIcon />
												</IconButton>
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
										colSpan={5}
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
						title="Warta Maklumat"
						number="LRTJ-FR-POP-002"
						revisi="0"
						page="Page 1 of 1"
					/>
					<BodyPrint dataId={rowData} />
					<FooterPrint dataId={rowData} />
				</div>
			</Dialog>
		</>
	);
}

{
	/*  */
}
