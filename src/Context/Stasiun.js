import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const StasiunContext = createContext({});

export default function StasiunProvider(props) {
	const [dataStasiun, setDataStasiun] = useState([]);

	const getAllStasiun = async params => {
		return await ApiOperational.getStasiun({ params: params })
			.then(res => {
				setDataStasiun(res.data);
				return res.data
			})
			.catch(err => console.log('error', err));
	};

	return (
		<StasiunContext.Provider
			value={{
				dataStasiun,
				getAllStasiun,
			}}
			{...props}
		/>
	);
}
