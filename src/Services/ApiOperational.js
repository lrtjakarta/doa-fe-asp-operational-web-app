import axios from "axios";
import { isExpired } from "react-jwt";
import StaticVar from "../Config/StaticVar";

let isRefreshing = false;
let refreshQueue = [];

// ===> api create
const api = axios.create({
  baseURL: StaticVar.URL_API,
  timeout: 1000000,
  headers: {},
});

api.interceptors.request.use(
  async (config) => {
    // get token
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // check if token exists
    if (refreshToken && accessToken) {
      const accessTokenIsExpired = isExpired(accessToken);
      const refreshTokenIsExpired = isExpired(refreshToken);

      // check refresh token expire
      if (refreshTokenIsExpired) {
        // const navigate = useNavigate();
        // navigate to login page
        localStorage.clear();
        console.log("login expired");
        const message = { status: 401 };
        window.parent.postMessage(
          { type: "token expired", data: message },
          "*"
        );

        return;
      } else {
        // check access token expire
        if (accessTokenIsExpired) {
          // if access token has expired and we're not alredy refreshing
          if (!isRefreshing) {
            isRefreshing = true;
            // send refresh token api
            try {
              const data = { refreshToken };
              // console.log("data", data);
              const refresh = await axios.post(
                `${StaticVar.URL_API}/auth/refresh`,
                data
              );
              const newAccesToken = refresh.data.accessToken;
              const newRefreshToken = refresh.data.refreshToken;

              // udpate tokens
              localStorage.setItem("access_token", newAccesToken);
              localStorage.setItem("refresh_token", newRefreshToken);

              // send tokens to parent window
              window.parent.postMessage(
                {
                  type: "new token",
                  data: {
                    accessToken: newAccesToken,
                    refreshToken: newRefreshToken,
                  },
                },
                "*"
              );

              // Call all the requests that were waiting for the access token refresh
              refreshQueue.forEach((cb) => cb(newAccesToken));
              refreshQueue = [];
              isRefreshing = false;
              console.log("succes refresh token");
            } catch (error) {
              isRefreshing = false;
              console.log("error refresh", error);
              localStorage.clear();
              const message = { status: 401 };
              window.parent.postMessage(
                { type: "token expired", data: message },
                "*"
              );
              return;
              //  throw new Error("Failed to refresh token");
            }
          }

          return new Promise((resolve) => {
            refreshQueue.push((token) => {
              config.headers.Authorization = `Bearer ${token}`;
              resolve(config);
            });
          });
        }

        // If the access token has not expired, set the Authorization header
        // config.headers.Authorization = `Bearer ${accessToken}`;
        // config.headers["x-access-token"] = accessToken;
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
      }
    }

    // console.log("return config");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => {
    // console.log("err response", error.response);
    if (error.response.status === 401) {
      const message = { status: 401 };
      window.parent.parent.postMessage(
        { type: "token expired", data: message },
        "*"
      );
      // removeTokensFromLocalStorage();
      // window.location.href = "/login?expired";

      return;
    }
    return Promise.reject(error);
  }
);

const getOperational = (data) => api.get("/operational/", data);
const getDailyWork = (data) => {
  console.log("data getDailyWork", data);
  return api.get("/operational/looproutetrain", data);
};
const getScheduleTrainDriver = (data) =>
  api.get("/operational/scheduletraindriver", data);

const getReportMonthly = (data) =>
  api.get("/operational/scheduletraindriver/reportmonthly", data);

const getTotalDistance = (data) =>
  api.get("/operational/scheduletraindriver/totalDistance", data);
const getTotalSchedule = (data) =>
  api.get("/operational/scheduletraindriver/totalwork", data);
const getGonoGoItem = (data) => api.get("/operational/gonogoitem", data);
const postGonoGoItem = (data) =>
  api.post("/operational/gonogoitem/register", data);

const getWorkOrderRealization = (params) =>
  api.get("/work-order/realization", { params });
const getAbsence = (data) => api.get("/work-order/old/absence", data);
const postAbsence = (data) =>
  api.post("/work-order/old/absence/register", data);
const putAbsence = (id, data) => api.put("/work-order/old/absence/" + id, data);
const deleteAbsence = (id) => api.delete("/work-order/old/absence/" + id);
const getAttendance = (data) => api.get("/work-order/attendance/log", data);
const postAttendance = (data) => api.post("/work-order/attendance/log", data);
const getUserById = (_id, data) => api.get(`/user/${_id}`, data);

const getPreliminaryReport = (data) =>
  api.get("/operational/preliminaryreport", data);
const postPreliminaryReport = (data) =>
  api.post("/operational/preliminaryreport/register", data);
const putPreliminaryReport = (id, data) =>
  api.put("/operational/preliminaryreport/" + id, data);
const deletePreliminaryReport = (id) =>
  api.delete("/operational/preliminaryreport/" + id);

const getDailyIncident = (data) => api.get("/operational/dailyincident", data);
const postDailyIncident = (data) =>
  api.post("/operational/dailyincident/register", data);
const putDailyIncident = (id, data) =>
  api.put("/operational/dailyincident/" + id, data);
const deleteDailyIncident = (id) =>
  api.delete("/operational/dailyincident/" + id);

const getCoaching = (data) => api.get("/operational/coaching", data);
const postCoaching = (data) => api.post("/operational/coaching/register", data);
const putCoaching = (id, data) => api.put("/operational/coaching/" + id, data);
const deleteCoaching = (id) => api.delete("/operational/coaching/" + id);

const putGonoGoItem = (id, data) =>
  api.put("/operational/gonogoitem/" + id, data);
const getBriefing = (data) => api.get("/operational/briefing", data);
const postBriefing = (data) => api.post("/operational/briefing/register", data);
const putBriefing = (id, data) => api.put("/operational/briefing/" + id, data);
const postScheduleTrainDriver = (data) =>
  api.post("/operational/scheduletraindriver/register", data);

const postScheduleTrainDriverMonthly = (data) =>
  api.post("/operational/scheduletraindriver/insertMany", data);
const updateScheduleTrainDriver = (id, data) =>
  api.put("/operational/scheduletraindriver/" + id, data);
const updateRouteScheduleTrainDriver = (data) =>
  api.post("/operational/scheduletraindriver/updateRoute", data);

// operational
const getScheduleTrainDriverPlanning = (data) =>
  api.get("/operational/scheduletraindriverplanning", data);
const postScheduleTrainDriverPlanning = (data) =>
  api.post("/operational/scheduletraindriverplanning/register", data);
const postScheduleTrainDriverMonthlyPlanning = (data) =>
  api.post("/operational/scheduletraindriverplanning/insertMany", data);
const updateScheduleTrainDriverPlanning = (id, data) =>
  api.put("/operational/scheduletraindriverplanning/" + id, data);
const updateRouteScheduleTrainDriverPlanning = (data) =>
  api.post("/operational/scheduletraindriverplanning/updateRoute", data);
const deleteScheduleTrainDriverPlanning = (id) =>
  api.delete("/operational/scheduletraindriverplanning/" + id);

const postScheduleTrainDriverMonthlyPlanningImport = (data) =>
  api.post("/operational/scheduletraindriverplanning/import", data);

const updateRouteScheduleTrainDriverStation = (data) =>
  api.post("/operational/scheduletraindriver/updateRouteStation", data);
const deleteScheduleTrainDriver = (id) =>
  api.delete("/operational/scheduletraindriver/" + id);
// const getTrainDriver = (data) => api.get('/users/traindriver', data)
const getTrainDriver = (data) => api.get("/work-order/profile", data);
const postUploadImg = (data) => api.post("/uploads/old/img", data);
const postUploadImgBase = (data) => api.post("/uploads/old/imgbase", data);
const postUploadDoc = (data) => api.post("/uploads/old/doc", data);
const deleteImage = (data) => api.post("/uploads/old/delete", data);
const getCountCheckup = (data) => api.get("/medical/checkup/count", data);

const getTimeTable = (data) => api.get("/operational/timetable", data);
const getKATimeTable = (data) => api.get("/operational/timetable/ka", data);
const postTimeTable = (data) =>
  api.post("/operational/timetable/register", data);
const postManyTimeTable = (data) =>
  api.post("/operational/timetable/register/many", data);
const updateTimeTable = (id, data) =>
  api.put("/operational/timetable/" + id, data);

// assesment cabinride
const postCabinRide = (data) =>
  api.post("/operational/assessmentcabinride/register", data);
const getCabinRide = (data) =>
  api.get("/operational/assessmentcabinride", data);
const getCabinRideResult = (data) =>
  api.get("/operational/assessmentcabinride/result", data);
const updateCabinRide = (id, data) =>
  api.put("/operational/assessmentcabinride/" + id, data);
const deleteCabinRide = (id) =>
  api.delete("/operational/assessmentcabinride/" + id);

const postMasterCabinRide = (data) =>
  api.post("/operational/mastercabinride/register", data);
const deleteMasterCabinRide = (id) =>
  api.delete(`/operational/mastercabinride/${id}`);
const putMasterCabinRide = (id, data) =>
  api.put(`/operational/mastercabinride/${id}`, data);
const getMasterCabinRide = (data) =>
  api.get("/operational/mastercabinride", data);

const getAssessment = (data) => api.get("/assesment/assesment", data);
const getQueryAssessmentTotal = (data) =>
  api.get("/assesment/assesment/query/achievement", data);
const getAbsenceSummary = (data) =>
  api.get("/work-order/old/absence/summary", data);

// medical
const getMasterMedical = (data) => api.get("/medical/master", data);
const getCheckup = (data) => api.get("/medical/checkup", data);

//Informationupload
const getInformationUpload = (data) =>
  api.get("/operational/informationupload", data);
const getInformationUploadV2 = (params) =>
  api.get("/operational/informationupload", { params });
const postInformationUpload = (data) =>
  api.post("/operational/informationupload/register", data);
const putInformationUpload = (id, data) =>
  api.put("/operational/informationupload/" + id, data);

// KA Number
const getKANumber = (data) => api.get("/operational/kanumber", data);
const postKANumber = (data) => api.post("/operational/kanumber/register", data);
const putKANumber = (id, data) => api.put("/operational/kanumber/" + id, data);

// Loop
const getLoops = (data) => api.get("/operational/loop", data);
const postLoops = (data) => api.post("/operational/loop/register", data);
const putLoops = (id, data) => api.put("/operational/loop/" + id, data);

//KA Incident
const getKAIncident = (data) => api.get("/operational/kaincident", data);

// letter
const getLetter = (data) => api.get("/operational/letter", data);
const updateLetter = (id, data) => api.put("/operational/letter/" + id, data);

//TrainRoute
const getTrainRoute = (data) => api.get("/operational/looproutetrain", data);
const postTrainRoute = (data) =>
  api.post("/operational/looproutetrain/register", data);
const putTrainRoute = (id, data) =>
  api.put(`/operational/looproutetrain/${id}`, data);
const deleteTrainRoute = (id) =>
  api.delete(`/operational/looproutetrain/${id}`);

//Statiun
const getStationMaster = (data) => api.get("/operational/trainstation", data);
const postStationMaster = (data) =>
  api.post("/operational/trainstation/register", data);
const updateStationMaster = (id, data) =>
  api.put("/operational/trainstation/" + id, data);
const deleteStationMaster = (id) =>
  api.delete("/operational/trainstation/" + id);

// RouteTrain
const getMasterRouteTrain = (data) => api.get("/operational/routetrain", data);
const postMasterRouteTrain = (data) =>
  api.post("/operational/routetrain/register", data);
const updateMasterRouteTrain = (id, data) =>
  api.put("/operational/routetrain/" + id, data);
const deleteMasterRouteTrain = (id) =>
  api.delete("/operational/routetrain/" + id);

const getRouteList = (data) =>
  api.get("/operational/looproutetrain/routeList", data);

// WorkOrder Service
const getKedinasanById = (_id, data) =>
  api.get(`/work-order/realization/readiness/${_id}`, data);
const getAllKedinasan = (data) =>
  api.get(`/work-order/realization/readiness/all`, data);
const getProfileUser = (_id, data) =>
  api.get(`/work-order/profile/user/${_id}`, data);
const getStasiun = (data) => api.get(`/work-order/station`, data);
const getProfileOfficer = (data) => api.get(`/work-order/profile/`, data);
const getProfileId = (_id, data) => api.get(`/work-order/profile/${_id}`, data);

// No Go Item
const getNoGoItem = (data) => api.get("/operational/noGoItem", data);
const postNoGoItem = (data) => api.post("/operational/noGoItem/add", data);
const updateNoGoItem = (id, data) =>
  api.put("/operational/noGoItem/update/" + id, data);

// Cabin Ride New
const getCabinRideNew = (data) => api.get("/operational/cabinRideNew", data);
const getCabinRideNewId = (id, data) =>
  api.get("/operational/cabinRideNew/" + id, data);
const postCabinRideNew = (data) =>
  api.post("/operational/cabinRideNew/add", data);
const postInfoCabinRideNew = (id, data) =>
  api.post(`/operational/cabinRideNew/addInfo/${id}`, data);
const putCabinRideNew = (id, data) =>
  api.put(`/operational/cabinRideNew/update/${id}`, data);

// Master Lrv
const getMasterLRV = (data) => api.get("/operational/masterLrv", data);
const postMasterLRV = (data) => api.post("/operational/masterLrv/add", data);
const updateMasterLRV = (id, data) =>
  api.put("/operational/masterLrv/update/" + id, data);

// Izin Masuk Cabin
const getCabinEntry = (data) => api.get("/operational/cabinEntry", data);
const postCabinEntry = (data) => api.post("/operational/cabinEntry/add", data);
const updateCabinEntry = (id, data) =>
  api.put("/operational/cabinEntry/update/" + id, data);

//Langsir
const getDataLangsir = (data) => api.get("/operational/langsir", data);
const postDataLangsir = (data) => api.post("/operational/langsir/create", data);
const putDataLangsir = (id, data) =>
  api.put("/operational/langsir/" + id, data);
const deleteDataLangsir = (id) => api.delete("/operational/langsir/" + id);

//standformasi
const getDataStamformasi = (data) => api.get("/operational/stamformasi", data);
const postDataStamformasi = (data) =>
  api.post("/operational/stamformasi/create", data);
const putDataStamformasi = (id, data) =>
  api.put("/operational/stamformasi/" + id, data);
const deleteDataStamformasi = (id) =>
  api.delete("/operational/stamformasi/" + id);

//WAM
const getDataWAM = (data) => api.get("/operational/wam", data);
const postDataWAM = (data) => api.post("/operational/wam/create", data);
const putDataWAM = (id, data) => api.put("/operational/wam/" + id, data);
const deleteDataWAM = (id) => api.delete("/operational/wam/" + id);

//EPTW
const getListPTW = (params) => api.get("/operational/ptw/master", { params });
const getPTW = (params) => api.get("/operational/ptw", { params });
const postPTW = (data) => api.post("/operational/ptw", data);
const putPTW = (id, data) => api.put("/operational/ptw/" + id, data);
const deletePTW = (id) => api.delete("/operational/ptw/" + id);

//PPPKA
const getDataPPPKA = (data) => api.get("/operational/pppka", data);
const postDataPPPKA = (data) => api.post("/operational/pppka/create", data);
const putDataPPPKA = (id, data) => api.put("/operational/pppka/" + id, data);
const deleteDataPPPKA = (id) => api.delete("/operational/pppka/" + id);

// Master Data Emergency
const getMDEmergency = (data) =>
  api.get("/operational/masterDataEmergency", data);
const postMDEmergency = (data) =>
  api.post("/operational/masterDataEmergency/add", data);
const updateMDEmergency = (id, data) =>
  api.put("/operational/masterDataEmergency/update/" + id, data);
const deleteMDEmergency = (id) =>
  api.delete("/operational/masterDataEmergency/delete/" + id);

// Emergency 1
const getEmergency1 = (data) => api.get("/operational/emergency1", data);
const postEmergency1 = (data) => api.post("/operational/emergency1/add", data);
const updateEmergency1 = (id, data) =>
  api.put("/operational/emergency1/update/" + id, data);
const deleteEmergency1 = (id) =>
  api.delete("/operational/emergency1/delete/" + id);

// Emergency 2
const getEmergency2 = (data) => api.get("/operational/emergency2", data);
const postEmergency2 = (data) => api.post("/operational/emergency2/add", data);
const updateEmergency2 = (id, data) =>
  api.put("/operational/emergency2/update/" + id, data);
const deleteEmergency2 = (id) =>
  api.delete("/operational/emergency2/delete/" + id);

// Emergency 3
const getEmergency3 = (data) => api.get("/operational/emergency3", data);
const postEmergency3 = (data) => api.post("/operational/emergency3/add", data);
const updateEmergency3 = (id, data) =>
  api.put("/operational/emergency3/update/" + id, data);
const deleteEmergency3 = (id) =>
  api.delete("/operational/emergency3/delete/" + id);

// Emergency 4
const getEmergency4 = (data) => api.get("/operational/emergency4", data);
const postEmergency4 = (data) => api.post("/operational/emergency4/add", data);
const updateEmergency4 = (id, data) =>
  api.put("/operational/emergency4/update/" + id, data);
const deleteEmergency4 = (id) =>
  api.delete("/operational/emergency4/delete/" + id);

// Emergency 5
const getEmergency5 = (data) => api.get("/operational/emergency5", data);
const postEmergency5 = (data) => api.post("/operational/emergency5/add", data);
const updateEmergency5 = (id, data) =>
  api.put("/operational/emergency5/update/" + id, data);
const deleteEmergency5 = (id) =>
  api.delete("/operational/emergency5/delete/" + id);

// Emergency 6
const getEmergency6 = (data) => api.get("/operational/emergency6", data);
const postEmergency6 = (data) => api.post("/operational/emergency6/add", data);
const updateEmergency6 = (id, data) =>
  api.put("/operational/emergency6/update/" + id, data);
const deleteEmergency6 = (id) =>
  api.delete("/operational/emergency6/delete/" + id);

// Emergency 7
const getEmergency7 = (data) => api.get("/operational/emergency7", data);
const postEmergency7 = (data) => api.post("/operational/emergency7/add", data);
const updateEmergency7 = (id, data) =>
  api.put("/operational/emergency7/update/" + id, data);
const deleteEmergency7 = (id) =>
  api.delete("/operational/emergency7/delete/" + id);

// Emergency 8
const getEmergency8 = (data) => api.get("/operational/emergency8", data);
const postEmergency8 = (data) => api.post("/operational/emergency8/add", data);
const updateEmergency8 = (id, data) =>
  api.put("/operational/emergency8/update/" + id, data);
const deleteEmergency8 = (id) =>
  api.delete("/operational/emergency8/delete/" + id);

// Upload Gambar
const getImage = (path, image) => api.get(`/uploads/${path}/${image}`);
const postManyImage = (params, data) =>
  api.post(`/uploads/multiple/${params}`, data);

// WSC
const getWsc = (data) => api.get("/operational/wsc", data);
const getWscId = (id, data) => api.get("/operational/wsc/" + id, data);
const postWsc = (data) => api.post("/operational/wsc/add", data);
const updateWsc = (id, data) => api.put("/operational/wsc/update/" + id, data);
const deleteWsc = (id) => api.delete("/operational/wsc/delete/" + id);

// Checklist Pemberangkatan Awal
const getPemberangkatanAwal = (data) =>
  api.get("/operational/departureInitiation", data);
const postPemberangkatanAwal = (data) =>
  api.post("/operational/departureInitiation/add", data);
const updatePemberangkatanAwal = (id, data) =>
  api.put("/operational/departureInitiation/update/" + id, data);
const deletePemberangkatanAwal = (id) =>
  api.delete("/operational/departureInitiation/delete/" + id);

// Operasional Harian
const getDailyOperations = (data) =>
  api.get("/operational/dailyOperations", data);
const getDailyOperationsById = (_id, data) =>
  api.get(`/operational/dailyOperations/${_id}`, data);
const postDailyOperations = (data) =>
  api.post("/operational/dailyOperations/add", data);
const updateDailyOperations = (id, data) =>
  api.put("/operational/dailyOperations/update/" + id, data);
const deleteDailyOperations = (id) =>
  api.delete("/operational/dailyOperations/delete/" + id);
const getDailyGoNoGo = (data) =>
  api.get("/operational/scheduletraindriver/gonogo", data);

//Set LRV
const postSetLRV = (data) =>
  api.post("/operational/scheduletraindriver/updateSetLRV", data);

//Change Loop
const postChangeLoop = (data) =>
  api.post("/operational/scheduletraindriver/updateChangeLoop", data);

// Master Operasional Harian
const getMDailyOperations = (data) =>
  api.get("/operational/masterDailyOperations", data);
const getMDailyOperationsById = (_id, data) =>
  api.get(`/operational/masterDailyOperations/${_id}`, data);
const postMDailyOperations = (data) =>
  api.post("/operational/masterDailyOperations/add", data);
const updateMDailyOperations = (id, data) =>
  api.put("/operational/masterDailyOperations/update/" + id, data);
const deleteMDailyOperations = (id) =>
  api.delete("/operational/masterDailyOperations/delete/" + id);

// Monitoring SCADA
const getMonitoringScada = (data) =>
  api.get("/operational/monitoringScada", data);
const getMonitoringScadaById = (_id, data) =>
  api.get(`/operational/monitoringScada/${_id}`, data);
const postMonitoringScada = (data) =>
  api.post("/operational/monitoringScada/add", data);
const updateMonitoringScada = (id, data) =>
  api.put("/operational/monitoringScada/update/" + id, data);
const deleteMonitoringScada = (id) =>
  api.delete("/operational/monitoringScada/delete/" + id);

// Kesiapan Lintas
const getTraffic = (data) => api.get("/operational/trafficReadiness", data);
const getTrafficById = (_id, data) =>
  api.get(`/operational/trafficReadiness/${_id}`, data);
const postTraffic = (data) =>
  api.post("/operational/trafficReadiness/add", data);
const updateTraffic = (id, data) =>
  api.put("/operational/trafficReadiness/update/" + id, data);
const deleteTraffic = (id) =>
  api.delete("/operational/trafficReadiness/delete/" + id);

const getLogBook = (data) =>
  api.get("/operational/scheduletraindriver/logbook", data);
const getLogBookAssessment = (data) =>
  api.get("/assesment/assesment/logbook", data);

// master data kejadian harian
const getLocationIncident = (data) =>
  api.get("/operational/locationIncident", data);
const postLocationIncident = (data) =>
  api.post("/operational/locationIncident/register", data);
const getStatusIncident = (data) =>
  api.get("/operational/statusIncident", data);
const postStatusIncident = (data) =>
  api.post("/operational/statusIncident/register", data);
const getEquipmentIncident = (data) =>
  api.get("/operational/equipmentIncident", data);
const postEquipmentIncident = (data) =>
  api.post("/operational/equipmentIncident/register", data);
const getSpecificLocationIncident = (data) =>
  api.get("/operational/specificLocationIncident", data);
const postSpecificLocationIncident = (data) =>
  api.post("/operational/specificLocationIncident/register", data);

export const apis = {
  getOperational,
  getDailyWork,
  getAssessment,
  getQueryAssessmentTotal,
  getScheduleTrainDriver,
  getReportMonthly,
  getTotalDistance,
  getTotalSchedule,
  postScheduleTrainDriver,
  postScheduleTrainDriverMonthly,
  updateScheduleTrainDriver,
  updateRouteScheduleTrainDriver,
  updateRouteScheduleTrainDriverStation,
  deleteScheduleTrainDriver,
  getTrainDriver,
  getKAIncident,
  postUploadImg,
  getAbsenceSummary,
  postUploadDoc,
  postUploadImgBase,
  postGonoGoItem,
  putGonoGoItem,

  postAbsence,
  putAbsence,
  getCountCheckup,
  deleteAbsence,
  getAbsence,
  getWorkOrderRealization,
  postAttendance,
  getBriefing,
  postBriefing,
  putBriefing,
  deleteImage,
  getMasterMedical,

  getCabinRide,
  getCabinRideResult,
  updateCabinRide,
  postCabinRide,
  deleteCabinRide,

  getMasterCabinRide,
  putMasterCabinRide,
  postMasterCabinRide,
  deleteMasterCabinRide,

  getCheckup,
  getGonoGoItem,
  getPreliminaryReport,
  postPreliminaryReport,
  putPreliminaryReport,
  deletePreliminaryReport,
  getCoaching,
  postCoaching,
  putCoaching,
  deleteCoaching,
  getDailyIncident,
  postDailyIncident,
  putDailyIncident,
  deleteDailyIncident,
  getInformationUpload,
  getInformationUploadV2,
  postInformationUpload,
  putInformationUpload,
  getAttendance,
  getUserById,

  getScheduleTrainDriverPlanning,
  postScheduleTrainDriverPlanning,
  postScheduleTrainDriverMonthlyPlanningImport,
  postScheduleTrainDriverMonthlyPlanning,
  updateScheduleTrainDriverPlanning,
  updateRouteScheduleTrainDriverPlanning,
  deleteScheduleTrainDriverPlanning,

  getKANumber,
  postKANumber,
  putKANumber,

  getLoops,
  postLoops,
  putLoops,

  getStationMaster,
  postStationMaster,
  updateStationMaster,
  deleteStationMaster,

  getTimeTable,
  getKATimeTable,
  postTimeTable,
  postManyTimeTable,
  updateTimeTable,
  getLetter,
  updateLetter,

  getTrainRoute,
  postTrainRoute,
  putTrainRoute,
  deleteTrainRoute,

  getMasterRouteTrain,
  postMasterRouteTrain,
  updateMasterRouteTrain,
  deleteMasterRouteTrain,

  getRouteList,

  getKedinasanById,
  getAllKedinasan,
  getProfileUser,
  getStasiun,
  getProfileOfficer,
  getProfileId,

  getNoGoItem,
  postNoGoItem,
  updateNoGoItem,

  getCabinRideNew,
  getCabinRideNewId,
  postCabinRideNew,
  postInfoCabinRideNew,
  putCabinRideNew,

  getMasterLRV,
  postMasterLRV,
  updateMasterLRV,

  getCabinEntry,
  postCabinEntry,
  updateCabinEntry,

  getDataLangsir,
  postDataLangsir,
  putDataLangsir,
  deleteDataLangsir,

  getDataStamformasi,
  postDataStamformasi,
  putDataStamformasi,
  deleteDataStamformasi,

  getDataWAM,
  postDataWAM,
  putDataWAM,
  deleteDataWAM,

  getListPTW,
  getPTW,
  postPTW,
  putPTW,
  deletePTW,

  getDataPPPKA,
  postDataPPPKA,
  putDataPPPKA,
  deleteDataPPPKA,

  getMDEmergency,
  postMDEmergency,
  updateMDEmergency,
  deleteMDEmergency,

  getEmergency1,
  postEmergency1,
  updateEmergency1,
  deleteEmergency1,

  getEmergency2,
  postEmergency2,
  updateEmergency2,
  deleteEmergency2,

  getEmergency3,
  postEmergency3,
  updateEmergency3,
  deleteEmergency3,

  getEmergency4,
  postEmergency4,
  updateEmergency4,
  deleteEmergency4,

  getEmergency5,
  postEmergency5,
  updateEmergency5,
  deleteEmergency5,

  getEmergency6,
  postEmergency6,
  updateEmergency6,
  deleteEmergency6,

  getEmergency7,
  postEmergency7,
  updateEmergency7,
  deleteEmergency7,

  getEmergency8,
  postEmergency8,
  updateEmergency8,
  deleteEmergency8,

  getImage,
  postManyImage,

  getWsc,
  getWscId,
  postWsc,
  updateWsc,
  deleteWsc,

  getPemberangkatanAwal,
  postPemberangkatanAwal,
  updatePemberangkatanAwal,
  deletePemberangkatanAwal,

  getDailyOperations,
  getDailyOperationsById,
  postDailyOperations,
  updateDailyOperations,
  deleteDailyOperations,

  getDailyGoNoGo,

  postSetLRV,

  getMDailyOperations,
  getMDailyOperationsById,
  postMDailyOperations,
  updateMDailyOperations,
  deleteMDailyOperations,

  getMonitoringScada,
  getMonitoringScadaById,
  postMonitoringScada,
  updateMonitoringScada,
  deleteMonitoringScada,

  getTraffic,
  getTrafficById,
  postTraffic,
  updateTraffic,
  deleteTraffic,

  getLogBook,
  getLogBookAssessment,

  postChangeLoop,

  getLocationIncident,
  postLocationIncident,
  getStatusIncident,
  postStatusIncident,
  getEquipmentIncident,
  postEquipmentIncident,
  getSpecificLocationIncident,
  postSpecificLocationIncident,
};

export default apis;
