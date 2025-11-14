import { createContext, useContext, useState } from 'react';
import ApiOperational from '../Services/ApiOperational';

export const UserProfilContext = createContext({});

export const useUserProfile = () => {
	const contextValue = useContext(UserProfilContext);

	return contextValue;
};

export default function UserProfilProvider(props) {
	const [userProfile, setUserProfile] = useState(null);
	const [profileData, setProfileData] = useState({});
	const [userWorkorder, setUserWorkorder] = useState(null);
	const [profilOfficer, setProfilOfficer] = useState([]);
	const [operational_id, setoperational_id] = useState('');
	const [profileDataId, setProfileDataID] = useState({});

	const [userById, setUserById] = useState(null);

	const getUserProfilById = async (_id, params) => {
		return await ApiOperational.getProfileUser(_id, { params: params })
			.then(res => {
				const _user = res.data.profile;
				const _workOrder = res.data.workOrder;
				const officer = {
					officerId: _user?._id,
					officerName: _user?.name,
					officerIdPosition: _user?.jobPosition?._id,
					officerPosition: _user?.jobPosition?.name,
					officerDepartemen: _user?.departement?.name,
					officerNumber: _user?.idNumber, // nipp
					officerStart: _workOrder?.workOrder?.start,
					officerEnd: _workOrder?.workOrder?.end,
					officerCode: _workOrder?.workOrder?.code,
					officerShift: _workOrder?.workOrder?.shift,
					officerPhoto: _user?.imgPict || [],
				};
				// console.log("_user", _user, _workOrder);
				setUserProfile(officer);
				setProfileData(_user);
				setUserWorkorder(res.data.workOrder);
				setoperational_id(res.data.workOrder?.operational_id);
				localStorage.setItem(
					'operational_id',
					res.data.workOrder?.operational_id
				);
				// console.log('getProfileUser', res.data)
				// console.log('context user profile', res.data);
				return res.data;
			})
			.catch(err => {
				console.log('error', err);
				return {};
			});
	};

	const getAllOfficer = async params => {
		await ApiOperational.getProfileOfficer({ params: params })
			.then(res => {
				setProfilOfficer(res.data.data);
				// console.log('data context user', res.data)
			})
			.catch(err => console.log('error', err));
	};

	const getUserLoginById = async _id => {
		return await ApiOperational.getUserById(_id)
			.then(res => {
				console.log('getUserLoginById', res.data);
				setUserById(res.data);
			})
			.catch(err => {
				console.log('error', err);
				return {};
			});
	};

	const getProfilId = async id => {
		await ApiOperational.getProfileId(id)
			.then(res => {
				setProfileDataID(res.data);
				// console.log('data context profil id', res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<UserProfilContext.Provider
			value={{
				userProfile,
				userWorkorder,
				operational_id,
				profileData,
				profilOfficer,
				userById,
				getUserProfilById,
				getAllOfficer,
				getUserLoginById,
				profileDataId,
				getProfilId,
			}}
			{...props}
		/>
	);
}
