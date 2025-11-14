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
import { useNavigate, useLocation } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
import CustomNewTable from 'Component/CustomTable/CustomNewTableDetail';
import ColumnShapeCpaView from './column-shape-cpa-view';

function View() {
	const location = useLocation();
	const { dataRow } = location.state;

	// const sortedLoops = dataRow?.loops.sort((a, b) =>
	// 	a.loop.localeCompare(b.loops)
	// );

	// console.log('data id', dataRow);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Checklist Pemberangkatan Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="View Pemberangkatan Awal"
						/>
					</Grid>
					<Grid item xs={4} sm={2}>
						<Typography14 title="Tanggal" />
					</Grid>
					<Grid item xs={8} sm={10}>
						<Typography14
							title={':' + ' ' + moment(dataRow?.date).format('DD-MM-YYYY')}
							fontWeight={700}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<CustomNewTable
							data={dataRow?.loops}
							columnShape={ColumnShapeCpaView()}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default View;
