import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Box,
	Container,
	Grid,
	IconButton,
	Button,
	TextField,
	InputAdornment,
	styled,
	TableRow,
	Alert,
	Typography,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';

import ApiOperational from 'Services/ApiOperational';
import { DailyOperationContext } from 'Context/DailyOperations';

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
	},
}));

function List() {
	const history = useHistory();

	// context
	const { listDailyOperation, getDataDailyOperation } = useContext(
		DailyOperationContext
	);

	// state
	const [allData, setAllData] = useState([]);
	const [searchDate, setSearchDate] = useState('');

	const dataHeader = [
		'No',
		'Tanggal',
		'Periode Window Time',
		'Informasi',
		'Aksi',
	];

	const handleSearch = async () => {
		const filterData = {
			searchDate: moment(searchDate).format('YYYY-MM-DD'),
			limit: 'all',
		};
		const respon = await ApiOperational.getDailyOperations({
			params: filterData,
		});
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleForm = () => {
		history.push('/app/operational/dailyOperations/form', {
			state: { dataRow: null, type: 'Add' },
		});
	};

	const handleEdit = row => {
		history.push('/app/operational/dailyOperations/form', {
			dataRow: row,
			type: 'Edit',
		});
	};

	const handleView = row => {
		history.push('/app/operational/dailyOperations/view', {
			dataRow: row,
		});
	};

	// useEffect
	useEffect(() => {
		getDataDailyOperation();
	}, []);

	useEffect(() => {
		setAllData(listDailyOperation);
	}, [listDailyOperation]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Operasional Harian"
							sub1="Home -"
							sub2="Operasional -"
							sub3="List Operasional Harian"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
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
									type="date"
									value={searchDate}
									onChange={e => setSearchDate(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<Button variant="contained" onClick={handleSearch}>
									Cari
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Button variant="contained" onClick={handleForm}>
							Tambah
						</Button>
					</Grid>

					<Grid item xs={12} sm={12}>
						{allData.length > 0 ? (
							<CustomHeaderTable
								dataHeader={dataHeader}
								dataBody={
									<>
										{allData.map((item, i) => {
											const truncateText = (text, wordLimit) => {
												const words = text.split(' ');
												return words.length > wordLimit
													? words.slice(0, wordLimit).join(' ') + '...'
													: text;
											};
											return (
												<StyledTableRow>
													<StyledTableCell>{i + 1}</StyledTableCell>
													<StyledTableCell>
														{moment(item.date).format('DD-MM-YYYY')}
													</StyledTableCell>
													<StyledTableCell>
														{item.startTime + ' - ' + item.endTime}
													</StyledTableCell>
													<StyledTableCell>
														<Typography
															sx={{ m: '0px 0', fontSize: 14 }}
															dangerouslySetInnerHTML={{
																__html: truncateText(
																	item?.information?.information,
																	20
																),
															}}
														/>
													</StyledTableCell>

													<StyledTableCell>
														<IconButton
															// edge="end"
															size="small"
															aria-label="edit"
															sx={{ color: '#3E97FF' }}
															onClick={() => handleEdit(item)}
														>
															<EditIcon />
														</IconButton>
														<IconButton
															size="small"
															aria-label="edit"
															sx={{ color: '#3E97FF' }}
															onClick={() => handleView(item)}
														>
															<ArticleOutlinedIcon />
														</IconButton>
													</StyledTableCell>
												</StyledTableRow>
											);
										})}
									</>
								}
							/>
						) : (
							<Box sx={{ mt: 3 }}>
								<Alert variant="filled" severity="warning">
									Data Kosong
								</Alert>
							</Box>
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
