import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	Button,
	Alert,
	Snackbar,
	FormControl,
	RadioGroup,
	Radio,
	FormControlLabel,
	IconButton,
	TableRow,
	TableCell,
} from '@mui/material';
import moment from 'moment';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from '../../Component/input-fields/AppTextField';
import Typography14 from 'Component/Typography/Typography14';
import CustomHeader from './CustomHeader';
import CustomRow from './CustomRow';

import dataWSC from './Data';

import ApiOperational from 'Services/ApiOperational';
import Typography12 from 'Component/Typography/Typography12';

import { UserProfilContext } from 'Context';
import { WscContext } from 'Context';
import Typography16 from 'Component/Typography/Typography16';

function Form() {
	const location = useLocation();
	// const { type, dataRow } = location.state;
	const { type, id } = useParams();
	const history = useHistory();

	console.log('type', type, 'id', id);

	// context
	const { userProfile, profileData, userById } = useContext(UserProfilContext);
	// context
	const { listWscId, getDataWscId } = useContext(WscContext);

	// state
	const [formDate, setFormDate] = useState();
	const [formShift, setFormShift] = useState('');
	const [dataAll, setDataAll] = useState([]);

	const [formOperasi, setFormOperasi] = useState();
	const [formAaWs, setFormAaWs] = useState('');
	const [formAaPs, setFormAaPs] = useState('');
	const [formDaWs, setFormDaWs] = useState('');
	const [formDaPs, setFormDaPs] = useState('');
	const [formKondisi, setFormKondisi] = useState('');
	const [formNormal, setFormNormal] = useState();
	const [formOcc, setFormOcc] = useState('');
	const [formRiwayat, setFormRiwayat] = useState('');
	const [formdTim, setFormTim] = useState('');

	// handle
	// const handleChange = (index, field, value) => {
	// 	const newData = [...dataAll];
	// 	newData[index] = {
	// 		...newData[index], // Copy semua field yang ada
	// 		[field]: value, // Hanya ubah field yang sesuai
	// 	};
	// 	// Jika data sudah diisi dan createBy belum ada, tambahkan createBy
	// 	if (value !== '' && !newData[index].createBy) {
	// 		newData[index].createBy = userProfile; // Sesuaikan 'User1' dengan nama pengguna yang sesuai
	// 	}
	// 	setDataAll(newData);
	// 	// console.log('perubahan data', newData);
	// };

	const resetForm = () => {
		setFormOperasi('');
		setFormAaWs('');
		setFormAaPs('');
		setFormDaWs('');
		setFormDaPs('');
		setFormKondisi('');
		setFormNormal('');
		setFormOcc('');
		setFormRiwayat('');
		setFormTim('');
	};

	const handleSaveData = () => {
		const newData = {
			timeOperation: formOperasi, // Waktu Pengoperasian
			arrivalWS: formAaWs, // arrival WS (AA)
			arrivalPosition: formAaPs, // posisi AA
			departureWS: formDaWs, // depature WS (DA)
			depaturePosition: formDaPs, // posisi DA
			conditionWS: formKondisi, // kondisi WS
			timeNormalization: formNormal, // Waktu Penormalan
			releaseRoute: formOcc, // Release Route OCC
			history: formRiwayat, // Riwayat Pekerjaan
			timMeans: formdTim, // tim sarana
		};
		if (dataAll.length > 0) {
			setDataAll([...dataAll, newData]);
			resetForm();
		} else {
			setDataAll([newData]);
			resetForm();
		}
	};

	const handleDeleteData = (i, value) => {
		const filterData = dataAll.filter((_, index) => index !== i);
		// console.log('filterData', i);
		setDataAll(filterData);
	};

	const handleSubmit = async () => {
		let user;

		if (profileData !== null) {
			user = userProfile;
		} else {
			user = {
				officerId: userById?._id,
				officerName: userById?.name,
				officerPosition: userById?.role[0]?.name,
				officerNumber: '', // nipp
				officerStart: '',
				officerEnd: '',
				officerCode: '',
				officerShift: '',
				officerIdUser: '',
			};
		}

		let _create;
		let _createUpdate;
		if (type === 'Edit') {
			// _shift = dataRow?.wscShift;
			_create = listWscId?.createBy;
			_createUpdate = user;
		} else {
			// _shift = userProfile?.officerShift;
			_create = user;
			_createUpdate = null;
		}

		const postData = {
			wscDate: formDate, // tanggal input
			wscShift: formShift,
			wscItems: dataAll,
			createBy: _create, // name, jobRole, idNumber, dapartement
			createUpdate: _createUpdate,
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updateWsc(id, postData);

			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postWsc(postData);

			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				history.goBack();
			}
		}
	};

	const getDataByID = data => {
		console.log('data data', data);
		setFormDate(moment(data?.wscDate).format('YYYY-MM-DD'));
		setFormShift(data?.wscShift);
		setDataAll(data?.wscItems);
	};

	useEffect(() => {
		if (type === 'Edit') {
			getDataWscId(id);
		} else {
			setFormDate(moment(userProfile?.dailyWorkDate).format('YYYY-MM-DD'));
		}
	}, []);

	useEffect(() => {
		if (type === 'Edit') {
			getDataByID(listWscId);
		}
	}, [listWscId]);
	console.log('listWscId', listWscId);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Form Pengoperasian WSC"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Pengoperasian WSC"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<AppTextField
							size="small"
							fullWidth
							// label="Tanggal"
							sx={{ mt: '0px' }}
							value={formDate}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<AppTextField
							size="small"
							fullWidth
							label="Shift"
							sx={{ mt: '0px' }}
							value={formShift}
							disabled
							// onChange={(e) => setFormShift(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<Grid
							container
							spacing={1}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<Grid item>
								<Typography12 title="Waktu Pengoperasian WSC" />
								<TextField
									fullWidth
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
									value={formOperasi}
									onChange={e => setFormOperasi(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<Typography12 title="AA WS" />
								<AppTextField
									fullWidth
									size="small"
									sx={{ mt: '0px' }}
									select
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={formAaWs}
									onChange={e => setFormAaWs(e.target.value)}
								>
									<option value=""></option>
									<option value="WS 1">WS 1</option>;
									<option value="WS 2">WS 2</option>;
									<option value="WS 3">WS 3</option>;
									<option value="WS 4">WS 4</option>;
									<option value="WS 5">WS 5</option>;
									<option value="WS 6">WS 6</option>;
									<option value="WS 7">WS 7</option>;
									<option value="WS 8">WS 8</option>;
								</AppTextField>
							</Grid>
							<Grid item>
								<Typography12 title="AA Posisi Switch" />
								<FormControl>
									<RadioGroup
										value={formAaPs}
										onChange={e => setFormAaPs(e.target.value)}
									>
										<FormControlLabel
											value="ON"
											control={<Radio />}
											label="ON"
											sx={{
												'& .MuiFormControlLabel-label': {
													fontSize: '14px',
													fontWeight: 'normal',
												},
											}}
										/>
										<FormControlLabel
											value="OFF"
											control={<Radio />}
											label="OFF"
											sx={{
												'& .MuiFormControlLabel-label': {
													fontSize: '14px',
													fontWeight: 'normal',
												},
											}}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item>
								<Typography12 title="DA WS" />
								<AppTextField
									fullWidth
									size="small"
									sx={{ mt: '0px' }}
									select
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={formDaWs}
									onChange={e => setFormDaWs(e.target.value)}
								>
									<option value=""></option>
									<option value="WS 1">WS 1</option>;
									<option value="WS 2">WS 2</option>;
									<option value="WS 3">WS 3</option>;
									<option value="WS 4">WS 4</option>;
									<option value="WS 5">WS 5</option>;
									<option value="WS 6">WS 6</option>;
									<option value="WS 7">WS 7</option>;
									<option value="WS 8">WS 8</option>;
								</AppTextField>
							</Grid>
							<Grid item>
								<Typography12 title="DA Posisi Switch" />
								<FormControl>
									<RadioGroup
										value={formDaPs}
										onChange={e => setFormDaPs(e.target.value)}
									>
										<FormControlLabel
											value="ON"
											control={<Radio />}
											label="ON"
											sx={{
												'& .MuiFormControlLabel-label': {
													fontSize: '14px',
													fontWeight: 'normal',
												},
											}}
										/>
										<FormControlLabel
											value="OFF"
											control={<Radio />}
											label="OFF"
											sx={{
												'& .MuiFormControlLabel-label': {
													fontSize: '14px',
													fontWeight: 'normal',
												},
											}}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item>
								<Typography12 title="Kondisi Switch WS" />
								<AppTextField
									fullWidth
									size="small"
									sx={{ mt: '0px' }}
									select
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={formKondisi}
									onChange={e => setFormKondisi(e.target.value)}
								>
									<option value=""></option>
									<option value="Sudah dinormalkan">Sudah dinormalkan</option>;
									<option value="Belum dinormalkan">Belum dinormalkan</option>;
								</AppTextField>
							</Grid>
							<Grid item>
								<Typography12 title="Waktu Penormalan Switch" />
								<TextField
									fullWidth
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
									value={formNormal}
									onChange={e => setFormNormal(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<Typography12 title="Release Route OCC" />
								<AppTextField
									fullWidth
									size="small"
									sx={{ mt: '0px' }}
									select
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={formOcc}
									onChange={e => setFormOcc(e.target.value)}
								>
									<option value=""></option>
									<option value="Sudah direlease">Sudah direlease</option>;
									<option value="Belum direlease">Belum direlease</option>;
								</AppTextField>
							</Grid>
							<Grid item>
								<Typography12 title="Riwayat Pekerjaan" />
								<AppTextField
									size="small"
									fullWidth
									sx={{ mt: '0px' }}
									value={formRiwayat}
									onChange={e => setFormRiwayat(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<Typography12 title="Nama Tim Sarana" />
								<AppTextField
									size="small"
									fullWidth
									sx={{ mt: '0px' }}
									value={formdTim}
									onChange={e => setFormTim(e.target.value)}
								/>
							</Grid>
							<Grid item sx={{ mt: 2 }}>
								<IconButton size="small" onClick={handleSaveData}>
									<AddBoxIcon sx={{ fontSize: 28, color: 'blue' }} />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={12}></Grid>

					<Grid item xs={12} sm={12}>
						<CustomHeader
							dataBody={
								<>
									{dataAll.length > 0 ? (
										dataAll?.map((item, index) => {
											return (
												<CustomRow
													key={index}
													value1={item.timeOperation}
													value2={item?.arrivalWS}
													value3={item.arrivalPosition}
													value4={item?.departureWS}
													value5={item.depaturePosition}
													value6={item.conditionWS}
													value7={item.timeNormalization}
													value8={item.releaseRoute}
													value9={item.history}
													value10={item.timMeans}
													value11={
														<>
															<IconButton
																size="small"
																onClick={e => handleDeleteData(index, item)}
															>
																<DeleteIcon sx={{ color: '#ff3e3e' }} />
															</IconButton>
														</>
													}
												/>
											);
										})
									) : (
										<TableRow>
											<TableCell colSpan={11}>
												<Typography16 title="Data Kosong" fontWeight={700} />
											</TableCell>
										</TableRow>
									)}
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
							gap: '10px',
						}}
					>
						<Button
							color="error"
							variant="outlined"
							onClick={() => history.goBack()}
						>
							Batal
						</Button>
						<Button
							disabled={dataAll?.length > 0 ? false : true}
							sx={{ backgroundColor: dataAll?.length > 0 ? 'blue' : 'gray' }}
							variant="contained"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Form;
