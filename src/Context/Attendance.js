import moment from "moment";
import { createContext, useState } from "react";
import ApiOperational from "../Services/ApiOperational";

export const AttendanceContext = createContext({});

export default function AttendanceProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [filterAttendance, setFilterAttendance] = useState([]);

  const getNewDataAttendance = async (params) => {
    console.log("running new attendance");
    try {
      const paramsSchedule = {
        startDate: params?.startDate,
        endDate: params?.endDate,
        departement: "662773cd84d37c2a2f2431f1",
        isLimit: false,
      };
      console.log("paramsSchedule", paramsSchedule);
      const resRealization = await ApiOperational.getWorkOrderRealization(
        paramsSchedule
      );
      const resScheduleTrainDriver =
        await ApiOperational.getScheduleTrainDriver({ params: paramsSchedule });
      const resTrainDriver = await ApiOperational.getTrainDriver({
        params: {
          departement: "662773cd84d37c2a2f2431f1",
          isLimit: false,
        },
      });

      const { data: dataTrainDriver } = resTrainDriver.data;
      const { data: dataScheduleTrainDriver } = resScheduleTrainDriver;
      const { data: dataRealization } = resRealization.data;

      console.log(
        "dataScheduleTrainDriver attendance",
        dataScheduleTrainDriver
      );
      console.log("dataTrainDriver attendance", dataTrainDriver);
      if (Array.isArray(dataRealization) && dataRealization.length > 0) {
        const bodyAttendance = dataRealization
          .map((item) => {
            const trainDriver = dataTrainDriver.find(
              (i) => i.idNumber === item.profile?.idNumber
            );

            return {
              id_finger: Number(trainDriver?.fingerID),
              startDate: moment(item.dailyWorkDate).format("YYYY-MM-DD"),
              startTime: item.workOrder?.start,
              endTime: item.workOrder?.end,
            };
          })
          .filter((item) => item.id_finger); // filter jika tidak ada id_finger

        console.log("bodyAttendance", bodyAttendance);
        const responseAttendance = await ApiOperational.postAttendance(
          bodyAttendance
        );

        const resultAttendance = responseAttendance.data;

        const data = dataTrainDriver.map((item) => {
          const attendanceRecord = resultAttendance.find(
            (record) => record.id_finger === Number(item.fingerID)
          );
          const dataSchedule = dataRealization.find(
            (schedule) => schedule.profile?.idNumber === item.idNumber
          );
          let dataLoopRouteTrain = dataScheduleTrainDriver.find(
            (schedule) =>
              schedule.trainDriver?.idNumber === item.idNumber &&
              moment(dataSchedule?.dailyWorkDate).format("YYYY-MM-DD") ===
                schedule.dailyWorkDateString
          );
          if (
            dataLoopRouteTrain &&
            dataLoopRouteTrain?.loopRouteTrain?.route?.length > 0
          ) {
            dataLoopRouteTrain =
              dataLoopRouteTrain?.loopRouteTrain?.route[0]?.station[0]
                ?.startPlan;
          } else {
            dataLoopRouteTrain = "-";
          }

          return {
            ...dataSchedule,
            attendanceRecord,
            cabinTime: dataLoopRouteTrain,
          };
        });

        console.log("data attendance", data);
        setAttendance(data);
        setFilterAttendance(data);
        return data;
      }
    } catch (error) {
      console.log("error get new data attendance", error);
      setAttendance([]);
    }
  };

  const getDataAttendance = async (params) => {
    try {
      let query = {};
      if (params?.createdAt) {
        query = { ...query, createdAt: params?.createdAt };
      }
      if (params?.createBy) {
        query = { ...query, createBy: params?.createBy };
      }
      if (params?.monthly) {
        query = { ...query, monthly: params?.monthly };
      }
      if (params?.filterDate) {
        query = { ...query, filterDate: params?.filterDate };
      }
      if (params?.startDate) {
        query = { ...query, startDate: params?.startDate };
      }
      if (params?.endDate) {
        query = { ...query, endDate: params?.endDate };
      }
      console.log("query", query);
      const res = await ApiOperational.getAttendance({ params: query });
      setAttendance(res.data?.result);
      setFilterAttendance(res.data?.result);
      return { status: "OK", result: res.data };
    } catch (err) {
      return { status: 400, result: err };
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        filterAttendance,
        setFilterAttendance,
        getDataAttendance,
        getNewDataAttendance,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  );
}
