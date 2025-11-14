import React, { useState, useEffect, useContext } from 'react';
import {
	Typography,
	Container,
	Grid,
	Box,
	Paper,
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	Stack,
	FormGroup,
	FormControlLabel,
	IconButton,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	CardContent,
	Table,
	Switch,
	Link,
	TextField,
	CircularProgress,
	Radio,
	Modal,
	Hidden,
	DialogContent,
	Alert,
	Snackbar,
} from '@mui/material';

// styles
import useStyles, { IOSSwitch } from './Styles';
import { button, tableCellStyle, selectBoxStyles } from './Styles';
import Contact from '../../Component/Card/CardTrainJourney';

// icon
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import {
	ProfileContext,
	IncidentContext,
	UserProfilContext,
} from '../../Context/index';
import UseDailyWork from 'Hooks/DailyWork/useDailyWork';
import moment from 'moment';
import _ from 'lodash';
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver';
import useQuery from 'Utils/QueryParams';
import DialogCustom from '../../Component/Dialog/Dialog';
import UseGonoGoItem from 'Hooks/GonoGoItem/useGonoGoitem';
import { fabClasses } from '@material-ui/core';
import DurationModification from '../../Component/DurationModification';
import useUploadImg from '../../Hooks/Upload/useUploadImg';
import StaticVar from 'Config/StaticVar';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import QRCode from 'react-qr-code';
import 'react-html5-camera-photo/build/css/index.css';
import CreatableSelect from 'react-select/creatable';
import imageCompression from 'browser-image-compression';

import UseDailyIncident from 'Hooks/DailyIncident/useDailyIncident';
import MasterDataIncident from 'Hooks/MasterDataIncident/MasterDataIncident';
import MultiUploadV1 from 'Component/MultiUpload/MultiUploadV1';
import TakeGiveTrainDriver from 'Pages/TakeGiveWork/TakeGiveTrainDriver';
import HandOverJourney from './HandOver';
import ScannerJourney from './Scanner';

export default function MenuTablet(props) {
	const classes = useStyles();
	const [count, setCount] = useState(0);
	const [running, setRunning] = useState(false);
	const { profileUser, getProfileUser } = useContext(ProfileContext);
	const [entryCabinStatus, setEntryCabinStatus] = useState(false);
	const [scanWorkOrderId, setScanWorkOrderId] = useState('');

	const {
		dataScheduleTrainDriver,
		getDailyWorkByTrainDriver,
		startTimeTrain,
		stopTimeTrain,
		finishWork,
		getDailyWorkById,
		dataDetailDaily,
		startTimeTrainStation,
		updateDataScheduleTrainDriverById,
	} = UseDailyWork();

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
		typeMedia,
		setTypeMedia,
		serviceRequestNumber,
		setServiceRequestNumber,
		submitDataDailyIncident,
	} = UseDailyIncident();

	const {
		locationIncident,
		selectLocationIncident,
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
		newSpecificLocationIncident,
		newNameSpecificLocationIncident,
		setNewNameSpecificLocationIncident,
		newCodeSpecificLocationIncident,
		setNewCodeSpecificLocationIncident,
		handleChangeSpecificLocationIncident,
		handleSubmitNewSpecificLocationIncident,
	} = MasterDataIncident();

	const { getDetailTrainDriver } = useTrainDriver();
	const { detailTrainDriver, getProfileTrainDriverByNIK } = useTrainDriver();
	const { getDataIncident, incident, setIncident } =
		useContext(IncidentContext);

	const { getUserProfilById, userProfile, operational_id } =
		useContext(UserProfilContext);
	const [startTime, setStartTime] = useState('00:00:00');
	const [startTimeTrainNumber, setStartTimeTrainNumber] = useState('00:00:00');
	const [endTime, setEndTime] = useState('00:00:00');
	const [endTimeTrainNumber, setEndTimeTrainNumber] = useState('00:00:00');
	const [durationTime, setDurationTime] = useState(0);
	const [btnStart, setBtnStart] = useState(true);
	const [startRoute, setStartRoute] = useState('');
	const [finishRoute, setFinishRoute] = useState('');
	const [note, setNote] = useState('');
	const [roadBuilding, setRoadBuilding] = useState('');
	const [STT, setSTT] = useState('');
	const [otherNote, setOtherNote] = useState('');
	const [message, setMessage] = useState('');
	// const [typeMedia, setTypeMedia] = useState('image');
	const [dwellingTimeStart, setDwellingTimeStart] = useState(false);
	const [dwellingTimeStartTime, setDwellingTimeStartTime] = useState(
		new Date()
	);
	const [nextTrainJourney, setNextTrainJourney] = useState(false);

	const [skipStation, setSkipStation] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);

	const { gonoGoItem, getDataGonoGoItem } = UseGonoGoItem();

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
		setOpenCamera,
		openCamera,
		setOpenImg,
		openImg,
	} = useUploadImg();

	const [openModal, setOpenModal] = useState(false);
	const [openModalMessage, setOpenModalMessage] = useState(false);
	const [openModalHandOver, setOpenModalHandOver] = useState(false);

	const handleClose = () => {
		setOpenModal(false);
		setOpenModalMessage(false);
		setOpenModalHandOver(false);
		setEntryCabinStatus(false);
	};

	let query = useQuery();
	const workorderId = query.get('id');

	let timeDurationTrain = _.sumBy(
		dataDetailDaily?.loopRouteTrain?.route,
		'duration'
	);
	let dweelingTimeTrain = _.sumBy(
		dataDetailDaily?.loopRouteTrain?.route,
		'dweelingTime'
	);

	const [loading, setLoading] = useState(fabClasses);

	const [RESTState, setRESTState] = useState(false);

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [statusUpload, setStatusUpload] = useState(false);

	const fectData = async () => {
		setLoading(true);
		let dataresponse = await getDailyWorkById(workorderId);
		console.log('datarespon', workorderId, dataresponse);
		if (dataresponse?.data?.loopRouteTrain) {
			if (dataresponse?.data?.trainJourneyLog?.stateJourney === 'REST') {
				setRESTState(true);
			}
			let trainStart = dataresponse?.data?.loopRouteTrain?.route.filter(
				x => x.status === 'Start'
			)[0];
			let station = trainStart?.station.filter(x => x.status === 'Start')[0];
			console.log('station', station, Number(trainStart?.trainNumber) % 2);
			let stationFinish = trainStart?.station.filter(
				x => x.status === 'Finish'
			);
			if (trainStart) {
				if (stationFinish.length === trainStart?.station.length) {
					setNextTrainJourney(true);
					setBtnStart(false);
				} else {
					if (Number(trainStart?.trainNumber) % 2 > 0) {
						if (station?._id === '62d1163e5be964c7a53d991b') {
							//Posisi sudah di station akhir Pengangsaan Dua
							setNextTrainJourney(true);
							setBtnStart(false);
						}
					} else {
						if (station?._id === '62d115995be964c7a53d990c') {
							//Posisi sudah di station akhir Velodrome
							setNextTrainJourney(true);
							setBtnStart(false);
						}
					}

					if (station?.end !== '' && station?.start !== '') {
						setBtnStart(false);
					}
				}
			}
		}
		let datares = await getDetailTrainDriver(
			dataresponse?.data?.trainDriver?.nik
		);

		// setOtherNote(dataresponse?.data?.otherNote)
		setMessage(dataresponse?.data?.message);
		let createAt = moment().format('YYYY-MM-DD');
		let createBy = JSON.parse(localStorage.getItem('profile'))?._id;
		let today = moment().format('YYYY-MM-DD');
		let sendQuery = { startDate: today, endDate: today, createBy };
		await getDataGonoGoItem(sendQuery);
		if (dataresponse?.data?.kaIncident?.length > 0) {
			let filterDataIncident = dataresponse?.data.kaIncident.filter(
				item => item.title !== 'image' && item.title !== 'video'
			);
			let fileIncident = dataresponse?.data.kaIncident.filter(
				item => item.title === 'image' || item.title === 'video'
			);
			if (fileIncident.length > 0) {
				if (fileIncident[0]?.title === 'image') {
					setMultiImage(fileIncident[0]?.file);
				} else {
					setVideoSrc(fileIncident[0]?.file);
				}
				await setTypeMedia(fileIncident[0]?.title);
			}
			await setIncident(filterDataIncident);
		} else {
			await getDataIncident();
		}
		setLoading(false);
	};
	useEffect(() => {
		fectData();
	}, []);

	const TrainStartClick = async () => {
		//1. Cek Apakah ada perjalanan berikutnya,
		//2. Cek Apakah route perjalanan yang belum dijalani
		//

		if (RESTState) {
			// Jika kondisi Turun Kabin
			await updateDataScheduleTrainDriverById(workorderId, {
				'trainJourneyLog.stateJourney': 'REST',
				'trainJourneyLog.leavingTheCabin': new Date(),
			});
			fectData();
		} else {
			await updateDataScheduleTrainDriverById(workorderId, {
				'trainJourneyLog.stateJourney': 'On Duty',
			});
		}

		if (nextStep) {
			//Cek apakah akhir perjalanan sdh stasiun akhir
			//Jika ya, maka update nomor KA terakhir dan route terakhir
			let datapostlastKA = {
				_id: dataDetailDaily._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				stationId: dataDetailDaily?.loopRouteTrain?.route
					.filter(x => x.status !== 'Finish')[0]
					?.station.filter(x => x.status === '')[0]?._id,
				trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				)[0]?.trainNumber,
				endTime: lastEndTime,
				status: 'Start',
				local: true,
			};

			let datapostRoute = {
				_id: lastTrainNumber?._id,
				loopRouteTrainId: lastTrainNumber?.loopRouteTrainId,
				trainNumber: lastTrainNumber.trainNumber,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				endTime: lastTrainNumber.endTime,
			};
			console.log('datapostRoute', datapostRoute);
			await startTimeTrain(datapostRoute, moment().format('YYYY-MM-DD'));
			await startTimeTrainStation(datapostlastKA);

			//Update Time Tiba terakhir ke data KA selanjutnya
			setNextStep(false);
		}

		let time = moment().format('HH:mm:ss');
		if (
			//Cek apakah routenya belum selesai
			dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status === '').length ==
			dataDetailDaily?.loopRouteTrain?.route.filter(
				x => x.status !== 'Finish'
			)[0]?.station.length
		) {
			let datapost = {
				_id: dataDetailDaily?._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				)[0]?.trainNumber,
				startTime: time,
				dweelingTime: dweelingTimeTrain,
			};
			console.log('datapost train', datapost);
			startTimeTrain(datapost, moment().format('YYYY-MM-DD'));
		}

		console.log('time', time);
		setStartTime(time);
		setEndTime('00:00:00');
		setDurationTime(0);
		setBtnStart(false);

		let lastFinish = moment(finishRoute, 'HH:mm:ss');
		var dweelingTime = moment().diff(lastFinish, 'seconds');
		let datapost = {};
		let datapostLast = {};
		//Cek apakah status route nya sdh masih belum selesai dan status stasiun nya sdh selesai
		if (
			dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status === 'Finish').length > 0
		) {
			//Sudah ada perjalanan sebelumnya
			datapost = {
				_id: dataDetailDaily._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				stationId: dataDetailDaily?.loopRouteTrain?.route
					.filter(x => x.status !== 'Finish')[0]
					?.station.filter(x => x.status === 'Start')[0]._id,
				trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				)[0]?.trainNumber,
				startTime: time,
				dweelingTime: dweelingTime,
			};
			console.log('disini 1');
			await startTimeTrainStation(datapost);
		} else {
			//Jika status perjalanan stasiun nya belum selesai
			datapost = {
				_id: dataDetailDaily._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				stationId: !RESTState
					? dataDetailDaily?.loopRouteTrain?.route
							.filter(x => x.status !== 'Finish')[0]
							?.station.filter(x => x.status === '')[0]._id
					: '',
				trainNumber: !RESTState
					? dataDetailDaily?.loopRouteTrain?.route.filter(
							x => x.status !== 'Finish'
					  )[0]?.trainNumber
					: '',
				startTime: time,
				dweelingTime: dweelingTime,
			};

			// datapostLast = {
			//   "_id":dataDetailDaily._id,
			//   "loopRouteTrainId":dataDetailDaily?.loopRouteTrain?._id,
			//   "stationId":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status === "")[0]._id,
			//   "trainNumber":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.trainNumber,

			//   "status": "Start",
			// }
			console.log('disini 2');
			// await startTimeTrainStation(datapostLast)
			await startTimeTrainStation(datapost);
		}

		console.log('datapost', datapost);
		console.log('datapostLast', datapostLast);
		localStorage.setItem(
			'dwelling_time',
			JSON.stringify({ time: '00:00:00', status: false })
		);
		setDwellingTimeStart(false);
	};

	const [nextStep, setNextStep] = useState(false);
	const [lastStartTime, setLastStartTime] = useState('');
	const [lastEndTime, setLastEndTime] = useState('');
	const [lastTrainNumber, setLastTrainNumber] = useState({});
	const [dataIncident, setDataIncident] = useState([]);

	const TrainFinishClick = async () => {
		if (RESTState) {
			// Jika kondisi Turun Kabin
			await updateDataScheduleTrainDriverById(workorderId, {
				'trainJourneyLog.stateJourney': 'REST',
				'trainJourneyLog.boardingTheCabin': new Date(),
			});
		} else {
			await updateDataScheduleTrainDriverById(workorderId, {
				'trainJourneyLog.stateJourney': 'Stand By on Station',
			});
		}

		let time = moment().format('HH:mm:ss');

		let start = moment(startTime, 'HH:mm:ss');
		setFinishRoute(time);
		setEndTime(time);
		var timeDuration = moment().diff(start, 'seconds');
		setDurationTime(timeDuration);
		setBtnStart(true);

		let datapost = {
			_id: dataDetailDaily?._id,
			loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
			profile: { _id: userProfile?.officerId, name: userProfile?.officerName },
			stationId: dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status !== 'Finish')[1]?._id,
			trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
				x => x.status !== 'Finish'
			)[0]?.trainNumber,
			status: 'Start',
			endTime: moment().format('HH:mm:ss'),
		};

		let datapostLast = {
			_id: dataDetailDaily?._id,
			loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
			profile: { _id: userProfile?.officerId, name: userProfile?.officerName },
			stationId: dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status !== 'Finish')[0]?._id,
			trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
				x => x.status !== 'Finish'
			)[0]?.trainNumber,
			status: 'Finish',
		};
		console.log('datapost', datapost);
		console.log('datapostLast', datapostLast);

		if (
			datapost.stationId === '62d115995be964c7a53d990c' ||
			datapost.stationId === '62d1163e5be964c7a53d991b' ||
			RESTState
		) {
			//Tiba di statiun Akhir
			setNextStep(true);
			setLastEndTime(moment().format('HH:mm:ss'));
			const dataLastTrainNumber = {
				_id: dataDetailDaily._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				)[0]?.trainNumber,
				stationId: dataDetailDaily?.loopRouteTrain?.route
					.filter(x => x.status !== 'Finish')[0]
					?.station.filter(x => x.status !== 'Finish')[1]?._id,
				endTime: moment().format('HH:mm:ss'),
			};
			setLastTrainNumber(dataLastTrainNumber);
			if (
				dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				).length > 1
			) {
				if (RESTState) {
					alert('Silahkan Lanjutkan perjalanan anda');
					setRESTState(false);
				} else {
					alert('Tiba di statiun akhir. Silahkan beralih KA selanjutnya');
				}

				setNextTrainJourney(true);
				setBtnStart(false);
			} else {
				alert(
					'Perjalanan KA telah tiba di statiun terakhir. Silahkan akhiri perjalanan KA.'
				);
				setNextTrainJourney(true);
				setBtnStart(false);
			}
			// TrainNextClick()
		} else {
			console.log('Belum Tiba');
		}

		await startTimeTrainStation(datapostLast);
		await startTimeTrainStation(datapost);
		setDwellingTimeStartTime(new Date());
		localStorage.setItem(
			'dwelling_time',
			JSON.stringify({ time: new Date(), status: true })
		);
		setDwellingTimeStart(true);
		setSkipStation(false);
	};

	const TrainSkipClick = async () => {
		let time = moment().format('HH:mm:ss');
		let start = moment(startTime, 'HH:mm:ss');
		setFinishRoute(time);
		setEndTime(time);
		var timeDuration = moment().diff(start, 'seconds');
		setDurationTime(timeDuration);
		let datapost = {
			_id: dataDetailDaily._id,
			loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
			profile: { _id: userProfile?.officerId, name: userProfile?.officerName },
			stationId: dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status !== 'Finish')[1]?._id,
			trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
				x => x.status !== 'Finish'
			)[0]?.trainNumber,
			status: 'Start',
			endTime: '',
		};

		// let datapost1 = {
		//   "_id":dataDetailDaily._id,
		//   "loopRouteTrainId":dataDetailDaily?.loopRouteTrain?._id,
		//   "stationId":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status !== "Finish")[2]?._id,
		//   "trainNumber":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.trainNumber,
		//   status: "Start",
		//   "endTime":moment().format("HH:mm:ss"),
		// }

		let datapostLast = {
			_id: dataDetailDaily._id,
			loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
			profile: { _id: userProfile?.officerId, name: userProfile?.officerName },
			stationId: dataDetailDaily?.loopRouteTrain?.route
				.filter(x => x.status !== 'Finish')[0]
				?.station.filter(x => x.status !== 'Finish')[0]?._id,
			trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
				x => x.status !== 'Finish'
			)[0]?.trainNumber,
			status: 'Finish',
		};
		// if(datapost1.stationId === "62d115995be964c7a53d990c" || datapost1.stationId === "62d1163e5be964c7a53d991b") //Tiba di statiun Akhir
		// {
		//   console.log('Tiba di statiun akhir', dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status !== "Finish")[1]?.stationName)
		//   setNextStep(true)
		//   setLastEndTime(moment().format("HH:mm:ss"))

		//   setLastTrainNumber(
		//     {
		//       "_id":dataDetailDaily._id,
		//       "loopRouteTrainId":dataDetailDaily?.loopRouteTrain?._id,
		//       "trainNumber":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.trainNumber,
		//       "stationId":dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status !== "Finish")[1]?._id,
		//       endTime : moment().format("HH:mm:ss")
		//     }
		//   )
		//   if(dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish").length>1){
		//     alert('Tiba di statiun akhir. Silahkan beralih KA selanjutnya')
		//     setNextTrainJourney(true)
		//     setBtnStart(false)
		//   }
		//   else{
		//     alert('Perjalanan KA telah tiba di statiun terakhir. Silahkan akhiri perjalanan KA.')
		//     setNextTrainJourney(true)
		//     setBtnStart(false)
		//   }
		//   //TrainNextClick()
		// }
		// else{
		//   console.log('Belum Tiba')
		// }

		await startTimeTrainStation(datapostLast);
		// await startTimeTrainStation(datapostLast1)
		await startTimeTrainStation(datapost);
		// startTimeTrainStation(datapost1)
		setSkipStation(false);

		setDwellingTimeStartTime(new Date());
		localStorage.setItem(
			'dwelling_time',
			JSON.stringify({ time: new Date(), status: true })
		);
		setDwellingTimeStart(true);
	};

	console.log('dwellingTimeStartTime', dwellingTimeStartTime);

	const TrainNextClick = async KANext => {
		if (KANext) {
			if (KANext === 'REST') {
				await updateDataScheduleTrainDriverById(workorderId, {
					'trainJourneyLog.stateJourney': 'REST',
					'trainJourneyLog.restTime': new Date(),
				});
			} else {
				await updateDataScheduleTrainDriverById(workorderId, {
					'trainJourneyLog.stateJourney': 'Next KA -' + KANext,
				});
			}
		}
		console.log(
			'length',
			dataDetailDaily?.loopRouteTrain?.route.filter(x => x.status !== 'Finish')
				.length
		);
		console.log('note', incident);
		if (
			dataDetailDaily?.loopRouteTrain?.route.filter(x => x.status !== 'Finish')
				.length <= 1
		) {
			console.log('dataDetailDaily', dataDetailDaily.kaIncident);
			if (dataDetailDaily?.kaIncident.length > 0) {
				let time = moment().format('HH:mm:ss');

				let datapostRoute = {
					_id: dataDetailDaily?._id,
					loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
					profile: {
						_id: userProfile?.officerId,
						name: userProfile?.officerName,
					},
					trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
						x => x.status !== 'Finish'
					)[0]?.trainNumber,
					startTime: startTimeTrainNumber,
					duration: _.sumBy(
						dataDetailDaily?.loopRouteTrain?.route.filter(
							x => x.status !== 'Finish'
						)[0]?.station,
						'duration'
					),
					endTime: time,
					dweelingTime: _.sumBy(
						dataDetailDaily?.loopRouteTrain?.route.filter(
							x => x.status !== 'Finish'
						)[0]?.station,
						'dweelingTime'
					),
				};
				console.log('datapostRoute', datapostRoute);
				startTimeTrain(datapostRoute, moment().format('YYYY-MM-DD'));

				let workid = dataDetailDaily?._id;
				let datapost = {
					//status : 'Finish',
					duration: timeDurationTrain,
					dweelingTime: dweelingTimeTrain,
					//noteLRV: note,
					//completeState : true
				};
				const response = await finishWork(
					workid,
					datapost,
					moment().format('YYYY-MM-DD')
				);
				if (response.status) {
					await updateDataScheduleTrainDriverById(workorderId, {
						'trainJourneyLog.stateJourney': 'Finish',
						'trainJourneyLog.existingTheCabin': new Date(),
					});
					await getDailyWorkById(workorderId);
					props.history.push('/app/operational/trainjourney');
				}
			} else {
				alert(
					'Anda Belum mengisi catatan kejadian. Silahkan Isikan terlebih dahulu.'
				);
			}
		} else {
			let time = moment().format('HH:mm:ss');

			let datapostRoute = {
				_id: dataDetailDaily?._id,
				loopRouteTrainId: dataDetailDaily?.loopRouteTrain?._id,
				profile: {
					_id: userProfile?.officerId,
					name: userProfile?.officerName,
				},
				trainNumber: dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
				)[0]?.trainNumber,
				startTime: startTimeTrainNumber,
				duration: _.sumBy(
					dataDetailDaily?.loopRouteTrain?.route.filter(
						x => x.status !== 'Finish'
					)[0]?.station,
					'duration'
				),
				endTime: time,
				dweelingTime: _.sumBy(
					dataDetailDaily?.loopRouteTrain?.route.filter(
						x => x.status !== 'Finish'
					)[0]?.station,
					'dweelingTime'
				),
			};
			console.log('datapostRoute', datapostRoute);
			startTimeTrain(datapostRoute, moment().format('YYYY-MM-DD'));
		}
		setNextTrainJourney(false);
		setBtnStart(true);
	};

	const handleChangeTypeMedia = e => {
		const value = e.target.value;
		setTypeMedia(value);
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

	// const controlProps = item => ({
	// 	checked: typeMedia === item,
	// 	onChange: handleChangeTypeMedia,
	// 	value: item,
	// 	name: 'type-media',
	// 	inputProps: { 'aria-label': item },
	// });

	// console.log('dataDetailDaily', dataDetailDaily);
	// console.log('gonoGoItem', gonoGoItem);
	// console.log('user profile', userProfile);

	return (
		<div style={{ flex: 1, height: window.innerHeight - 65 }}>
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
								item => item !== deleteIdImage
							);
							console.log('responseImage delete', responseImage);
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

			<DialogCustom
				fullWidth={true}
				open={openModal}
				maxWidth={'lg'}
				title="Kejadian"
				content={
					<div>
						<Table style={{ width: '100%' }}>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Nama Pelapor</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									<TextField
										value={userProfile?.officerName}
										disabled
										// onChange={e => setReporterName(e.target.value)}
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
									{/* <Box>
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
																				StaticVar.URL_API +
																				'/upload/' +
																				item.file
																			}
																			style={{
																				width: '100%',
																				objectFit: 'contain',
																			}}
																		/>
																		<br />
																	</Box>
																</Box>
															))}
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
																	src={
																		StaticVar.URL_API + '/upload/' + item.file
																	}
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
									</Box> */}
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
									{/* <TextField
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
									/> */}
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
												onChange={e =>
													setNewNameLocationIncident(e.target.value)
												}
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
												onChange={e =>
													setNewCodeLocationIncident(e.target.value)
												}
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
									{/* <TextField
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
									/> */}

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
									{/* <TextField
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
									/> */}
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
									{/* <TextField
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
									/> */}
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
					</div>
				}
				cancel={handleClose}
				valueCancel="Batal"
				submit={true}
				confirm={async () => {
					const response = await submitDataDailyIncident(
						// typeMedia === 'image' ? multiImage : videoSrc,
						images,
						userProfile,
						selectLocationIncident,
						selectSpecificLocationIncident,
						selectEquipmentIncident,
						selectStatusIncident
					);
					if (response.status === 'OK') {
						// toast.success('Data Kejadian berhasil ditambahkan');
						handleClose();
						setOpenAlert(true);
					}
				}}
				valueConfirm="Simpan"
			/>

			<Snackbar
				open={openAlert}
				onClose={() => setOpenAlert(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				autoHideDuration={5000}
			>
				<Alert
					variant="filled"
					severity="success"
					onClose={() => setOpenAlert(false)}
					sx={{ width: '100%' }}
				>
					Data Kejadian berhasil ditambahkan.
				</Alert>
			</Snackbar>

			<DialogCustom
				fullWidth={true}
				open={openModalMessage}
				maxWidth={'md'}
				title="Pesan"
				content={
					<>
						<TextField
							style={{ width: '100%' }}
							placeholder="Masukkan pesan disini"
							multiline={true}
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</>
				}
				cancel={handleClose}
				valueCancel="Batal"
				submit={true}
				confirm={async () => {
					await finishWork(
						operational_id,
						{
							message,
						},
						moment('YYYY-MM-DD')
					);
					handleClose();
				}}
				valueConfirm="Simpan"
			/>

			<DialogCustom
				fullWidth={true}
				open={openModalHandOver}
				maxWidth={'md'}
				title="Serah Terima Naik Kabin"
				content={
					<>
						<HandOverJourney id={workorderId} workorderId={scanWorkOrderId} handleClose={handleClose}  TrainFinishClick={TrainFinishClick}/>
					</>
				}
				cancel={handleClose}
				valueCancel="Tutup"
				submit={false}
				confirm={async () => {
					handleClose();
				}}
				// valueConfirm="Simpan"
			/>
			{loading ? (
				<center>
					<CircularProgress />
				</center>
			) : dataDetailDaily?.loopRouteTrain?.route.filter(
					x => x.status !== 'Finish'
			  ).length > 0 ? (
				<Container maxWidth="xl" sx={{ pt: 2 }}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={6} md={6}>
							<Contact small={true} />
						</Grid>
						<Hidden only={['xs']}>
							<Grid item xs={4} sm={2} md={2}>
								<Button
									wrap="nowrap"
									variant="contained"
									sx={button}
									onClick={() => setOpenModal(true)}
								>
									<Grid container direction="column" alignItems="center">
										<Grid item>
											<Typography>KEJADIAN </Typography>
										</Grid>
										<Grid item>
											<IconButton>
												<InfoIcon sx={{ fontSize: 50, color: '#fff' }} />
											</IconButton>
										</Grid>
									</Grid>
								</Button>
							</Grid>
							<Grid item xs={4} sm={2} md={2}>
								<Button
									variant="contained"
									sx={button}
									onClick={() => setOpenModalMessage(true)}
								>
									<Grid container direction="column" alignItems="center">
										<Grid item>
											<Typography>PESAN</Typography>
										</Grid>
										<Grid item>
											<IconButton>
												<ChatIcon sx={{ fontSize: 50, color: '#fff' }} />
											</IconButton>
										</Grid>
									</Grid>
								</Button>
							</Grid>
							<Grid item xs={4} sm={2} md={2}>
								<Button
									variant="contained"
									sx={{
										bgcolor: '#28A745',
										borderRadius: 2,
										height: '100%',
										width: '100%',
										'&:hover': {
											backgroundColor: '#28A745',
											border: 'none',
										},
									}}
								>
									<Grid
										container
										direction="column"
										alignItems="center"
										onClick={() => window.open('tel:+6285648219617')}
									>
										<Grid item>
											<Typography>
												PANGGILAN <br /> DARURAT
											</Typography>
										</Grid>
										<Grid item>
											<IconButton>
												<PhoneIcon sx={{ fontSize: 50, color: '#fff' }} />
											</IconButton>
										</Grid>
									</Grid>
								</Button>
							</Grid>
						</Hidden>
					</Grid>
					<Paper>
						<Grid container spacing="2" sx={{ mt: 1 }}>
							<Hidden only={['md', 'lg', 'xl']}>
								<Grid item xs="12" sm="12" md="4">
									<Box
										style={{
											backgroundColor: 'white',
											width: '100%',
											height: 80,
											border: '1px solid #CFCFCF',
											borderRadius: 5,
											padding: 10,
											textAlign: 'center',
										}}
									>
										<Typography>Dwelling Time</Typography>
										<Typography variant="h3">
											{dwellingTimeStart ||
											(localStorage?.dwelling_time &&
												JSON.parse(localStorage?.dwelling_time).status) ? (
												<DurationModification
													startTime={
														JSON.parse(localStorage?.dwelling_time).time
													}
												/>
											) : (
												'00:00:00'
											)}

											{/* {_.sumBy(dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station, "dweelingTime")} */}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs="12" sm="12" md="4">
									<Grid container spacing={2}>
										<Grid item xs="6" sm="6" md="6">
											{nextTrainJourney ? null : (
												<Button
													variant="contained"
													color="primary"
													disabled={!btnStart}
													sx={{
														fontSize: 18,
														width: '90%',
														height: 70,
														bgcolor: '#28A745',
														marginTop: 1,
														marginBottom: 1,
														marginLeft: 2,
														borderRadius: 2,
														// '&:hover': {
														//   backgroundColor: '#28A745',
														//   border: 'none',
														// }
													}}
													onClick={() => {
														TrainStartClick()
													}}
												>
													{RESTState ? 'Turun Kabin' : 'Berangkat'}
												</Button>
											)}
										</Grid>
										<Grid item xs="6" sm="6" md="6">
											{nextTrainJourney  && !RESTState ? null : (
												<>
													{RESTState ?
													<Button
														variant="contained"
														color="secondary"
														disabled={btnStart}
														sx={{
															fontSize: 18,
															width: '90%',
															height: 70,
															bgcolor: '#BB7E36',
															marginTop: 1,
															marginBottom: 1,

															borderRadius: 2,
														}}
														onClick={async () => {
															// setOpenModalHandOver(true)
															// TrainFinishClick()
															setEntryCabinStatus(true)
														}}
													>
														Naik Kabin
													</Button> : 
													<Button
														variant="contained"
														color="secondary"
														disabled={btnStart}
														sx={{
															fontSize: 18,
															width: '90%',
															height: 70,
															bgcolor: '#BB7E36',
															marginTop: 1,
															marginBottom: 1,

															borderRadius: 2,
														}}
														onClick={async () => TrainFinishClick()}
													>
														Tiba
													</Button>}
												</>
											)}
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs="12" sm="2" md="2">
									<Grid container spacing={2}>
										<Grid item xs="12">
											{!btnStart &&
											dataDetailDaily?.loopRouteTrain?.route
												.filter(x => x.status !== 'Finish')[0]
												?.station.filter(x => x.status !== 'Finish').length >
												2 ? (
												<Button
													variant="contained"
													sx={{
														fontSize: 16,
														width: '100%',
														height: 70,
														bgcolor: skipStation ? '#CFCFCF' : '#EF7C8E',
														marginTop: 1,
														marginBottom: 1,
														borderRadius: 2,
														marginRight: 5,
														'&:hover': {
															backgroundColor: skipStation
																? '#CFCFCF'
																: '#EF7C8E',
															border: 'none',
														},
													}}
													onClick={() => {
														setSkipStation(true);
														TrainSkipClick();
													}}
												>
													{skipStation ? 'UN-SKIP' : 'SKIP'}
												</Button>
											) : null}
										</Grid>
									</Grid>
									{/* {dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status !== "Finish").length} */}
								</Grid>
							</Hidden>

							<Grid item xs="12" sm="12" md="12">
								{RESTState ? (
									nextTrainJourney ?
									<Paper style={{ padding: 20 }}>
										{
											entryCabinStatus ?
											<ScannerJourney id={workorderId} setScanWorkOrderId={setScanWorkOrderId} setOpenModalHandOver={setOpenModalHandOver} setEntryCabinStatus={setEntryCabinStatus} />:
											<Typography
												variant="h4"
												style={{
													textAlign: 'center',
													marginBottom: 10,
													marginTop: 50,
												}}
											>
												Klik Naik Kabin dan Silahkan Scan QRCode untuk masuk ke Kabin
											</Typography>

										}
										
									</Paper>:
									<Paper style={{ padding: 20 }}>
										<Typography
											variant="h4"
											style={{
												textAlign: 'center',
												marginBottom: 10,
												marginTop: 50,
											}}
										>
											Silahkan Rehat sejenak untuk melanjutkan ke Perjalanan
											Nomor KA berikutnya
										</Typography>
										<center>
											<QRCode value={dataDetailDaily?._id} size={200} />
											<p>Nomor : {dataDetailDaily?._id}</p>
										</center>
									</Paper>
									
								) : (
									<Table
										style={{
											borderCollapse: 'separate',
											borderSpacing: '0px 2px',
											align: 'center',
										}}
										className={classes.tableTxt}
										sx={{ alignItems: 'center' }}
										aria-label="simple table"
									>
										<TableHead>
											<TableRow style={{ height: 30 }}>
												<Hidden only={['xs', "sm"]}>
													<TableCell
														className={classes.tableCellTxt}
														rowSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Posisi</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														rowSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>V Max</p>
														<small>(Km/Jam)</small>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														rowSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Jarak</p>
														<small>(Km)</small>
													</TableCell>
												</Hidden>
												<Hidden only={['xl', "lg", "md"]}>
													<TableCell
														//className={classes.tableCellTxt}
														//rowSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Stasiun</p>
													</TableCell>
												</Hidden>
												
												<Hidden only={['xs', "sm"]}>
													<TableCell
														className={classes.tableCellTxt}
														colSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Waktu</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														colSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Realisasi</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														rowSpan={2}
														style={tableCellStyle}
														align="center"
													>
														<p>Dwelling</p>
													</TableCell>
												</Hidden>

												<Hidden only={['xl', 'lg', "md"]}>
													<TableCell
														//className={classes.tableCellTxt}
														//colSpan={2}
														style={tableCellStyle}
														align="right"
													>
														<p style={{marginRight:20}}>Time</p>
													</TableCell>
												</Hidden>
											</TableRow>
											<Hidden only={['xs', "sm"]}>
												<TableRow>
													<TableCell
														className={classes.tableCellTxt}
														style={tableCellStyle}
														align="center"
													>
														<p>Tiba</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														style={tableCellStyle}
														align="center"
													>
														<p>Berangkat</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														style={tableCellStyle}
														align="center"
													>
														<p>Tiba</p>
													</TableCell>
													<TableCell
														className={classes.tableCellTxt}
														style={tableCellStyle}
														align="center"
													>
														<p>Berangkat</p>
													</TableCell>
												</TableRow>
											</Hidden>
										</TableHead>
										<TableBody>
											{true &&
												dataDetailDaily?.loopRouteTrain?.route.filter(
													x => x.status !== 'Finish'
												).length > 0 &&
												_.orderBy(
													dataDetailDaily?.loopRouteTrain?.route.filter(
														x => x.status !== 'Finish'
													)[0]?.station,
													['loopIndex'],
													['asc']
												).map(itemStation => {
													//var timediff = dataDetailDaily?.loopRouteTrain?.start
													return (
														<>
															{/* {JSON.stringify(itemStation)} */}
															<TableRow
																key={itemStation.statiunCode}
																sx={{
																	'&:last-child td, &:last-child th': {
																		border: 0,
																	},
																	bgcolor:
																		itemStation.status === 'Start'
																			? 'green'
																			: itemStation.status === 'Finish'
																			? '#EF7C8E'
																			: '#F8F8F8',
																}}
															>
																<Hidden only={['xs', "sm"]}>
																	<TableCell
																		align="center"
																		className={classes.tableLeftTxt}
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																		component="th"
																		scope="row"
																	>
																		{itemStation.stationPosition}
																	</TableCell>
																	<TableCell
																		align="center"
																		style={{ position: 'relative' }}
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																		component="th"
																		scope="row"
																	>
																		{itemStation.distance > 0 ? (
																			<p>{itemStation.vMax}</p>
																		) : null}
																	</TableCell>
																	<TableCell
																		align="center"
																		style={{ position: 'relative' }}
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																		component="th"
																		scope="row"
																	>
																		{itemStation.distance > 0 ? (
																			<p>{itemStation.distance}</p>
																		) : null}
																	</TableCell>
																</Hidden>

																<TableCell
																	align="center"
																	sx={{
																		border: 'none',
																		paddingTop: 1,
																		paddingBottom: 1,
																		color:
																			itemStation.status === 'Start'
																				? 'white'
																				: 'black',
																		fontSize: 18,
																	}}
																	component="th"
																	scope="row"
																>
																	{itemStation.stationCode}
																</TableCell>

																<Hidden only={['xs', "sm"]}>
																	<TableCell
																		align="center"
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																	>
																		{itemStation?.endPlan}
																	</TableCell>
																	<TableCell
																		align="center"
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																	>
																		{itemStation.startPlan}
																	</TableCell>
																	<TableCell
																		align="center"
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																	>
																		{itemStation?.end}
																	</TableCell>
																	<TableCell
																		align="center"
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																	>
																		{itemStation.start}
																	</TableCell>
																	<TableCell
																		align="center"
																		className={classes.tableRightTxt}
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 18,
																		}}
																	>
																		{itemStation?.dweelingTime > 0
																			? moment()
																					.startOf('day')
																					.seconds(itemStation.dweelingTime)
																					.format('H:mm:ss')
																			: ''}
																	</TableCell>
																</Hidden>

																<Hidden only={['xl', 'lg', 'md']}>
																	<TableCell
																		align="right"
																		sx={{
																			border: 'none',
																			paddingTop: 1,
																			paddingBottom: 1,
																			color:
																				itemStation.status === 'Start'
																					? 'white'
																					: 'black',
																			fontSize: 6,
																		}}
																	>
																		<Typography style={{ fontSize: 12 }}>
																			TIBA : {itemStation.endPlan || 'xx:xx:xx'}{' '}
																			| {itemStation.end || 'xx:xx:xx'}
																		</Typography>
																		<Typography style={{ fontSize: 12 }}>
																			BERANGKAT :{' '}
																			{itemStation.startPlan || 'xx:xx:xx'} |{' '}
																			{itemStation.start || 'xx:xx:xx'}
																		</Typography>
																		<Typography style={{ fontSize: 12 }}>
																			DWELLING :{' '}
																			{itemStation?.dweelingTime > 0
																				? moment()
																						.startOf('day')
																						.seconds(itemStation.dweelingTime)
																						.format('H:mm:ss')
																				: ''}
																		</Typography>
																	</TableCell>
																</Hidden>
																{/* <TableCell align="center" sx={{ border: 'none',paddingTop:1,paddingBottom:1, color : itemStation.status === "Start" ? "white": "black", fontSize:18 }}>
                                {itemStation.duration}
                              </TableCell> */}
															</TableRow>
														</>
													);
												})}
										</TableBody>
									</Table>
								)}
							</Grid>

							<Hidden only={['xs', "sm"]}>
								<Grid item xs="12" sm="12" md="4">
									<Grid container spacing={2}>
										<Grid item xs="6" sm="6" md="6">
											{nextTrainJourney ? null : (
												<Button
													variant="contained"
													color="primary"
													disabled={!btnStart}
													sx={{
														fontSize: 18,
														width: '90%',
														height: 70,
														bgcolor: '#28A745',
														marginTop: 1,
														marginBottom: 1,
														marginLeft: 2,
														borderRadius: 2,
														// '&:hover': {
														//   backgroundColor: '#28A745',
														//   border: 'none',
														// }
													}}
													onClick={() => TrainStartClick()}
												>
													{RESTState ? 'Turun Kabin' : 'Berangkat'}
												</Button>
											)}
										</Grid>
										<Grid item xs="6" sm="6" md="6">
											{nextTrainJourney && !RESTState ? null : (
												<>
													{RESTState ?
													<Button
														variant="contained"
														color="secondary"
														disabled={btnStart}
														sx={{
															fontSize: 18,
															width: '90%',
															height: 70,
															bgcolor: '#BB7E36',
															marginTop: 1,
															marginBottom: 1,

															borderRadius: 2,
														}}
														onClick={async () => {
															// setOpenModalHandOver(true)
															setEntryCabinStatus(true)
															//TrainFinishClick()
														}}
													>
														Naik Kabin 2
													</Button> : 
													<Button
														variant="contained"
														color="secondary"
														disabled={btnStart}
														sx={{
															fontSize: 18,
															width: '90%',
															height: 70,
															bgcolor: '#BB7E36',
															marginTop: 1,
															marginBottom: 1,

															borderRadius: 2,
														}}
														onClick={async () => TrainFinishClick()}
													>
														Tiba
													</Button>}
												</>
												
											)}
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs="12" sm="12" md="4">
									<Box
										style={{
											backgroundColor: 'white',
											width: '98%',
											height: 80,
											border: '1px solid #CFCFCF',
											borderRadius: 5,
											padding: 10,
											textAlign: 'center',
										}}
									>
										<Typography>Dwelling Time</Typography>
										<Typography variant="h3">
											{dwellingTimeStart ||
											(localStorage?.dwelling_time &&
												JSON.parse(localStorage?.dwelling_time).status) ? (
												<DurationModification
													startTime={
														JSON.parse(localStorage?.dwelling_time).time
													}
												/>
											) : (
												'00:00:00'
											)}

											{/* {_.sumBy(dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station, "dweelingTime")} */}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs="12" sm="12" md="2">
									{/* {dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.station.filter(x=>x.status !== "Finish").length} */}
									{!btnStart &&
									dataDetailDaily?.loopRouteTrain?.route
										.filter(x => x.status !== 'Finish')[0]
										?.station.filter(x => x.status !== 'Finish').length > 2 ? (
										<Button
											variant="contained"
											sx={{
												fontSize: 16,
												width: '90%',
												height: 70,
												bgcolor: skipStation ? '#CFCFCF' : '#EF7C8E',
												marginTop: 1,
												marginBottom: 1,
												borderRadius: 2,
												marginRight: 5,
												'&:hover': {
													backgroundColor: skipStation ? '#CFCFCF' : '#EF7C8E',
													border: 'none',
												},
											}}
											onClick={() => {
												setSkipStation(true);
												TrainSkipClick();
											}}
										>
											{skipStation ? 'UN-SKIP' : 'SKIP'}
										</Button>
									) : null}
								</Grid>
							</Hidden>

							<Grid item xs="12" sm="12" md="2">
								{!RESTState && (
									<Button
										variant="contained"
										sx={{
											fontSize: 16,
											width: '100%',
											height: 70,
											bgcolor: '#BB7E36',
											marginTop: 1,
											marginBottom: 1,
											borderRadius: 2,
											marginRight: 5,
											'&:hover': {
												backgroundColor: '#BB7E36',
												border: 'none',
											},
										}}
										disabled={!nextTrainJourney}
										onClick={async () => {
											const KANext =
												dataDetailDaily?.loopRouteTrain?.route.filter(
													x => x.status !== 'Finish'
												)[1]?.trainNumber;
											if (KANext === 'REST') {
												setRESTState(true);
											} else {
												if (RESTState) {
													setRESTState(false);
												}
											}

											TrainNextClick(KANext);
										}}
									>
										{dataDetailDaily?.loopRouteTrain?.route.filter(
											x => x.status !== 'Finish'
										).length > 1
											? 'LANJUT ke KA - ' +
											  dataDetailDaily?.loopRouteTrain?.route.filter(
													x => x.status !== 'Finish'
											  )[1]?.trainNumber
											: 'SELESAI'}
									</Button>
								)}
							</Grid>
						</Grid>
						{/* <marquee>{note}</marquee> */}
					</Paper>
				</Container>
			) : (
				<Container maxWidth="xl" sx={{ mt: 13 }}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="h4" align="center">
							Data Perjalanan KA telah diselesaikan
						</Typography>
					</Paper>
				</Container>
			)}
		</div>
	);
}
