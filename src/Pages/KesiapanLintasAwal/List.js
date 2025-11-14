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
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomNewTableList from 'Component/CustomTable/CustomNewTable';

import ColumnShapeTrafficList from './column-shape-traffic-list';

import ApiOperational from 'Services/ApiOperational';
import { TrafficReadinessContext } from 'Context';

function List() {
	const history = useHistory();

	// context
	const { listTrafficReadiness, getDataTrafficReadiness } = useContext(
		TrafficReadinessContext
	);

	// state
	const [searchDate, setSearchDate] = useState(false);
	const [allData, setAllData] = useState([]);

	// handle
	const handleAdd = () => {
		const row = null;
		history.push('/app/operational/kesiapanLintas/form', {
			state: { type: 'Add', dataRow: row },
		});
	};

	const handleSearch = async () => {
		const filterData = {
			searchDate: moment(searchDate).format('YYYY-MM-DD'),
		};
		const respon = await ApiOperational.getTraffic({
			params: filterData,
		});
		if (respon.statusText === 'OK') {
			setAllData(respon.data);
		}
	};

	const handleEdit = row => {
		history.push('/app/operational/kesiapanLintas/form', {
			type: 'Edit',
			dataRow: row,
		});
	};

	const handleView = row => {
		history.push('/app/operational/kesiapanLintas/view', { dataRow: row });
	};

	// useEffect
	useEffect(() => {
		getDataTrafficReadiness();
	}, []);

	useEffect(() => {
		setAllData(listTrafficReadiness);
	}, [listTrafficReadiness]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Kesiapan Lintas Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="List Kesiapan Lintas Awal"
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
								columnShape={ColumnShapeTrafficList({
									onEdit: handleEdit,
									onView: handleView,
								})}
							/>
						</Grid>
					) : (
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Alert sx={{ width: '100%' }} ariant="filled" severity="error">
								Kesiapan Lintas Awal Kosong
							</Alert>
						</Grid>
					)}
				</Grid>
			</Container>
		</Box>
	);
}

export default List;
