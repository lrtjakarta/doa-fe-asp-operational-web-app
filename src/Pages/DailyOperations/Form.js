import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Box,
	Container,
	Grid,
	IconButton,
	Button,
	TextField,
	InputAdornment,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import QuillEditor from 'Component/CustomEditor/QuillEditor';
import AppTextField from 'Component/input-fields/AppTextField';

import { UserProfilContext } from 'Context';
import { MasterDailyOperationContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';

function Form() {
	const history = useHistory();
	const location = useLocation();
	const { dataRow, type } = location.state;

	// context
	const { userProfile } = useContext(UserProfilContext);
	const { listMasterDailyOperation, getMasterDailyOperation } = useContext(
		MasterDailyOperationContext
	);

	// state
	const [formDate, setFormDate] = useState('');
	// const [formShift, setFormShift] = useEffect('');
	const [formTime, setFormTime] = useState('');
	const [formStart, setFormStart] = useState('');
	const [formEnd, setFormEnd] = useState('');
	const [formHours, setFormHours] = useState('');
	const [formInfo, setFormInfo] = useState(null);

	// handle
	const resetForm = () => {
		setFormDate('');
		// setFormStart('');
		// setFormEnd('');
		setFormInfo('');
		setFormHours('');
	};
	const getDataById = dataRow => {
		const _filter = listMasterDailyOperation.filter(
			x => x._id === dataRow?.information?._id
		);

		setFormDate(moment(dataRow?.date).format('YYYY-MM-DD'));
		// setFormStart(dataRow?.startTime);
		// setFormEnd(dataRow?.endTime);
		setFormInfo(_filter[0]);
		setFormTime(dataRow?.information?._id);
		setFormHours(dataRow?.operationHours);
	};
	const handleSubmit = async () => {
		let _createBy;
		let _createUpdate;
		if (type === 'Edit') {
			_createBy = dataRow?.createBy;
			_createUpdate = userProfile;
		} else {
			_createBy = userProfile;
			_createUpdate = null;
		}
		const postData = {
			date: moment(formDate).format('YYYY-MM-DD'),
			startTime: formStart,
			endTime: formEnd,
			operationHours: formHours,
			information: formInfo,
			createBy: _createBy,
			createUpdate: _createUpdate,
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updateDailyOperations(
				dataRow?._id,
				postData
			);
			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				resetForm();
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postDailyOperations(postData);
			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				resetForm();
				history.goBack();
			}
		}
	};

	const handleChangeEditor = value => {
		const _update = {
			...formInfo,
			information: value,
		};
	};

	useEffect(() => {
		getMasterDailyOperation({ shift: userProfile?.officerShift });
		if (type === 'Edit') {
			getDataById(dataRow);
		}
	}, []);

	useEffect(() => {
		setFormInfo(listMasterDailyOperation[0]);
	}, [listMasterDailyOperation]);

	// console.log('form edit', listMasterDailyOperation);
	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Operasional Harian"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Operasional Harian"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<AppTextField
							fullWidth
							size="small"
							label="Shift"
							sx={{ mt: '0px' }}
							disabled
							value={userProfile?.officerShift}
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

					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Periode Time Start"
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
							value={formStart}
							onChange={e => setFormStart(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Periode Time End"
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
							value={formEnd}
							onChange={e => setFormEnd(e.target.value)}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Jam Operasi"
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
							value={formHours}
							onChange={e => setFormHours(e.target.value)}
						/>
					</Grid> */}
					<Grid item xs={12} sm={12}>
						<QuillEditor
							value={formInfo?.information}
							onChange={e => handleChangeEditor(e)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
					>
						<Button
							variant="outlined"
							color="error"
							onClick={() => history.goBack()}
						>
							Batal
						</Button>
						<Button variant="contained" onClick={handleSubmit}>
							Simpan
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Form;
