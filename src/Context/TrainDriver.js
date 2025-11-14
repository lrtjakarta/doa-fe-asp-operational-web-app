import { createContext, useState } from "react";
import Api from "../Services/ApiOperational";

export const TrainDriverContext = createContext({});

export default function TrainDriverProvider(props) {
  const [trainDriver, setTrainDriver] = useState([]);
  const [filterTrainDriver, setFilterTrainDriver] = useState([]);
  const [detailTrainDriver, setDetailTrainDriver] = useState({});

  const getDataTrainDriver = async () => {
    if (trainDriver.length === 0) {
      return Api.getTrainDriver({
        params: { departement: "662773cd84d37c2a2f2431f1", pageSize: "100" },
      })
        .then((res) => {
          console.log("res.data", res.data);
          if (res.data?.data?.length > 0) {
            let listTrainDriver = res.data.data.map((item) => {
              item.label = item.name;
              item.value = item._id;
              return item;
            });
            setTrainDriver(listTrainDriver);
            setFilterTrainDriver(listTrainDriver);
          }
          return res?.data?.data;
        })
        .catch((err) => {
          console.log("error", err);
          return [];
        });
    } else {
      return trainDriver;
    }
  };

  const getDetailTrainDriver = async (nik) => {
    if (nik) {
      return Api.getTrainDriver({ params: { idNumber: nik } })
        .then((res) => {
          const { data } = res.data;
          if (data.length > 0) {
            console.log("getDetailTrainDriver", data);
            setDetailTrainDriver(data[0]);
            return { ...data[0] };
          }
        })
        .catch((err) => console.log("error", err));
    }
  };

  return (
    <TrainDriverContext.Provider
      value={{
        setTrainDriver,
        trainDriver,
        getDataTrainDriver,
        filterTrainDriver,
        setFilterTrainDriver,
        getDetailTrainDriver,
        detailTrainDriver,
        setDetailTrainDriver,
      }}
      {...props}
    />
  );
}
