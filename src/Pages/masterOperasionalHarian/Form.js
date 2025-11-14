import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid, Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';
import QuillEditor from 'Component/CustomEditor/QuillEditor';

import { UserProfilContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';

function Form() {
	const location = useLocation();
	const { type, dataRow } = location.state;
	const history = useHistory();

	// context
	const { userProfile } = useContext(UserProfilContext);

	// state
	const [formShift, setFormShift] = useState('');
	const [formTime, setFormTime] = useState({
		start: '',
		end: '',
	});
	const [formInfo, setFormInfo] = useState('');

	// handle
	const resetForm = () => {
		setFormShift('');
		setFormTime({
			start: '',
			end: '',
		});
		setFormInfo('');
	};
	const handleChange = value => {
		setFormShift(value);
		if (value === 'Pagi') {
			const _time = {
				start: '23:00',
				end: '05:00',
			};
			setFormTime(_time);
		} else if (value === 'Siang') {
			setFormTime({
				start: '05:00',
				end: '14:00',
			});
		} else if (value === 'Malam') {
			setFormTime({
				start: '14:00',
				end: '23:00',
			});
		}
	};
	const handleSubmit = async () => {
		let _create;
		let _createUpdate;
		if (type === 'Edit') {
			_create = dataRow?.createBy;
			_createUpdate = {
				name: userProfile?.officerName,
				jobRole: userProfile?.officerPosition,
				departement: userProfile?.officerDepartemen,
				idNumber: userProfile?.officerNumber,
				id: userProfile?.officerId,
			};
		} else {
			_create = {
				name: userProfile?.officerName,
				jobRole: userProfile?.officerPosition,
				departement: userProfile?.officerDepartemen,
				idNumber: userProfile?.officerNumber,
				id: userProfile?.officerId,
			};
			_createUpdate = null;
		}

		const postData = {
			shift: formShift,
			timeStart: formTime?.start,
			timeEnd: formTime?.end,
			timeShift: formTime,
			information: formInfo,
			createBy: _create,
			createUpdate: _createUpdate,
		};

		if (type === 'Edit') {
			const respon = await ApiOperational.updateMDailyOperations(
				dataRow._id,
				postData
			);

			if (respon.statusText === 'OK') {
				console.log('Update Data Berhasil');
				// setOpenNotif(true);
				resetForm();
				history.goBack();
			}
		} else {
			const respon = await ApiOperational.postMDailyOperations(postData);

			if (respon.statusText === 'OK') {
				console.log('Tambah Data Berhasil');
				// setOpenNotif(true);
				history.goBack();
				resetForm();
			}
		}
	};

	const getDataById = data => {
		setFormShift(data?.shift);
		setFormTime({
			start: data?.timeShift?.start,
			end: data?.timeShift?.end,
		});
		setFormInfo(data?.information);
	};

	useEffect(() => {
		if (type === 'Edit') {
			getDataById(dataRow);
		}
	}, []);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="Master Data Operasional Harian"
						sub1="Home -"
						sub2="Operasional -"
						sub3="Form Master Data Operasional Harian"
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						fullWidth
						size="small"
						label="Pilih Shift"
						sx={{ mt: '0px' }}
						select
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={formShift}
						onChange={e => handleChange(e.target.value)}
					>
						<option value=""></option>
						<option value="S1">Pagi</option>
						<option value="S2">Siang</option>
						<option value="S3">Malam</option>
					</AppTextField>
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						fullWidth
						size="small"
						label="Start"
						sx={{ mt: '0px' }}
						disabled
						value={formTime?.start}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<AppTextField
						fullWidth
						size="small"
						label="End"
						sx={{ mt: '0px' }}
						disabled
						value={formTime?.end}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<QuillEditor value={formInfo} onChange={e => setFormInfo(e)} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
				>
					<Button variant="contained" onClick={handleSubmit}>
						Simpan
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Form;
