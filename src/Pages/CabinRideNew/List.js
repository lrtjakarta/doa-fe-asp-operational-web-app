import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	TableRow,
	TextField,
	Typography,
	styled,
	InputAdornment,
	IconButton,
	Card,
	Alert,
	Stack,
	Dialog,
	Tooltip,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PrintIcon from '@mui/icons-material/Print';
import { KeyboardArrowDown } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import Typography12 from 'Component/Typography/Typography12';
import CustomHeaderTable from '../NoGoItem/component/CustomHeaderTable';

// style
import { judulTextStyle } from './Styles';

import AppTextField from '../../Component/input-fields/AppTextField';

import BodyPrint from './Print/BodyPrint';

import ApiOperational from 'Services/ApiOperational';
import { UserProfilContext } from 'Context';
import { CabinRideNewContext } from 'Context';

import CustomStatus from './CustomStatus';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'theme.palette.action.hover',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#BB7E36',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
		fontWeight: 100,
		color: 'black',
	},
}));

function List() {
	const history = useHistory();

	const currentDate = new Date();
	const currentMonthYear = currentDate.toISOString().slice(0, 7);

	// context
	const { profilOfficer, getAllOfficer, userProfile } =
		useContext(UserProfilContext);
	const { listCabinRideNew, getDataCabinRideNew } =
		useContext(CabinRideNewContext);

	// state
	const [dataHeader, setDataHeader] = useState([
		'Nama',
		'Tanggal',
		'Informasi',
		'Status',
		'Aksi',
	]);
	const [allData, setAllData] = useState([]);
	const [date, setDate] = useState(currentMonthYear);

	const [rowData, setRowData] = useState(null);

	const [dialogData, setDialogData] = useState(false);
	const [formLrv, setFormLrv] = useState('');

	const getStatusStyles = status => {
		switch (status) {
			case 'Belum Diisi':
				return {
					backgroundColor: '#FFF5F8',
					color: '#F1416C',
				};
			case 'Menunggu Konfirmasi':
				return {
					backgroundColor: '#FFF8DD',
					color: '#F6C000',
				};
			case 'Konfirmasi':
				return {
					backgroundColor: '#E8FFF3',
					color: '#50CD89',
				};
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	const handleAdd = row => {
		history.push('/app/operational/cabinridenew/form', {
			state: { dataRow: row, date: date },
		});
	};

	const handleFilterMonth = e => {
		setDate(e.target.value);
	};

	const handleSearch = async () => {
		const filter = {
			monthly: new Date(date).toISOString().slice(0, 7),
		};

		const respon = await ApiOperational.getCabinRideNew({ params: filter });

		if (respon.statusText === 'OK') {
			fetchData(profilOfficer, respon.data);
		}
	};

	const handleDialogData = rowData => {
		setDialogData(true);
		setRowData(rowData?.dataRow);
		// console.log('open dialog data', rowData?.dataRow);
	};

	const handleClose = () => {
		setDialogData(false);
		setRowData(null);
	};

	const handleView = row => {
		// console.log('data row', row);
		// return;
		history.push('/app/operational/cabinridenew/detail', {
			dataRow: row.dataRow,
		});
	};

	const handleViewData = () => {
		const _dataInfo = rowData?.information?.find(
			x => x.vehicleNumber._id === formLrv
		);
		const newData = {
			...rowData,
			information: _dataInfo,
		};
		history.push('/app/operational/cabinridenew/detail', {
			dataRow: newData,
		});
		// console.log('pilih information', newData);
	};

	const fetchData = (profilOfficer, data) => {
		const filterData = profilOfficer.filter(
			x => x.jobPosition?.name === 'Masinis'
		);

		const newData = filterData.map(item => {
			const matchingData = data.find(
				xy => xy.driverProfile.officerId === item._id
			);
			const statuses = matchingData?.information?.map(info => info.status);
			return {
				...item,
				status:
					statuses?.length > 0
						? statuses
						: matchingData?.status
						? matchingData?.status
						: 'Belum Diisi',
				tanggal: matchingData ? matchingData.monthly : '-',
				keterangan: matchingData ? matchingData.note : '-',
				dataRow: matchingData,
			};
		});

		setAllData(newData);
	};

	useEffect(() => {
		const date = new Date().toISOString().slice(0, 7);
		// console.log('date', date)
		getAllOfficer({ isLimit: false });
		getDataCabinRideNew({ monthly: date });
	}, []);

	useEffect(() => {
		fetchData(profilOfficer, listCabinRideNew);
	}, [profilOfficer]);

	// console.log('listCabinRideNew', userProfile);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
							<HeaderV1
								title="Cabin Ride"
								sub1="Home -"
								sub2="Operasional -"
								sub3="List Cabin Ride"
							/>
						</Grid>

						<Grid item xs={12} sm={2.5}>
							<TextField
								fullWidth
								placeholder="Pencarian"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton sx={{ padding: 0 }}>
												<SearchIcon
													sx={{
														fontSize: 15,
														color: 'gray',
													}}
												/>
											</IconButton>
										</InputAdornment>
									),
									style: {
										fontSize: 12,
										height: 35.5,
										backgroundColor: '#fff',
										boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
									},
								}}
								type="month"
								value={date}
								onChange={newValue => handleFilterMonth(newValue)}
							/>
						</Grid>
						<Grid item xs={12} sm={1}>
							<Button variant="contained" onClick={handleSearch}>
								Cari
							</Button>
						</Grid>

						{allData.length > 0 ? (
							<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
								<CustomHeaderTable
									dataHeader={dataHeader}
									dataBody={
										<>
											{allData.map(item => {
												// const statusStyles = getStatusStyles(item?.status);
												const _dataRow = item?.dataRow;
												return (
													<StyledTableRow>
														<StyledTableCell align="center">
															{item.name}
														</StyledTableCell>
														<StyledTableCell align="center">
															{item.tanggal}
														</StyledTableCell>
														{_dataRow?.information?.length > 0 ? (
															<>
																<StyledTableCell align="center">
																	{_dataRow?.information?.map((info, i) => {
																		return (
																			<Box sx={{ mb: 1 }}>
																				<Typography12
																					title={
																						info?.vehicleNumber?.numberLrv +
																						' - ' +
																						info?.kaService
																					}
																				/>
																			</Box>
																		);
																	})}
																</StyledTableCell>
																<StyledTableCell align="center">
																	{item?.status?.map(info => {
																		return (
																			<Box
																				sx={{
																					display: 'flex',
																					justifyContent: 'center',
																					mb: 1,
																				}}
																			>
																				<CustomStatus
																					statusStyles={getStatusStyles(info)}
																					status={info}
																				/>
																			</Box>
																		);
																	})}
																</StyledTableCell>
															</>
														) : (
															<>
																<StyledTableCell align="center">
																	{item.keterangan}
																</StyledTableCell>
																<StyledTableCell align="center">
																	<Box
																		sx={{
																			display: 'flex',
																			justifyContent: 'center',
																		}}
																	>
																		<CustomStatus
																			statusStyles={getStatusStyles(
																				item?.status
																			)}
																			status={item?.status}
																		/>
																	</Box>
																</StyledTableCell>
															</>
														)}

														<StyledTableCell align="center">
															{userProfile?.officerPosition === 'Penyelia' && (
																<Tooltip title="Tambah">
																	<IconButton
																		color="primary"
																		onClick={() => handleAdd(item)}
																	>
																		<AddCircleIcon />
																	</IconButton>
																</Tooltip>
															)}
															{_dataRow?.information?.length > 0 ? (
																<Tooltip title="Detail">
																	<IconButton
																		color="primary"
																		onClick={() => handleDialogData(item)}
																	>
																		<RemoveRedEyeIcon />
																	</IconButton>
																</Tooltip>
															) : null}
														</StyledTableCell>
													</StyledTableRow>
												);
											})}
										</>
									}
								/>
							</Grid>
						) : (
							<>
								<Alert
									variant="filled"
									severity="warning"
									sx={{ width: '80%', mt: 3 }}
								>
									Data Kosong
								</Alert>
							</>
						)}
					</Grid>
				</LocalizationProvider>

				{/* Dialog Pilih Data */}
				<Dialog fullWidth maxWidth="xs" open={dialogData} onClose={handleClose}>
					<Stack
						direction="column"
						spacing={2}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							padding: '30px 20px',
						}}
					>
						<AppTextField
							fullWidth
							size="small"
							label="Pilih LRV"
							select
							sx={{ mt: '0px' }}
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							value={formLrv}
							onChange={e => setFormLrv(e.target.value)}
						>
							<option value=""></option>
							{rowData?.information?.map(item => {
								return (
									<option value={item?.vehicleNumber?._id}>
										{item?.vehicleNumber?.numberLrv}
									</option>
								);
							})}
						</AppTextField>
						<Button
							variant="contained"
							sx={{ width: '100%' }}
							onClick={handleViewData}
						>
							Submit
						</Button>
					</Stack>
				</Dialog>
			</Container>
		</Box>
	);
}

export default List;
