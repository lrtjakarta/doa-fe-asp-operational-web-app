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
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';

import CustomHeader from './CustomHeader';
import CustomRow from './CustomRow';

import DataKesiapan from './Data';

import ApiOperational from 'Services/ApiOperational';
import { UserProfilContext } from 'Context';

function Form() {
	const history = useHistory();
	const location = useLocation();
	const { type, dataRow } = location.state;

	// console.log('location.state', location.state);

	// context
	const { userProfile } = useContext(UserProfilContext);

	const getTodayDate = data => {
		const today = data ? data : new Date();
		return today.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
	};

	//state
	const [dataKesiapan, setDataKesiapan] = useState([]);
	const [formDate, setFormDate] = useState(getTodayDate());
	const [formTim, setFormTim] = useState('');

	// handle
	const resetForm = () => {
		setFormDate(getTodayDate());
		setFormTim('');
		setDataKesiapan(DataKesiapan);
	};

	const handleChange = (index, field, value) => {
		const newData = [...dataKesiapan];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};

		setDataKesiapan(newData);
		// console.log('perubahan data', newData);
	};

	const handleSubmit = async () => {
		let _create;
		let _createUpdate;
		if (type === 'Edit') {
			_create = dataRow?.createBy;
			_createUpdate = {
				name: userProfile?.officerName,
				jobRole: userProfile?.officerPosition,
				departement: userProfile?.officerDepartemen,
				idNumber: userProfile?.officerNumber,
				id: userProfile?.officerId,
			};
		} else {
			_create = {
				name: userProfile?.officerName,
				jobRole: userProfile?.officerPosition,
				departement: userProfile?.officerDepartemen,
				idNumber: userProfile?.officerNumber,
				id: userProfile?.officerId,
			};
			_createUpdate = null;
		}

		const postData = {
			date: moment(formDate).format('YYYY-MM-DD'), // tanggal
			timName: formTim,
			trafficReadiness: dataKesiapan, // list kesiapan lintas
			createBy: _create,
			createUpdate: _createUpdate,
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updateTraffic(dataRow._id, postData);
			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				// setOpenNotif(true);
				resetForm();
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postTraffic(postData);

			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				resetForm();
				history.goBack();
			}
		}
	};

	const getById = () => {
		setFormDate(getTodayDate(new Date(dataRow?.date)));
		setFormTim(dataRow?.timName);
		setDataKesiapan(dataRow?.trafficReadiness);
	};

	// useEffect
	useEffect(() => {
		if (type === 'Edit') {
			getById();
		} else {
			setDataKesiapan(DataKesiapan);
		}
	}, []);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Kesiapan Lintas Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Kesiapan Lintas Awal"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
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
							value={formDate}
							onChange={e => setFormDate(e.target.value)}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={4}>
						<AppTextField
							size="small"
							fullWidth
							label="Nama Dispatcher"
							sx={{ mt: '0px' }}
							value={formDispatcher}
							onChange={e => setFormDispatcher(e.target.value)}
						/>
					</Grid> */}
					<Grid item xs={12} sm={3}>
						<AppTextField
							size="small"
							fullWidth
							label="Nama Tim Jalbang"
							sx={{ mt: '0px' }}
							value={formTim}
							onChange={e => setFormTim(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CustomHeader
							dataBody={
								<>
									{dataKesiapan.map((item, index) => {
										return (
											<CustomRow
												key={index}
												value1={index + 1}
												value2={item.items}
												valueRF={item?.functionResult}
												onChangeRF={e =>
													handleChange(index, 'functionResult', e.target.value)
												}
												valueRA={item?.obstacleResult}
												onChangeRA={e =>
													handleChange(index, 'obstacleResult', e.target.value)
												}
												valueNF={item?.functionNote}
												onChangeNF={e =>
													handleChange(index, 'functionNote', e.target.value)
												}
												valueNA={item?.obstacleNote}
												onChangeNA={e =>
													handleChange(index, 'obstacleNote', e.target.value)
												}
											/>
										);
									})}
								</>
							}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{
							mt: 2,
							mb: 7,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button variant="contained" onClick={handleSubmit}>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Form;
