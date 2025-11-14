import React, { useContext, createContext, useState } from 'react';
import ApiOperational from '../Services/ApiOperational';

export const PreliminaryReportContext = createContext({});

export default function PreliminaryReportProvider(props) {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [preliminaryReport, setPreliminaryReport] = useState([]);

	const getDataPreliminaryReport = async query => {
		try {
			// console.log('query', query)
			const res = await ApiOperational.getPreliminaryReport({ params: query });
			setPreliminaryReport(res.data);
			// console.log("res.data", res.data)
			return { status: 'OK', result: res.data };
		} catch (err) {
			return { status: 'Failed', result: err };
		}
	};

	const postDataPreliminaryReport = async data => {
		try {
			const res = await ApiOperational.postPreliminaryReport(data);
			setOpenSnackbar(true);
			return { status: 'OK', result: res.data };
		} catch (err) {
			setOpenSnackbar(true);
			return { status: 'Failed', result: err };
		}
	};

	const putDataPreliminaryReport = async (id, data) => {
		try {
			const res = await ApiOperational.putPreliminaryReport(id, data);
			console.log('putDataPreliminaryReport', res.data);
			setOpenSnackbar(true);
			return { status: 'OK', result: res.data };
		} catch (err) {
			setOpenSnackbar(true);
			return { status: 'Failed', result: err };
		}
	};

	const deleteDataPreliminaryReport = async id => {
		try {
			const res = await ApiOperational.deletePreliminaryReport(id);
			const result = preliminaryReport.filter(item => item._id !== id);
			setPreliminaryReport(result);
			setOpenSnackbar(true);
			return { status: 'OK', result: res.data };
		} catch (err) {
			setOpenSnackbar(true);
			return { status: 'Failed', result: err };
		}
	};

	return (
		<PreliminaryReportContext.Provider
			value={{
				preliminaryReport,
				getDataPreliminaryReport,
				postDataPreliminaryReport,
				putDataPreliminaryReport,
				deleteDataPreliminaryReport,
				openSnackbar,
				setOpenSnackbar,
			}}
			{...props}
		/>
	);
}
