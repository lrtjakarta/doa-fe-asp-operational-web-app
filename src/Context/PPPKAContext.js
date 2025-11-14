import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const PPPKAContext = createContext({});

export default function PPPKAProvider(props) {
	const [dataPPPKA, setDataPPPKA] = useState([]);

	const getDataPPPKA = async (params) => {
		return await ApiOperational.getDataPPPKA({ params: params })
			.then(res => {
				setDataPPPKA(res.data);
				return res.data
			})
			.catch(err => console.log('error', err));
	};

	const postDataPPPKA = async (data) => {
		return await ApiOperational.postDataPPPKA(data)
			.then(res => {
				setDataPPPKA(res.data);
				return res.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const updateDataPPPKA = async (id, data, params) => {
		return await ApiOperational.putDataPPPKA(id, data)
			.then(async res => {
				const changeData = await getDataPPPKA({params:params})
				return changeData.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const deleteDataPPPKA = async (id, params) => {
		return await ApiOperational.deleteDataPPPKA(id)
			.then(async res => {
				const changeData = await getDataPPPKA({params:params})
				return changeData.data
			})
			.catch(err => console.log('error', err));
	};

	return (
		<PPPKAContext.Provider
			value={{
				dataPPPKA,
				getDataPPPKA,
				postDataPPPKA,
				updateDataPPPKA,
				deleteDataPPPKA
			}}
			{...props}
		/>
	);
}