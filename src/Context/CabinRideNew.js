import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const CabinRideNewContext = createContext({});

export default function CabinRideNewProvider(props) {
	const [listCabinRideNew, setListCabinRideNew] = useState([]);
	const [cabinRideById, setCabinRideById] = useState(null);

	const getDataCabinRideNew = async params => {
		await ApiOperational.getCabinRideNew({ params: params })
			.then(res => {
				setListCabinRideNew(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataCabinRideNewId = async id => {
		await ApiOperational.getCabinRideNewId(id)
			.then(res => {
				setCabinRideById(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<CabinRideNewContext.Provider
			value={{
				listCabinRideNew,
				cabinRideById,
				getDataCabinRideNew,
				getDataCabinRideNewId,
			}}
			{...props}
		/>
	);
}
