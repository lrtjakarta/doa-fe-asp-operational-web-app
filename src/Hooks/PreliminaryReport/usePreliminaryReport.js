import { PreliminaryReportContext } from '../../Context/index';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function UsePreliminaryReport() {
	const {
		getDataPreliminaryReport,
		preliminaryReport,
		postDataPreliminaryReport,
		openSnackbar,
		setOpenSnackbar,
		putDataPreliminaryReport,
		deleteDataPreliminaryReport,
	} = useContext(PreliminaryReportContext);
	const [selectedData, setSelectedData] = useState({});
	const [trainDriver, setTrainDriver] = useState({});
	const [openDialog, setOpenDialog] = useState(false);
	const [date, setDate] = useState(moment().format('YYYY-MM'));
	const [accident, setAccident] = useState('');
	const [location, setLocation] = useState('');
	const [department, setDepartment] = useState('');
	const [updated, setUpdated] = useState(null);
	const [dateOccurence, setDateOccurence] = useState('');
	const [dateReport, setDateReport] = useState('');
	const [lossInformation, setLossInformation] = useState('');
	const [description, setDescription] = useState('');
	const [chronology, setChronology] = useState([
		{ id: 1, time: '', value: '' },
	]);

	const handleFilterDate = event => {
		// setDate(event.target.value)
		// let monthly = event.target.value
		// let createBy = JSON.parse(localStorage.getItem("profile"))?._id
		let dateReport = date;
		getDataPreliminaryReport({ dateReport });
	};

	let data = {
		trainDriver: {},
		dailyWorkTrainDriver: {},
		accident,
		location,
		department,
		dateOccurence,
		dateReport,
		lossInformation,
		description,
		chronology,
		file: [],
		// createBy: JSON.parse(localStorage.profile),
		updated,
	};

	const submitDataPreliminaryReport = () => {
		return postDataPreliminaryReport(data);
	};

	const updateDataPreliminaryReport = async (
		multiImage,
		id,
		dailyWorkTrainDriver,
		updated
	) => {
		data = {
			...data,
			dailyWorkTrainDriver,
			file: multiImage,
			updated,
		};
		return putDataPreliminaryReport(id, data);
	};

	const handleSelect = data => {
		setSelectedData(data);
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
		setSelectedData({});
	};

	const handleDelete = async idParams => {
		console.log('handleDelete', idParams);
		const result = await deleteDataPreliminaryReport(
			idParams ? idParams : selectedData._id
		);
		if (result.status === 'OK') {
			setOpenDialog(false);
			setSelectedData({});
		}
	};

	return {
		getDataPreliminaryReport,
		submitDataPreliminaryReport,
		handleFilterDate,
		handleDelete,
		date,
		setDate,
		setOpenSnackbar,
		openSnackbar,
		preliminaryReport,
		handleSelect,
		selectedData,
		openDialog,
		handleClose,
		setUpdated,
		updated,
		accident,
		setAccident,
		location,
		setLocation,
		department,
		setDepartment,
		dateOccurence,
		setDateOccurence,
		updateDataPreliminaryReport,
		dateReport,
		setDateReport,
		lossInformation,
		setLossInformation,
		description,
		setDescription,
		setSelectedData,
		chronology,
		setChronology,
	};
}
