import React from 'react';
import { Box, Grid, Container, Button } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import BodyPrint from './component/BodyPrint';

import ApiOperational from 'Services/ApiOperational';

function View() {
	const history = useHistory();
	const location = useLocation();
	const { dataRow, userData } = location.state;

	// console.log(dataRow)

	const handleApprove = async () => {
		let _masinis;
		let _dispatcher;
		if (userData?.officerPosition === 'Masinis') {
			_masinis = {
				officerId: userData?.officerId,
				officerName: userData?.officerName,
				officerIdPosisition: userData?.officerIdPosition,
				officerPosisition: userData?.officerPosition,
				officerNumber: userData?.officerNumber,
				createdDate: new Date(),
			};
		} else if (userData?.officerPosition === 'Dispatcher') {
			_dispatcher = {
				officerId: userData?.officerId,
				officerName: userData?.officerName,
				officerIdPosisition: userData?.officerIdPosition,
				officerPosisition: userData?.officerPosition,
				officerNumber: userData?.officerNumber,
				createdDate: new Date(),
			};
		}

		const postData = {
			...dataRow,
			masinis: _masinis, // id, name, jabatan, createdTime
			dispatcher: _dispatcher,
		};

		const respon = await ApiOperational.updateEmergency5(
			dataRow?._id,
			postData
		);
		// console.log("respon", respon);
		if (respon.statusText === 'OK') {
			history.goBack(); // Mengirim respon ke parent (List)
		}
	};

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<HeaderV1
							title="Emergency"
							sub1="Home -"
							sub2="Operasional -"
							sub3="View Emergency 5"
						/>
					</Grid>
					<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
						<BodyPrint dataId={dataRow} />
					</Grid>
					{(dataRow?.createdBy?.officerPosition !== userData?.officerPosition &&
						dataRow?.masinis === null) ||
					(dataRow?.createdBy?.officerPosition !== userData?.officerPosition &&
						dataRow?.dispatcher === null) ? (
						<>
							<Grid
								item
								xs={12}
								sm={12}
								sx={{
									mt: 2,
									display: 'flex',
									justifyContent: 'flex-end',
									gap: 1,
								}}
							>
								<Button
									variant="outlined"
									color="error"
									onClick={() => history.goBack()}
								>
									Kembali
								</Button>
								<Button variant="contained" onClick={handleApprove}>
									Konfirmasi
								</Button>
							</Grid>
						</>
					) : null}
				</Grid>
			</Container>
		</Box>
	);
}

export default View;
