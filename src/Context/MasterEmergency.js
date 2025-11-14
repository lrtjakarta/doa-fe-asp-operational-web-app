import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const MasterEmergencyContext = createContext({});

export default function MasterEmergencyProvider(props) {
	const [listMasterEmergency, setListMasterEmergency] = useState([]);

	const getMasterEmergency= async (params) => {
		await ApiOperational.getMDEmergency({ params: params })
			.then(res => {
				setListMasterEmergency(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MasterEmergencyContext.Provider
			value={{
				listMasterEmergency,
				getMasterEmergency,
			}}
			{...props}
		/>
	);
}