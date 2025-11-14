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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useReactToPrint } from 'react-to-print';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';
import Typography12 from 'Component/Typography/Typography12';

import CustomNewTableList from 'Component/CustomTable/CustomNewTable';
import ColumnShapeWscList from './column-shape-wsc-list';

import ApiOperational from 'Services/ApiOperational';
import { WscContext } from 'Context';
import Typography16 from 'Component/Typography/Typography16';

function List() {
	const componentRef = useRef();
	const history = useHistory();

	// context
	const { listWsc, getDataWsc } = useContext(WscContext);

	// state
	const [allData, setAllData] = useState([]);
	const [searchDate, setSearchDate] = useState('');

	const [dialogPrint, setDialogPrint] = useState(false);
	const [rowData, setRowData] = useState(null);

	const handleAddForm = () => {
		const row = null;
		history.push(`/app/operational/wsc/form/Add/${0}`);
	};

	const handleEditForm = row => {
		history.push(`/app/operational/wsc/form/Edit/${row._id}`);
	};

	const handleSearch = async () => {
		const filterData = {
			searchDate: moment(searchDate).format('YYYY-MM-DD'),
		};
		const respon = await ApiOperational.getWsc({
			params: filterData,
		});
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleView = row => {
		history.push('/app/operational/wsc/view', { dataRow: row });
	};

	useEffect(() => {
		const filterData = {
			searchDate: moment(new Date()).format('YYYY-MM-DD'),
		};
		const today = moment(new Date()).format('YYYY-MM-DD');
		setSearchDate(today);
		getDataWsc(filterData);
	}, []);

	useEffect(() => {
		setAllData(listWsc);
	}, [listWsc]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Form Pengoperasian WSC"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Pengoperasian WSC"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={4}>
								<TextField
									fullWidth
									label="Tanggal"
									InputLabelProps={{
										shrink: true, // Membuat label tetap di atas
										style: { fontSize: 12 }, // Mengatur ukuran font label
									}}
									InputProps={{
										style: {
											fontSize: 12,
											height: 35.5,
										},
									}}
									type="date"
									value={searchDate}
									onChange={e => setSearchDate(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<Button
									variant="contained"
									onClick={handleSearch}
									sx={{ width: { xs: '100%' } }}
								>
									Cari
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid
							container
							spacing={1}
							sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
						>
							{/* <Grid item xs={12} sm={2.5}>
								<Button
									variant="contained"
									onClick={handleAddForm}
									sx={{ width: { xs: '100%' } }}
								>
									Tambah
								</Button>
							</Grid> */}
							{/* <Grid item xs={12} sm={2.5}>
								<Button
									variant="outlined"
									onClick={handleOpenPrint}
									sx={{ width: { xs: '100%' } }}
								>
									Cetak
								</Button>
							</Grid> */}
						</Grid>
					</Grid>

					{allData.length > 0 ? (
						<Grid item xs={12} sm={12}>
							<CustomNewTableList
								data={allData}
								columnShape={ColumnShapeWscList({
									onEdit: handleEditForm,
									onView: handleView,
								})}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
						>
							<Typography16 title="Data Kosong" fontWeight={700} />
						</Grid>
					)}
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
