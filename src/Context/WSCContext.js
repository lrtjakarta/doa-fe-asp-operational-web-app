import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const WscContext = createContext({});

export default function WscProvider(props) {
	const [listWsc, setListWsc] = useState([]);
	const [listWscId, setListWscId] = useState(null);

	const getDataWsc = async params => {
		console.log('params', params);
		await ApiOperational.getWsc({ params: params })
			.then(res => {
				setListWsc(res.data);
				// console.log('data context wsc', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataWscId = async id => {
		await ApiOperational.getWscId(id)
			.then(res => {
				setListWscId(res.data);
				console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<WscContext.Provider
			value={{
				listWsc,
				getDataWsc,
				listWscId,
				getDataWscId,
			}}
			{...props}
		/>
	);
}
