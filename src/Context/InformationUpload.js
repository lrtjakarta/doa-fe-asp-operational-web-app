import React, { useContext, createContext, useState } from "react";
import Api from "../Services/ApiOperational";

export const InformationUploadContext = createContext({});

export default function InformationUploadProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [informationUpload, setInformationUpload] = useState([]);

  const getDataInformationUpload = async () => {
    try {
      let query = {};
      const res = await Api.getInformationUpload({ params: query });
      setInformationUpload(res.data);

      return { status: "OK", result: res.data };
    } catch (err) {
      return { status: 400, result: err };
    }
  };

  const getDataInformationUploadV2 = async (params) => {
    return Api.getInformationUploadV2(params)
      .then((res) => {
        setInformationUpload(res.data);
        //console.log("res.data", res.data)
        return { status: "OK", result: res.data };
      })
      .catch((error) => {
        return { status: 400, result: error };
      });
  };

  const postDataInformationUpload = async (data) => {
    try {
      const res = await Api.postInformationUpload(data);
      setOpenSnackbar(true);
      return { status: true, result: res.data };
    } catch (err) {
      setOpenSnackbar(true);
      return { status: 400, result: err };
    }
  };

  const putDataInformationUpload = async (id, data) => {
    try {
      const res = await Api.putInformationUpload(id, data);
      console.log("putDataInformationUpload", res.data);
      setOpenSnackbar(true);
      return { status: "OK", result: res.data };
    } catch (err) {
      setOpenSnackbar(true);
      return { status: 400, result: err };
    }
  };

  return (
    <InformationUploadContext.Provider
      value={{
        informationUpload,
        setInformationUpload,
        getDataInformationUpload,
        getDataInformationUploadV2,
        postDataInformationUpload,
        putDataInformationUpload,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  );
}
