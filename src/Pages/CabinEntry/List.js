import {
	Box,
	Card,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Grid,
	Tooltip,
	IconButton,
	TableBody,
	Typography,
	TablePagination,
	Paper,
} from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import useStyles, {
	tableCellStyle,
	tableCellStyleRight,
	tableCellStyleLeft,
} from './Styles';

import { CabinEntryContext } from 'Context';

import React, { useContext, useEffect } from 'react';
import moment from 'moment';

function List() {
	const classes = useStyles();
	const history = useHistory();

	// context
	const { listCabinEntry, getDataCabinEntry } = useContext(CabinEntryContext);

	//   state
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const getStatusStyles = status => {
		switch (status) {
			case 'Ditolak':
				return { backgroundColor: '#FFF5F8', color: '#F1416C' };
			case 'Diajukan':
				return { backgroundColor: '#FFF8DD', color: '#F6C000' };
			case 'Disetujui':
				return { backgroundColor: '#EEF6FF', color: '#3E97FF' };
			case 'Konfirmasi':
				return { backgroundColor: '#E8FFF3', color: '#50CD89' };
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};

	const handleView = row => {
		history.push('/app/operational/cabinentry/detail', {
			state: { dataRow: row },
		});
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	//   useEffect
	useEffect(() => {
		getDataCabinEntry();
	}, []);

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
				<Grid item xs={12} sm={12}>
					<Card
						sx={{
							minWidth: 275,
							bgcolor: '#f6f7ff',
							boxShadow: 'none',
							border: 'none',
						}}
					>
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
											<p>Kepentingan</p>
										</TableCell>
										<TableCell sx={tableCellStyle} align="center">
											<p>Tanggal</p>
										</TableCell>
										<TableCell sx={tableCellStyle} align="center">
											<p>Waktu</p>
										</TableCell>
										<TableCell sx={tableCellStyle} align="center">
											<p>Pemohon</p>
										</TableCell>
										<TableCell sx={tableCellStyle} align="center">
											<p>Penangung Jawab</p>
										</TableCell>
										<TableCell sx={tableCellStyle} align="center">
											<p>Status</p>
										</TableCell>
										<TableCell
											sx={tableCellStyleRight}
											align="center"
											style={{ width: 100 }}
										>
											<p>Aksi</p>
										</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{listCabinEntry.length > 0 && (
										<>
											{listCabinEntry.map((item, index) => {
												const _start = moment(item.startDate).format(
													'DD/MM/YYYY'
												);
												const _end = moment(item.endDate).format('DD/MM/YYYY');
												const statusStyles = getStatusStyles(item.status);
												return (
													<TableRow
														sx={{
															'&:last-child td, &:last-child th': { border: 0 },
															bgcolor: '#fff',
															pt: '10px',
														}}
													>
														<TableCell align="center">
															<Typography>{index + 1}</Typography>
														</TableCell>
														<TableCell align="center">
															<Typography noWrap={true}>
																{item.priority}
															</Typography>
														</TableCell>
														<TableCell align="center">
															<Typography>{_start + ' - ' + _end}</Typography>
														</TableCell>
														<TableCell align="center">
															<Typography>{item?.time}</Typography>
														</TableCell>
														<TableCell align="center">
															<Typography>
																{item.requester?.officerName}
															</Typography>
															<Typography sx={{ color: 'gray' }}>
																{item.requester?.officerPhoneNumber}
															</Typography>
														</TableCell>
														<TableCell align="center">
															<Typography>
																<Typography>
																	{item.responsiblePerson?.officerName}
																</Typography>
																<Typography sx={{ color: 'gray' }}>
																	{item.responsiblePerson?.officerPhoneNumber}
																</Typography>
															</Typography>
														</TableCell>
														<TableCell align="center">
															<Box
																sx={{
																	display: 'flex',
																	justifyContent: 'center',
																	alignItems: 'center',
																	backgroundColor: statusStyles
																		? statusStyles.backgroundColor
																		: 'transparent',
																	height: '35px',
																	borderRadius: '8px',
																}}
															>
																<Typography
																	sx={{
																		fontSize: 13,
																		fontWeight: 400,
																		color: statusStyles
																			? statusStyles.color
																			: 'black',
																	}}
																>
																	{item.status}
																</Typography>
															</Box>
														</TableCell>
														<TableCell align="center">
															<Box>
																<Tooltip title="View">
																	<IconButton
																		size="small"
																		onClick={() => handleView(item)}
																	>
																		<ArticleOutlinedIcon
																			sx={{ color: '#3E97FF' }}
																		/>
																	</IconButton>
																</Tooltip>
															</Box>
														</TableCell>
													</TableRow>
												);
											})}
										</>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={listCabinEntry.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}

export default List;
