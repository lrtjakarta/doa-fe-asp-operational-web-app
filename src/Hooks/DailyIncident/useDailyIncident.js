import { DailyIncidentContext } from '../../Context/index';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import ApiOperational from 'Services/ApiOperational';

export default function UseDailyIncident() {
	const {
		getDataDailyIncident,
		dailyIncident,
		postDataDailyIncident,
		openSnackbar,
		setOpenSnackbar,
		putDataDailyIncident,
		deleteDataDailyIncident,
	} = useContext(DailyIncidentContext);
	const [selectedData, setSelectedData] = useState({});
	const [trainDriver, setTrainDriver] = useState({});
	const [openDialog, setOpenDialog] = useState(false);
	const [date, setDate] = useState(moment().format('YYYY-MM'));
	const [reporterName, setReporterName] = useState('');
	const [timeIncident, setTimeIncident] = useState('');
	const [location, setLocation] = useState('');
	const [file, setFile] = useState([]);
	const [locationSpecific, setLocationSpecific] = useState('');
	const [equipment, setEquipment] = useState('');
	const [taggingNumber, setTaggingNumber] = useState('');
	const [status, setStatus] = useState('');
	const [description, setDescription] = useState('');
	const [serviceRequestNumber, setServiceRequestNumber] = useState('');
	const [typeMedia, setTypeMedia] = useState('');
	const [updated, setUpdated] = useState('');

	const handleFilterDate = event => {
		// setDate(event.target.value);
		// let monthly = event.target.value;
		let timeIncident = date;
		// let createBy = JSON.parse(localStorage.getItem("profile"))?._id
		getDataDailyIncident({ timeIncident });
	};

	let data = {
		reporterName,
		location,
		timeIncident,
		file,
		locationSpecific,
		equipment,
		taggingNumber,
		status,
		description,
		serviceRequestNumber,
		// createBy: JSON.parse(localStorage.profile),
		updated,
	};

	const submitDataDailyIncident = async (
		// xfile,
		images,
		userProfile,
		selectLocationIncident,
		selectSpecificLocationIncident,
		selectEquipmentIncident,
		selectStatusIncident
	) => {
		// let dataFile =
		// 	xfile.length > 0
		// 		? xfile.map(item => {
		// 				if (typeMedia === 'image') {
		// 					item.type = 'image';
		// 				} else {
		// 					item.type = 'video';
		// 				}
		// 				return item;
		// 		  })
		// 		: [];

		let uploadedFiles;
		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			const respon = await ApiOperational.postManyImage(
				'asp/kejadianHarian',
				formData
			);
			if (respon.statusText === 'OK') {
				uploadedFiles = respon.data || null;
			}
		}
		let sendData = {
			...data,
			// file: dataFile,
			file: uploadedFiles,
			createBy: userProfile,
			location: selectLocationIncident,
			locationSpecific: selectSpecificLocationIncident,
			equipment: selectEquipmentIncident,
			status: selectStatusIncident,
			reporterName: userProfile?.officerName,
		};
		console.log('sendData', sendData);
		// return;
		return postDataDailyIncident(sendData);
	};

	const updateDataDailyIncident = async (
		id,
		// xfile,
		// updated,
		images,
		selectLocationIncident,
		selectSpecificLocationIncident,
		selectEquipmentIncident,
		selectStatusIncident,
		dataImages
	) => {
		// let dataFile =
		// 	xfile.length > 0
		// 		? xfile.map(item => {
		// 				if (typeMedia === 'image') {
		// 					item.type = 'image';
		// 				} else {
		// 					item.type = 'video';
		// 				}
		// 				return item;
		// 		  })
		// 		: [];
		let uploadedFiles;
		let newUploadedFiles;
		if (images.length > 0) {
			const formData = new FormData();
			images.forEach(image => {
				formData.append('files', image.file);
			});
			const respon = await ApiOperational.postManyImage(
				'asp/kejadianHarian',
				formData
			);
			if (respon.statusText === 'OK') {
				uploadedFiles = respon.data || null;
			}
		}
		if (images.length > 0) {
			if (dataImages) {
				newUploadedFiles = {
					...dataImages,
					uploadedFiles: [
						...dataImages?.uploadedFiles,
						...uploadedFiles?.uploadedFiles,
					],
				};
			} else {
				newUploadedFiles = uploadedFiles;
			}
		} else {
			newUploadedFiles = dataImages;
		}

		let updatedData = {
			...data,
			// file: dataFile,
			file: newUploadedFiles,
			location: selectLocationIncident,
			locationSpecific: selectSpecificLocationIncident,
			equipment: selectEquipmentIncident,
			status: selectStatusIncident,
			updated: new Date(),
		};
		return putDataDailyIncident(id, updatedData);
	};

	const handleSelect = data => {
		setSelectedData(data);
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
		setSelectedData({});
	};

	const handleChangeTypeMedia = e => {
		const value = e.target.value;
		setTypeMedia(value);
	};

	// console.log(typeMedia)

	const controlProps = item => ({
		checked: typeMedia === item,
		onChange: handleChangeTypeMedia,
		value: item,
		name: 'type-media',
		inputProps: { 'aria-label': item },
	});

	const handleDelete = async () => {
		const result = await deleteDataDailyIncident(selectedData._id);
		if (result.status === 'OK') {
			setOpenDialog(false);
			setSelectedData({});
		}
	};

	return {
		getDataDailyIncident,
		submitDataDailyIncident,
		handleFilterDate,
		handleDelete,
		date,
		setDate,
		setOpenSnackbar,
		openSnackbar,
		dailyIncident,
		handleSelect,
		selectedData,
		openDialog,
		handleClose,
		handleChangeTypeMedia,
		controlProps,
		typeMedia,
		setTypeMedia,
		reporterName,
		setReporterName,
		timeIncident,
		setTimeIncident,
		location,
		setLocation,
		file,
		setFile,
		locationSpecific,
		setLocationSpecific,
		equipment,
		setEquipment,
		updateDataDailyIncident,
		taggingNumber,
		setTaggingNumber,
		status,
		setStatus,
		setUpdated,
		updated,
		description,
		setDescription,
		serviceRequestNumber,
		setServiceRequestNumber,
	};
}
