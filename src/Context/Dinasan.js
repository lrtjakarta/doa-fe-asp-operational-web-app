import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const DinasanContext = createContext({});

export default function DinasanProvider(props) {
	const [listDinasan, setListDinasan] = useState([]);
	const [listAllDinasan, setListAllDinasan] = useState([]);

	const getDataDinas = async (_id, params) => {
		// console.log('data context user', _id, params);
		return await ApiOperational.getKedinasanById(_id, { params: params })
			.then(res => {
				setListDinasan(res.data);
				return res.data;
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataAllDinas = async params => {
		// console.log('data context user', _id, params);
		await ApiOperational.getAllKedinasan({ params: params })
			.then(async res => {
				const resDailyOperation = await ApiOperational.getDailyGoNoGo({params: { dailyWorkDate: params?.date }});
				
				const result = res.data.map(itemres => {
					const operationalData = resDailyOperation?.data.find(
						x => x._id === itemres.operational_id
					);
					if(operationalData)
					{
						return { ...itemres, operationalData }
					}
					else
					{
						return itemres
					}
				});
				setListAllDinasan(result);
				return result;
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getDataGoNoGo = async (params) => {
	try {
		const res = await ApiOperational.getAllKedinasan({ params });
		const resDailyOperation = await ApiOperational.getDailyGoNoGo({params: { dailyWorkDate: params?.date }});
		const resDailyStamformasi = await ApiOperational.getDataStamformasi({params: { operationDate: params?.date }});
		const result = res.data.map(itemres => {
			const operationalData = resDailyOperation?.data.find(
				x => x._id === itemres.operational_id
			);
			if(operationalData)
			{
				if(resDailyStamformasi.data.length>0){
					const stamformasiData = resDailyStamformasi.data[0].lrvList.find(x=>x.loop === "Loop "+operationalData.Loop)
					return { ...itemres, operationalData, stamformasiData }
				}
				return { ...itemres, operationalData }
				
			}
			else
			{
				return itemres
			}
		});

		console.log('result2', res.data, resDailyOperation.data, result);
		setListAllDinasan(result);
		return result;
	} catch (err) {
		return [];
	}
	};


	return (
		<DinasanContext.Provider
			value={{
				listDinasan,
				listAllDinasan,
				getDataDinas,
				getDataAllDinas,
				getDataGoNoGo,
			}}
			{...props}
		/>
	);
}
