import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const MonitoringScadaContext = createContext({});

export default function MonitoringScadaProvider(props) {
	const [listMonitoringScada, setListMonitoringScada] = useState([]);

	const getDataMonitoringScada = async params => {
		await ApiOperational.getMonitoringScada({ params: params })
			.then(res => {
				setListMonitoringScada(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MonitoringScadaContext.Provider
			value={{
				listMonitoringScada,
				getDataMonitoringScada,
			}}
			{...props}
		/>
	);
}
