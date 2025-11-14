import React, { useContext, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	TableCell,
	TableRow,
	Typography,
	RadioGroup,
	Radio,
	FormControlLabel,
	Stack,
	Alert,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
import imageCompression from 'browser-image-compression';
import { KeyboardArrowDown } from '@mui/icons-material';

// style
import { judulTextStyle } from './Styles';

// data
import { List_Data } from './Data';

import ApiOperational from '../../Services/ApiOperational';

import AppTextField from '../../Component/input-fields/AppTextField';
import MultiUpload from 'Component/MultiUpload/MultiUploadV1';
import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import CustomHeaderTable from './component/CustomHeaderTable';
import ProfilV1 from 'Component/UserProfil/ProfilV1';
import ProfilV2 from 'Component/UserProfil/ProfilV2';

import { UserProfilContext } from 'Context';
import { MasterLrvContext } from 'Context';
import { StamformasiContext } from 'Context';
import StaticVar from 'Config/StaticVar';
import MultiUploadFile from 'Component/MultiUpload/MultiUploadFile';

function Form() {
	const location = useLocation();
	const { dataRow, type } = location.state;
	const history = useHistory();

	// context
	const { userProfile, userById } = useContext(UserProfilContext);
	const { listMasterLrv, getDataNoGoItem } = useContext(MasterLrvContext);
	const { dataStamformasi, getDataStamformasi } =
		useContext(StamformasiContext);

	const [dataItem, setDataItem] = useState([]);
	const [formNumber, setFormNumber] = useState('');
	const [formDinas, setFormDinas] = useState('');
	const [formPemeriksa, setFormPemeriksa] = useState({
		officerName: '',
		officerPosition: '',
		officerDepartemen: '',
	});
	const [formSupervisor, setFormSupervisor] = useState({
		officerName: '',
		officerPosition: '',
		officerDepartemen: '',
	});

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const [files, setFiles] = useState([]);
	const [errorsFiles, setErrorsFiles] = useState([]);
	const [statusUploadFiles, setStatusUploadFiles] = useState(false);

	const dataHeader = [
		'NO',
		'ITEM',
		'KONDISI',
		'JUMLAH',
		'KETERANGAN',
	];

	const handleChangeKondisi = (name, value) => {
		setDataItem(prevState =>
			prevState.map(item =>
				item.element === name ? { ...item, condition: value } : item
			)
		);
	};

	const handleChangeJumlah = (name, value) => {
		setDataItem(prevState =>
			prevState.map(item =>
				item.element === name ? { ...item, amount: value } : item
			)
		);
	};

	const handleChangeNote = (name, value) => {
		setDataItem(prevState =>
			prevState.map(item =>
				item.element === name ? { ...item, note: value } : item
			)
		);
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
		// if (formNumber === '' || formDinas === '') {
		// 	alert('Silahkan isi yang kosong');
		// 	return;
		// }

		// ========================= Start Image =====================
		let respon;
		let newImage;
		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			respon = await ApiOperational.postManyImage('asp/nogoitem', formData);
		}
		if (type === 'Edit' || type === 'Approve') {
			const _dataRow = dataRow?.dataRow;
			if (_dataRow?.photo !== null) {
				const _imageNew = respon?.statusText === 'OK' ? respon.data : null;
				if (_imageNew === null) {
					newImage = _dataRow?.photo;
				} else {
					newImage = {
						..._dataRow?.photo,
						uploadedFiles: [
							..._dataRow?.photo?.uploadedFiles,
							..._imageNew?.uploadedFiles,
						],
					};
				}
			} else {
				newImage = respon?.statusText === 'OK' ? respon.data : null;
			}
		} else {
			newImage = respon?.statusText === 'OK' ? respon.data : null;
		}
		// ========================= End Image =====================

		// ========================= Start File =====================
		let responFile;
		let newFile;
		if (files.length > 0) {
			const formData = new FormData();
			files.forEach(image => {
				formData.append('files', image.file);
			});
			responFile = await ApiOperational.postManyImage('asp/nogoitem', formData);
		}
		if (type === 'Edit' || type === 'Approve') {
			const _dataRow = dataRow?.dataRow;
			if (_dataRow?.files !== null) {
				const _fileNew =
					responFile?.statusText === 'OK' ? responFile.data : null;
				if (_fileNew === null) {
					newFile = _dataRow?.files;
				} else {
					newFile = {
						..._dataRow?.files,
						uploadedFiles: [
							..._dataRow?.files?.uploadedFiles,
							..._fileNew?.uploadedFiles,
						],
					};
				}
			} else {
				newFile = responFile?.statusText === 'OK' ? responFile.data : null;
			}
		} else {
			newFile = responFile?.statusText === 'OK' ? responFile.data : null;
		}
		// ========================= End File =====================

		let _lrv = dataStamformasi[0]?.readyOperationList.find(
			x => x._id === formNumber
		);

		let _user; // tim pemeriksa
		let _status; // status
		if (type === 'Approve') {
			_user = dataRow?.dataRow?.dcInspector;
			_status = 'Disetujui';
		} else {
			if (userById) {
				const _role = userById?.role[0];
				_user = {
					officerId: userById?._id,
					officerName: userById?.name,
					officerIdPosition: _role?._id,
					officerPosition: _role?.name,
					officerDepartemen: '',
					officerNumber: '', // nipp/id profile
				};
				_status = 'Belum Disetujui';
			}
		}

		const postData = {
			date: moment().format("YYYY-MM-DD"),//dataRow?.dataWorkOrder?.operationalData?.Tanggal, // tanggal
			vehicleNumber: {
				numberLrv: dataRow?.numberLrv,
				_id: dataRow?._id
			}, // _lrv, // nomor sarana / lrv
			kaService: dataRow?.dataWorkOrder?.operationalData?.kaNumber || dataRow?.operationalData?.kaNumber, //formDinas, // dinas KA
			masinis: dataRow?.dataWorkOrder?.profile, // profile masinis
			dcInspector: _user, // profile pemeriksa
			dcSupervisor: null, // profile supervisor
			station: dataRow.station, // stasiun
			informationService: {
				code: dataRow?.dataWorkOrder?.workOrder?.code,
				index: dataRow?.dataWorkOrder?.workOrder?.index,
				shift: dataRow?.dataWorkOrder?.workOrder?.shift,
				start: dataRow?.dataWorkOrder?.workOrder?.start,
				end: dataRow?.dataWorkOrder?.workOrder?.end,
				id: dataRow?.dataWorkOrder?.workOrder?._id,
			}, // info dinasan
			items: dataItem,
			status: _status,
			photo: newImage,
			files: newFile,
		};

		const postEditData = {
			kaService: dataRow?.dataWorkOrder?.operationalData?.kaNumber || dataRow?.operationalData?.kaNumber, //formDinas, // dinas KA
			masinis: dataRow?.profile, // profile masinis
			dcInspector: _user, // profile pemeriksa
			dcSupervisor: null, // profile supervisor
			station: dataRow.station, // stasiun
			items: dataItem,
			informationService: {
				code: dataRow?.workOrder?.code,
				index: dataRow?.workOrder?.index,
				shift: dataRow?.workOrder?.shift,
				start: dataRow?.workOrder?.start,
				end: dataRow?.workOrder?.end,
				id: dataRow?.workOrder?._id,
			}, // info dinasan
			status: _status,
			photo: newImage,
			files: newFile,
		};

		// console.log(postData);
		// return;
		if (type === 'Edit' || type === 'Approve') {
			return ApiOperational.updateNoGoItem(dataRow?.dataRow?._id, postEditData);
		} else {
			return ApiOperational.postNoGoItem(postData);
		}
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

		event.target.value = '';
	};

	const handleDeleteImage = index => {
		setImages(images.filter((_, i) => i !== index));
	};

	const handleFileChange = async event => {
		const files = Array.from(event.target.files);
		const maxSize = 1 * 1024 * 1024; // 1MB in bytes

		const validFiles = files.filter(
			file =>
				[
					'application/pdf',
					// 'application/msword',
					// 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					// 'application/vnd.ms-excel',
					// 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					// 'text/plain',
				].includes(file.type) && file.size <= maxSize
		);

		const errors = [];
		if (validFiles.length !== files.length) {
			errors.push(
				'Beberapa file tidak valid. Pastikan format sesuai (PDF, DOC, DOCX, XLS, XLSX, TXT) dan ukuran tidak lebih dari 1MB.'
			);
		}

		const processedFiles = validFiles.map(file => ({
			file,
			name: file.name,
			size: file.size,
		}));

		setFiles(prevFiles => [...prevFiles, ...processedFiles]);
		setErrors(errors);

		event.target.value = '';
	};

	const handleDeleteFile = index => {
		setFiles(files.filter((_, i) => i !== index));
	};

	const getDataById = () => {
		
		const _dataRow = dataRow?.dataRow;
		setFormNumber(_dataRow?.vehicleNumber?.numberLrv);
		setFormDinas(_dataRow?.kaService || dataRow?.operationalData?.kaNumber);
		setDataItem(_dataRow?.items);
	};

	useEffect(() => {
		console.log('dataRow', dataRow)
		if (type === 'Edit' || type === 'Approve') {
			getDataById();
		} else {
			const _list = List_Data.map(item => {
				return {
					element: item,
					condition: 'Baik',
					amount: '',
					note: '',
				};
			});
			setDataItem(_list);
		}
	}, [dataRow]);

	useEffect(() => {
		// getDataNoGoItem();
		getDataStamformasi({
			operationDate: moment(new Date()).format('YYYY-MM-DD'),
		});
	}, []);

	// console.log('data LRV', moment(new Date()).format('YYYY-MM-DD'));

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				{/* {JSON.stringify(dataRow)} */}

				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 1 }}>
						{/* <Typography sx={judulTextStyle}>Form No Go Item</Typography> */}
						<HeaderV1
							title="Go No Go Item"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Form Go No Go Item"
						/>
					</Grid>
					<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
						{(userProfile?.officerPosition === 'Penyelia' &&
							userProfile?.officerCode) ||
						(userProfile?.officerPosition === 'Masinis' &&
							userProfile?.officerCode) ? (
							<ProfilV1 />
						) : (
							<ProfilV2 userProfile={userById} />
						)}
					</Grid>

					<Grid item xs={12} sm={4}>
						<AppTextField
							fullWidth
							size="small"
							// label="Tanggal"
							sx={{ mt: '0px' }}
							value={moment(dataRow?.dailyWorkDate).format('DD/MM/yyyy')}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<AppTextField
							fullWidth
							size="small"
							label="Nomor Sarana"
							disabled={true}
							// select
							sx={{ mt: '0px' }}
							// SelectProps={{
							// 	native: true,
							// 	IconComponent: KeyboardArrowDown,
							// }}
							value={formNumber || dataRow.numberLrv}
							onChange={e => setFormNumber(e.target.value)}/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<AppTextField
							fullWidth
							size="small"
							label="Dinas KA"
							disabled={true}
							sx={{ mt: '0px' }}
							value={formDinas || dataRow?.dataWorkOrder?.operationalData?.kaNumber}
							onChange={e => setFormDinas(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{dataItem?.map((item, index) => {
										return (
											<TableRow>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{item.element}</TableCell>
												<TableCell>
													<RadioGroup
														row
														value={item.condition}
														onChange={e =>
															handleChangeKondisi(item.element, e.target.value)
														}
													>
														<FormControlLabel
															value="Baik"
															control={<Radio size="small" />}
															label="Baik"
														/>
														<FormControlLabel
															value="Rusak"
															control={<Radio size="small" />}
															label="Rusak"
														/>
													</RadioGroup>
												</TableCell>
												<TableCell>
													<AppTextField
														fullWidth
														size="small"
														type="number"
														sx={{ mt: '0px' }}
														value={item.amount}
														onChange={e =>
															handleChangeJumlah(item.element, e.target.value)
														}
													/>
												</TableCell>
												<TableCell>
													<AppTextField
														fullWidth
														size="small"
														sx={{ mt: '0px' }}
														value={item.note}
														onChange={e =>
															handleChangeNote(item.element, e.target.value)
														}
													/>
												</TableCell>
											</TableRow>
										);
									})}
								</>
							}
						/>
					</Grid>

					<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
						<Grid container spacing={1}>
							{type === 'Edit' || type === 'Approve' ? (
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
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
						<Grid container spacing={1}>
							{type === 'Edit' || type === 'Approve' ? (
								<>
									<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
										<Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
											Dokumen
										</Typography>
									</Grid>

									{dataRow?.dataRow?.files !== null ? (
										<>
											{dataRow?.dataRow?.files?.uploadedFiles.map(item => {
												const fileName = item.uploadedName;
												const originalName = item.originalName;

												const filePath = dataRow?.dataRow?.files?.path || '';
												const fileUrl = `${StaticVar.URL_API}/uploads/${filePath}/${fileName}`;

												// Menentukan ikon berdasarkan ekstensi file
												const getFileIcon = fileName => {
													const ext = fileName.split('.').pop().toLowerCase();
													if (['pdf'].includes(ext)) return '📄'; // PDF
													return '📁'; // Default
												};

												return (
													<Grid item xs={12} sm={6} md={4} key={fileName}>
														<Box
															sx={{
																display: 'flex',
																alignItems: 'center',
																gap: 1,
																p: 2,
																border: '1px solid #ddd',
																borderRadius: 2,
																width: '100%',
																maxWidth: '300px',
																backgroundColor: '#f9f9f9',
															}}
														>
															<Typography sx={{ fontSize: 30 }}>
																{getFileIcon(fileName)}
															</Typography>
															<Box sx={{ flexGrow: 1 }}>
																<Typography
																	sx={{
																		fontSize: 14,
																		fontWeight: 'bold',
																		wordBreak: 'break-word',
																	}}
																>
																	{originalName}
																</Typography>
																<a
																	href={fileUrl}
																	download={originalName}
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	<Typography
																		sx={{ fontSize: 12, color: 'blue' }}
																	>
																		Lihat Dokumen
																	</Typography>
																</a>
															</Box>
														</Box>
													</Grid>
												);
											})}
										</>
									) : (
										<Grid item xs={12} sm={12}>
											<Alert severity="info" sx={{ maxWidth: '500px' }}>
												Data dokumen kosong
											</Alert>
										</Grid>
									)}
								</>
							) : null}
						</Grid>
					</Grid>

					<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
						<MultiUpload
							images={images}
							errors={errors}
							handleImageChange={handleImageChange}
							handleDeleteImage={handleDeleteImage}
							status={statusUpload}
						/>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
						<MultiUploadFile
							files={files}
							errors={errorsFiles}
							handleFileChange={handleFileChange}
							handleDeleteFile={handleDeleteFile}
							status={statusUploadFiles}
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
							{type === 'Approve' ? (
								<Button variant="contained" onClick={handleSubmit}>
									Konfirmasi
								</Button>
							) : (
								<Button variant="contained" onClick={handleSubmit}>
									Simpan
								</Button>
							)}
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Form;
