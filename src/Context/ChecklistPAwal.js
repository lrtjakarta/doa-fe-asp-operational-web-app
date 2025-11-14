import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const ChecklistPAwalContext = createContext({});

export default function ChecklistPAwalProvider(props) {
	const [listChecklistPAwal, setListChecklistPAwal] = useState([]);

	const getDataChecklistPAwal = async params => {
		await ApiOperational.getPemberangkatanAwal({ params: params })
			.then(res => {
				setListChecklistPAwal(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<ChecklistPAwalContext.Provider
			value={{
				listChecklistPAwal,
				getDataChecklistPAwal,
			}}
			{...props}
		/>
	);
}
