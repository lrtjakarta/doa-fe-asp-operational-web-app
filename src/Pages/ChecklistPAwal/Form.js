import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	Button,
	Alert,
	Snackbar,
	Stack,
	IconButton,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import moment from 'moment';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography16 from 'Component/Typography/Typography16';

import ApiOperational from 'Services/ApiOperational';
import { UserProfilContext } from 'Context';
import { MasterLrvContext } from 'Context';

import ColumnShapeCpa from './column-shape-cpa';
import CustomHeader from './CustomHeader';
import CustomRow from './CustomRow';
import dataGroup from './Data';

function Form() {
	const location = useLocation();
	const { type, dataRow } = location.state.state;
	const history = useHistory();

	const getTodayDate = data => {
		const today = data ? data : new Date();
		return today.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
	};

	// context
	const { userProfile } = useContext(UserProfilContext);
	const { listMasterLrv, getDataNoGoItem } = useContext(MasterLrvContext);

	const [formDate, setFormDate] = useState(getTodayDate());
	const [formNumber, setFormNumber] = useState('');

	const [allLoop, setAllLoop] = useState([]);

	const [openNotif, setOpenNotif] = React.useState(false);

	const resetForm = () => {
		setFormDate(getTodayDate());
		setFormNumber('');
	};

	const handleChange = (loopNumber, field, value) => {
		let _lrv = null;

		if (field === 'lrv') {
			_lrv = listMasterLrv.find(item => item._id === value) || null;
		}

		const newData = allLoop.map(item =>
			item.loop === loopNumber
				? { ...item, [field]: field === 'lrv' ? _lrv : value }
				: item
		);

		setAllLoop(newData);
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
			loops: allLoop,
			createBy: _create,
			createUpdate: _createUpdate, // name, jobRole, idNumber, dapartement
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updatePemberangkatanAwal(
				dataRow._id,
				postData
			);

			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				// setOpenNotif(true);
				resetForm();
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postPemberangkatanAwal(postData);

			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				setOpenNotif(true);
				resetForm();
				history.goBack();
			}
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenNotif(false);
	};

	const getById = () => {
		setFormDate(getTodayDate(new Date(dataRow?.date)));
		setFormNumber(dataRow?.lrv?._id);
		setAllLoop(dataRow?.loops);
	};

	useEffect(() => {
		getDataNoGoItem();
		if (type === 'Edit') {
			getById();
		} else {
			setAllLoop(dataGroup);
		}
	}, []);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Checklist Pemberangkatan Awal"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Pemberangkatan Awal"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
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
						<Typography16 title="Informasi Loop" fontWeight={700} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<CustomHeader
							dataBody={
								<>
									{allLoop.map((item, index) => {
										return (
											<CustomRow
												key={index}
												loop={item?.loop}
												dataLrv={listMasterLrv}
												valueLrv={item?.lrv?._id || ''}
												onChangeLrv={e =>
													handleChange(item.loop, 'lrv', e.target.value)
												}
												value1={item?.signalIndicator}
												onChange1={e =>
													handleChange(
														item.loop,
														'signalIndicator',
														e.target.value
													)
												}
												value2={item?.psdIndicator}
												onChange2={e =>
													handleChange(
														item.loop,
														'psdIndicator',
														e.target.value
													)
												}
												value3={item?.radioTetra}
												onChange3={e =>
													handleChange(item.loop, 'radioTetra', e.target.value)
												}
												value4={item?.trn}
												onChange4={e =>
													handleChange(item.loop, 'trn', e.target.value)
												}
												value5={item?.ats}
												onChange5={e =>
													handleChange(item.loop, 'ats', e.target.value)
												}
												value6={item?.tcms}
												onChange6={e =>
													handleChange(item.loop, 'tcms', e.target.value)
												}
												value7={item?.cctvFacility}
												onChange7={e =>
													handleChange(
														item.loop,
														'cctvFacility',
														e.target.value
													)
												}
												value8={item?.ctm}
												onChange8={e =>
													handleChange(item.loop, 'ctm', e.target.value)
												}
												value9={item?.pei}
												onChange9={e =>
													handleChange(item.loop, 'pei', e.target.value)
												}
												value10={item?.reservationSchedule}
												onChange10={e =>
													handleChange(
														item.loop,
														'reservationSchedule',
														e.target.value
													)
												}
												value11={item?.trackMainline}
												onChange11={e =>
													handleChange(
														item.loop,
														'trackMainline',
														e.target.value
													)
												}
												value12={item?.power}
												onChange12={e =>
													handleChange(item.loop, 'power', e.target.value)
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
						sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
					>
						<Stack direction="row" spacing={2}>
							<Button
								variant="outlined"
								color="error"
								onClick={() => history.goBack()}
							>
								Kembali
							</Button>
							{allLoop.length > 0 && (
								<Button variant="contained" onClick={handleSubmit}>
									Simpan
								</Button>
							)}
						</Stack>
					</Grid>
				</Grid>

				<Snackbar
					open={openNotif}
					autoHideDuration={1000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<Alert
						onClose={handleClose}
						severity="success"
						variant="filled"
						sx={{ width: '100%' }}
					>
						Tambah Data Berhasil!
					</Alert>
				</Snackbar>
			</Container>
		</Box>
	);
}

export default Form;
