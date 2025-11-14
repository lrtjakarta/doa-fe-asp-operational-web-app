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
	const [formInfo2, setFormInfo2] = useState(null);
	const [formInfo, setFormInfo] = useState(null);
	const [formFooter, setFormFooter] = useState(null);

	const [formIdNumberOfficer, setFormIdNumberOfficer] = useState('');
	const [formDate, setFormDate] = useState(getCurrentDate());
	const [formTime, setFormTime] = useState(getCurrentTime());
	const [formIdNumber, setFormIdNumber] = useState('');

	// handle
	const handleChange = (type, value) => {
		if (type === 'info') {
			setFormInfo({
				idNumber: 3,
				title: 'Emergency 4',
				information: value,
			});
		} else if (type === 'info1') {
			setFormInfo1({
				...formInfo1,
				information: value,
			});
		} else if (type === 'info2') {
			setFormInfo2({
				...formInfo2,
				information: value,
			});
		}
	};

	const resetForm = () => {
		setFormIdNumberOfficer('');
		setFormDate(getCurrentDate());
		setFormTime(getCurrentTime());
		setFormIdNumber('');
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
			serialNumber: formIdNumberOfficer, // Nomor urut
			masinis: _masinis, // id, name, jabatan, createdTime
			dispatcher: _dispatcher, // id, name, jabatan, createdTime
			date: formDate, // Tanggal
			time: formTime, // Waktu
			trainNumber: formIdNumber, // Nomor KA (train number)
			information: {
				name1: formInfo,
				name2: formInfo1,
				name3: formInfo2,
				footer: formFooter,
			}, // Informasi
			createdBy: _createdBy,
			createdDate: _createdDate,
		};
		if (type === 'Edit') {
			try {
				const respon = await ApiOperational.updateEmergency4(
					dataRow?._id,
					postData
				);
				// console.log("respon", respon);
				if (respon.statusText === 'OK') {
					resetForm();
					history.goBack(); // Mengirim respon ke parent (List)
				}
			} catch (error) {
				console.error('Error submitting form', error);
			}
		} else {
			try {
				const respon = await ApiOperational.postEmergency4(postData);
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
		setFormIdNumberOfficer(dataRow?.serialNumber);
		setFormDate(formatDate);
		setFormTime(dataRow?.time);
		setFormIdNumber(dataRow?.trainNumber);

		setFormInfo1(dataRow?.information?.name2);
		setFormInfo2(dataRow?.information?.name3);
		setFormInfo(dataRow?.information?.name1);
	};

	// useEffect
	useEffect(() => {
		getMasterEmergency({ title: ['Emergency 4', 'All'] });
		if (type === 'Edit') {
			getDataById();
		}
	}, []);

	useEffect(() => {
		if (type !== 'Edit') {
			const dataFilter = listMasterEmergency.filter(
				x => x.title === 'Emergency 4'
			);
			const _info1 = dataFilter.filter(x => x.idNumber === 1);
			setFormInfo1(_info1[0]);
			const _info2 = dataFilter.filter(x => x.idNumber === 2);
			setFormInfo2(_info2[0]);
		}

		const _footer = listMasterEmergency.filter(x => x.title === 'All');
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
							sub3="Form Emergency 4"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<AppTextField
							fullWidth
							size="small"
							label="No. Urut dibuku"
							sx={{ mt: '0px' }}
							value={formIdNumberOfficer}
							onChange={e => setFormIdNumberOfficer(e.target.value)}
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
							label="KA No."
							sx={{ mt: '0px' }}
							value={formIdNumber}
							onChange={e => setFormIdNumber(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<QuillEditor
							value={formInfo?.information}
							onChange={e => handleChange('info', e)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<QuillEditor
							value={formInfo1?.information}
							onChange={e => handleChange('info1', e)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<QuillEditor
							value={formInfo2?.information}
							onChange={e => handleChange('info2', e)}
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
