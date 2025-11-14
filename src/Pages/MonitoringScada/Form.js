import React, { useEffect, useState, useContext } from 'react';
import {
	Box,
	Container,
	Grid,
	FormControl,
	RadioGroup,
	Radio,
	FormControlLabel,
	TextField,
	Button,
} from '@mui/material';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';
import AppTextField from 'Component/input-fields/AppTextField';

import CustomRow from './CustomRow';

import { railWest, railEast, railDepo, rtu, mbs } from './Data';

import { UserProfilContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';

function Form() {
	const location = useLocation();
	const { type, dataRow } = location.state;
	const history = useHistory();

	const dataHeader = ['Sistem', 'Area', 'Hasil Pemeriksaan', 'Keterangan'];

	// context
	const { userProfile } = useContext(UserProfilContext);

	// state
	const [formDate, setFormDate] = useState();
	const [formWest, setFormWest] = useState([]);
	const [formEast, setFormEast] = useState([]);
	const [formDepo, setFormDepo] = useState([]);
	const [formRtu, setFormRtu] = useState([]);
	const [formMbs, setFormMbs] = useState([]);

	const handleChangeWest = (index, field, value) => {
		const newData = [...formWest];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};
		setFormWest(newData);
	};
	const handleChangeEast = (index, field, value) => {
		const newData = [...formEast];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};
		setFormEast(newData);
	};
	const handleChangeDepo = (index, field, value) => {
		const newData = [...formDepo];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};
		setFormDepo(newData);
	};
	const handleChangeRtu = (index, field, value) => {
		const newData = [...formRtu];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};
		setFormRtu(newData);
	};
	const handleChangeMbs = (index, field, value) => {
		const newData = [...formMbs];
		newData[index] = {
			...newData[index], // Copy semua field yang ada
			[field]: value, // Hanya ubah field yang sesuai
		};
		setFormMbs(newData);
	};

	const handleSubmit = async () => {
		if (formDate === undefined) {
			alert('Form tanggal kosong!');
			return;
		}

		let _create;
		let _createUpdate;
		if (type === 'Edit') {
			_create = dataRow?.createBy;
			_createUpdate = userProfile;
		} else {
			_create = userProfile;
			_createUpdate = null;
		}

		const postData = {
			date: moment(formDate).format('YYYY-MM-DD'), // tanggal input
			railWest: formWest,
			railEast: formEast,
			railDepo: formDepo,
			rtu: formRtu,
			mbs: formMbs,
			createBy: _create, // name, jobRole, idNumber, dapartement
			createUpdate: _createUpdate,
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updateMonitoringScada(
				dataRow?._id,
				postData
			);
			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postMonitoringScada(postData);
			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				history.goBack();
			}
		}
	};

	const getDataById = data => {
		setFormDate(moment(data?.date).format('YYYY-MM-DD'));
		setFormWest(data?.railWest);
		setFormEast(data?.railEast);
		setFormDepo(data?.railDepo);
		setFormRtu(data?.rtu);
		setFormMbs(data?.mbs);
	};

	useEffect(() => {
		if (type === 'Edit') {
			getDataById(dataRow);
		} else {
			setFormWest(railWest);
			setFormEast(railEast);
			setFormDepo(railDepo);
			setFormRtu(rtu);
			setFormMbs(mbs);
		}
	}, []);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Monitoring SCADA"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Monitoring SCADA"
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
					<Grid item xs={12} sm={12}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{formWest.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={
													<>
														<FormControl>
															<RadioGroup
																row
																value={item.results}
																onChange={e =>
																	handleChangeWest(
																		index,
																		'results',
																		e.target.value
																	)
																}
															>
																<FormControlLabel
																	value="OK"
																	control={<Radio />}
																	label="OK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="NOK"
																	control={<Radio />}
																	label="NOK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="N/A"
																	control={<Radio />}
																	label="N/A"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
															</RadioGroup>
														</FormControl>
													</>
												}
												value4={
													<>
														<AppTextField
															size="small"
															fullWidth
															sx={{ mt: '0px' }}
															value={item.note}
															onChange={e =>
																handleChangeWest(index, 'note', e.target.value)
															}
														/>
													</>
												}
											/>
										);
									})}

									{formEast.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={
													<>
														<FormControl>
															<RadioGroup
																row
																value={item.results}
																onChange={e =>
																	handleChangeEast(
																		index,
																		'results',
																		e.target.value
																	)
																}
															>
																<FormControlLabel
																	value="OK"
																	control={<Radio />}
																	label="OK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="NOK"
																	control={<Radio />}
																	label="NOK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="N/A"
																	control={<Radio />}
																	label="N/A"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
															</RadioGroup>
														</FormControl>
													</>
												}
												value4={
													<>
														<AppTextField
															size="small"
															fullWidth
															sx={{ mt: '0px' }}
															value={item.note}
															onChange={e =>
																handleChangeEast(index, 'note', e.target.value)
															}
														/>
													</>
												}
											/>
										);
									})}

									{formDepo.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={
													<>
														<FormControl>
															<RadioGroup
																row
																value={item.results}
																onChange={e =>
																	handleChangeDepo(
																		index,
																		'results',
																		e.target.value
																	)
																}
															>
																<FormControlLabel
																	value="OK"
																	control={<Radio />}
																	label="OK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="NOK"
																	control={<Radio />}
																	label="NOK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="N/A"
																	control={<Radio />}
																	label="N/A"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
															</RadioGroup>
														</FormControl>
													</>
												}
												value4={
													<>
														<AppTextField
															size="small"
															fullWidth
															sx={{ mt: '0px' }}
															value={item.note}
															onChange={e =>
																handleChangeDepo(index, 'note', e.target.value)
															}
														/>
													</>
												}
											/>
										);
									})}

									{formRtu.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={
													<>
														<FormControl>
															<RadioGroup
																row
																value={item.results}
																onChange={e =>
																	handleChangeRtu(
																		index,
																		'results',
																		e.target.value
																	)
																}
															>
																<FormControlLabel
																	value="OK"
																	control={<Radio />}
																	label="OK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="NOK"
																	control={<Radio />}
																	label="NOK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="N/A"
																	control={<Radio />}
																	label="N/A"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
															</RadioGroup>
														</FormControl>
													</>
												}
												value4={
													<>
														<AppTextField
															size="small"
															fullWidth
															sx={{ mt: '0px' }}
															value={item.note}
															onChange={e =>
																handleChangeRtu(index, 'note', e.target.value)
															}
														/>
													</>
												}
											/>
										);
									})}

									{formMbs.map((item, index) => {
										return (
											<CustomRow
												index={index}
												value1={item?.sistem}
												value2={item?.area}
												value3={
													<>
														<FormControl>
															<RadioGroup
																row
																value={item.results}
																onChange={e =>
																	handleChangeMbs(
																		index,
																		'results',
																		e.target.value
																	)
																}
															>
																<FormControlLabel
																	value="OK"
																	control={<Radio />}
																	label="OK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="NOK"
																	control={<Radio />}
																	label="NOK"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
																<FormControlLabel
																	value="N/A"
																	control={<Radio />}
																	label="N/A"
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			fontSize: '12px',
																			fontWeight: 'normal',
																		},
																	}}
																/>
															</RadioGroup>
														</FormControl>
													</>
												}
												value4={
													<>
														<AppTextField
															size="small"
															fullWidth
															sx={{ mt: '0px' }}
															value={item.note}
															onChange={e =>
																handleChangeMbs(index, 'note', e.target.value)
															}
														/>
													</>
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
