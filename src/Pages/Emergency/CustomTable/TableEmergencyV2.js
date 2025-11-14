import React from 'react';
import {
	Box,
	TableContainer,
	Table,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Tooltip,
	IconButton,
	TablePagination,
	Grid,
	Button,
} from '@mui/material';
import moment from 'moment';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import Typography18 from 'Component/Typography/Typography18';

import useStyles, { tableCellStyle, tableCellStyleRight } from '../Styles';

function TableEmergencyV2(props) {
	const {
		allData,
		userProfile,
		handleForm,
		handleView,
		handleOpenPrint,
		handleEdit,
		handleDelete,
	} = props;

	// state
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// handle
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Grid container>
			<Grid
				item
				xs={12}
				sm={12}
				sx={{ display: 'flex', justifyContent: 'flex-end' }}
			>
				<Button variant="contained" onClick={handleForm}>
					Tambah
				</Button>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TableContainer>
					<Table
						sx={{
							minWidth: 650,
							borderCollapse: 'separate',
							borderSpacing: '0px 10px',
							borderRadius: 3,
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
								<TableCell sx={tableCellStyle} align="center">
									<p>Waktu</p>
								</TableCell>

								<TableCell sx={tableCellStyle} align="center">
									<p>No. KA</p>
								</TableCell>
								<TableCell sx={tableCellStyle} align="center">
									<p>Masinis</p>
								</TableCell>
								<TableCell sx={tableCellStyle} align="center">
									<p>Dispatcher</p>
								</TableCell>
								<TableCell
									sx={tableCellStyleRight}
									align="center"
									style={{ width: 200 }}
								>
									<p>Aksi</p>
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{allData.length > 0 ? (
								<>
									{allData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(item => {
											return (
												<TableRow>
													<TableCell align="center">
														{moment(item.date).format('DD/MM/YYYY') +
															',' +
															item.time}
													</TableCell>

													<TableCell align="center">
														{item.trainNumber}
													</TableCell>
													<TableCell align="center">
														{item?.masinis ? (
															<>{item?.masinis?.officerName}</>
														) : (
															'-'
														)}
													</TableCell>
													<TableCell align="center">
														{item?.dispatcher ? (
															<>{item?.dispatcher?.officerName}</>
														) : (
															'-'
														)}
													</TableCell>

													<TableCell align="center">
														<Tooltip title="View">
															<IconButton
																size="small"
																onClick={() => handleView(item, userProfile)}
															>
																<AssignmentOutlinedIcon
																	sx={{ color: '#3E97FF' }}
																/>
															</IconButton>
														</Tooltip>

														<Tooltip title="Print">
															<IconButton
																size="small"
																onClick={() => handleOpenPrint(item)}
															>
																<PrintOutlinedIcon sx={{ color: '#3E97FF' }} />
															</IconButton>
														</Tooltip>
														<Tooltip title="Edit">
															<IconButton
																size="small"
																onClick={() => handleEdit(item)}
																disabled={
																	item?.createdBy?.officerPosition !==
																		userProfile?.officerPosition ||
																	(item?.masinis && item?.dispatcher)
																		? true
																		: false
																}
															>
																<EditOutlinedIcon
																	sx={{
																		color:
																			item?.createdBy?.officerPosition !==
																				userProfile?.officerPosition ||
																			(item?.masinis && item?.dispatcher)
																				? 'gray'
																				: '#3E97FF',
																	}}
																/>
															</IconButton>
														</Tooltip>

														<Tooltip title="Delete">
															<IconButton
																size="small"
																onClick={() => handleDelete(item)}
															>
																<DeleteOutlineOutlinedIcon
																	sx={{
																		color: '#F1416C',
																	}}
																/>
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
											);
										})}
								</>
							) : (
								<TableRow>
									<TableCell align="center" colSpan={7}>
										<Typography18 title="Data Kosong" />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={allData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Grid>
		</Grid>
	);
}

export default TableEmergencyV2;
