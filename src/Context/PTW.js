import ApiOperational from "../Services/ApiOperational";
import React, { createContext, useCallback, useState } from "react";

export const PTWContext = createContext({
  count: 0,
  numRow: 0,
  listPtw: [],
  ptws: [],
  getPTWs: () => {},
  getListPTW: () => {},
});

export default function PTWProvider(props) {
  const [listPtw, setListPtw] = useState([]);
  const [ptws, setPtws] = useState([]);

  // for pagination
  const [count, setTotalCount] = useState(0); // use for non table pagination
  const [numRow, setNumRow] = useState(0); // use for table pagination

  const getPTWs = async (params) => {
    await ApiOperational.getPTW(params)
      .then((res) => {
        const { data, totalItems, totalCount } = res.data;

        setTotalCount(totalItems);
        setNumRow(totalCount);
        setPtws(data);
      })
      .catch((err) => console.log("error", err));
  };

  const getListPTW = async (params) => {
    await ApiOperational.getListPTW(params)
      .then((res) => {
        const { data } = res.data;
        setListPtw(data);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <PTWContext.Provider
      value={{
        count,
        numRow,
        listPtw,
        ptws,

        getPTWs,
        getListPTW,
      }}
      {...props}
    />
  );
}
