import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const MasterDailyOperationContext = createContext({});

export default function MasterDailyOperationProvider(props) {
	const [listMasterDailyOperation, setListMasterDailyOperation] = useState([]);

	const getMasterDailyOperation = async params => {
		await ApiOperational.getMDailyOperations({ params: params })
			.then(res => {
				setListMasterDailyOperation(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MasterDailyOperationContext.Provider
			value={{
				listMasterDailyOperation,
				getMasterDailyOperation,
			}}
			{...props}
		/>
	);
}
