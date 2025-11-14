import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const LangsirContext = createContext({});

export default function LangsirProvider(props) {
	const [dataLangsir, setDataLangsir] = useState([]);

	const getDataLangsir = async (params) => {
		console.log('getDataLangsir', params)
		return await ApiOperational.getDataLangsir({ params: params })
			.then(res => {
				setDataLangsir(res.data);
				return res.data
			})
			.catch(err => console.log('error', err));
	};

	const postDataLangsir = async (data) => {
		return await ApiOperational.postDataLangsir(data)
			.then(res => {
				setDataLangsir(res.data);
				return res.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const updateDataLangsir = async (id, data, params) => {
		return await ApiOperational.putDataLangsir(id, data)
			.then(async res => {
				console.log('res updateDataLangsir', res, id, data, params)
				const changeData = await getDataLangsir(params)
				return changeData.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const deleteDataLangsir = async (id, params) => {
		return await ApiOperational.deleteDataLangsir(id)
			.then(async res => {
				const changeData = await getDataLangsir({params:params})
				return changeData.data
			})
			.catch(err => console.log('error', err));
	};

	return (
		<LangsirContext.Provider
			value={{
				dataLangsir,
				setDataLangsir,
				getDataLangsir,
				postDataLangsir,
				updateDataLangsir,
				deleteDataLangsir
			}}
			{...props}
		/>
	);
}