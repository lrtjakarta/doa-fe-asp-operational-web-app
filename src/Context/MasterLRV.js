import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const MasterLrvContext = createContext({});

export default function MasterLrvProvider(props) {
	const [listMasterLrv, setListMasterLrv] = useState([]);

	const getDataNoGoItem = async (params) => {
		await ApiOperational.getMasterLRV({ params: params })
			.then(res => {
				setListMasterLrv(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MasterLrvContext.Provider
			value={{
				listMasterLrv,
				getDataNoGoItem,
			}}
			{...props}
		/>
	);
}