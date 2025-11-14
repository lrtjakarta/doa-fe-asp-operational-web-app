import React, { useContext, createContext, useState, useEffect } from "react";
import ApiOperational from "../Services/ApiOperational";
import StaticVar from "Config/StaticVar";
import moment from "moment";
import _ from "lodash";
import io from "socket.io-client";

export const DailyWorkContext = createContext({});

// const socket = io.connect(StaticVar.URL_API, {
//     query: "userobject=led",
//     transports: ["websocket"]
// });

export default function DailyWorkProvider(props) {
  const [dataLoopTrain, setDataLoopTrain] = useState([]);
  const [dataScheduleTrainDriver, setDataScheduleTrainDriver] = useState([]);
  const [dataScheduleSPV, setDataScheduleSPV] = useState([]);
  const [dataDetailDaily, setDataDetailDaily] = useState({});
  const [dataScheduleLastTrainDriver, setDataScheduleLastTrainDriver] =
    useState({});
  const [kaIncidentScheduleTrainDriver, setKaIncidentScheduleTrainDriver] =
    useState({});
  const [handoverTablet, setHandOverTablet] = useState("");
  const [dataScheduleTrainDriverLangsir, setDataScheduleTrainDriverLangsir] =
    useState([]);
  const [dataScheduleSupervisor, setDataScheduleSupervisor] = useState({});
  const [dataScheduleLastSupervisor, setDataScheduleLastSupervisor] = useState(
    {}
  );

  const getDataLogBook = async (data) => {
    let dataLogBook = await ApiOperational.getLogBook({ params: data });
    let dataLogBookAsssement = await ApiOperational.getLogBookAssessment({
      params: data,
    });
    let dataresponse = dataLogBook.data
      .filter((x) => x.Dinasan !== "Penyelia")
      .map((itemLogBook) => {
        let _dataAssessment = dataLogBookAsssement.data.filter(
          (x) =>
            x.trainDriverId === itemLogBook.trainDriverId &&
            x.Tanggal === itemLogBook.Tanggal
        );
        let _dayNumber = new Date(itemLogBook.Tanggal).getDay();
        let Hari = "";
        switch (_dayNumber) {
          case 0:
            Hari = "Minggu";
            break;
          case 1:
            Hari = "Senin";
            break;
          case 2:
            Hari = "Selasa";
            break;
          case 3:
            Hari = "Rabu";
            break;
          case 4:
            Hari = "Kamis";
            break;
          case 5:
            Hari = "Jumat";
            break;
          case 6:
            Hari = "Sabtu";
            break;
          default:
            Hari = "";
        }
        if (_dataAssessment.length > 0) {
          return {
            ...itemLogBook,
            Dinasan:
              itemLogBook.Dinasan === "Bertugas"
                ? "Mainline"
                : itemLogBook.Dinasan,
            Hari,
            HT: _dataAssessment[0].HT,
            Tablet: _dataAssessment[0].Tablet,
            JamDatang: _dataAssessment[0].JamDatang,
            Attendance: _dataAssessment[0].Attendance,
            HasilKesehatan:
              _dataAssessment[0].HasilKesehatan === "1"
                ? "Fit To Work"
                : _dataAssessment[0].HasilKesehatan === "2"
                ? "Fit To Work with Note"
                : _dataAssessment[0].HasilKesehatan === "2"
                ? "Unfit To Work"
                : "-",
            StatusAsesmen:
              _dataAssessment[0].Status == 0
                ? "Tidak Laik"
                : _dataAssessment[0].Status == 1
                ? "Laik Dinas"
                : _dataAssessment[0].Status == 2
                ? "sedang penilaian"
                : "-",
            totalPoint: _dataAssessment[0].totalPoint,
            PenyeliaPenilai: _dataAssessment[0].PenyeliaPenilai,
          };
        } else {
          return {
            ...itemLogBook,
            Hari,
            Dinasan:
              itemLogBook.Dinasan === "Bertugas"
                ? "Mainline"
                : itemLogBook.Dinasan,
            HT: "-",
            Tablet: "-",
            JamDatang: "0",
            Attendance: {},
            HasilKesehatan: "-",
            StatusAsesmen: "-",
            totalPoint: {},
            PenyeliaPenilai: "-",
          };
        }
      });
    return dataresponse;
  };

  const getDataScheduleTrainDriverLangsir = async (data) => {
    return ApiOperational.getScheduleTrainDriver(data)
      .then(async (res) => {
        // console.log('DataScheduleTrainDriver', res.data)
        const filterLangsir = await res.data.filter(
          (item) => item.loopRouteTrain.loop !== "Libur"
        );
        const resultLangsir = await filterLangsir.map((item) => {
          item.duration = 2;
          return item;
        });
        setDataScheduleTrainDriverLangsir(resultLangsir);
        return res.data;
      })
      .catch((err) => {
        console.log("err", err);
        return { status: 400, result: err };
      });
  };

  const getDataLoopTrain = async (data) => {
    ApiOperational.getDailyWork(data)
      .then(async (res) => {
        const result = await res.data.filter((item) => item.code !== "OFF");
        setDataLoopTrain(result);
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataScheduleTrainDriver = async (data) => {
    return ApiOperational.getScheduleTrainDriver(data)
      .then((res) => {
        console.log("DataScheduleTrainDriver", res.data);
        if (!data?.local) {
          setDataScheduleTrainDriver(res.data);
        }
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataScheduleOFF = async (data) => {
    return ApiOperational.getScheduleTrainDriver(data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataReportMonthly = async (data) => {
    return ApiOperational.getReportMonthly(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getDataTotalDistance = async (data) => {
    return ApiOperational.getTotalDistance(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getTotalSchedule = async (data) => {
    return ApiOperational.getTotalSchedule(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getDataScheduleSupervisor = async (data) => {
    return ApiOperational.getScheduleTrainDriver(data).then((res) => {
      setDataScheduleSPV(res.data);
      return res.data;
    });
  };
  const putDataScheduleSupervisor = async (id, data) => {
    return ApiOperational.updateScheduleTrainDriver(id, data).then((res) => {
      setDataScheduleSPV(res.data);
      return res.data;
    });
  };

  // useEffect(()=>{
  //     socket.on('led', async (data)=>{
  //         console.log('data led', data)
  //     })
  // },[socket])

  // useEffect(()=>{
  //     socket.on('handover', async (data)=>{
  //         console.log('data led', data)
  //         setHandOverTablet(data)
  //     })
  // },[socket])

  const logoutHandOver = (id, status) => {
    //socket.emit('handover', "handover", id)
    return ApiOperational.updateScheduleTrainDriver(id, {
      status,
      completeState: true,
      readTakeGive: true,
      completeDate: new Date(),
    })
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const logoutHandOverTablet = (id) => {
    //socket.emit('handover', "handover", id)
    return ApiOperational.updateScheduleTrainDriver(id, {
      status: "Terima Tablet",
    })
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDetailDaily = async (id, global) => {
    console.log("getDetailDaily", id);

    return ApiOperational.getScheduleTrainDriver({ params: { id } })
      .then((res) => {
        //Menutupi Bug Urutan Index Station
        console.log("response getDetailDaily", res.data.length, res.data);
        let datares = {
          ...res.data[0],
          loopRouteTrain: {
            ...res.data[0].loopRouteTrain,
            route: res.data[0].loopRouteTrain?.route.map((itemRoute) => {
              return {
                ...itemRoute,
                station: _.orderBy(itemRoute?.station, ["loopIndex"], ["asc"]),
              };
            }),
          },
        };

        //console.log('datares order', datares)
        if (global) {
          //setDataDetailDaily(res.data[0])
          setDataDetailDaily(datares);
        }
        return {
          status: true,
          data: datares, //res.data[0]
        };
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const postDataScheduleTrainDriver = async (data, date) => {
    ApiOperational.postScheduleTrainDriver(data)
      .then((res) => {
        getDataScheduleTrainDriver({ params: { dailyWorkDate: date } });
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const updateSetLRV = async (data, date) => {
    ApiOperational.postSetLRV(data)
      .then((res) => {
        getDataScheduleTrainDriver({ params: { dailyWorkDate: date } });
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const updateChangeLoop = async (data, date) => {
    ApiOperational.postChangeLoop(data)
      .then((res) => {
        getDataScheduleTrainDriver({ params: { dailyWorkDate: date } });
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const postDataScheduleTrainDriverMonthly = async (data, monthly) => {
    console.log("req postDataScheduleTrainDriverMonthly", data, monthly);
    return ApiOperational.postScheduleTrainDriverMonthly(data)
      .then((res) => {
        console.log("res postDataScheduleTrainDriverMonthly", res.data);
        getDataScheduleTrainDriver({ params: { monthlyWorkDate: monthly } });
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const updateRouteDataScheduleTrainDriver = async (data, date) => {
    ApiOperational.updateRouteScheduleTrainDriver(data)
      .then((res) => {
        console.log("data", data._id);
        //socket.emit('led', 'led', res.data)
        getDetailDaily(data?._id, true);
        //getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const updateDataScheduleTrainDriverById = async (id, data, date) => {
    return ApiOperational.updateScheduleTrainDriver(id, data)
      .then((res) => {
        getDetailDaily(id, true);
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const updateRouteDataScheduleTrainDriverStation = async (data) => {
    console.log("updateRouteDataScheduleTrainDriverStation", data);
    ApiOperational.updateRouteScheduleTrainDriverStation(data)
      .then((res) => {
        console.log("data get", data._id);
        //socket.emit('led', "led", res.data)
        if (!data?.local) {
          getDetailDaily(data?._id, true);
        }
        //getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const updateDataScheduleTrainDriver = async (id, data, date) => {
    return ApiOperational.updateScheduleTrainDriver(id, data)
      .then((res) => {
        getDataScheduleTrainDriver({ params: { dailyWorkDate: date } });
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const updateDataScheduleTrainDriverStatus = async (id, data, date) => {
    return ApiOperational.updateScheduleTrainDriver(id, data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getDataScheduleLastTrainDriver = async (code, loop, date) => {
    let query = {};
    if (code === "A" || code === "B" || code === "C" || code === "D") {
      query = {
        ...query,
        note: "Bertugas",
        loop,
        dailyWorkDate: moment(date).add(-1, "days").format("YYYY-MM-DD"),
        status: "Finish To Work",
      };
    } else {
      query = {
        ...query,
        note: "Bertugas",
        loop,
        dailyWorkDate: date,
        status: "Finish To Work",
      };
    }
    console.log("query getDataScheduleLastTrainDriver", query, code);
    return ApiOperational.getScheduleTrainDriver({ params: query })
      .then((res) => {
        if (res.data.length > 0) {
          console.log("getDataScheduleLastTrainDriver", res.data);
          setDataScheduleLastTrainDriver(
            _.orderBy(res.data, ["loopRouteTrain.start"], ["desc"])[0]
          );
          return {
            status: true,
            data: _.orderBy(res.data, ["loopRouteTrain.start"], ["desc"])[0],
          };
        } else {
          return { status: false, data: {} };
        }
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getKaIncidentScheduleTrainDriver = async (loop, date) => {
    let query = {
      note: "Bertugas",
      loop,
      dailyWorkDate: date,
      status: "Finish",
    };
    return ApiOperational.getScheduleTrainDriver({ params: query })
      .then((res) => {
        if (res.data.length > 0) {
          setKaIncidentScheduleTrainDriver(
            _.orderBy(res.data, ["loopRouteTrain.start"], ["desc"])
          );
          return {
            status: true,
            data: _.orderBy(res.data, ["loopRouteTrain.start"], ["desc"]),
          };
        } else {
          return { status: false, data: {} };
        }
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const deleteDataScheduleTrainDriver = async (id, date) => {
    ApiOperational.deleteScheduleTrainDriver(id)
      .then((res) => {
        getDataScheduleTrainDriver({ params: { dailyWorkDate: date } });
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const deleteDataScheduleTrainDriverPlanning = async (id, date) => {
    ApiOperational.deleteScheduleTrainDriverPlanning(id)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const deleteDataScheduleTrainDriverOFF = async (id) => {
    return ApiOperational.deleteScheduleTrainDriver(id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataScheduleSupervisor2 = async (trainDriverId, date) => {
    let query = { trainDriverId, note: "Penyelia", dailyWorkDate: date };
    return ApiOperational.getScheduleTrainDriver({ params: query })
      .then((res) => {
        if (res.data.length > 0) {
          setDataScheduleSupervisor(res.data[0]);
          return { status: true, data: res.data[0] };
        } else {
          return { status: false, data: {} };
        }
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getDataScheduleLastSupervisor = async (code, date) => {
    let query = {};
    if (code === "PA") {
      query = {
        ...query,
        note: "Penyelia",
        code: "PB",
        dailyWorkDate: moment(date).add(-1, "days").format("YYYY-MM-DD"),
      };
    } else {
      query = { ...query, note: "Penyelia", code: "PA", dailyWorkDate: date };
    }
    return ApiOperational.getScheduleTrainDriver({ params: query })
      .then((res) => {
        if (res.data.length > 0) {
          setDataScheduleLastSupervisor(res.data[0]);
          return { status: true, data: res.data[0] };
        } else {
          return { status: false, data: {} };
        }
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  return (
    <DailyWorkContext.Provider
      value={{
        dataScheduleTrainDriverLangsir,
        getDataScheduleTrainDriverLangsir,

        getDataLoopTrain,
        dataLoopTrain,
        dataScheduleTrainDriver,
        getDataScheduleTrainDriver,
        getDataScheduleOFF,

        updateSetLRV,
        updateChangeLoop,

        postDataScheduleTrainDriver,
        updateDataScheduleTrainDriver,
        updateRouteDataScheduleTrainDriver,
        updateDataScheduleTrainDriverStatus,
        getKaIncidentScheduleTrainDriver,
        setKaIncidentScheduleTrainDriver,
        kaIncidentScheduleTrainDriver,
        updateRouteDataScheduleTrainDriverStation,
        updateDataScheduleTrainDriverById,
        getDataScheduleLastTrainDriver,
        dataScheduleLastTrainDriver,
        deleteDataScheduleTrainDriver,
        deleteDataScheduleTrainDriverPlanning,
        dataDetailDaily,
        getDetailDaily,
        postDataScheduleTrainDriverMonthly,
        handoverTablet,
        logoutHandOver,
        logoutHandOverTablet,
        getDataScheduleSupervisor,
        putDataScheduleSupervisor,
        getDataReportMonthly,
        getDataTotalDistance,
        getTotalSchedule,
        deleteDataScheduleTrainDriverOFF,
        dataScheduleSPV,
        setDataScheduleSPV,
        getDataLogBook,

        dataScheduleSupervisor,
        dataScheduleLastSupervisor,
        getDataScheduleSupervisor2,
        getDataScheduleLastSupervisor,
      }}
      {...props}
    />
  );
}
