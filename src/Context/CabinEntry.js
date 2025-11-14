import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const CabinEntryContext = createContext({});

export default function CabinEntryProvider(props) {
	const [listCabinEntry, setListCabinEntry] = useState([]);

	const getDataCabinEntry = async (params) => {
		await ApiOperational.getCabinEntry({ params: params })
			.then(res => {
				setListCabinEntry(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<CabinEntryContext.Provider
			value={{
				listCabinEntry,
				getDataCabinEntry,
			}}
			{...props}
		/>
	);
}