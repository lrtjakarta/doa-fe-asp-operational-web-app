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
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomNewTableList from 'Component/CustomTable/CustomNewTable';

import ApiOperational from 'Services/ApiOperational';
import { MonitoringScadaContext } from 'Context';
import ColumnShapeScadaList from './column-shape-scada-list';

function List() {
	const history = useHistory();

	// context
	const { listMonitoringScada, getDataMonitoringScada } = useContext(
		MonitoringScadaContext
	);

	// state
	const [allData, setAllData] = useState([]);
	const [searchDate, setSearchDate] = useState('');

	const handleSearch = async () => {
		const filterData = {
			searchDate: moment(searchDate).format('YYYY-MM-DD'),
		};
		const respon = await ApiOperational.getMonitoringScada({
			params: filterData,
		});
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleAddForm = () => {
		const row = null;
		history.push('/app/operational/monitoringScada/form', {
			type: 'Add',
			dataRow: row,
		});
	};

	const handleEdit = row => {
		history.push('/app/operational/monitoringScada/form', {
			type: 'Edit',
			dataRow: row,
		});
	};

	const handleView = row => {
		history.push('/app/operational/monitoringScada/view', {
			dataRow: row,
		});
	};

	useEffect(() => {
		getDataMonitoringScada();
	}, []);

	useEffect(() => {
		setAllData(listMonitoringScada);
	}, [listMonitoringScada]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Monitoring SCADA"
							sub1="Home -"
							sub2="Operasional -"
							sub3="List Monitoring SCADA"
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
					<Grid
						item
						xs={12}
						sm={6}
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Button
							variant="contained"
							onClick={handleAddForm}
							sx={{ width: { xs: '100%', sm: '15%' } }}
						>
							Tambah
						</Button>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CustomNewTableList
							data={allData}
							columnShape={ColumnShapeScadaList({
								onEdit: handleEdit,
								onView: handleView,
							})}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
