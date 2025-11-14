import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Grid,
	TextField,
	Container,
	IconButton,
	Button,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';

import './DataTable.css';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';
import QuillEditor from './component/QuillEditor';

import getCurrentTime from 'Utils/SetTime';
import getCurrentDate from 'Utils/SetDate';

import { MasterEmergencyContext } from 'Context/MasterEmergency';
import { UserProfilContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';
import Typography14 from 'Component/Typography/Typography14';

function Form() {
	const history = useHistory();
	const location = useLocation();
	const { dataRow, type } = location.state.state;

	// context
	const { listMasterEmergency, getMasterEmergency } = useContext(
		MasterEmergencyContext
	);
	const { userProfile } = useContext(UserProfilContext);

	// state
	const [formInfo1, setFormInfo1] = useState(null);
	const [formFooter, setFormFooter] = useState(null);

	const [formDate, setFormDate] = useState(getCurrentDate());
	const [formTime, setFormTime] = useState(getCurrentTime());
	const [formTrack, setFormTrack] = useState('');
	const [formTrain, setFormTrain] = useState('');

	// handle
	const handleChange = (type, value) => {
		if (type === 'info1') {
			setFormInfo1({
				idNumber: 1,
				title: 'Emergency 8',
				information: value,
			});
		}
	};

	const resetForm = () => {
		setFormDate('');
		setFormTime('');
		setFormTrack('');
		setFormTrain('');
	};

	const handleSubmit = async () => {
		let _masinis;
		let _dispatcher;
		let _createdBy;
		let _createdDate;
		if (type === 'Edit') {
			if (userProfile?.officerPosition === 'Masinis') {
				_masinis = userProfile;
				_dispatcher = null;
			} else if (userProfile?.officerPosition === 'Dispatcher') {
				_masinis = null;
				_dispatcher = userProfile;
			}
			_createdBy = dataRow?.createdBy;
			_createdDate = dataRow?.createdDate;
		} else {
			_createdBy = userProfile;
			_createdDate = new Date();
			if (userProfile?.officerPosition === 'Masinis') {
				_masinis = userProfile;
				_dispatcher = null;
			} else if (userProfile?.officerPosition === 'Dispatcher') {
				_masinis = null;
				_dispatcher = userProfile;
			}
		}

		const postData = {
			masinis: _masinis, // id, name, jabatan, createdTime
			dispatcher: _dispatcher, // id, name, jabatan, createdTime
			date: formDate, // Tanggal
			time: formTime, // Waktu
			trackSection: formTrack, // Petak Jalan
			trainDistance: formTrain, // KM
			information: {
				name1: formInfo1,
				footer: formFooter,
			}, // Informasi
			createdBy: _createdBy,
			createdDate: _createdDate,
		};

		if (type === 'Edit') {
			try {
				const respon = await ApiOperational.updateEmergency8(
					dataRow?._id,
					postData
				);
				// console.log("respon", respon.data, postData);
				if (respon.statusText === 'OK') {
					resetForm();
					history.goBack(); // Mengirim respon ke parent (List)
				}
			} catch (error) {
				console.error('Error submitting form', error);
			}
		} else {
			try {
				const respon = await ApiOperational.postEmergency8(postData);
				// console.log("respon", respon);
				if (respon.statusText === 'OK') {
					resetForm();
					history.goBack(); // Mengirim respon ke parent (List)
				}
			} catch (error) {
				console.error('Error submitting form', error);
			}
		}
	};

	const getDataById = () => {
		const formatDate = new Date(dataRow.date).toISOString().split('T')[0];
		setFormDate(formatDate);
		setFormTime(dataRow?.time);
		setFormTrack(dataRow?.trackSection);
		setFormTrain(dataRow?.trainDistance);

		setFormInfo1(dataRow?.information?.name1);
	};

	// useEffect
	useEffect(() => {
		getMasterEmergency({ title: ['Emergency 8', 'All'] });
		if (type === 'Edit') {
			getDataById();
		}
	}, []);

	useEffect(() => {
		if (type !== 'Edit') {
			const dataFilter = listMasterEmergency.filter(
				x => x.title === 'Emergency 8'
			);
			const _info1 = dataFilter.filter(x => x.idNumber === 1);
			setFormInfo1(_info1[0]);
		}

		const _footer = listMasterEmergency.filter(
			x => x.title === 'All' && x.idNumber === 2
		);
		// console.log(_footer)
		setFormFooter(_footer[0]);
	}, [listMasterEmergency]);

	// console.log('listMasterEmergency', listMasterEmergency)

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Emergency"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Emergency 8"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Hari, Tanggal"
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

					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Pukul"
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
							type="time"
							value={formTime}
							onChange={e => setFormTime(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<AppTextField
							fullWidth
							size="small"
							label="Petak Jalan"
							sx={{ mt: '0px' }}
							value={formTrack}
							onChange={e => setFormTrack(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<AppTextField
							fullWidth
							size="small"
							label="KM"
							type="number"
							sx={{ mt: '0px' }}
							value={formTrain}
							onChange={e => setFormTrain(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<Typography14 title="Permohonan izin perihal :" />
						<QuillEditor
							value={formInfo1?.information}
							onChange={e => handleChange('info1', e)}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
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
