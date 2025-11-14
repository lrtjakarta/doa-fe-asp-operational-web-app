import React, { useEffect, useState, useContext } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	TableCell,
	TableRow,
	Typography,
	Stack,
	TextField,
	Alert,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment/moment';
import { KeyboardArrowDown } from '@mui/icons-material';

import imageCompression from 'browser-image-compression';

// style
import { judulTextStyle } from './Styles';

// data
import { List_Data } from './Data';

import CustomHeaderTable from '../NoGoItem/component/CustomHeaderTable';
import AppTextField from '../../Component/input-fields/AppTextField';
import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import MultiUpload from 'Component/MultiUpload/MultiUploadV1';

import ApiOperational from '../../Services/ApiOperational';
import { UserProfilContext } from 'Context';
import { CabinRideContext } from 'Context';
import { MasterLrvContext } from 'Context';
import StaticVar from 'Config/StaticVar';

function Form() {
	const location = useLocation();
	const { dataRow, date, type } = location.state.state;
	const history = useHistory();

	const { userProfile } = useContext(UserProfilContext);
	const { getDataMasterCabinRide, masterCabinRide } =
		useContext(CabinRideContext);
	const { listMasterLrv, getDataNoGoItem } = useContext(MasterLrvContext);

	const dataHeader = [
		'NO',
		'CABIN RIDE',
		'URAIAN',
		'BOBOT',
		'REALISASI',
		'KETERANGAN',
	];

	const [allData, setAllData] = useState([]);
	const [formNote, setFormNote] = useState('');
	const [formLrv, setFormLrv] = useState('');
	const [formKa, setFormKa] = useState('');
	const [formStart, setFormStart] = useState(new Date());
	const [formEnd, setFormEnd] = useState(new Date());

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const handleChangeRealisasi = (itemName, descName, value) => {
		setAllData(prevState => {
			const updatedData = prevState.map(item =>
				item._id === itemName
					? {
							...item,
							desc: item.desc.map(desc =>
								desc._id === descName
									? { ...desc, realization: parseInt(value) }
									: desc
							),
					  }
					: item
			);
			return updatedData;
		});
	};

	const handleChangeNote = (itemName, descName, value) => {
		setAllData(prevState => {
			const updatedData = prevState.map(item =>
				item._id === itemName
					? {
							...item,
							desc: item.desc.map(desc =>
								desc._id === descName ? { ...desc, note: value } : desc
							),
					  }
					: item
			);
			return updatedData;
		});
	};

	const handleImageChange = async event => {
		const files = Array.from(event.target.files);
		const validFiles = files.filter(
			file =>
				file.type === 'image/jpeg' ||
				file.type === 'image/jpg' ||
				file.type === 'image/png'
		);

		if (validFiles.length !== files.length) {
			setErrors([
				...errors,
				'Maaf, file yang Anda upload memiliki format yang salah. Silahkan Pilih format yang sesuai (JPEG, JPG, PNG)',
			]);
		}

		const compressedFilesPromises = validFiles.map(async file => {
			const options = {
				maxSizeMB: 1, // Maximum size in MB
				maxWidthOrHeight: 1024, // Maximum width or height in pixels
				useWebWorker: true, // Use web worker for faster compression
			};
			try {
				const compressedFile = await imageCompression(file, options);
				return {
					file: compressedFile,
					preview: URL.createObjectURL(compressedFile),
				};
			} catch (error) {
				console.error('Error compressing image:', error);
				return {
					file,
					preview: URL.createObjectURL(file),
				};
			}
		});

		const compressedFiles = await Promise.all(compressedFilesPromises);

		//   console.log('compressedFiles', compressedFiles)

		setImages(prevImages => [...prevImages, ...compressedFiles]);
	};

	const handleDeleteImage = index => {
		setImages(images.filter((_, i) => i !== index));
	};

	const handleSubmit = async e => {
		await setLoading(true);

		const result = await handleSave(e);
		// return;
		if (result.statusText === 'OK') {
			// setOpenPrint(true);
			setLoading(false);
			history.goBack();
			// generateQrCode(idNumber);
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = async () => {
		const _bulan = moment(date).format('yyyy-MM');
		const _lrv = listMasterLrv.find(x => x._id === formLrv);
		const _dataRow = dataRow?.dataRow;

		// ========================= Start Image =====================
		let respon;
		let newImage;
		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			respon = await ApiOperational.postManyImage('asp/cabinRide', formData);
		}
		if (type === 'Edit') {
			const _dataRow = dataRow?.dataRow;
			// if (_dataRow?.photo !== null) {
			// 	const _imageNew = respon?.statusText === 'OK' ? respon.data : null;
			// 	if (_imageNew === null) {
			// 		newImage = _dataRow?.photo;
			// 	} else {
			// 		newImage = {
			// 			..._dataRow?.photo,
			// 			uploadedFiles: [
			// 				..._dataRow?.photo?.uploadedFiles,
			// 				..._imageNew?.uploadedFiles,
			// 			],
			// 		};
			// 	}
			// } else {
			// 	newImage = respon?.statusText === 'OK' ? respon.data : null;
			// }
		} else {
			newImage = respon?.statusText === 'OK' ? respon.data : null;
		}
		// ========================= End Image =====================

		let _dataInfo;
		if (_dataRow?.information?.length > 0) {
			_dataInfo = {
				supervisorProfile: userProfile,
				cabinRide: allData, // data cabin ride
				photo: newImage,
				vehicleNumber: _lrv, // nomor sarana
				kaService: formKa, // dinas KA
				note: formNote, // catatan
				status: 'Menunggu Konfirmasi', // status
				dateCreated: new Date(),
				officerStart: formStart,
				officerEnd: formEnd,
				dateUpdate: null,
				supervisorUpdate: null,
			};
		} else {
			_dataInfo = [
				{
					supervisorProfile: userProfile,
					cabinRide: allData, // data cabin ride
					photo: newImage,
					vehicleNumber: _lrv, // nomor sarana
					kaService: formKa, // dinas KA
					note: formNote, // catatan
					status: 'Menunggu Konfirmasi', // status
					dateCreated: new Date(),
					officerStart: formStart,
					officerEnd: formEnd,
					dateUpdate: null,
					supervisorUpdate: null,
				},
			];
		}

		// console.log('pos data', _dataRow?._id, postData);
		// return;
		if (_dataRow?.information?.length > 0) {
			const postData = _dataInfo;
			return ApiOperational.postInfoCabinRideNew(_dataRow?._id, postData);
		} else {
			const postData = {
				monthly: _bulan, //  2024-08
				information: _dataInfo,
				// supervisorProfile: _penyelia,
				driverProfile: {
					officerId: dataRow?._id,
					officerName: dataRow?.name,
					officerIdPosition: dataRow?.jobPosition?._id,
					officerPosition: dataRow?.jobPosition?.name,
					officerDepartemen: dataRow?.departement?.name,
					officerNumber: dataRow?.idNumber, // nipp
				}, // masinis
			};
			return ApiOperational.postCabinRideNew(postData);
		}
	};

	useEffect(() => {
		getDataMasterCabinRide();
		getDataNoGoItem(); // master lrv
	}, []);

	useEffect(() => {
		// const newData = List_Data.map((item) => ({
		//   ...item,
		//   description: item.description.map((xy) => ({
		//     ...xy,
		//     realization: "",
		//     note: "",
		//   })),
		// }));
		const newData = masterCabinRide.map(item => ({
			...item,
			desc: item.desc.map(xy => ({
				...xy,
				realization: '',
				note: '',
			})),
		}));

		setAllData(newData);
	}, [List_Data, masterCabinRide]);

	console.log('data row', dataRow);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff' }}>
			<Container maxWidth="xl">
				<Grid
					container
					justifyContent="space-between"
					alignItems={'center'}
					spacing={2}
				>
					<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
						<HeaderV1
							title="Cabin Ride"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Cabin Ride"
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={3}>
								<Typography>Nama ASP</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{': ' + ' ' + dataRow?.name}</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography>NIK</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{': ' + ' ' + dataRow?.idNumber}</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography>Tanggal</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{': ' + ' ' + date}</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={3}>
								<Typography>No. LRV</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								{/* <AppTextField
									fullWidth
									size="small"
									// label=""
									sx={{ mt: '0px' }}
									value={formLrv}
									onChange={e => setFormLrv(e.target.value)}
								/> */}
								<AppTextField
									fullWidth
									size="small"
									// label="Lrv"
									select
									sx={{ mt: '0px' }}
									SelectProps={{
										native: true,
										IconComponent: KeyboardArrowDown,
									}}
									value={formLrv}
									onChange={e => setFormLrv(e.target.value)}
								>
									<option value=""></option>
									{listMasterLrv.map(item => {
										return <option value={item?._id}>{item?.numberLrv}</option>;
									})}
								</AppTextField>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography>No. KA</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<AppTextField
									fullWidth
									size="small"
									// label="Catatan"
									sx={{ mt: '0px' }}
									value={formKa}
									onChange={e => setFormKa(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography>Jam</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Box sx={{ display: 'flex', gap: 2 }}>
									<TextField
										fullWidth
										label="Start"
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
										label="End"
										type="time"
										value={formEnd}
										onChange={e => setFormEnd(e.target.value)}
									/>
								</Box>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={12}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{allData.map((item, index) => {
										const dec = item.desc;
										const total = dec.length;
										return (
											<React.Fragment key={index}>
												<TableRow key={index}>
													<TableCell>{index + 1}</TableCell>
													<TableCell colSpan={5}>{item.question}</TableCell>
												</TableRow>
												{dec.map(xy => {
													return (
														<TableRow>
															<TableCell colSpan={2}></TableCell>
															<TableCell>{xy.label}</TableCell>
															<TableCell>{xy.value}</TableCell>
															<TableCell>
																<AppTextField
																	size="small"
																	type="number"
																	sx={{ mt: '0px', width: '100px' }}
																	value={xy.realization}
																	onChange={e =>
																		handleChangeRealisasi(
																			item._id,
																			xy._id,
																			e.target.value
																		)
																	}
																/>
															</TableCell>
															<TableCell>
																<AppTextField
																	fullWidth
																	size="small"
																	sx={{ mt: '0px' }}
																	value={xy.note || ''}
																	onChange={e =>
																		handleChangeNote(
																			item._id,
																			xy._id,
																			e.target.value
																		)
																	}
																/>
															</TableCell>
														</TableRow>
													);
												})}
											</React.Fragment>
										);
									})}
								</>
							}
						/>
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
						<AppTextField
							fullWidth
							size="small"
							label="Catatan"
							sx={{ mt: '0px' }}
							multiline
							rows={4}
							value={formNote}
							onChange={e => setFormNote(e.target.value)}
						/>
					</Grid>

					{type === 'Edit' ? (
						<>
							<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
								<Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
									Dokumentasi
								</Typography>
							</Grid>
							{dataRow?.dataRow?.photo !== null ? (
								<>
									{dataRow?.dataRow?.photo?.uploadedFiles.map(item => {
										const photoFile = item.uploadedName;
										const photoPath = dataRow?.dataRow?.photo
											? dataRow?.dataRow?.photo?.path
											: '';
										return (
											<Grid item xs={12} sm={6} md={4}>
												<Box
													sx={{
														width: '300px',
														height: '300px',
													}}
												>
													<img
														src={
															StaticVar.URL_API +
															'/uploads' +
															`/${photoPath}` +
															`/${photoFile}`
														}
														style={{
															width: '100%',
															height: '100%',
															objectFit: 'cover',
														}}
													/>
												</Box>
											</Grid>
										);
									})}
								</>
							) : (
								<Grid item xs={12} sm={12}>
									<Alert severity="info" sx={{ maxWidth: '500px' }}>
										Data dokumentasi kosong
									</Alert>
								</Grid>
							)}
						</>
					) : null}

					<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
						<MultiUpload
							images={images}
							errors={errors}
							handleImageChange={handleImageChange}
							handleDeleteImage={handleDeleteImage}
							status={statusUpload}
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
							<Button variant="contained" onClick={handleSubmit}>
								Simpan
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Form;
