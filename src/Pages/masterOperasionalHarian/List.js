import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomNewTableList from 'Component/CustomTable/CustomNewTable';
import ColumnShapeMasterOH from './column-shape-wsc-list';

import { MasterDailyOperationContext } from 'Context';

function List() {
	const history = useHistory();

	// context
	const { listMasterDailyOperation, getMasterDailyOperation } = useContext(
		MasterDailyOperationContext
	);

	// state
	const [allData, setAllData] = useState([]);

	// handle
	const handleAddForm = () => {
		const row = null;
		history.push('/app/operational/masterOperations/form', {
			type: 'Add',
			dataRow: row,
		});
	};

	const handleEdit = row => {
		history.push('/app/operational/masterOperations/form', {
			type: 'Edit',
			dataRow: row,
		});
	};

	useEffect(() => {
		getMasterDailyOperation();
	}, []);

	useEffect(() => {
		setAllData(listMasterDailyOperation);
	}, [listMasterDailyOperation]);

	console.log(listMasterDailyOperation);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="Master Data Operasional Harian"
						sub1="Home -"
						sub2="Operasional -"
						sub3="List Master Data Operasional Harian"
					/>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
				>
					<Button variant="contained" onClick={handleAddForm}>
						Tambah
					</Button>
				</Grid>

				{allData.length > 0 ? (
					<Grid item xs={12} sm={12}>
						<CustomNewTableList
							data={allData}
							columnShape={ColumnShapeMasterOH({
								onEdit: handleEdit,
							})}
						/>
					</Grid>
				) : null}
			</Grid>
		</Box>
	);
}

export default List;
