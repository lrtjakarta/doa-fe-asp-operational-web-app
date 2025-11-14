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
	Stack,
	IconButton,
	TableBody,
	TableHead,
	TableRow,
	Table,
	TextField,
	Modal,
	Radio,
	Dialog,
	DialogTitle,
	DialogActions,
	Snackbar,
	Backdrop,
	CircularProgress,
	FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useStyles, { form, border } from './Styles';
import useUploadVideo from 'Hooks/Upload/useUploadVideo';
import UseDailyIncident from 'Hooks/DailyIncident/useDailyIncident';
import UseDailyWork from 'Hooks/DailyWork/useDailyWork';
import ContentEditor from '../../Component/ContentEditor';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import StaticVar from 'Config/StaticVar';
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useQuery from 'Utils/QueryParams';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import useUploadImg from 'Hooks/Upload/useUploadImg';

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
		handleDeleteImage,
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

	const fetchData = async () => {
		if (props?.dataDetail) {
			setReporterName(props?.dataDetail?.reporterName);
			if (props?.dataDetail.file.length > 0) {
				setTypeMedia(props?.dataDetail.file[0].type);
				if (props?.dataDetail.file[0].type === 'image') {
					setMultiImage(props?.dataDetail.file);
				} else {
					setVideoSrc(props?.dataDetail.file);
				}
			}
			setTimeIncident(
				moment(props?.dataDetail?.timeIncident).format('YYYY-MM-DDTHH:mm')
			);
			setLocation(props?.dataDetail?.location);
			setLocationSpecific(props?.dataDetail?.locationSpecific);
			setEquipment(props?.dataDetail?.equipment);
			setTaggingNumber(props?.dataDetail?.taggingNumber);
			setDescription(props?.dataDetail?.description);
			setStatus(props?.dataDetail?.status);
			setServiceRequestNumber(props?.dataDetail?.serviceRequestNumber);
		} else if (id) {
			const response = await getDataDailyIncident({ id });
			if (response.status === 'OK' && response.result.length > 0) {
				setReporterName(response.result[0]?.reporterName);
				if (response.result[0].file.length > 0) {
					setTypeMedia(response.result[0].file[0].type);
					if (response.result[0].file[0].type === 'image') {
						setMultiImage(response.result[0].file);
					} else {
						setVideoSrc(response.result[0].file);
					}
				}
				setTimeIncident(
					moment(response.result[0]?.timeIncident).format('YYYY-MM-DDTHH:mm')
				);
				setLocation(response.result[0]?.location);
				setLocationSpecific(response.result[0]?.locationSpecific);
				setEquipment(response.result[0]?.equipment);
				setTaggingNumber(response.result[0]?.taggingNumber);
				setDescription(response.result[0]?.description);
				setStatus(response.result[0]?.status);
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
								{action === 'detail' ? (
									<Typography>{reporterName}</Typography>
								) : (
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>File</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								<Box>
									{action !== 'detail' ? (
										<Box sx={{ py: 1 }}>
											<FormControlLabel
												control={
													<Radio
														{...controlProps('image')}
														sx={{
															color: '#BB7E36',
															'&.Mui-checked': {
																color: '#BB7E36',
															},
														}}
													/>
												}
												label="Gambar"
											/>
											<FormControlLabel
												control={
													<Radio
														{...controlProps('video')}
														sx={{
															color: '#BB7E36',
															'&.Mui-checked': {
																color: '#BB7E36',
															},
														}}
													/>
												}
												label="Video"
											/>
										</Box>
									) : null}
									{typeMedia === 'image' ? (
										<Box>
											<Grid container>
												<>
													<Stack
														flexDirection="row"
														gap={3}
														sx={{
															mt: 1,
															mb: 4,
															flexWrap: 'wrap',
														}}
													>
														<input
															accept="image/*"
															hidden
															ref={multiUploadedImage}
															type="file"
															onChange={e =>
																handleMultiUploadImgBase(
																	e,
																	'informationupload',
																	JSON.parse(localStorage?.profile)._id,
																	'upload',
																	'object'
																)
															}
														/>
														{multiImage?.map((item, index) => (
															<Box key={index}>
																<Box
																	sx={{
																		flexDirection: 'column',
																		width: 260,
																		height: 230,
																		borderTopRightRadius: 10,
																		borderTopLeftRadius: 10,
																		backgroundColor: '#F2F2F2',
																		textTransform: 'none',
																		p: 0,
																		overflow: 'hidden',
																		display: 'flex',
																		justifyContent: 'center',
																	}}
																>
																	<img
																		src={
																			StaticVar.URL_API + '/upload/' + item.file
																		}
																		style={{
																			width: '100%',
																			objectFit: 'contain',
																		}}
																	/>
																	<br />
																</Box>
																{action !== 'detail' ? (
																	<Button
																		onClick={() =>
																			handleOpenDialogDelete(item.file)
																		}
																		fullWidth
																		sx={{
																			backgroundColor: 'red',
																			color: 'white',
																			py: 1,
																			'&:hover': {
																				backgroundColor: 'rgba(255,0,0,0.5)',
																			},
																			borderTopLeftRadius: 0,
																			borderTopRightRadius: 0,
																			borderBottomLeftRadius: 10,
																			borderBottomRightRadius: 10,
																		}}
																	>
																		<DeleteIcon />
																	</Button>
																) : null}
															</Box>
														))}
														{action !== 'detail' ? (
															<Button
																onClick={handleMultiInputImage}
																sx={{
																	flexDirection: 'column',
																	width: 260,
																	height: 230,
																	border: '1px dashed #BDBDBD',
																	borderRadius: 2,
																	backgroundColor: '#F2F2F2',
																	textTransform: 'none',
																}}
															>
																<div>
																	<AddPhotoAlternateOutlinedIcon
																		style={{
																			color: '#BDBDBD',
																			fontSize: 40,
																		}}
																	/>
																	<Typography
																		style={{
																			fontStyle: 'italic',
																			color: '#BDBDBD',
																		}}
																	>
																		Tambahkan Gambar
																	</Typography>
																</div>
															</Button>
														) : null}
													</Stack>
												</>
											</Grid>
										</Box>
									) : (
										<Box>
											<Stack
												flexDirection="row"
												gap={3}
												sx={{
													mt: 1,
													mb: 4,
													flexWrap: 'wrap',
												}}
											>
												<input
													accept="video/*"
													hidden
													key={videoSrc?.file}
													ref={uploadedVideo}
													type="file"
													onChange={e =>
														handleUploadVideo(
															e,
															'informationupload',
															JSON.parse(localStorage?.profile)._id,
															'object'
														)
													}
												/>
												{videoSrc?.map((item, index) => (
													<Box>
														<Box
															sx={{
																flexDirection: 'column',
																width: 260,
																height: 230,
																borderTopRightRadius: 10,
																borderTopLeftRadius: 10,
																backgroundColor: '#F2F2F2',
																textTransform: 'none',
																p: 0,
																overflow: 'hidden',
																display: 'flex',
																justifyContent: 'center',
															}}
														>
															<Player
																playsInline
																src={StaticVar.URL_API + '/upload/' + item.file}
																fluid={true}
																controls
																height={280}
															/>

															<br />
														</Box>
														<Button
															onClick={() =>
																handleOpenDialogVideoDelete(item.file)
															}
															fullWidth
															sx={{
																backgroundColor: 'red',
																color: 'white',
																py: 1,
																'&:hover': {
																	backgroundColor: 'rgba(255,0,0,0.5)',
																},
																borderTopLeftRadius: 0,
																borderTopRightRadius: 0,
																borderBottomLeftRadius: 10,
																borderBottomRightRadius: 10,
															}}
														>
															<DeleteIcon />
														</Button>
													</Box>
												))}
												<Button
													onClick={handleInputVideo}
													sx={{
														flexDirection: 'column',
														width: 260,
														height: 230,
														border: '1px dashed #BDBDBD',
														borderRadius: 2,
														backgroundColor: '#F2F2F2',
														textTransform: 'none',
													}}
												>
													<div>
														<PlayCircleOutlineIcon
															style={{
																color: '#BDBDBD',
																fontSize: 40,
															}}
														/>
														<Typography
															style={{
																fontStyle: 'italic',
																color: '#BDBDBD',
															}}
														>
															Tambahkan Video
														</Typography>
													</div>
												</Button>
											</Stack>
										</Box>
									)}
									{/* <Grid container>
                    <>
                    <Stack
                        flexDirection="row"
                        gap={3}
                        sx={{
                        mt: 1,
                        mb: 4,
                        flexWrap: "wrap",
                        }}
                    >
                        <input
                        accept="video/*"
                        hidden
                        key={videoSrc} 
                        ref={uploadedVideo}
                        type="file"
                        onChange={(e)=>handleUploadVideo(e, "informationupload", JSON.parse(localStorage?.profile)._id)}
                        />
                        {
                        videoSrc || videoLinkIncident ?
                        <Box>
                            <Box
                            sx={{
                                flexDirection: "column",
                                width: 260,
                                height: 230,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: `${action === "edit" ? "0" : "10px"}`,
                                borderBottomRightRadius: `${action === "edit" ? "0" : "10px"}`,
                                backgroundColor: "#F2F2F2",
                                textTransform: "none",
                                p: 0,
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            >
                            <Player
                                playsInline
                                src={videoSrc ? StaticVar.URL_API + "/upload/" + videoSrc : StaticVar.URL_API + "/upload/" + videoLinkIncident}
                                fluid={true}
                                controls
                                width={260}
                                height={230}
                            />

                            <br />
                            </Box>
                            {
                            action === "edit" ?
                            <Button
                            onClick={() => handleOpenDialogVideoDelete()}
                            fullWidth
                            sx={{
                                backgroundColor: "red",
                                color: "white",
                                py: 1,
                                "&:hover": { backgroundColor: "rgba(255,0,0,0.5)" },
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                            >
                            <DeleteIcon />
                            </Button>
                            :null}
                        </Box> :
                        <Button
                        onClick={handleInputVideo}
                        sx={{
                            flexDirection: "column",
                            width: 260,
                            height: 230,
                            border: "1px dashed #BDBDBD",
                            borderRadius: 2,
                            backgroundColor: "#F2F2F2",
                            textTransform: "none",
                        }}
                        >
                        <div>
                            <PlayCircleOutlineIcon
                            style={{
                                color: "#BDBDBD",
                                fontSize: 40,
                            }}
                            />
                            <Typography
                            style={{
                                fontStyle: "italic",
                                color: "#BDBDBD",
                            }}
                            >
                            Tambahkan Video
                            </Typography>
                        </div>
                        </Button>}
                    </Stack>
                    </>
                </Grid> */}
								</Box>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Waktu Kejadian</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{timeIncident}</Typography>
								) : (
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Lokasi</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{location}</Typography>
								) : (
									<TextField
										value={location}
										onChange={e => setLocation(e.target.value)}
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Lokasi Spesifik</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{locationSpecific}</Typography>
								) : (
									<TextField
										value={locationSpecific}
										onChange={e => setLocationSpecific(e.target.value)}
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Equipment</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{equipment}</Typography>
								) : (
									<TextField
										value={equipment}
										onChange={e => setEquipment(e.target.value)}
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Tagging No</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{taggingNumber}</Typography>
								) : (
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>No. Service</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{serviceRequestNumber}</Typography>
								) : (
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '35%' }}>
								<Typography>Deskripsi</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{description}</Typography>
								) : (
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
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: '25%' }}>
								<Typography>Status</Typography>
							</TableCell>
							<TableCell style={{ width: 15 }}>:</TableCell>
							<TableCell>
								{action === 'detail' ? (
									<Typography>{status}</Typography>
								) : (
									<TextField
										value={status}
										onChange={e => setStatus(e.target.value)}
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
								)}
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
						{action === 'edit' || action === 'add' ? (
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
						) : null}
					</Grid>
				)}
			</Container>
		</>
	);
}

{
	/*  */
}
