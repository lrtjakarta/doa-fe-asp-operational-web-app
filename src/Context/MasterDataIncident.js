import React, { useContext, createContext, useState } from 'react';
import ApiOperational from '../Services/ApiOperational';

export const MasterDataIncidentContext = createContext({});

export default function MasterDataIncidentProvider(props) {
	const [locationIncident, setLocationIncident] = useState([]);
	const [filterLocationIncident, setFilterLocationIncident] = useState([]);
	const [statusIncident, setStatusIncident] = useState([]);
	const [filterStatusIncident, setFilterStatusIncident] = useState([]);
	const [equipmentIncident, setEquipmentIncident] = useState([]);
	const [filterEquipmentIncident, setFilterEquipmentIncident] = useState([]);
	const [specificLoactionIncident, setSpecificLoactionIncident] = useState([]);
	const [filterSpecificLoactionIncident, setFilterSpecificLoactionIncident] =
		useState([]);

	const getDataLocationIncident = id => {
		return ApiOperational.getLocationIncident({ params: { id } })
			.then(res => {
				if (res.data.length > 0) {
					const result = res?.data.map(item => {
						item.label = item.name;
						item.value = item.name;
						return item;
					});
					setLocationIncident(result);
					setFilterLocationIncident(result);
					return { ...result };
				}
			})
			.catch(err => console.log('error', err));
	};

	const postDataLocationIncident = sendData => {
		return ApiOperational.postLocationIncident(sendData)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	const getDataStatusIncident = id => {
		return ApiOperational.getStatusIncident({ params: { id } })
			.then(res => {
				if (res.data.length > 0) {
					const result = res?.data.map(item => {
						item.label = item.name;
						item.value = item.name;
						return item;
					});
					setStatusIncident(result);
					setFilterStatusIncident(result);
					return { ...result };
				}
			})
			.catch(err => console.log('error', err));
	};

	const postDataStatusIncident = sendData => {
		return ApiOperational.postStatusIncident(sendData)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	const getDataEquipmentIncident = id => {
		return ApiOperational.getEquipmentIncident({ params: { id } })
			.then(res => {
				if (res.data.length > 0) {
					const result = res?.data.map(item => {
						item.label = item.name;
						item.value = item.name;
						return item;
					});
					setEquipmentIncident(result);
					setFilterEquipmentIncident(result);
					return { ...result };
				}
			})
			.catch(err => console.log('error', err));
	};

	const postDataEquipmentIncident = sendData => {
		return ApiOperational.postEquipmentIncident(sendData)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	const getDataSpecificLocationIncident = id => {
		return ApiOperational.getSpecificLocationIncident({ params: { id } })
			.then(res => {
				if (res.data.length > 0) {
					const result = res?.data.map(item => {
						item.label = item.name;
						item.value = item.name;
						return item;
					});
					setSpecificLoactionIncident(result);
					setFilterSpecificLoactionIncident(result);
					return { ...result };
				}
			})
			.catch(err => console.log('error', err));
	};

	const postDataSpecificLocationIncident = sendData => {
		return ApiOperational.postSpecificLocationIncident(sendData)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	return (
		<MasterDataIncidentContext.Provider
			value={{
				locationIncident,
				setLocationIncident,
				filterLocationIncident,
				getDataLocationIncident,
				postDataLocationIncident,
				statusIncident,
				setStatusIncident,
				filterStatusIncident,
				getDataStatusIncident,
				postDataStatusIncident,
				equipmentIncident,
				setEquipmentIncident,
				filterEquipmentIncident,
				getDataEquipmentIncident,
				postDataEquipmentIncident,
				specificLoactionIncident,
				setSpecificLoactionIncident,
				filterSpecificLoactionIncident,
				getDataSpecificLocationIncident,
				postDataSpecificLocationIncident,
			}}
			{...props}
		/>
	);
}
