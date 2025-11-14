import React, { useEffect, useContext, useState } from 'react';

import ApiOperational from 'Services/ApiOperational';
import { MasterDataIncidentContext } from 'Context';

export default function MasterDataIncident() {
	const {
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
	} = useContext(MasterDataIncidentContext);
	// *** //
	const [newLocationIncident, setNewLocationIncident] = useState(false);
	const [newNameLocationIncident, setNewNameLocationIncident] = useState('');
	const [selectLocationIncident, setSelectLocationIncident] = useState([]);
	const [newCodeLocationIncident, setNewCodeLocationIncident] = useState('');
	// *** //
	const [newStatusIncident, setNewStatusIncident] = useState(false);
	const [newNameStatusIncident, setNewNameStatusIncident] = useState('');
	const [selectStatusIncident, setSelectStatusIncident] = useState([]);
	const [newCodeStatusIncident, setNewCodeStatusIncident] = useState('');
	// *** //
	const [newEquipmentIncident, setNewEquipmentIncident] = useState(false);
	const [newNameEquipmentIncident, setNewNameEquipmentIncident] = useState('');
	const [selectEquipmentIncident, setSelectEquipmentIncident] = useState([]);
	const [newCodeEquipmentIncident, setNewCodeEquipmentIncident] = useState('');
	// *** //
	const [newSpecificLocationIncident, setNewSpecificLocationIncident] =
		useState(false);
	const [newNameSpecificLocationIncident, setNewNameSpecificLocationIncident] =
		useState('');
	const [selectSpecificLocationIncident, setSelectSpecificLocationIncident] =
		useState([]);
	const [newCodeSpecificLocationIncident, setNewCodeSpecificLocationIncident] =
		useState('');

	useEffect(() => {
		const fetchData = async () => {
			await getDataLocationIncident();
			await getDataStatusIncident();
			await getDataEquipmentIncident();
			await getDataSpecificLocationIncident();
		};
		fetchData();
	}, []);

	const handleChangeLocationIncident = val => {
		if (val.length > 0) {
			if (val[val.length - 1].__isNew__) {
				setNewLocationIncident(true);
				setNewNameLocationIncident(val[val.length - 1].value);
				setSelectLocationIncident(val);
			} else {
				setNewLocationIncident(false);
				setSelectLocationIncident(val);
			}
		} else {
			setSelectLocationIncident([]);
		}
	};
	const handleSubmitNewLocationIncident = async () => {
		const sendData = {
			code: newCodeLocationIncident,
			name: newNameLocationIncident,
		};
		const result = await postDataLocationIncident(sendData);
		if (result.status === 'OK') {
			await getDataLocationIncident();
			setNewLocationIncident(false);
			setNewNameLocationIncident('');
			setNewCodeLocationIncident('');
		}
	};
	// **** //
	const handleChangeStatusIncident = val => {
		if (val.length > 0) {
			if (val[val.length - 1].__isNew__) {
				setNewStatusIncident(true);
				setNewNameStatusIncident(val[val.length - 1].value);
				setSelectStatusIncident(val);
			} else {
				setNewStatusIncident(false);
				setSelectStatusIncident(val);
			}
		} else {
			setSelectStatusIncident([]);
		}
	};
	const handleSubmitNewStatusIncident = async () => {
		const sendData = {
			code: newCodeStatusIncident,
			name: newNameStatusIncident,
		};
		const result = await postDataStatusIncident(sendData);
		if (result.status === 'OK') {
			await getDataStatusIncident();
			setNewStatusIncident(false);
			setNewNameStatusIncident('');
			setNewCodeStatusIncident('');
		}
	};
	// **** //
	const handleChangeEquipmentIncident = val => {
		if (val.length > 0) {
			if (val[val.length - 1].__isNew__) {
				setNewEquipmentIncident(true);
				setNewNameEquipmentIncident(val[val.length - 1].value);
				setSelectEquipmentIncident(val);
			} else {
				setNewEquipmentIncident(false);
				setSelectEquipmentIncident(val);
			}
		} else {
			setSelectEquipmentIncident([]);
		}
	};
	const handleSubmitNewEquipmentIncident = async () => {
		const sendData = {
			code: newCodeEquipmentIncident,
			name: newNameEquipmentIncident,
		};
		const result = await postDataEquipmentIncident(sendData);
		if (result.status === 'OK') {
			await getDataEquipmentIncident();
			setNewEquipmentIncident(false);
			setNewNameEquipmentIncident('');
			setNewCodeEquipmentIncident('');
		}
	};
	// **** //
	const handleChangeSpecificLocationIncident = val => {
		if (val.length > 0) {
			if (val[val.length - 1].__isNew__) {
				setNewSpecificLocationIncident(true);
				setNewNameSpecificLocationIncident(val[val.length - 1].value);
				setSelectSpecificLocationIncident(val);
			} else {
				setNewSpecificLocationIncident(false);
				setSelectSpecificLocationIncident(val);
			}
		} else {
			setSelectSpecificLocationIncident([]);
		}
	};
	const handleSubmitNewSpecificLocationIncident = async () => {
		const sendData = {
			code: newCodeSpecificLocationIncident,
			name: newNameSpecificLocationIncident,
		};
		const result = await postDataSpecificLocationIncident(sendData);
		if (result.status === 'OK') {
			await getDataSpecificLocationIncident();
			setNewSpecificLocationIncident(false);
			setNewNameSpecificLocationIncident('');
			setNewCodeSpecificLocationIncident('');
		}
	};
	return {
		locationIncident,
		setLocationIncident,
		filterLocationIncident,
		newLocationIncident,
		selectLocationIncident,
		setSelectLocationIncident,
		newNameLocationIncident,
		setNewNameLocationIncident,
		newCodeLocationIncident,
		setNewCodeLocationIncident,
		handleChangeLocationIncident,
		handleSubmitNewLocationIncident,
		// *** //
		statusIncident,
		setStatusIncident,
		filterStatusIncident,
		newStatusIncident,
		selectStatusIncident,
		setSelectStatusIncident,
		newNameStatusIncident,
		setNewNameStatusIncident,
		newCodeStatusIncident,
		setNewCodeStatusIncident,
		handleChangeStatusIncident,
		handleSubmitNewStatusIncident,
		// **** //
		equipmentIncident,
		setEquipmentIncident,
		filterEquipmentIncident,
		newEquipmentIncident,
		selectEquipmentIncident,
		setSelectEquipmentIncident,
		newNameEquipmentIncident,
		setNewNameEquipmentIncident,
		newCodeEquipmentIncident,
		setNewCodeEquipmentIncident,
		handleChangeEquipmentIncident,
		handleSubmitNewEquipmentIncident,
		// *** //
		specificLoactionIncident,
		setSpecificLoactionIncident,
		filterSpecificLoactionIncident,
		newSpecificLocationIncident,
		selectSpecificLocationIncident,
		setSelectSpecificLocationIncident,
		newNameSpecificLocationIncident,
		setNewNameSpecificLocationIncident,
		newCodeSpecificLocationIncident,
		setNewCodeSpecificLocationIncident,
		handleChangeSpecificLocationIncident,
		handleSubmitNewSpecificLocationIncident,
	};
}
