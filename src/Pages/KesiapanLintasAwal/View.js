import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography14 from 'Component/Typography/Typography14';

import CustomHeader from './CustomHeader';
import CustomRowView from './CustomRowView';

function View() {
	const location = useLocation();
	const { dataRow } = location.state;

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Kesiapan Lintas Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="View Kesiapan Lintas Awal"
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
					<Grid item xs={4} sm={2}>
						<Typography14 title="Nama Dispatcher" />
					</Grid>
					<Grid item xs={8} sm={9}>
						<Typography14
							title={':' + ' ' + dataRow?.createBy?.name}
							fontWeight={700}
						/>
					</Grid>
					<Grid item xs={4} sm={2}>
						<Typography14 title="Nama Tim Jalbang" />
					</Grid>
					<Grid item xs={8} sm={9}>
						<Typography14
							title={':' + ' ' + dataRow?.timName}
							fontWeight={700}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CustomHeader
							dataBody={
								<>
									{dataRow?.trafficReadiness.map((item, index) => {
										return (
											<CustomRowView
												value1={index + 1}
												value2={item?.items}
												value31={item?.functionResult}
												value32={item?.obstacleResult}
												value41={item?.functionNote ? item?.functionNote : '-'}
												value42={item?.obstacleNote ? item?.obstacleNote : '-'}
											/>
										);
									})}
								</>
							}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default View;
