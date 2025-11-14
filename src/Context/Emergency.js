import ApiOperational from '../Services/ApiOperational';
import React, { createContext, useCallback, useState } from 'react';

export const EmergencyContext = createContext({});

export default function EmergencyProvider(props) {
	const [listEmergency1, setListEmergency1] = useState([]);
	const [listEmergency2, setListEmergency2] = useState([]);
	const [listEmergency3, setListEmergency3] = useState([]);
	const [listEmergency4, setListEmergency4] = useState([]);

	const [listEmergency5, setListEmergency5] = useState([]);
	const [listEmergency6, setListEmergency6] = useState([]);
	const [listEmergency7, setListEmergency7] = useState([]);
	const [listEmergency8, setListEmergency8] = useState([]);

	const getEmergency1= async (params) => {
		await ApiOperational.getEmergency1({ params: params })
			.then(res => {
				setListEmergency1(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency2= async (params) => {
		await ApiOperational.getEmergency2({ params: params })
			.then(res => {
				setListEmergency2(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency3= async (params) => {
		await ApiOperational.getEmergency3({ params: params })
			.then(res => {
				setListEmergency3(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency4= async (params) => {
		await ApiOperational.getEmergency4({ params: params })
			.then(res => {
				setListEmergency4(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency5= async (params) => {
		await ApiOperational.getEmergency5({ params: params })
			.then(res => {
				setListEmergency5(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency6= async (params) => {
		await ApiOperational.getEmergency6({ params: params })
			.then(res => {
				setListEmergency6(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency7= async (params) => {
		await ApiOperational.getEmergency7({ params: params })
			.then(res => {
				setListEmergency7(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	const getEmergency8= async (params) => {
		await ApiOperational.getEmergency8({ params: params })
			.then(res => {
				setListEmergency8(res.data);
				// console.log('data context user', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<EmergencyContext.Provider
			value={{
				listEmergency1,
				getEmergency1,
				listEmergency2,
				getEmergency2,
				listEmergency3,
				getEmergency3,
				listEmergency4,
				getEmergency4,

				listEmergency5,
				getEmergency5,
				listEmergency6,
				getEmergency6,
				listEmergency7,
				getEmergency7,
				listEmergency8,
				getEmergency8,
			}}
			{...props}
		/>
	);
}