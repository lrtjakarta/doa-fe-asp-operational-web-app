import React, { useContext, useEffect, useState, useRef } from 'react';

import {
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	styled,
	TableRow,
	Typography,
	Alert,
	Stack,
	Dialog,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from './component/CustomHeaderTable';

import ApiOperational from 'Services/ApiOperational';
import { NoGoItemContext } from 'Context';
import BoxStatus from 'Component/BoxStatus/BoxStatus';

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
	const componentRef = useRef();

	// context
	const { listNoGoItem, getDataNoGoItem } = useContext(NoGoItemContext);

	// state
	const [dataHeader, setDataHeader] = useState([
		'No',
		'Tanggal',
		'Dinasan',
		'Jam Dinasan',
		'Lokasi',
		'Status',
		'Aksi',
	]);
	const [date, setDate] = useState(new Date());
	const [allData, setAllData] = useState([]);

	const [dialogPrint, setDialogPrint] = useState(false);
	const [rowData, setRowData] = useState(null);

	const handleFilterMonth = e => {
		setDate(e.target.value);
	};

	const handleSearch = async () => {
		const filter = {
			searchDate: new Date(date),
		};

		const respon = await ApiOperational.getNoGoItem({ params: filter });
		// // console.log('respon.data,', respon.data,)

		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleView = row => {
		history.push('/app/operational/logbook/nogoitem/detail', {
			state: { dataRow: row },
		});
	};

	const handleOpenPrint = row => {
		setDialogPrint(true);
		setRowData(row?.dataRow);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
	});

	useEffect(() => {
		getDataNoGoItem({ searchDate: new Date() });
	}, []);

	useEffect(() => {
		setAllData(
			listNoGoItem.sort((a, b) => new Date(b.date) - new Date(a.date))
		);
		const today = new Date().toISOString().split('T')[0];
		setDate(today);
	}, [listNoGoItem]);

	//   console.log('listNoGoItem', listNoGoItem)

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Logbook No Go Item"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Logbook No Go Item"
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
							type="date"
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
						<Grid item xs={12} sm={12}>
							<CustomHeaderTable
								dataHeader={dataHeader}
								dataBody={
									<>
										{allData.map((item, index) => {
											const _listData = item?.informationService;
											return (
												<StyledTableRow>
													<StyledTableCell>{index + 1}</StyledTableCell>
													<StyledTableCell>
														{moment(item.date).format('DD/MM/YYYY')}
													</StyledTableCell>
													<StyledTableCell>{_listData?.code}</StyledTableCell>
													<StyledTableCell>
														{_listData?.start + ' - ' + _listData?.end}
													</StyledTableCell>
													<StyledTableCell>
														{item?.station?.name}
													</StyledTableCell>
													<StyledTableCell>
														<BoxStatus title={item.status} />
													</StyledTableCell>
													<StyledTableCell>
														<Stack direction="row" spacing={1}>
															<Button
																variant="outlined"
																onClick={() => handleView(item)}
															>
																Detail
															</Button>
														</Stack>
													</StyledTableCell>
												</StyledTableRow>
											);
										})}
									</>
								}
							/>
						</Grid>
					) : (
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Alert sx={{ width: '100%' }} ariant="filled" severity="error">
								List Go No Go Item Kosong
							</Alert>
						</Grid>
					)}
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
