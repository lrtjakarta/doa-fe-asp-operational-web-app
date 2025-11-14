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
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import BodyView from './BodyView';

function View() {
	const location = useLocation();
	const { dataRow } = location.state;
	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Operasional Harian"
							sub1="Home -"
							sub2="Operasional -"
							sub3="View Operasional Harian"
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<BodyView dataId={dataRow} />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default View;
