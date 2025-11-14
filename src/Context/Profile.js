import React, { createContext, useState, useEffect } from "react";
import API from "Services/ApiOperational";

export const ProfileContext = createContext({
  listProfile: [],
  getListProfile: (params) => {},
});

export default function ProfileProvider(props) {
  const [profileUser, setProfileUser] = useState({});
  const [listProfile, setListProfile] = useState([]);
  const [profileUserByNIK, setProfileUserByNIK] = useState({});

  const getListProfile = async (params) => {
    const _params = { ...params, isLimit: false };
    await API.getTrainDriver({ params: _params })
      .then((res) => {
        const { data } = res.data;

        setListProfile(data);
      })
      .catch((err) => console.log("error get list profile", err));
  };
  const getProfileUser = async () => {
    if (localStorage.profile) {
      let userProfile = JSON.parse(localStorage.profile);
      setProfileUser(userProfile);
      return userProfile;
    } else {
      return {};
    }
  };

  // useEffect(()=>{
  //   getProfileUser()
  // }, [])

  return (
    <ProfileContext.Provider
      value={{ profileUser, listProfile, getListProfile, getProfileUser }}
      {...props}
    />
  );
}
