import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Grid,
	TextField,
	Container,
	IconButton,
	Button,
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useLocation, useHistory } from 'react-router-dom';

import './DataTable.css';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';
import Typography14 from 'Component/Typography/Typography14';
import CustomNewTableDetail from 'Component/CustomTable/CustomNewTableDetail';
import QuillEditor from './component/QuillEditor';
import ColumnShapeInstruksi from './component/column-shape-instruksi';
import ColumnShapeInfo from './component/column-shape-Info';
import ColumnShapeSebab from './component/column-shape-sebab';

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
	const [formInfo4, setFormInfo4] = useState(null);

	const [allInfo, setAllInfo] = useState([]);

	const [allIntruksi, setAllIntruksi] = useState([]);
	const [formIntruksi, setFormIntruksi] = useState('');

	const [allSebab, setAllSebab] = useState([]);
	const [formSebab, setFormSebab] = useState('');

	const [formIdNumberOfficer, setFormIdNumberOfficer] = useState('');
	const [formDate, setFormDate] = useState(getCurrentDate());
	const [formTime, setFormTime] = useState(getCurrentTime());
	const [formIdNumber, setFormIdNumber] = useState('');

	// handle
	const handleChange = (type, value) => {
		if (type === 'info1') {
			setFormInfo1({
				...formInfo1,
				information: value,
			});
		}
	};

	const handleAddInfo = () => {
		const newData = {
			...formInfo1,
			idNumber: allInfo.length + 1,
		};

		if (allInfo.length > 0) {
			setAllInfo([...allInfo, newData]);
			const _info1 = listMasterEmergency.filter(
				x => x.idNumber === 1 && x.title === 'Emergency 2'
			);

			setFormInfo1(_info1[0]);
		} else {
			setAllInfo([newData]);
			const _info1 = listMasterEmergency.filter(
				x => x.idNumber === 1 && x.title === 'Emergency 2'
			);

			setFormInfo1(_info1[0]);
		}
	};

	const handleDeleteInfo = row => {
		const filter = allInfo.filter(x => x.idNumber !== row.idNumber);
		setAllInfo(filter);
	};

	const handleAddInstruksi = () => {
		const newData = {
			id: allIntruksi.length + 1,
			title: formIntruksi,
		};

		if (allIntruksi.length > 0) {
			setAllIntruksi([...allIntruksi, newData]);
			setFormIntruksi('');
		} else {
			setAllIntruksi([newData]);
			setFormIntruksi('');
		}
	};

	const handleDeleteInstruksi = row => {
		const filter = allIntruksi.filter(x => x.id !== row.id);
		setAllIntruksi(filter);
	};

	const handleAddSebab = () => {
		const newData = {
			id: allSebab.length + 1,
			title: formSebab,
		};

		if (allSebab.length > 0) {
			setAllSebab([...allSebab, newData]);
			setFormSebab('');
		} else {
			setAllSebab([newData]);
			setFormSebab('');
		}
	};

	const handleDeleteSebab = row => {
		const filter = allSebab.filter(x => x.id !== row.id);
		setAllSebab(filter);
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
			information: allInfo, // Informasi
			specialInstructions: allIntruksi, // Instruksi Khusus
			reasons: allSebab, // Sebab-sebab
			note: formInfo4,
			createdBy: _createdBy,
			createdDate: _createdDate,
		};
		if (type === 'Edit') {
			try {
				const respon = await ApiOperational.updateEmergency2(
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
				const respon = await ApiOperational.postEmergency2(postData);
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
		setAllInfo(dataRow?.information);
		setAllIntruksi(dataRow?.specialInstructions);
		setAllSebab(dataRow?.reasons);
		setFormIdNumberOfficer(dataRow?.serialNumber);
		setFormDate(formatDate);
		setFormTime(dataRow?.time);
		setFormIdNumber(dataRow?.trainNumber);
	};

	// useEffect
	useEffect(() => {
		getMasterEmergency({ title: ['Emergency 2', 'All'] });
		if (type === 'Edit') {
			getDataById();
		}
	}, []);

	useEffect(() => {
		const _info1 = listMasterEmergency.filter(
			x => x.idNumber === 1 && x.title === 'Emergency 2'
		);

		setFormInfo1(_info1[0]);
		const _info4 = listMasterEmergency.filter(x => x.title === 'All');
		setFormInfo4(_info4[0]);
	}, [listMasterEmergency]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Emergency"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Emergency 2"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<AppTextField
							fullWidth
							size="small"
							label="No. Urut dibuku Dispatcher/Masinis"
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

					<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
						<Typography14 title="Harus berjalan hati-hati, karena :" />
					</Grid>
					<Grid item xs={12} sm={11}>
						<QuillEditor
							value={formInfo1?.information}
							onChange={e => handleChange('info1', e)}
						/>
					</Grid>
					<Grid item xs={12} sm={1}>
						<IconButton size="small" onClick={handleAddInfo}>
							<AddBoxOutlinedIcon sx={{ fontSize: 32, color: '#3E97FF' }} />
						</IconButton>
					</Grid>
					<Grid item xs={12} sm={12}>
						{allInfo.length > 0 && (
							<CustomNewTableDetail
								data={allInfo}
								columnShape={ColumnShapeInfo({
									onDelete: handleDeleteInfo,
								})}
							/>
						)}
					</Grid>

					<Grid item xs={12} sm={12}>
						<Typography14 title="Intruksi Khusus:" />
					</Grid>
					<Grid item xs={12} sm={11}>
						<AppTextField
							fullWidth
							size="small"
							label="Masukkan instruksi khusus"
							sx={{ mt: '0px' }}
							value={formIntruksi}
							onChange={e => setFormIntruksi(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={1}>
						<IconButton size="small" onClick={handleAddInstruksi}>
							<AddBoxOutlinedIcon sx={{ fontSize: 32, color: '#3E97FF' }} />
						</IconButton>
					</Grid>

					<Grid item xs={12} sm={12}>
						{allIntruksi.length > 0 && (
							<CustomNewTableDetail
								data={allIntruksi}
								columnShape={ColumnShapeInstruksi({
									onDelete: handleDeleteInstruksi,
								})}
							/>
						)}
					</Grid>

					<Grid item xs={12} sm={12}>
						<Typography14 title="Sebab - sebab perintah ini :" />
					</Grid>
					<Grid item xs={12} sm={11}>
						<AppTextField
							fullWidth
							size="small"
							label="Masukkan Inputan Anda"
							sx={{ mt: '0px' }}
							value={formSebab}
							onChange={e => setFormSebab(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={1}>
						<IconButton size="small" onClick={handleAddSebab}>
							<AddBoxOutlinedIcon sx={{ fontSize: 32, color: '#3E97FF' }} />
						</IconButton>
					</Grid>

					<Grid item xs={12} sm={12}>
						{allSebab.length > 0 && (
							<CustomNewTableDetail
								data={allSebab}
								columnShape={ColumnShapeSebab({
									onDelete: handleDeleteSebab,
								})}
							/>
						)}
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
