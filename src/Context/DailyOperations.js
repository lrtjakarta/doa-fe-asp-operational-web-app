import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const DailyOperationContext = createContext({});

export default function DailyOperationProvider(props) {
	const [listDailyOperation, setListDailyOperation] = useState([]);
	const [dailyOperationById, setdailyOperationById] = useState(null);

	const getDataDailyOperation = async params => {
		await ApiOperational.getDailyOperations({ params: params })
			.then(res => {
				setListDailyOperation(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataDailyOperationById = async id => {
		await ApiOperational.getDailyOperationsById(id)
			.then(res => {
				setdailyOperationById(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<DailyOperationContext.Provider
			value={{
				listDailyOperation,
				dailyOperationById,
				getDataDailyOperation,
				getDataDailyOperationById,
			}}
			{...props}
		/>
	);
}
