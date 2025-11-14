import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	TableRow,
	TextField,
	styled,
	Alert,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';
import CustomNewTableList from 'Component/CustomTable/CustomNewTable';

import ApiOperational from 'Services/ApiOperational';
import { ChecklistPAwalContext } from 'Context';
import ColumnShapeCpaList from './column-shape-cpa-list';

function List() {
	const history = useHistory();

	// context
	const { listChecklistPAwal, getDataChecklistPAwal } = useContext(
		ChecklistPAwalContext
	);

	// state
	const [allData, setAllData] = useState([]);
	const [searchDate, setSearchDate] = useState();

	const handleSearch = async () => {
		const filterData = {
			searchDate: moment(searchDate).format('YYYY-MM-DD'),
		};
		const respon = await ApiOperational.getPemberangkatanAwal({
			params: filterData,
		});
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleAdd = () => {
		const row = null;
		history.push('/app/operational/pemberangkatanAwal/form', {
			state: { type: 'Add', dataRow: row },
		});
	};

	const handleEdit = row => {
		history.push('/app/operational/pemberangkatanAwal/form', {
			state: { type: 'Edit', dataRow: row },
		});
	};

	const handleView = row => {
		history.push('/app/operational/pemberangkatanAwal/view', { dataRow: row });
	};

	useEffect(() => {
		getDataChecklistPAwal();
	}, []);

	useEffect(() => {
		setAllData(listChecklistPAwal);
	}, [listChecklistPAwal]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Checklist Pemberangkatan Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="List Pemberangkatan Awal"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={1}>
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
						<Button variant="contained" onClick={handleAdd}>
							Tambah
						</Button>
					</Grid>

					{allData.length > 0 ? (
						<Grid item xs={12} sm={12}>
							<CustomNewTableList
								data={allData}
								columnShape={ColumnShapeCpaList({
									onEdit: handleEdit,
									onView: handleView,
								})}
							/>
						</Grid>
					) : (
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Alert sx={{ width: '100%' }} ariant="filled" severity="error">
								Checklist Pemberangkatan Awal Kosong
							</Alert>
						</Grid>
					)}
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
