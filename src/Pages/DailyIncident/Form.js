import React, { useState, Fragment, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
	Alert,
	Typography,
	Container,
	Grid,
	Box,
	Paper,
	Button,
	TableRow,
	Table,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	Snackbar,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Player } from 'video-react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import '../../../node_modules/video-react/dist/video-react.css';
import CreatableSelect from 'react-select/creatable';
import imageCompression from 'browser-image-compression';

import useStyles, { form, border, selectBoxStyles } from './Styles';

import useUploadVideo from 'Hooks/Upload/useUploadVideo';
import UseDailyIncident from 'Hooks/DailyIncident/useDailyIncident';
import UseDailyWork from 'Hooks/DailyWork/useDailyWork';
import useUploadImg from 'Hooks/Upload/useUploadImg';
import MasterDataIncident from 'Hooks/MasterDataIncident/MasterDataIncident';
import StaticVar from 'Config/StaticVar';

import ContentEditor from '../../Component/ContentEditor';
import MultiUploadV1 from 'Component/MultiUpload/MultiUploadV1';
import useQuery from 'Utils/QueryParams';
import Typography16 from 'Component/Typography/Typography16';
import Typography14 from 'Component/Typography/Typography14';

export default function DailyIncidentForm(props) {
	const classes = useStyles();
	let query = useQuery();
	const id = props?.id ? props.id : query.get('id');
	const action = props?.action ? props.action : query.get('action');

	const history = useHistory();

	const {
		handleMultiInputImage,
		multiUploadedImage,
		multiImage,
		setMultiImage,
		handleMultiUploadImgBase,
		dialogDelete,
		// handleDeleteImage,
		videoSrc,
		setVideoSrc,
		handleOpenDialogDelete,
		handleUploadVideo,
		handleInputVideo,
		uploadedVideo,
		handleOpenDialogVideoDelete,
		dialogVideoDelete,
		handleCloseDialogDelete,
		handleDeleteVideo,
		loader,
		deleteIdImage,
		setLoader,
	} = useUploadImg();

	const {
		reporterName,
		setReporterName,
		timeIncident,
		setTimeIncident,
		location,
		setLocation,
		locationSpecific,
		setLocationSpecific,
		equipment,
		setEquipment,
		taggingNumber,
		setTaggingNumber,
		description,
		setDescription,
		status,
		setStatus,
		dailyIncident,
		updateDataDailyIncident,
		setOpenSnackbar,
		openSnackbar,
		typeMedia,
		setTypeMedia,
		controlProps,
		serviceRequestNumber,
		setServiceRequestNumber,
		getDataDailyIncident,
		submitDataDailyIncident,
	} = UseDailyIncident();

	const {
		locationIncident,
		selectLocationIncident,
		setSelectLocationIncident,
		newLocationIncident,
		newNameLocationIncident,
		setNewNameLocationIncident,
		newCodeLocationIncident,
		setNewCodeLocationIncident,
		handleChangeLocationIncident,
		handleSubmitNewLocationIncident,
		// **** //
		statusIncident,
		selectStatusIncident,
		setSelectStatusIncident,
		newStatusIncident,
		newNameStatusIncident,
		setNewNameStatusIncident,
		newCodeStatusIncident,
		setNewCodeStatusIncident,
		handleChangeStatusIncident,
		handleSubmitNewStatusIncident,
		// **** //
		equipmentIncident,
		selectEquipmentIncident,
		setSelectEquipmentIncident,
		newEquipmentIncident,
		newNameEquipmentIncident,
		setNewNameEquipmentIncident,
		newCodeEquipmentIncident,
		setNewCodeEquipmentIncident,
		handleChangeEquipmentIncident,
		handleSubmitNewEquipmentIncident,
		// **** //
		specificLoactionIncident,
		selectSpecificLocationIncident,
		setSelectSpecificLocationIncident,
		newSpecificLocationIncident,
		newNameSpecificLocationIncident,
		setNewNameSpecificLocationIncident,
		newCodeSpecificLocationIncident,
		setNewCodeSpecificLocationIncident,
		handleChangeSpecificLocationIncident,
		handleSubmitNewSpecificLocationIncident,
	} = MasterDataIncident();

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);
	const [dataImages, setDataImages] = useState(null);

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

		// const newImages = validFiles.map(file => ({
		// 	file,
		// 	preview: URL.createObjectURL(file),
		// }));

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

		setImages(prevImages => [...prevImages, ...compressedFiles]);
	};

	const handleDeleteImage = index => {
		setImages(images.filter((_, i) => i !== index));
	};

	const fetchData = async () => {
		if (props?.dataDetail) {
			setReporterName(props?.dataDetail?.reporterName);
			// if (props?.dataDetail.file.length > 0) {
			// 	setTypeMedia(props?.dataDetail.file[0].type);
			// 	if (props?.dataDetail.file[0].type === 'image') {
			// 		setMultiImage(props?.dataDetail.file);
			// 	} else {
			// 		setVideoSrc(props?.dataDetail.file);
			// 	}
			// }
			if (Array.isArray(props?.dataDetail?.file)) {
			} else {
				setDataImages(props?.dataDetail?.file);
			}
			setTimeIncident(
				moment(props?.dataDetail?.timeIncident).format('YYYY-MM-DDTHH:mm')
			);
			// setLocation(props?.dataDetail?.location);
			// setLocationSpecific(props?.dataDetail?.locationSpecific);
			// setEquipment(props?.dataDetail?.equipment);
			setSelectLocationIncident(props?.dataDetail?.location);
			setSelectSpecificLocationIncident(props?.dataDetail?.locationSpecific);
			setSelectEquipmentIncident(props?.dataDetail?.equipment);
			setTaggingNumber(props?.dataDetail?.taggingNumber);
			setDescription(props?.dataDetail?.description);
			// setStatus(props?.dataDetail?.status);
			setSelectStatusIncident(props?.dataDetail?.status);
			setServiceRequestNumber(props?.dataDetail?.serviceRequestNumber);
		} else if (id) {
			const response = await getDataDailyIncident({ id });
			if (response.status === 'OK' && response.result.length > 0) {
				const data = response.result[0];
				setReporterName(response.result[0]?.reporterName);
				// if (response.result[0].file.length > 0) {
				// 	setTypeMedia(response.result[0].file[0].type);
				// 	if (response.result[0].file[0].type === 'image') {
				// 		setMultiImage(response.result[0].file);
				// 	} else {
				// 		setVideoSrc(response.result[0].file);
				// 	}
				// }
				if (Array.isArray(data?.file)) {
				} else {
					setDataImages(data?.file);
				}
				setTimeIncident(
					moment(response.result[0]?.timeIncident).format('YYYY-MM-DDTHH:mm')
				);
				// setLocation(response.result[0]?.location);
				// setLocationSpecific(response.result[0]?.locationSpecific);
				// setEquipment(response.result[0]?.equipment);
				setSelectLocationIncident(response.result[0]?.location);
				setSelectSpecificLocationIncident(response.result[0]?.locationSpecific);
				setSelectEquipmentIncident(response.result[0]?.equipment);
				setTaggingNumber(response.result[0]?.taggingNumber);
				setDescription(response.result[0]?.description);
				// setStatus(response.result[0]?.status);
				setSelectStatusIncident(response.result[0]?.status);
				setServiceRequestNumber(response.result[0]?.serviceRequestNumber);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Snackbar
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={openSnackbar}
				onClose={() => setOpenSnackbar(false)}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity="success"
					sx={{ width: '100%' }}
				>
					Berhasil Mengirim Data Kejadian Harian
				</Alert>
			</Snackbar>

			{/* Dialog Hapus */}
			<Dialog
				open={dialogDelete}
				onClose={handleCloseDialogDelete}
				aria-labelledby="delete-verification"
				aria-describedby="delete-verification"
			>
				<DialogTitle id="delete-verification">
					{'Apakah Anda yakin ingin menghapus gambar ini?'}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDialogDelete}>Batal</Button>
					<Button
						onClick={async () => {
							const response = await handleDeleteImage();
							let responseImage = await multiImage.filter(
								item => item.file !== deleteIdImage
							);
							setMultiImage(responseImage);
						}}
						autoFocus
					>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={dialogVideoDelete}
				onClose={handleCloseDialogDelete}
				aria-labelledby="delete-verification"
				aria-describedby="delete-verification"
			>
				<DialogTitle id="delete-verification">
					{'Apakah Anda yakin ingin menghapus Video ini?'}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDialogDelete}>Batal</Button>
					<Button
						onClick={async () => {
							await handleDeleteVideo();
						}}
						autoFocus
					>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>

			{/* Loader */}
			<Backdrop
				sx={{ color: '#fff', zIndex: 99999 }}
				open={loader}
				onClick={() => setLoader(false)}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Container maxWidth="xl" sx={{ pt: 13 }}>
				<Paper sx={{ padding: '20px 50px 50px 50px' }}>
					<Typography variant="h4" align="center" sx={{ my: 3 }}>
						KEJADIAN HARIAN
					</Typography>
					<Table style={{ width: '100%' }}>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Nama Pelapor</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<TextField
									value={reporterName}
									onChange={e => setReporterName(e.target.value)}
									type="text"
									InputProps={{
										style: {
											width: 500,
											fontSize: 12,
											height: 33,
											backgroundColor: '#fff',
											border: 'none',
											borderRadius: 7,
											padding: 0,
										},
									}}
									sx={{
										width: 500,
										padding: 0,
									}}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>File</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'edit' && (
									<>
										{dataImages ? (
											<Box>
												<Typography16 title="FILE PENDUKUNG" fontWeight={600} />
												<Box sx={{ mt: 1, display: 'flex', gap: '10px' }}>
													{dataImages?.uploadedFiles?.map(item => {
														return (
															<Box sx={{ width: '250px' }}>
																<img
																	src={
																		StaticVar.URL_API +
																		'/uploads' +
																		`/${dataImages?.path}` +
																		`/${item?.uploadedName}`
																	}
																	style={{
																		objectFit: 'cover',
																		height: '220px',
																		width: '100%',
																	}}
																/>
															</Box>
														);
													})}
												</Box>
											</Box>
										) : (
											<Box sx={{ mb: 2 }}>
												<Typography14 title="Files Kosong" />
											</Box>
										)}
									</>
								)}
								<MultiUploadV1
									images={images}
									errors={errors}
									handleImageChange={handleImageChange}
									handleDeleteImage={handleDeleteImage}
									status={statusUpload}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Waktu Kejadian</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<TextField
									value={timeIncident}
									onChange={e => setTimeIncident(e.target.value)}
									type="datetime-local"
									InputProps={{
										style: {
											width: 500,
											fontSize: 12,
											height: 33,
											backgroundColor: '#fff',
											border: 'none',
											borderRadius: 7,
											padding: 0,
										},
									}}
									sx={{
										width: 500,
										padding: 0,
									}}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Lokasi</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<CreatableSelect
									isMulti
									styles={selectBoxStyles}
									menuPortalTarget={document.body}
									placeholder="Pilih Lokasi"
									options={locationIncident}
									isSearchable={true}
									isClearable={true}
									value={selectLocationIncident}
									onChange={selected =>
										handleChangeLocationIncident(selected ? selected : {})
									}
								/>
								{newLocationIncident ? (
									<Box
										sx={{
											mt: 1,
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography>Nama Lokasi</Typography>
										<TextField
											value={newNameLocationIncident}
											onChange={e => setNewNameLocationIncident(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Nama Lokasi "
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Typography>Kode Lokasi</Typography>
										<TextField
											value={newCodeLocationIncident}
											onChange={e => setNewCodeLocationIncident(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Kode Lokasi"
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Button
											variant="contained"
											sx={{
												color: '#fff',
												bgcolor: '#BB7E36',
												width: 150,
												mt: 1,
												'&:hover': {
													backgroundColor: '#BB7E36',
													color: '#fff',
													border: 'none',
												},
											}}
											onClick={handleSubmitNewLocationIncident}
										>
											Pilih dan Tambah
										</Button>
									</Box>
								) : null}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Lokasi Spesifik</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<CreatableSelect
									isMulti
									styles={selectBoxStyles}
									menuPortalTarget={document.body}
									placeholder="Pilih Lokasi Spesifik"
									options={specificLoactionIncident}
									isSearchable={true}
									isClearable={true}
									value={selectSpecificLocationIncident}
									onChange={selected =>
										handleChangeSpecificLocationIncident(
											selected ? selected : {}
										)
									}
								/>
								{newSpecificLocationIncident ? (
									<Box
										sx={{
											mt: 1,
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography>Nama Lokasi Spesifik</Typography>
										<TextField
											value={newNameSpecificLocationIncident}
											onChange={e =>
												setNewNameSpecificLocationIncident(e.target.value)
											}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Nama Lokasi Spesifik "
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Typography>Kode Lokasi Spesifik</Typography>
										<TextField
											value={newCodeSpecificLocationIncident}
											onChange={e =>
												setNewCodeSpecificLocationIncident(e.target.value)
											}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Kode Lokasi Spesifik"
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Button
											variant="contained"
											sx={{
												color: '#fff',
												bgcolor: '#BB7E36',
												width: 150,
												mt: 1,
												'&:hover': {
													backgroundColor: '#BB7E36',
													color: '#fff',
													border: 'none',
												},
											}}
											onClick={handleSubmitNewSpecificLocationIncident}
										>
											Pilih dan Tambah
										</Button>
									</Box>
								) : null}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Equipment</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<CreatableSelect
									isMulti
									styles={selectBoxStyles}
									menuPortalTarget={document.body}
									placeholder="Pilih Equipment"
									options={equipmentIncident}
									isSearchable={true}
									isClearable={true}
									value={selectEquipmentIncident}
									onChange={selected =>
										handleChangeEquipmentIncident(selected ? selected : {})
									}
								/>
								{newEquipmentIncident ? (
									<Box
										sx={{
											mt: 1,
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography>Nama Equipment</Typography>
										<TextField
											value={newNameEquipmentIncident}
											onChange={e =>
												setNewNameEquipmentIncident(e.target.value)
											}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Nama Equipment "
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Typography>Kode Equipment</Typography>
										<TextField
											value={newCodeEquipmentIncident}
											onChange={e =>
												setNewCodeEquipmentIncident(e.target.value)
											}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Kode Equipment"
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Button
											variant="contained"
											sx={{
												color: '#fff',
												bgcolor: '#BB7E36',
												width: 150,
												mt: 1,
												'&:hover': {
													backgroundColor: '#BB7E36',
													color: '#fff',
													border: 'none',
												},
											}}
											onClick={handleSubmitNewEquipmentIncident}
										>
											Pilih dan Tambah
										</Button>
									</Box>
								) : null}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Tagging No</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<TextField
									value={taggingNumber}
									onChange={e => setTaggingNumber(e.target.value)}
									type="text"
									InputProps={{
										style: {
											width: 500,
											fontSize: 12,
											height: 33,
											backgroundColor: '#fff',
											border: 'none',
											borderRadius: 7,
											padding: 0,
										},
									}}
									sx={{
										width: 500,
										padding: 0,
									}}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>No. Service</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<TextField
									value={serviceRequestNumber}
									onChange={e => setServiceRequestNumber(e.target.value)}
									type="text"
									InputProps={{
										style: {
											width: 500,
											fontSize: 12,
											height: 33,
											backgroundColor: '#fff',
											border: 'none',
											borderRadius: 7,
											padding: 0,
										},
									}}
									sx={{
										width: 500,
										padding: 0,
									}}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '35%' }}>
								<Typography>Deskripsi</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<TextField
									value={description}
									onChange={e => setDescription(e.target.value)}
									type="text"
									InputProps={{
										style: {
											width: 500,
											fontSize: 12,
											height: 33,
											backgroundColor: '#fff',
											border: 'none',
											borderRadius: 7,
											padding: 0,
										},
									}}
									sx={{
										width: 500,
										padding: 0,
									}}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Status</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<CreatableSelect
									isMulti
									styles={selectBoxStyles}
									menuPortalTarget={document.body}
									placeholder="Pilih Status"
									options={statusIncident}
									isSearchable={true}
									isClearable={true}
									value={selectStatusIncident}
									onChange={selected =>
										handleChangeStatusIncident(selected ? selected : {})
									}
								/>
								{newStatusIncident ? (
									<Box
										sx={{
											mt: 1,
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography>Nama Status</Typography>
										<TextField
											value={newNameStatusIncident}
											onChange={e => setNewNameStatusIncident(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Nama Status "
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Typography>Kode Status</Typography>
										<TextField
											value={newCodeStatusIncident}
											onChange={e => setNewCodeStatusIncident(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
											placeholder="Kode Status"
											sx={{ width: '100%' }}
											InputProps={{
												style: {
													fontSize: 12,
													height: 40,
													backgroundColor: '#fff',
												},
											}}
											fullWidth
										/>
										<Button
											variant="contained"
											sx={{
												color: '#fff',
												bgcolor: '#BB7E36',
												width: 150,
												mt: 1,
												'&:hover': {
													backgroundColor: '#BB7E36',
													color: '#fff',
													border: 'none',
												},
											}}
											onClick={handleSubmitNewStatusIncident}
										>
											Pilih dan Tambah
										</Button>
									</Box>
								) : null}
							</TableCell>
						</TableRow>
					</Table>
				</Paper>

				{props?.action ? null : (
					<Grid
						container
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							paddingBottom: 5,
						}}
					>
						<Button
							variant="contained"
							onClick={() => history.goBack()}
							sx={{
								color: '#A56C28',
								bgcolor: '#fff',
								border: '2px solid #A56C28',
								width: 300,
								fontSize: 18,
								mr: 3,
								mt: 3,
								'&:hover': {
									backgroundColor: '#BB7E36',
									color: '#fff',
									border: 'none',
								},
							}}
						>
							<ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
						</Button>
						{/* {action === 'edit' || action === 'add' ? (
							<Button
								onClick={async () => {
									if (id) {
										const response = await updateDataDailyIncident(
											id,
											typeMedia === 'image' ? multiImage : videoSrc,
											action === 'edit' ? new Date() : null
										);
										if (response.status === 'OK') {
											history.push('/app/operational/dailyIncident');
										}
									} else {
										const response = await submitDataDailyIncident(
											typeMedia === 'image' ? multiImage : videoSrc,
											action === 'edit' ? new Date() : null
										);
										if (response.status === 'OK') {
											history.push('/app/operational/dailyIncident');
										}
									}
								}}
								variant="contained"
								sx={{
									color: '#fff',
									bgcolor: '#BB7E36',
									border: '1px solid #A56C28',
									width: 300,
									fontSize: 18,
									ml: 3,
									mt: 3,
									'&:hover': {
										backgroundColor: '#BB7E36',
										color: '#fff',
										border: 'none',
									},
								}}
							>
								Submit
							</Button>
						) : null} */}
						<Button
							onClick={async () => {
								const response = await updateDataDailyIncident(
									id,
									// typeMedia === 'image' ? multiImage : videoSrc,
									// action === 'edit' ? new Date() : null,
									images,
									selectLocationIncident,
									selectSpecificLocationIncident,
									selectEquipmentIncident,
									selectStatusIncident,
									dataImages
								);
								if (response.status === 'OK') {
									history.push('/app/operational/dailyIncident');
								}
							}}
							variant="contained"
							sx={{
								color: '#fff',
								bgcolor: '#BB7E36',
								border: '1px solid #A56C28',
								width: 300,
								fontSize: 18,
								ml: 3,
								mt: 3,
								'&:hover': {
									backgroundColor: '#BB7E36',
									color: '#fff',
									border: 'none',
								},
							}}
						>
							Submit
						</Button>
					</Grid>
				)}
			</Container>
		</>
	);
}

{
	/*  */
}
