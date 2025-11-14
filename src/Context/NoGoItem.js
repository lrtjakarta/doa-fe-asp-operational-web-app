import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const NoGoItemContext = createContext({});

export default function NoGoItemProvider(props) {
	const [listNoGoItem, setListNoGoItem] = useState([]);

	const getDataNoGoItem = async (params) => {
		return await ApiOperational.getNoGoItem({ params: params })
			.then(res => {
				setListNoGoItem(res.data);
				return res.data
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<NoGoItemContext.Provider
			value={{
				listNoGoItem,
				getDataNoGoItem,
			}}
			{...props}
		/>
	);
}