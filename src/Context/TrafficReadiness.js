import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const TrafficReadinessContext = createContext({});

export default function TrafficReadinessProvider(props) {
	const [listTrafficReadiness, setListTrafficReadiness] = useState([]);
	const [TrafficReadinessById, setTrafficReadinessById] = useState(null);

	const getDataTrafficReadiness = async params => {
		await ApiOperational.getTraffic({ params: params })
			.then(res => {
				setListTrafficReadiness(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataTrafficReadinessById = async id => {
		await ApiOperational.getTrafficById(id)
			.then(res => {
				setTrafficReadinessById(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<TrafficReadinessContext.Provider
			value={{
				listTrafficReadiness,
				TrafficReadinessById,
				getDataTrafficReadiness,
				getDataTrafficReadinessById,
			}}
			{...props}
		/>
	);
}
