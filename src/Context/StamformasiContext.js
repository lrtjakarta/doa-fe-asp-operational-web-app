import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const StamformasiContext = createContext({});

export default function StamformasiProvider(props) {
	const [dataStamformasi, setDataStamformasi] = useState([]);

	const getDataStamformasi = async (params) => {
		return await ApiOperational.getDataStamformasi({ params: params })
			.then(res => {
				setDataStamformasi(res.data);
				return res.data
			})
			.catch(err => console.log('error', err));
	};

	const postDataStamformasi = async (data) => {
		return await ApiOperational.postDataStamformasi(data)
			.then(res => {
				setDataStamformasi(res.data);
				return res.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const updateDataStamformasi = async (id, data, params) => {
		return await ApiOperational.putDataStamformasi(id, data)
			.then(async res => {
				const changeData = await getDataStamformasi({params:params})
				return changeData.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const deleteDataStamformasi = async (id, params) => {
		return await ApiOperational.deleteDataStamformasi(id)
			.then(async res => {
				const changeData = await getDataStamformasi({params:params})
				return changeData.data
			})
			.catch(err => console.log('error', err));
	};

	return (
		<StamformasiContext.Provider
			value={{
				dataStamformasi,
				getDataStamformasi,
				postDataStamformasi,
				updateDataStamformasi,
				deleteDataStamformasi
			}}
			{...props}
		/>
	);
}