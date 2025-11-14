import moment from "moment";
import { useContext, useState } from "react";
import {
  AttendanceContext,
  DailyWorkContext,
  UserProfilContext,
} from "../../Context/index";

export default function UseDailyWork() {
  const {
    dataLoopTrain,
    getDataLoopTrain,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    getDataScheduleOFF,
    postDataScheduleTrainDriver,
    updateDataScheduleTrainDriver,
    updateRouteDataScheduleTrainDriverStation,
    updateDataScheduleTrainDriverById,
    dataDetailDaily,
    getDetailDaily,
    logoutHandOver,
    logoutHandOverTablet,
    handoverTablet,
    updateRouteDataScheduleTrainDriver,
    deleteDataScheduleTrainDriver,
    deleteDataScheduleTrainDriverPlanning,
    postDataScheduleTrainDriverMonthly,
    updateDataScheduleTrainDriverStatus,
    getDataScheduleLastTrainDriver,
    dataScheduleLastTrainDriver,
    getDataScheduleSupervisor,
    getDataReportMonthly,
    getTotalSchedule,
    getDataTotalDistance,
    getKaIncidentScheduleTrainDriver,
    kaIncidentScheduleTrainDriver,
    deleteDataScheduleTrainDriverOFF,
    getDataScheduleTrainDriverRealisasi,
    deleteDataScheduleTrainDriverRealisasi,
    dataScheduleSPV,
    setDataScheduleSPV,
    putDataScheduleSupervisor,
    updateSetLRV,
    getDataScheduleTrainDriverLangsir,
    getDataScheduleLastSupervisor,
    getDataScheduleSupervisor2,
    dataScheduleSupervisor,
    dataScheduleLastSupervisor,
    dataScheduleTrainDriverLangsir,
    getDataLogBook,
    updateChangeLoop,
  } = useContext(DailyWorkContext);

  const { userById } = useContext(UserProfilContext);

  const { getDataAttendance } = useContext(AttendanceContext);

  const [dataDailySchedule, setDataDailySchedule] = useState([]);
  const [messageSPV, setMessageSPV] = useState("");
  const [logBookData, setLogBookData] = useState([]);
  const [dataDailyScheduleExport, setDataDailyScheduleExport] = useState([]);
  const [dataDailyScheduleStationExport, setDataDailyScheduleStationExport] =
    useState([]);
  const [dataDailyScheduleBackUp, setDataDailyScheduleBackUp] = useState([]);
  const [dateDailyWork, setDateDailyWork] = useState("");
  const [filterStartDate, setfilterStartDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [filterEndDate, setfilterEndDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dataDetailDailyLocal, setDataDetailLocal] = useState({});
  const [selectTrainDriver, setSelectTrainDriver] = useState({
    value: "0",
    label: "Pilih Masinis",
  });

  const [dataReportMonthly, setDataReportMonthly] = useState({});
  const [dataTotalDistance, setTotalDistance] = useState({});
  const [dataTotalSchedule, setDataTotalSchedule] = useState(0);
  const [supervisorData, setSupervisorData] = useState({});
  const [loader, setLoader] = useState(false);
  const [timeTrain, setTimeTrain] = useState([]);

  const [takegivework, setTakeGiveWork] = useState(false);
  const [roleSupervisorState, setRoleSupervisorState] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [noteLRV, setNoteLRV] = useState("");
  const [info, setInfo] = useState("");

  let today = moment().format("YYYY-MM-DD");

  const getDailyWork = async () => {
    let today = moment().format("YYYY-MM-DD");
    let trainDriverId = "";

    if (userById?._id) {
      trainDriverId = userById?.profileId;
      let role = userById?.role?.map((i) => i.name?.toLowerCase());
      role = role?.includes("penyelia");
      if (role) {
        let dataschedule = await getDataScheduleSupervisor2(
          trainDriverId,
          today
        );

        if (dataschedule.status) {
          let codeWork = dataschedule?.data?.loopRouteTrain?.code;
          if (codeWork) {
            setRoleSupervisorState(true);
          }
          setStartTime(dataschedule?.data?.loopRouteTrain?.start);
          setEndTime(dataschedule?.data?.loopRouteTrain?.end);
          setTakeGiveWork(
            dataschedule?.data?.readTakeGive
              ? dataschedule?.data?.readTakeGive
              : false
          );
          setNoteLRV(dataschedule?.data?.noteLRV);
          let lastsupervisor = await getDataScheduleLastSupervisor(
            dataschedule?.data?.loopRouteTrain?.code,
            today
          );
          if (lastsupervisor?.data?.dailyWorkDateString) {
            getDataScheduleTrainDriver(
              lastsupervisor?.data?.dailyWorkDateString
            );
          }
          return { redirect: false, redirectLink: "" };
        } else {
          let lastsupervisor = await getDataScheduleLastSupervisor(
            dataschedule?.data?.loopRouteTrain?.code,
            today
          );
          if (!lastsupervisor.status) {
            setInfo(
              "Anda tidak mempunyai jadwal dinas hari ini. Silahkan hubungi Administrator untuk informasi lebih lanjut"
            );
            return {
              redirect: false,
              redirectLink: "/app/operational/dailywork",
            };
          } else {
            setInfo(
              "Anda tidak mempunyai jadwal dinas hari ini. Silahkan hubungi Administrator untuk informasi lebih lanjut"
            );
            return {
              redirect: false,
              redirectLink: "/app/operational/dailywork",
            };
          }
        }
      } else {
        setRoleSupervisorState(false);
      }
    }
  };

  const loadLogBook = async () => {
    let querySend = {};
    let today = moment().format("YYYY-MM-DD");
    if (filterStartDate && filterEndDate) {
      querySend = {
        ...querySend,
        startDate: filterStartDate,
        endDate: filterEndDate,
      };
    } else if (filterStartDate) {
      querySend = { ...querySend, startDate: filterStartDate, endDate: today };
    } else if (filterEndDate) {
      querySend = { ...querySend, startDate: today, endDate: filterEndDate };
    } else {
      querySend = { ...querySend, startDate: today, endDate: today };
    }
    const res = await getDataLogBook(querySend);
    await getDataAttendance(querySend);
    setLogBookData(res);
  };

  const updateChangeHandOver = async (id, data, date) => {
    const datarespon = await updateDataScheduleTrainDriver(id, data, date);
    if (datarespon.status) {
      fetchDataHandOverMasinis();
    }
  };

  const getDataDistanceDuration = async (trainDriverID, monthly) => {
    if (monthly) {
      const resp = await getDataReportMonthly({
        params: { trainDriverID, monthly },
      });
      if (resp.status) {
        setDataReportMonthly(resp.result[0]);
      }
    } else {
      const resp = await getDataTotalDistance({
        params: { trainDriverID },
      });
      if (resp.status) {
        setTotalDistance(resp.result[0]);
      }
    }
  };

  const getDataTotalSchedule = async (trainDriverID) => {
    const resp = await getTotalSchedule({
      params: { trainDriverID },
    });
    if (resp.status) {
      setDataTotalSchedule(resp.result * 6.66666);
    }
  };

  const getScheduleSupervisor = (note, dailyWorkDate, trainDriverId) => {
    return getDataScheduleSupervisor({
      params: { note, dailyWorkDate, trainDriverId },
    });
  };

  const submitDataDailyWork = (data, date) => {
    postDataScheduleTrainDriver(data, date);
  };

  const submitDataMonthlyWork = (data, date) => {
    return postDataScheduleTrainDriverMonthly(data, date);
  };

  const startTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date);
  };

  const startTimeTrainStation = async (data) => {
    if (data?._id) {
      await updateRouteDataScheduleTrainDriverStation(data);
    }
  };

  const stopTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date);
  };

  const finishWork = (id, data, date) => {
    return updateDataScheduleTrainDriver(id, data, date);
  };

  const giveWork = (id, data, date) => {
    updateDataScheduleTrainDriver(id, data, date);
  };

  const cancelDailyWork = (id, date) => {
    console.log("cancelDailyWork", id, date);
    deleteDataScheduleTrainDriver(id, date);
  };

  const cancelDailyWorkOFF = async (id) => {
    console.log("cancelDailyWork", id);
    await deleteDataScheduleTrainDriverOFF(id);
  };

  const cancelDailyWorkPlanning = (id, date) => {
    deleteDataScheduleTrainDriverPlanning(id, date);
  };

  const getDailyWorkByTrainDriver = (id, date) => {
    return getDataScheduleTrainDriver({
      params: { trainDriverId: id, dailyWorkDate: date },
    });
  };

  const getDailyWorkById = (id) => {
    return getDetailDaily(id, true);
  };

  const getDailyWorkByIdLocal = async (id) => {
    let response = await getDetailDaily(id, false);
    console.log("data", response.data);
    if (response.status) {
      setDataDetailLocal(response.data);
      return response.data;
    } else {
      return {};
    }
  };

  const putDailyWork = async (_id, data) => {
    // let trainDriverId = "";
    // if (localStorage?.profile) {
    //   trainDriverId = JSON.parse(localStorage?.profile)._id;
    return updateDataScheduleTrainDriver(_id, data, today);

    // trainDriverId, today);
    // }
  };

  const fetchDataLoop = async (data) => {
    console.log("data params", data);
    let params = {};
    if (data === "Masinis") {
      params = { params: { note: "Bertugas" } };
    }
    if (data === "Cadangan") {
      params = { params: { note: "Cadangan" } };
    }
    if (data === "Penyelia") {
      params = { params: { note: "Penyelia" } };
    }
    if (data === "OFF") {
      params = { params: { code: "OFF" } };
    }
    // console.log('params', params)
    getDataLoopTrain(params);
    if (filterStartDate) {
      let querySend = {};
      querySend = {
        ...querySend,
        startDate: filterStartDate,
        endDate: filterStartDate,
      };

      let paramsdata = { ...querySend };
      if (data === "OFF") {
        paramsdata = { ...paramsdata, code: "OFF" };
      }
      const dataschedule = await getDataScheduleTrainDriver({
        params: paramsdata,
      });
      setDataDailySchedule(dataschedule);
    } else if (dateDailyWork) {
      let paramsdata = { dailyWorkDate: dateDailyWork };
      if (data === "OFF") {
        paramsdata = { ...paramsdata, code: "OFF" };
      }
      const dataschedule = await getDataScheduleTrainDriver({
        params: paramsdata,
      });
      setDataDailySchedule(dataschedule);
    } else {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      let paramsdata = { dailyWorkDate: dateNow };
      if (data === "OFF") {
        paramsdata = { ...paramsdata, code: "OFF" };
      }
      const dataschedule = await getDataScheduleTrainDriver({
        params: paramsdata,
      });
      setDataDailySchedule(dataschedule);
    }
  };

  const fetchDataHandOver = async () => {
    if (dateDailyWork === "") {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow, note: "Penyelia" },
      });
      setDataDailySchedule(dataschedule);
    } else {
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: "Penyelia" },
      });
      setDataDailySchedule(dataschedule);
    }
  };

  const dataresponse = (filter) => {};

  const [workingOFF, setWorkingOFF] = useState([]);

  const getWorkingOff = async (date) => {
    console.log("getWorkingOff date", date);
    let data_off = await getDataScheduleTrainDriver({
      params: { dailyWorkDate: date, code: "OFF" },
    });
    console.log("getWorkingOff", data_off);
    setWorkingOFF(data_off);
  };

  const getWorkingOffByRangeDate = async (startDate, endDate) => {
    let data_off = await getDataScheduleOFF({
      params: { startDate, endDate, code: "OFF" },
    });
    setWorkingOFF(data_off);
  };

  const fetchDataHandOverMasinis = async () => {
    let dataexport = [];
    let datastationexport = [];
    let datafilter = {};

    let filterdate = "";
    if (dateDailyWork === "") {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      filterdate = dateNow;
    } else {
      filterdate = dateDailyWork;
    }

    let data_off = await getDataScheduleTrainDriver({
      params: { dailyWorkDate: filterdate, code: "OFF" },
    });
    setWorkingOFF(data_off);

    //------Load Data Cadangan -----------//
    const datascheduleBackUp = await getDataScheduleTrainDriver({
      params: { dailyWorkDate: filterdate, note: "Cadangan" },
    });
    setDataDailyScheduleBackUp(datascheduleBackUp);
    //------End Load Data Cadangan -----------//

    if (selectTrainDriver?.value !== "0") {
      datafilter = {
        params: {
          dailyWorkDate: filterdate,
          trainDriverId: selectTrainDriver.value,
          note: "Bertugas",
        },
      };
    } else {
      datafilter = { params: { dailyWorkDate: filterdate, note: "Bertugas" } };
    }

    const dataschedule = await getDataScheduleTrainDriver(datafilter);
    setDataDailySchedule(dataschedule);

    dataschedule.forEach((item) => {
      item.loopRouteTrain.route.forEach((itemRoute) => {
        var duration = moment(moment(itemRoute.endTime, "HH:mm:ss")).diff(
          moment(itemRoute.startTime, "HH:mm:ss"),
          "seconds"
        );
        dataexport = [
          ...dataexport,
          {
            Tgl: item.dailyWorkDateString,
            NIK: item.trainDriver?.idNumber,
            Nama: item.trainDriver?.name,
            KodeDinas: item.loopRouteTrain?.code,
            Loop: item.loopRouteTrain?.loop,
            LRV:
              item.LRVList.length > 1
                ? "No." + item.LRVList[0] + " dan No." + item.LRVList[1]
                : item.LRVList.length > 0
                ? "No." + item.LRVList[0]
                : "-",
            NomorKA: itemRoute.trainNumber,
            Berangkat: itemRoute.startTime,
            Tiba: itemRoute.endTime,
            Durasi:
              itemRoute.startTime !== ""
                ? `${Math.floor(duration / 60)} mnt ${duration % 60} dtk`
                : "-",
            DwellingTime:
              itemRoute.dweelingTime > 0
                ? `${Math.floor(itemRoute.dweelingTime / 60)} mnt ${
                    itemRoute.dweelingTime % 60
                  } dtk`
                : "-",
          },
        ];

        itemRoute?.station.forEach((itemStation) => {
          datastationexport = [
            ...datastationexport,
            {
              Tgl: item.dailyWorkDateString,
              NIK: item.trainDriver?.idNumber,
              Nama: item.trainDriver?.name,
              KodeDinas: item.loopRouteTrain?.code,
              Loop: item.loopRouteTrain?.loop,
              LRV:
                item.LRVList.length > 1
                  ? "No." + item.LRVList[0] + " dan No." + item.LRVList[1]
                  : item.LRVList.length > 0
                  ? "No." + item.LRVList[0]
                  : "-",
              NomorKA: itemRoute.trainNumber,

              NamaStation: itemStation.stationName,
              KodeStation: itemStation.stationCode,
              Kecepatan: itemStation.vOps,
              Kecepatan_Max: itemStation.vMax,
              Jarak: itemStation.distance,
              Rencana_Berangkat: itemStation.startPlan,
              Realisasi_Berangkat: itemStation.start,
              Rencana_Tiba: itemStation.endPlan,
              Realisasi_Tiba: itemStation.end,
              DwellingTime: itemStation.dweelingTime,
            },
          ];
        });
      });
    });
    setDataDailyScheduleExport(dataexport);
    setDataDailyScheduleStationExport(datastationexport);
    // }
  };

  const fetchDataHandOverMasinisByRange = async () => {
    let dataexport = [];
    let datastationexport = [];
    let datafilter = {};

    let data_off = await getDataScheduleTrainDriver({
      params: {
        startDate: filterStartDate,
        endDate: filterEndDate,
        code: "OFF",
      },
    });
    setWorkingOFF(data_off);

    //------Load Data Cadangan -----------//
    const datascheduleBackUp = await getDataScheduleTrainDriver({
      params: {
        startDate: filterStartDate,
        endDate: filterEndDate,
        note: "Cadangan",
      },
    });
    setDataDailyScheduleBackUp(datascheduleBackUp);
    //------End Load Data Cadangan -----------//

    if (selectTrainDriver?.value !== "0") {
      datafilter = {
        params: {
          startDate: filterStartDate,
          endDate: filterEndDate,
          trainDriverId: selectTrainDriver.value,
          note: "Bertugas",
        },
      };
    } else {
      datafilter = {
        params: {
          startDate: filterStartDate,
          endDate: filterEndDate,
          note: "Bertugas",
        },
      };
    }

    const dataschedule = await getDataScheduleTrainDriver(datafilter);
    setDataDailySchedule(dataschedule);

    dataschedule.forEach((item) => {
      item.loopRouteTrain.route.forEach((itemRoute) => {
        var duration = moment(moment(itemRoute.endTime, "HH:mm:ss")).diff(
          moment(itemRoute.startTime, "HH:mm:ss"),
          "seconds"
        );
        dataexport = [
          ...dataexport,
          {
            Tgl: item.dailyWorkDateString,
            NIK: item.trainDriver?.idNumber,
            Nama: item.trainDriver?.name,
            KodeDinas: item.loopRouteTrain?.code,
            Loop: item.loopRouteTrain?.loop,
            LRV:
              item.LRVList.length > 1
                ? "No." + item.LRVList[0] + " dan No." + item.LRVList[1]
                : item.LRVList.length > 0
                ? "No." + item.LRVList[0]
                : "-",
            NomorKA: itemRoute.trainNumber,
            Berangkat: itemRoute.startTime,
            Tiba: itemRoute.endTime,
            Durasi:
              itemRoute.startTime !== ""
                ? `${Math.floor(duration / 60)} mnt ${duration % 60} dtk`
                : "-",
            DwellingTime:
              itemRoute.dweelingTime > 0
                ? `${Math.floor(itemRoute.dweelingTime / 60)} mnt ${
                    itemRoute.dweelingTime % 60
                  } dtk`
                : "-",
          },
        ];

        itemRoute?.station.forEach((itemStation) => {
          datastationexport = [
            ...datastationexport,
            {
              Tgl: item.dailyWorkDateString,
              NIK: item.trainDriver?.idNumber,
              Nama: item.trainDriver?.name,
              KodeDinas: item.loopRouteTrain?.code,
              Loop: item.loopRouteTrain?.loop,
              LRV:
                item.LRVList.length > 1
                  ? "No." + item.LRVList[0] + " dan No." + item.LRVList[1]
                  : item.LRVList.length > 0
                  ? "No." + item.LRVList[0]
                  : "-",
              NomorKA: itemRoute.trainNumber,

              NamaStation: itemStation.stationName,
              KodeStation: itemStation.stationCode,
              Kecepatan: itemStation.vOps,
              Kecepatan_Max: itemStation.vMax,
              Jarak: itemStation.distance,
              Rencana_Berangkat: itemStation.startPlan,
              Realisasi_Berangkat: itemStation.start,
              Rencana_Tiba: itemStation.endPlan,
              Realisasi_Tiba: itemStation.end,
              DwellingTime: itemStation.dweelingTime,
            },
          ];
        });
      });
    });
    setDataDailyScheduleExport(dataexport);
    setDataDailyScheduleStationExport(datastationexport);
    // }
  };

  const fetchDataAssignmentMasinis = async () => {
    let dataexport = [];

    let querySend = {};
    if (filterStartDate && filterEndDate) {
      querySend = {
        ...querySend,
        startDate: filterStartDate,
        endDate: filterEndDate,
      };
    } else if (filterStartDate) {
      querySend = { ...querySend, startDate: filterStartDate, endDate: today };
    } else if (filterEndDate) {
      querySend = { ...querySend, startDate: today, endDate: filterEndDate };
    } else {
      querySend = { ...querySend, startDate: today, endDate: today };
    }
    const datascheduleBackUp = await getDataScheduleTrainDriver({
      params: { ...querySend, note: "Cadangan" },
    });
    setDataDailyScheduleBackUp(datascheduleBackUp);
    if (selectTrainDriver?.value && selectTrainDriver?.value !== "0") {
      const dataschedule = await getDataScheduleTrainDriver({
        params: {
          ...querySend,
          trainDriverId: selectTrainDriver.value,
          note: "Bertugas",
        },
      });
      setDataDailySchedule(dataschedule);

      dataschedule.forEach((item) => {
        item.loopRouteTrain.route.forEach((itemRoute) => {
          var duration = moment(moment(itemRoute.endTime, "HH:mm:ss")).diff(
            moment(itemRoute.startTime, "HH:mm:ss"),
            "seconds"
          );
          dataexport = [
            ...dataexport,
            {
              Tgl: item.dailyWorkDateString,
              NIK: item.trainDriver?.idNumber,
              Nama: item.trainDriver?.name,
              KodeDinas: item.loopRouteTrain?.code,
              Loop: item.loopRouteTrain?.loop,
              LRV: JSON.stringify(item.LRVList),
              NomorKA: itemRoute.trainNumber,
              Berangkat: itemRoute.startTime,
              Tiba: itemRoute.endTime,
              Durasi: `${Math.floor(duration / 60)} mnt ${duration % 60} dtk`,
              DwellingTime: `${Math.floor(itemRoute.dweelingTime / 60)} mnt ${
                itemRoute.dweelingTime % 60
              } dtk`,
            },
          ];
        });
      });
      setDataDailyScheduleExport(dataexport);
      await setLoader(false);
      return dataschedule;
    } else {
      const dataschedule = await getDataScheduleTrainDriver({
        params: {
          ...querySend,
          note: "Bertugas",
        },
      });
      setDataDailySchedule(dataschedule);
      dataschedule.forEach((item) => {
        item.loopRouteTrain.route.forEach((itemRoute) => {
          var duration = moment(moment(itemRoute.endTime, "HH:mm:ss")).diff(
            moment(itemRoute.startTime, "HH:mm:ss"),
            "seconds"
          );
          dataexport = [
            ...dataexport,
            {
              Tgl: item.dailyWorkDateString,
              NIK: item.trainDriver?.idNumber,
              Nama: item.trainDriver?.name,
              KodeDinas: item.loopRouteTrain?.code,
              Loop: item.loopRouteTrain?.loop,
              LRV: JSON.stringify(item.LRVList),
              NomorKA: itemRoute.trainNumber,
              Berangkat: itemRoute.startTime,
              Tiba: itemRoute.endTime,
              Durasi: `${Math.floor(duration / 60)} mnt ${duration % 60} dtk`,
              DwellingTime: `${Math.floor(itemRoute.dweelingTime / 60)} mnt ${
                itemRoute.dweelingTime % 60
              } dtk`,
            },
          ];
        });
      });
      setDataDailyScheduleExport(dataexport);
      await setLoader(false);
      return dataschedule;
    }
  };

  const cancelDailyWorkRealisasi = (id, date, monthly, local) => {
    deleteDataScheduleTrainDriverRealisasi(id, date, monthly, local);
  };

  const fetchDataDailyWork = async (key) => {
    let dateNow = moment().format("YYYY-MM-DD");
    let res = await getDataScheduleTrainDriver(
      { params: { dailyWorkDate: dateNow } },
      key
    );
    await getDataScheduleTrainDriverLangsir({
      params: { dailyWorkDate: dateNow, note: "Langsir" },
    });
    let _timeTrain = [];
    res.forEach((itemSchedule) => {
      let statusStart = itemSchedule.loopRouteTrain.route.filter(
        (x) => x.status === "Start"
      );
      let statusFinish = itemSchedule.loopRouteTrain.route.filter(
        (x) => x.status === "Finish"
      );
      let statusEmpty = itemSchedule.loopRouteTrain.route.filter(
        (x) => x.status === ""
      );
      if (statusStart && statusStart.length > 0) {
        statusStart.forEach((itemRoute) => {
          itemRoute.station
            .filter((x) => x.status === "Start")
            .forEach((itemStation) => {
              if (itemStation) {
                if (itemStation.end !== "" && itemStation.start === "") {
                  _timeTrain = [
                    ..._timeTrain,
                    {
                      _id: itemStation._id,
                      stationCode: itemStation.stationCode,
                      trainNumber: itemRoute.trainNumber,
                      status: "Selesai",
                      lrv: itemSchedule.LRVList,
                      odd:
                        Number(itemRoute.trainNumber) % 2 == 0 ? true : false,
                    },
                  ];
                } else {
                  _timeTrain = [
                    ..._timeTrain,
                    {
                      _id: itemStation._id,
                      stationCode: itemStation.stationCode,
                      trainNumber: itemRoute.trainNumber,
                      status: "Bertugas",
                      lrv: itemSchedule.LRVList,
                      odd:
                        Number(itemRoute.trainNumber) % 2 == 0 ? true : false,
                    },
                  ];
                }
              }
            });
        });
      }
      if (
        statusFinish &&
        statusFinish.length > 0 &&
        statusStart.length === 0 &&
        statusEmpty.length > 0
      ) {
        statusFinish[statusFinish.length - 1].station
          .filter((x) => x.status === "Start")
          .forEach((itemStation) => {
            _timeTrain = [
              ..._timeTrain,
              {
                _id: itemStation._id,
                stationCode: itemStation.stationCode,
                trainNumber: statusEmpty[0]?.trainNumber,
                status: "Selesai",
                lrv: itemSchedule.LRVList,
                odd:
                  Number(statusFinish[statusFinish.length - 1].trainNumber) %
                    2 ==
                  0
                    ? false
                    : true,
              },
            ];
          });
      }
    });
    setTimeTrain(_timeTrain);
  };

  return {
    dataLoopTrain,
    fetchDataLoop,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    getDailyWorkById,
    getDailyWorkByTrainDriver,
    submitDataDailyWork,
    updateDataScheduleTrainDriver,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
    startTimeTrain,
    stopTimeTrain,
    finishWork,
    giveWork,
    cancelDailyWorkRealisasi,
    cancelDailyWork,
    cancelDailyWorkPlanning,
    dataDailySchedule,
    setDataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    fetchDataHandOver,
    updateDataScheduleTrainDriverStatus,
    dataDailyScheduleBackUp,
    setDataDailyScheduleBackUp,
    getDataScheduleTrainDriverRealisasi,
    fetchDataHandOverMasinis,
    getDataScheduleLastTrainDriver,
    dataScheduleLastTrainDriver,
    putDailyWork,
    updateChangeHandOver,
    getKaIncidentScheduleTrainDriver,
    kaIncidentScheduleTrainDriver,
    dataDetailDaily,
    getDailyWorkByIdLocal,
    dataDetailDailyLocal,
    loader,
    setLoader,
    submitDataMonthlyWork,
    fetchDataAssignmentMasinis,
    startTimeTrainStation,
    logoutHandOver,
    logoutHandOverTablet,
    handoverTablet,
    selectTrainDriver,
    setSelectTrainDriver,
    dataDailyScheduleExport,
    dataDailyScheduleStationExport,
    getScheduleSupervisor,
    supervisorData,
    getDataDistanceDuration,
    getDataTotalSchedule,
    dataTotalSchedule,
    dataReportMonthly,
    workingOFF,
    getWorkingOff,
    getWorkingOffByRangeDate,
    fetchDataHandOverMasinisByRange,
    cancelDailyWorkOFF,
    dataTotalDistance,
    setTotalDistance,
    dataScheduleSPV,
    setDataScheduleSPV,
    putDataScheduleSupervisor,
    updateSetLRV,
    dataScheduleTrainDriverLangsir,
    fetchDataDailyWork,
    timeTrain,
    loadLogBook,
    logBookData,

    takegivework,
    roleSupervisorState,
    startTime,
    endTime,
    noteLRV,
    info,

    getDailyWork,
    updateDataScheduleTrainDriverById,
    updateChangeLoop,
  };
}
