import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography16 from 'Component/Typography/Typography16';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';

import CustomRow from './CustomRow';

function View() {
	const location = useLocation();
	const { dataRow } = location.state;
	const history = useHistory();

	const dataHeader = ['Sistem', 'Area', 'Hasil Pemeriksaan', 'Keterangan'];

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Monitoring SCADA"
							sub1="Home -"
							sub2="Operasional -"
							sub3="View Monitoring SCADA"
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography16
							title={
								'Tanggal :' + ' ' + moment(dataRow?.date).format('DD-MM-YYYY')
							}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{dataRow?.railWest.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={item?.results}
												value4={item?.note ? item?.note : '-'}
											/>
										);
									})}

									{dataRow?.railEast.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={item?.results}
												value4={item?.note ? item?.note : '-'}
											/>
										);
									})}

									{dataRow?.railDepo.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={item?.results}
												value4={item?.note ? item?.note : '-'}
											/>
										);
									})}

									{dataRow?.rtu.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={item?.results}
												value4={item?.note ? item?.note : '-'}
											/>
										);
									})}

									{dataRow?.mbs.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={item?.results}
												value4={item?.note ? item?.note : '-'}
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
