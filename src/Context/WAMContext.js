import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const WAMContext = createContext({});

export default function WAMProvider(props) {
	const [dataWAM, setDataWAM] = useState([]);

	const getDataWAM = async (params) => {
		return await ApiOperational.getDataWAM({ params: params })
			.then(res => {
				setDataWAM(res.data);
				return res.data
			})
			.catch(err => console.log('error', err));
	};

	const postDataWAM = async (data) => {
		return await ApiOperational.postDataWAM(data)
			.then(res => {
				setDataWAM(res.data);
				return res.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const updateDataWAM = async (id, data, params) => {
		return await ApiOperational.putDataWAM(id, data)
			.then(async res => {
				const changeData = await getDataWAM({params:params})
				return changeData.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const deleteDataWAM = async (id, params) => {
		return await ApiOperational.deleteDataWAM(id)
			.then(async res => {
				const changeData = await getDataWAM({params:params})
				return changeData.data
			})
			.catch(err => console.log('error', err));
	};

	return (
		<WAMContext.Provider
			value={{
				dataWAM,
				getDataWAM,
				postDataWAM,
				updateDataWAM,
				deleteDataWAM
			}}
			{...props}
		/>
	);
}