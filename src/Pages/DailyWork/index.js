import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import _ from "lodash";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import useStyles, { selectBoxStyles } from "./Styles";

// dialog
import DialogCustom from "../../Component/Dialog/Dialog";

// icon
import SearchIcon from "@mui/icons-material/Search";

// style
import {
  tableLeftStyle,
  tableTextCellNameStyle,
  tableTextCellStyle,
  tableTextIsiNameStyle,
  tableTextIsiStyle,
} from "./Styles";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import {
  LangsirContext,
  ProfileContext,
  StamformasiContext,
  StationMasterContext,
} from "Context";
import useLetter from "Hooks/Letter/useLetter";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import html2pdf from "html2pdf.js";
import Select from "react-select";
import UseAbsence from "../../Hooks/Absence/useAbsence";
import useDailyWork from "../../Hooks/DailyWork/useDailyWork";

const TitledBox = ({ title, children }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd", // Warna dan gaya border
        borderRadius: "8px", // Radius border untuk sudut melengkung
        overflow: "hidden", // Supaya border menyesuaikan dengan header
      }}
    >
      {/* Header dengan title */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5", // Warna latar belakang header
          padding: "8px 16px", // Spasi untuk header
          borderBottom: "1px solid #ddd", // Border bawah header
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>

      {/* Konten di dalam Box */}
      <Box p={2}>{children}</Box>
    </Box>
  );
};

export default function DailyWork() {
  const classes = useStyles();

  const {
    dataLoopTrain,
    fetchDataLoop,
    dataScheduleTrainDriver,
    submitDataDailyWork,
    cancelDailyWork,
    cancelDailyWorkOFF,
    getDataScheduleTrainDriver,
    getWorkingOffByRangeDate,
    workingOFF,
    dateDailyWork,
    setDateDailyWork,
    setfilterStartDate,
    setfilterEndDate,
    filterStartDate,
    filterEndDate,
    updateDataScheduleTrainDriver,
    getDataScheduleTrainDriverRealisasi,
    updateDataScheduleTrainDriverStatus,
    cancelDailyWorkRealisasi,
    updateSetLRV,
    updateChangeLoop,
  } = useDailyWork();

  const {
    getKANumber,
    getMasterKANumber,
    masterKANumbers,
    kaNumbers,
    setKANumbers,
    updateKANumber,
    idKaNumbers,
    setIdKANumbers,
    categoryKANumber,
    setcategoryKANumber,

    getLoops,
    updateLoops,
    createLoops,
    loops,
  } = useContext(StationMasterContext);

  const {
    getDataLangsir,
    dataLangsir,
    setDataLangsir,
    postDataLangsir,
    updateDataLangsir,
    deleteDataLangsir,
  } = useContext(LangsirContext);

  const {
    submitDataAbsence,
    handleOpen,
    selectTrainDriver,
    setSelectTrainDriver,
    openDialogDelete,
    getDataAbsence,
    filterAbsence,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    note,
    setNote,
    listType,
    type,
    setType,
    openDialog,
    setOpenDialog,
    monthlyWork,
    setMonthlyWork,
  } = UseAbsence();

  const {
    trainDriver,
    getDataTrainDriver,
    trainDriverHook,
    getMasinis,
    getPenyelia,
    getTrainDriver,
  } = useTrainDriver();

  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loopRouteTrainChoose, setLoopRouteTrainChoose] = useState({});
  const [dailyWorkChoose, setDailyWorkChoose] = useState({});

  const { profileUser, getProfileUser, listProfile, getListProfile } =
    useContext(ProfileContext);
  const [dinasan, setDinasan] = useState("Masinis");

  const [openChooseLRV, setOpenChooseLRV] = useState(false);
  const [openTrainNumber, setOpenTrainNumber] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chooseTrainNumber, setChooseTrainNumber] = useState("");
  const [chooseDailySchedule, setChooseDailySchedule] = useState({});
  const [actionTrainNumber, setActionTrainNumber] = useState("");

  const { getTimeTable, timetables } = useContext(StationMasterContext);
  const { getDataStamformasi, dataStamformasi } =
    useContext(StamformasiContext);

  const { getDataLetter, filterLetter } = useLetter();

  const detailLetter = filterLetter.filter(
    (item) => item.type === "Dinasan Harian"
  )[0];

  const getData = async () => {
    await setLoader(true);
    await fetchDataLoop();
    await getTimeTable();
    await getDataStamformasi({ operationDate: filterStartDate });
    // await getDataAbsence({
    //   startDate: filterStartDate,
    //   endDate: filterEndDate,
    // });
    // await getDataTrainDriver()
    // await getWorkingOffByRangeDate(filterStartDate, filterEndDate)
    await getTrainDriver();
    getDataLetter();
    getLoops();
    setLoader(false);
  };

  const searchDataLangsir = () => {
    if (filterStartDate === "") {
      getDataLangsir({ operationDate: moment().format("YYYY-MM-DD") });
    } else {
      getDataLangsir({
        operationDate: moment(filterStartDate).format("YYYY-MM-DD"),
      });
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#BB7E36",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "theme.palette.action.hover",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    getData();
  }, []);

  const openModalDialogChooseLRV = (data) => {
    setOpenChooseLRV(true);
    setDailyWorkChoose(data);
    setDateDailyWork(data?.dailyWorkDateString);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenModal(false);
    setOpenChooseLRV(false);
    setOpenTrainNumber(false);
    setOpenChangeTrainDriverModal(false);
    setOpenDialogSetLRV(false);
  };

  const [openChangeTrainDriverModal, setOpenChangeTrainDriverModal] =
    useState(false);
  const [dailyWorkChooseOFF, setDailyWorkChooseOFF] = useState({});
  const [dailyWorkChooseMainline, setDailyWorkChooseMainline] = useState({});
  const [noteRotation, setNoteRotation] = useState("");
  const [openDialogSetLRV, setOpenDialogSetLRV] = useState(false);

  const openModalChange = (data) => {
    setOpenChangeTrainDriverModal(true);
    setDateDailyWork(data?.dailyWorkDateString);
    setDailyWorkChooseOFF(data);
  };

  var element = useRef();
  var opt = {
    margin: [
      // detailLetter?.padding,
      detailLetter?.padding,
      // detailLetter?.padding,
      detailLetter?.padding,
    ],
    filename: `dinasan-harian-${moment().format("YYYYMMDDHHmmss")}.pdf`,
    html2canvas: {
      dpi: 360,
      letterRendering: true,
      useCORS: true,
      scale: 2,
    },
    pagebreak: { mode: ["css"], pagebreak: { avoid: "tr" } },
    jsPDF: {
      unit: "mm",
      orientation: "portrait",
      format: [595, 842],
    },
  };

  const handlePrint = async () => {
    setTimeout(() => {
      html2pdf().from(element.current).set(opt).save();
      setLoader(false);
    }, 3000);
  };

  let groupScheduleByDate = _.groupBy(
    dataScheduleTrainDriver,
    "dailyWorkDateString"
  );

  // const ContentPrint = forwardRef((props, ref) => {
  //   return (
  //     <div ref={ref}>
  //       <Box>
  //         <Table>
  //           <TableHead>
  //             <TableRow sx={{ border: "1.5px solid #000000" }}>
  //               <TableCell
  //                 align="center"
  //                 sx={{
  //                   borderRight: "1.6px solid #000000",
  //                   width: "50%",
  //                 }}>
  //                 <Grid container justifyContent="center" alignItems="center">
  //                   <img
  //                     src={Images.logoIcon}
  //                     alt="img"
  //                     style={{
  //                       height: 30,
  //                       marginRight: 5,
  //                       objectFit: "cover",
  //                       objectPosition: "center",
  //                     }}
  //                   />
  //                   <Typography sx={{ fontStyle: "italic", fontSize: 18 }}>
  //                     LRT
  //                   </Typography>
  //                   <Typography
  //                     sx={{
  //                       fontSize: 18,
  //                       fontWeight: 200,
  //                       fontStyle: "italic",
  //                     }}>
  //                     JAKARTA
  //                   </Typography>
  //                 </Grid>
  //               </TableCell>
  //               <TableCell align="center" sx={{ width: "50%" }}>
  //                 <Typography>{detailLetter?.titleHead}</Typography>
  //               </TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             <TableRow sx={{ p: 0, border: "1.5px solid #000000" }}>
  //               <TableCell colSpan={2} sx={{ p: 0 }}>
  //                 <TableRow>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       borderRight: "1.6px solid #000000",
  //                       width: "20%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>Nomor Dokumen</Typography>
  //                   </TableCell>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       borderRight: "1.6px solid #000000",
  //                       width: "25%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>{detailLetter?.numberHead}</Typography>
  //                   </TableCell>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       borderRight: "1.6px solid #000000",
  //                       width: "15%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>Nomor Revisi</Typography>
  //                   </TableCell>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       borderRight: "1.6px solid #000000",
  //                       width: "15%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>{detailLetter?.revisionNumber}</Typography>
  //                   </TableCell>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       borderRight: "1.6px solid #000000",
  //                       width: "10%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>Halaman</Typography>
  //                   </TableCell>
  //                   <TableCell
  //                     align="center"
  //                     sx={{
  //                       width: "15%",
  //                       py: 0,
  //                     }}>
  //                     <Typography>{detailLetter?.page}</Typography>
  //                   </TableCell>
  //                 </TableRow>
  //               </TableCell>
  //             </TableRow>
  //           </TableBody>
  //         </Table>
  //       </Box>
  //       <Box
  //         sx={{
  //           justifyContent: "center",
  //           py: 3,
  //           textAlign: "center",
  //         }}>
  //         <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
  //           {detailLetter?.titleDoc}
  //         </Typography>
  //         <Typography sx={{ fontSize: 16, fontWeight: 200 }}>
  //           {"No. " +
  //             moment().format("DD") +
  //             " / " +
  //             detailLetter?.numberDoc +
  //             " / " +
  //             romanize(moment().format("M")) +
  //             " / " +
  //             moment().format("YYYY")}
  //         </Typography>
  //       </Box>
  //       <Table
  //         sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
  //         aria-label="simple table">
  //         <TableHead>
  //           <TableRow style={{ backgroundColor: "#C4C4C4" }}>
  //             <TableCell style={tableLeftStyle1}>
  //               <p className={classes.tableLeftTxt} align="center">
  //                 No.
  //               </p>
  //             </TableCell>
  //             <TableCell style={tableTextCellStyle1} align="center">
  //               Kode
  //             </TableCell>

  //             <TableCell style={tableTextCellStyle1} align="center">
  //               Masinis
  //             </TableCell>
  //             <TableCell style={tableTextCellStyle1} align="center">
  //               No.KA
  //             </TableCell>
  //             <TableCell style={tableTextCellStyle1} align="center">
  //               Mulai Dinas
  //             </TableCell>
  //             <TableCell style={tableTextCellStyle1} align="center">
  //               Habis Dinas
  //             </TableCell>
  //             <TableCell style={tableTextCellNameStyle} align="center">
  //               Masinis
  //             </TableCell>
  //             <TableCell style={tableRightStyle} align="center">
  //               <p className={classes.tableLeftTxt} align="center">
  //                 No.LRV
  //               </p>
  //             </TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           <>

  //             {_.orderBy(
  //               dataLoopTrain.filter(
  //                 (item) =>
  //                   item.note === "Bertugas" ||
  //                   item.note === "Penyelia" ||
  //                   item.note === "Cadangan"
  //               ),
  //               ["note", "code", "loop"],
  //               ["asc", "asc", "asc"]
  //             ).map((item, index) => {
  //               let dataTrainDriver = [];
  //               let chooseTrainDriver = "0";
  //               let dailyschedule = dataScheduleTrainDriver.filter((x) => x.loopRouteTrain?._id === item._id);
  //               let itemroute = [];
  //               if (dailyschedule.length > 0) {
  //                 dataTrainDriver = dataScheduleTrainDriver.filter((x) => x.loopRouteTrain?._id === item._id);
  //                 chooseTrainDriver = dailyschedule[0]?.trainDriver?._id;
  //                 itemroute = dailyschedule[0]?.loopRouteTrain?.route;
  //               }

  //               return (
  //                 <TableRow
  //                   key={index++}
  //                   style={{
  //                     borderCollapse: "seperate",
  //                     backgroundColor: "#F3F3F3",
  //                     border: "5px solid #F6F7FF",
  //                   }}>
  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {index + 1}
  //                   </TableCell>
  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {item.code}
  //                   </TableCell>

  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {item.loop}
  //                   </TableCell>
  //                   <TableCell style={tableTextIsiStyle1} align="left">
  //                     {itemroute.map((itemTrain) => {
  //                       return (
  //                         <Tooltip
  //                           title={`Klik untuk menghapus Nomor KA ${itemTrain?.trainNumber}`}
  //                           onClick={() => {
  //                             setActionTrainNumber("Hapus");
  //                             setChooseTrainNumber(itemTrain?.trainNumber);
  //                             setChooseDailySchedule(dailyschedule[0]);
  //                             setDateDailyWork(
  //                               dailyschedule[0]?.dailyWorkDateString
  //                             );
  //                             setOpenTrainNumber(true);
  //                           }}>
  //                           <span
  //                             style={{
  //                               padding: 1,
  //                               margin: 1,
  //                               backgroundColor: "#CFCFCF",
  //                             }}>
  //                             {itemTrain?.trainNumber}
  //                           </span>
  //                         </Tooltip>
  //                       );
  //                     })}
  //                     {itemroute.length > 0 ? (
  //                       <Button
  //                         size="small"
  //                         variant="contained"
  //                         color="primary"
  //                         style={{ margin: 1, padding: 1, width: 50 }}
  //                         onClick={() => {
  //                           setActionTrainNumber("Tambah");
  //                           setChooseTrainNumber("");
  //                           setChooseDailySchedule(dailyschedule[0]);
  //                           setDateDailyWork(
  //                             dailyschedule[0]?.dailyWorkDateString
  //                           );
  //                           setOpenTrainNumber(true);
  //                         }}>
  //                         +
  //                       </Button>
  //                     ) : null}

  //                     {/* {item.route[0]} */}
  //                   </TableCell>

  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {item.start}
  //                   </TableCell>
  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {item.end}
  //                   </TableCell>
  //                   <TableCell style={tableTextIsiNameStyle} align="left">
  //                     <Select
  //                       styles={selectBoxStyles}
  //                       menuPortalTarget={document.body}
  //                       //defaultValue={trainDriverHook.filter(x=>x._id === chooseTrainDriver).map(x=>{return({value:x._id, label:x.name})})[0]}
  //                       name="color"
  //                       options={[
  //                         { value: "0", label: "Pilih Nama" },
  //                         ...trainDriverHook.map((x) => {
  //                           return { value: x._id, label: x.name };
  //                         }),
  //                       ]}
  //                       value={
  //                         chooseTrainDriver !== "0"
  //                           ? trainDriverHook
  //                               .filter((x) => x._id === chooseTrainDriver)
  //                               .map((x) => {
  //                                 return { value: x._id, label: x.name };
  //                               })[0]
  //                           : { value: "0", label: "Pilih Nama" }
  //                       }
  //                       //defaultValue={}
  //                       onChange={async (selectedOption) => {
  //                         let _startDate;
  //                               if(startDate === ""){
  //                                 _startDate = moment().format("YYYY-MM-DD 07:00:00")
  //                               }
  //                               else{
  //                                 _startDate = moment(startDate).format("YYYY-MM-DD 07:00:00")
  //                               }

  //                         if (selectedOption.value !== "0") {
  //                           await cancelDailyWork(
  //                             dataTrainDriver[0]?._id, _startDate
  //                           );
  //                           let loopRouteFormat = {};
  //                           loopRouteFormat = {
  //                             ...item,
  //                             route: item.route.map((itemRoute) => {
  //                               let station = [];
  //                               if (Number(itemRoute) % 2 > 0) {
  //                                 station = _.orderBy(
  //                                   item?.station.filter(
  //                                     (x) => x.flag === "Ganjil"
  //                                   )[0].stationList,
  //                                   ["loopIndex"],
  //                                   ["asc"]
  //                                 ).map((item) => {
  //                                   let datadistance = timetables.filter(
  //                                     (x) =>
  //                                       x.flag === "Ganjil" &&
  //                                       x.stationCode === item.stationCode
  //                                   )[0];
  //                                   let datatimetable =
  //                                     datadistance?.route.filter(
  //                                       (x) => x.route === itemRoute
  //                                     )[0];
  //                                   return {
  //                                     ...item,
  //                                     start: "",
  //                                     end: "",
  //                                     status: "",
  //                                     duration: 0,
  //                                     dweelingTime: 0,
  //                                     startPlan: datatimetable?.start,
  //                                     endPlan: datatimetable?.end,
  //                                     distance: datadistance?.distance,
  //                                     vOps: datadistance?.vOps,
  //                                     vMax: datadistance?.vMax,
  //                                   };
  //                                 });
  //                               } else {
  //                                 station = _.orderBy(
  //                                   item?.station.filter(
  //                                     (x) => x.flag === "Genap"
  //                                   )[0].stationList,
  //                                   ["loopIndex"],
  //                                   ["asc"]
  //                                 ).map((item) => {
  //                                   let datadistance = timetables.filter(
  //                                     (x) =>
  //                                       x.flag === "Genap" &&
  //                                       x.stationCode === item.stationCode
  //                                   )[0];
  //                                   let datatimetable =
  //                                     datadistance?.route.filter(
  //                                       (x) => x.route === itemRoute
  //                                     )[0];
  //                                   return {
  //                                     ...item,
  //                                     start: "",
  //                                     end: "",
  //                                     status: "",
  //                                     duration: 0,
  //                                     dweelingTime: 0,
  //                                     startPlan: datatimetable?.start,
  //                                     endPlan: datatimetable?.end,
  //                                     distance: datadistance?.distance,
  //                                     vOps: datadistance?.vOps,
  //                                     vMax: datadistance?.vMax,
  //                                   };
  //                                 });
  //                               }
  //                               return {
  //                                 trainNumber: itemRoute,
  //                                 startTime: "",
  //                                 endTime: "",
  //                                 duration: 0,
  //                                 dweelingTime: 0,
  //                                 status: "",
  //                                 note: "",
  //                                 station,
  //                               };
  //                             }),
  //                           };
  //                           let datapost = {
  //                             dailyWorkDate: moment(_startDate).format("YYYY-MM-DD 07:00:00"),
  //                             trainDriver: trainDriverHook.filter(
  //                               (x) => x._id === selectedOption.value
  //                             )[0],
  //                             supervisor: profileUser,
  //                             loopRouteTrain: loopRouteFormat,
  //                             createDate: new Date(),
  //                           };
  //                           console.log("datapost", datapost);
  //                           await submitDataDailyWork(datapost, _startDate);
  //                           getData()
  //                         } else {
  //                           console.log(
  //                             "disini",
  //                             dataTrainDriver[0]?._id,
  //                             _startDate
  //                           );
  //                           await cancelDailyWork(
  //                             dataTrainDriver[0]?._id,
  //                             _startDate
  //                           );
  //                           getData()
  //                         }
  //                       }}
  //                     />
  //                   </TableCell>
  //                   <TableCell style={tableTextIsiStyle1} align="center">
  //                     {JSON.stringify(dataTrainDriver[0]?.LRVList)}
  //                   </TableCell>
  //                 </TableRow>
  //               );
  //             })}
  //           </>
  //         </TableBody>
  //       </Table>

  //     </div>
  //   );
  // });

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent sx={{ width: 400 }}>
          <div>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Pilih Masinis atau Penyelia
            </Typography>
            <Select
              styles={selectBoxStyles}
              menuPortalTarget={document.body}
              placeholder={"Pilih Masinis atau Penyelia"}
              options={[
                { value: "0", label: "Pilih Nama" },
                ...trainDriver.map((x) => {
                  return { label: x.name, value: x._id };
                }),
              ]}
              isSearchable={true}
              isClearable={true}
              value={selectTrainDriver}
              onChange={(selected) =>
                setSelectTrainDriver(
                  selected ? selected : { label: "Pilih", value: "0" }
                )
              }
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Pilih Tipe Izin
            </Typography>
            <Select
              styles={selectBoxStyles}
              menuPortalTarget={document.body}
              placeholder="Pilih Izin"
              options={listType}
              isSearchable={true}
              isClearable={true}
              value={listType.filter((option) => option.value === type)}
              onChange={(selected) =>
                setType(selected.value ? selected.value : "")
              }
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Grid container justifyContent={"space-between"}>
              <div>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Tanggal Mulai
                </Typography>
                <TextField
                  type="date"
                  InputProps={{
                    style: {
                      width: 160,
                      fontSize: 12,
                      height: 40,
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: 7,
                      boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                  sx={{
                    width: 160,
                    mb: 2,
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Tanggal Selesai
                </Typography>
                <TextField
                  type="date"
                  InputProps={{
                    style: {
                      width: 160,
                      fontSize: 12,
                      height: 40,
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: 7,
                      boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                  sx={{
                    width: 160,
                    mb: 2,
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </Grid>
          </div>
          <div>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Catatan
            </Typography>
            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis Komentar Disini"
              multiline
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: "#ababab",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Tutup
          </Button>
          <Button
            sx={{
              width: 150,
              color: "#fff",
              textTransform: "none",
            }}
            variant="contained"
            onClick={async () => {
              submitDataAbsence();
              let _realisasi = await getDataScheduleTrainDriverRealisasi({
                params: {
                  trainDriverId: selectTrainDriver.value,
                  startDate,
                  endDate,
                },
              });
              let _planning = await getDataScheduleTrainDriver({
                params: {
                  trainDriverId: selectTrainDriver.value,
                  startDate,
                  endDate,
                },
              });
              _realisasi.forEach((itemRealisasi) => {
                cancelDailyWorkRealisasi(
                  itemRealisasi._id,
                  "",
                  monthlyWork,
                  true
                );
              });
              _planning.forEach((itemPlanning) => {
                cancelDailyWork(itemPlanning._id, "", monthlyWork, true);
              });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent sx={{ width: 400 }}>
          <Typography>
            Apakah anda yakin menghapus izin dengan nama{" "}
            {selectTrainDriver?.name}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: "#ababab",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Tutup
          </Button>
          <Button
            sx={{
              width: 150,
              color: "#fff",
              textTransform: "none",
            }}
            variant="contained"
            onClick={() => {
              submitDataAbsence();
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <DialogCustom
        fullWidth={true}
        open={openChangeTrainDriverModal}
        maxWidth={"lg"}
        title="Form Dinas Masuk Masinis"
        content={
          <>
            <Grid container spacing="2">
              <Grid item md="6" xs="12" sm="12">
                <Box style={{ backgroundColor: "#CFCFCF" }}>
                  <Typography>Data Masinis OFF</Typography>
                </Box>
                <Table>
                  <TableRow>
                    <TableCell>Nama Masinis</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      {dailyWorkChooseOFF?.trainDriver?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jabatan</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      {dailyWorkChooseOFF?.trainDriver?.jobrole}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NIK</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      {dailyWorkChooseOFF?.trainDriver?.nik}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item md="6" xs="12" sm="12">
                <Box style={{ backgroundColor: "#CFCFCF" }}>
                  <Typography>Data Masinis Mainline</Typography>
                </Box>
                <Table>
                  <TableRow>
                    <TableCell>Kode Dinas</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell style={{ padding: 5 }}>
                      <Select
                        size="small"
                        style={{ marginBottom: 0 }}
                        options={[
                          { value: "0", label: "Pilih" },
                          ..._.orderBy(
                            dataLoopTrain.filter((f) => f.note === "Bertugas"),
                            ["code", "loop"],
                            ["asc", "asc"]
                          ).map((x) => {
                            return { value: x.code, label: x.code };
                          }),
                        ]}
                        onChange={async (selectedOption) => {
                          const dataMainline = await getDataScheduleTrainDriver(
                            {
                              params: {
                                dailyWorkDate: dateDailyWork,
                                note: "Bertugas",
                                code: selectedOption.value,
                              },
                              local: true,
                            }
                          );
                          console.log("datamainline", dataMainline);
                          if (dataMainline.length > 0) {
                            setDailyWorkChooseMainline(dataMainline[0]);
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ widht: "20%" }}>Nama Masinis</TableCell>
                    <TableCell style={{ widht: "2%" }}>:</TableCell>
                    <TableCell>
                      {dailyWorkChooseMainline?.trainDriver?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ widht: "20%" }}>Loop</TableCell>
                    <TableCell style={{ widht: "2%" }}>:</TableCell>
                    <TableCell>
                      {dailyWorkChooseMainline?.loopRouteTrain?.loop}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>

              <Grid item md="12" sm="12" xs="12">
                <Typography>Alasan Pergantian Masinis</Typography>
                <TextField
                  multiline="true"
                  placeholder="Isikan Alasan pergantian"
                  style={{ width: "100%" }}
                  value={noteRotation}
                  onChange={(e) => setNoteRotation(e.target.value)}
                />
              </Grid>
            </Grid>
          </>
        }
        cancel={handleClose}
        valueCancel="Batal"
        submit={true}
        confirm={async () => {
          //update data mainline
          let datapost = {
            trainDriver: dailyWorkChooseOFF.trainDriver,
            rotationTrainDriver: {
              rotationDate: new Date(),
              rotationBy: JSON.parse(localStorage.profile),
              before: dailyWorkChooseMainline,
              after: dailyWorkChooseOFF,
              note: noteRotation,
            },
          };
          console.log("datapost", datapost);
          await updateDataScheduleTrainDriverStatus(
            dailyWorkChooseMainline?._id,
            datapost,
            dateDailyWork
          );
          //update data OFF
          let datapostOFF = {
            rotationTrainDriver: {
              rotationDate: new Date(),
              rotationBy: JSON.parse(localStorage.profile),
              before: {
                _id: dailyWorkChooseOFF._id,
                trainDriver: {
                  _id: dailyWorkChooseOFF.trainDriver._id,
                  nik: dailyWorkChooseOFF.trainDriver.nik,
                  name: dailyWorkChooseOFF.trainDriver.name,
                  jobrole: dailyWorkChooseOFF.trainDriver.jobrole,
                },
              },
              after: {
                _id: dailyWorkChooseMainline._id,
                trainDriver: {
                  _id: dailyWorkChooseMainline.trainDriver._id,
                  nik: dailyWorkChooseMainline.trainDriver.nik,
                  name: dailyWorkChooseMainline.trainDriver.name,
                  jobrole: dailyWorkChooseMainline.trainDriver.jobrole,
                },
                loopRouteTrain: dailyWorkChooseMainline.loopRouteTrain,
              },
              note: noteRotation,
            },
          };
          console.log("datapostOFF", datapostOFF);
          await updateDataScheduleTrainDriverStatus(
            dailyWorkChooseOFF?._id,
            datapostOFF,
            dateDailyWork
          );

          // await getDataScheduleTrainDriver({params: { dailyWorkDate: dateDailyWork, code : "OFF" }})
          await getWorkingOffByRangeDate(filterStartDate, filterEndDate);

          handleClose();
        }}
        valueConfirm="Submit Dinas Masuk"
      />

      <DialogCustom
        //fullWidth={true}
        open={openChooseLRV}
        //maxWidth = {"xs"}
        title="Pilih Nomor LRV"
        content={
          <>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">
                {JSON.stringify(dailyWorkChoose?.LRVList)}
              </FormLabel>
              <FormGroup>
                {["1", "2", "3", "4", "5", "6", "7", "8"].map((itemLRV) => {
                  let checked_field = false;
                  if (dailyWorkChoose?.LRVList?.length > 0) {
                    checked_field =
                      dailyWorkChoose?.LRVList.filter((x) => x === itemLRV)
                        .length > 0
                        ? true
                        : false;
                  }

                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={itemLRV}
                          checked={checked_field}
                          onChange={(e) => {
                            if (e.target.checked) {
                              let datachange = {
                                ...dailyWorkChoose,
                                LRVList: [
                                  ...dailyWorkChoose?.LRVList,
                                  e.target.value,
                                ],
                              };
                              setDailyWorkChoose(datachange);
                            } else {
                              let datachange = {
                                ...dailyWorkChoose,
                                LRVList: dailyWorkChoose?.LRVList.filter(
                                  (x) => x !== e.target.value
                                ),
                              };
                              setDailyWorkChoose(datachange);
                            }
                          }}
                        />
                      }
                      label={"LRV No." + itemLRV}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </>
        }
        cancel={handleClose}
        valueCancel="Batal"
        submit={true}
        confirm={async () => {
          let routeChange = dailyWorkChoose?.loopRouteTrain?.route.map(
            (itemRoute) => {
              return { ...itemRoute, LRVList: dailyWorkChoose.LRVList };
            }
          );
          console.log("routeChange", routeChange);
          updateDataScheduleTrainDriver(
            dailyWorkChoose._id,
            {
              LRVList: dailyWorkChoose.LRVList,
              loopRouteTrain: {
                ...dailyWorkChoose?.loopRouteTrain,
                route: routeChange,
              },
            },
            dateDailyWork
          );
          handleClose();
        }}
        valueConfirm="Simpan"
      />

      <DialogCustom
        fullScreen={true}
        open={openTrainNumber}
        //maxWidth = {"xs"}
        title={"Perubahan Loop Perjalanan KA"}
        content={
          <>
            <TitledBox title="Informasi Perubahan Loop">
              <Table size="small">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell align="center" width={20}>
                      No
                    </TableCell>
                    <TableCell align="center">Loop</TableCell>
                    <TableCell align="center">Perubahan Loop</TableCell>
                    <TableCell align="center">LRV</TableCell>
                    <TableCell align="center">Perubahan LRV</TableCell>
                    <TableCell align="center">Catatan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataStamformasi.length > 0 &&
                    dataStamformasi[0]?.lrvList.map((itemLoop, index) => {
                      return (
                        <TableRow
                          style={{
                            borderCollapse: "seperate",
                            backgroundColor: "#F3F3F3",
                            border: "5px solid #F6F7FF",
                          }}
                        >
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {itemLoop?.beforeLoop
                              ? itemLoop?.beforeLoop
                              : itemLoop?.loop}
                          </TableCell>
                          <TableCell align="center">
                            {itemLoop?.changeLoop}
                          </TableCell>
                          <TableCell align="center">
                            {itemLoop.numberLrv}
                          </TableCell>
                          <TableCell align="center">
                            {itemLoop?.changeLRV}
                          </TableCell>
                          <TableCell align="center">
                            {itemLoop?.changeNote}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TitledBox>
            <TitledBox title="Nomor KA sedang bertugas">
              <Table size="small">
                <TableRow>
                  <TableCell align="center" width={40}>
                    Loop
                  </TableCell>
                  <TableCell align="center" width={140}>
                    Perubahan Loop
                  </TableCell>
                  <TableCell align="center" width={140}>
                    Kode Dinas
                  </TableCell>
                  <TableCell align="left" width={140}>
                    Masinis
                  </TableCell>
                  <TableCell align="left">Train Number</TableCell>
                </TableRow>
                {_.orderBy(
                  dataScheduleTrainDriver,
                  ["loopRouteTrain.loop"],
                  ["asc"]
                )
                  .filter((x) => x.status === "On Duty")
                  .map((itemdetail) => {
                    const changeLoop =
                      dataStamformasi[0]?.lrvList.filter(
                        (x) =>
                          x.beforeLoop ===
                          "Loop " + itemdetail?.loopRouteTrain?.loop
                      ) || [];
                    let changeKANumber = [];
                    if (changeLoop.length > 0) {
                      const datachange = _.orderBy(
                        dataScheduleTrainDriver.filter(
                          (x) =>
                            "Loop " + x?.loopRouteTrain?.loop ===
                            changeLoop[0].changeLoop
                        ),
                        ["loopRouteTrain.start"],
                        ["asc"]
                      );
                      if (datachange.length > 0) {
                        let _arr = datachange[0].loopRouteTrain?.route.filter(
                          (x) => x.status !== "Finish" && x.status !== "Start"
                        );

                        // cari index object dengan trainNumber === "REST"
                        const idxRest = _arr.findIndex(
                          (x) => x.trainNumber === "REST"
                        );

                        // ambil slice sampai REST (termasuk REST kalau ketemu)
                        changeKANumber =
                          idxRest !== -1 ? _arr.slice(0, idxRest + 1) : _arr;
                      }
                    }
                    return (
                      <TableRow>
                        <TableCell align="center">
                          {itemdetail?.loopRouteTrain?.loop}
                        </TableCell>
                        <TableCell align="center">
                          {changeLoop.length > 0
                            ? changeLoop[0].changeLoop
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {itemdetail?.loopRouteTrain?.code}
                        </TableCell>
                        <TableCell align="left">
                          {itemdetail?.trainDriver?.name}
                        </TableCell>

                        <TableCell align="left">
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ width: 40 }} align="center">
                                  Loop
                                </TableCell>
                                {/* <TableCell style={{width:40}} align="center">LRV</TableCell> */}
                                <TableCell align="left">Nomor KA</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">
                                  {itemdetail?.loopRouteTrain?.loop}
                                </TableCell>
                                {/* <TableCell align="center">
                                  {itemdetail?.loopRouteTrain?.lrv}
                                </TableCell> */}
                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap", // Agar konten bisa turun ke baris baru
                                      gap: 0.5, // Jarak antar elemen span
                                    }}
                                  >
                                    {itemdetail &&
                                      itemdetail?.loopRouteTrain?.route
                                        .filter((x) => x.status === "Finish")
                                        .map((itemTrain, index) => {
                                          return (
                                            <Box
                                              component="span"
                                              key={index}
                                              sx={{
                                                padding: "2px 4px",
                                                margin: "1px",
                                                borderRadius: "4px",
                                                color:
                                                  itemTrain?.status ===
                                                    "Finish" ||
                                                  itemTrain?.status === "Start"
                                                    ? "white"
                                                    : "black",
                                                backgroundColor:
                                                  itemTrain?.status === "Finish"
                                                    ? "red"
                                                    : itemTrain?.status ===
                                                      "Start"
                                                    ? "green"
                                                    : "#CFCFCF",
                                              }}
                                            >
                                              {itemTrain?.trainNumber}
                                            </Box>
                                          );
                                        })}
                                  </Box>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center">
                                  {changeLoop.length > 0
                                    ? changeLoop[0].changeLoop.replace(
                                        /Loop\s*/i,
                                        ""
                                      )
                                    : "-"}
                                </TableCell>
                                {/* <TableCell align="center">
                                    {itemdetail?.loopRouteTrain?.lrv}
                                  </TableCell> */}
                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap", // Agar konten bisa turun ke baris baru
                                      gap: 0.5, // Jarak antar elemen span
                                    }}
                                  >
                                    {changeKANumber.map((itemTrain, index) => {
                                      return (
                                        <Box
                                          component="span"
                                          key={index}
                                          sx={{
                                            padding: "2px 4px",
                                            margin: "1px",
                                            borderRadius: "4px",
                                            color:
                                              itemTrain?.status === "Finish" ||
                                              itemTrain?.status === "Start"
                                                ? "white"
                                                : "black",
                                            backgroundColor:
                                              itemTrain?.status === "Finish"
                                                ? "red"
                                                : itemTrain?.status === "Start"
                                                ? "green"
                                                : "#CFCFCF",
                                          }}
                                        >
                                          {itemTrain?.trainNumber}
                                        </Box>
                                      );
                                    })}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </Table>
            </TitledBox>

            {/* <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">
                Nomor KA{" "}
                {actionTrainNumber === "Hapus" ? chooseTrainNumber : ""}
              </FormLabel>
              {actionTrainNumber === "Hapus" ? null : (
                <TextField
                  value={chooseTrainNumber}
                  onChange={(e) => setChooseTrainNumber(e.target.value)}
                />
              )}
            </FormControl> */}
          </>
        }
        cancel={handleClose}
        valueCancel="Batal"
        submit={true}
        confirm={async () => {
          const dataScheduleChange = dataScheduleTrainDriver
            .filter((x) => x.status === "On Duty")
            .map((itemdetail) => {
              const changeLoop =
                dataStamformasi[0]?.readyOperationList.filter(
                  (x) =>
                    x.beforeLoop === "Loop " + itemdetail?.loopRouteTrain?.loop
                ) || [];
              let changeKANumber = [];
              if (changeLoop.length > 0) {
                const datachange = dataScheduleTrainDriver.filter(
                  (x) =>
                    "Loop " + x?.loopRouteTrain?.loop ===
                    changeLoop[0].changeLoop
                );
                if (datachange.length > 0) {
                  changeKANumber = datachange[0].loopRouteTrain?.route.filter(
                    (x) => x.status !== "Finish"
                  );
                }
              }
              let routeChange = [
                ...itemdetail?.loopRouteTrain.route.filter(
                  (x) => x.status === "Finish"
                ),
                ...changeKANumber,
              ];
              return {
                _id: itemdetail._id,
                route: routeChange,
                loop:
                  changeLoop.length > 0
                    ? changeLoop[0].changeLoop.replace(/Loop\s*/i, "")
                    : "-",
                beforeLoop: itemdetail.loopRouteTrain.loop,
              };
            });
          console.log("dataScheduleChange", dataScheduleChange);
          updateChangeLoop(dataScheduleChange, dateDailyWork);
          handleClose();
          // let dataRoute = [];
          // if (actionTrainNumber === "Tambah") {
          //   dataRoute = chooseDailySchedule.loopRouteTrain.route;
          //   if (Number(chooseTrainNumber) % 2 > 0) {
          //     let station = _.orderBy(
          //       chooseDailySchedule.loopRouteTrain?.station.filter(
          //         (x) => x.flag === "Ganjil"
          //       )[0].stationList,
          //       ["loopIndex"],
          //       ["asc"]
          //     ).map((item) => {
          //       let datadistance = timetables.filter(
          //         (x) =>
          //           x.flag === "Ganjil" && x.stationCode === item.stationCode
          //       )[0];
          //       let datatimetable = datadistance?.route.filter(
          //         (x) => x.route === chooseTrainNumber
          //       )[0];
          //       return {
          //         ...item,
          //         start: "",
          //         end: "",
          //         status: "",
          //         duration: 0,
          //         dweelingTime: 0,
          //         startPlan: datatimetable?.start,
          //         endPlan: datatimetable?.end,
          //         distance: datadistance?.distance,
          //         vOps: datadistance?.vOps,
          //         vMax: datadistance?.vMax,
          //       };
          //     });
          //     dataRoute = [
          //       ...dataRoute,
          //       {
          //         trainNumber: chooseTrainNumber,
          //         startTime: "",
          //         endTime: "",
          //         duration: 0,
          //         dweelingTime: 0,
          //         status: "",
          //         note: "",
          //         station,
          //       },
          //     ];
          //   } else {
          //     let station = _.orderBy(
          //       chooseDailySchedule.loopRouteTrain?.station.filter(
          //         (x) => x.flag === "Genap"
          //       )[0].stationList,
          //       ["loopIndex"],
          //       ["asc"]
          //     ).map((item) => {
          //       let datadistance = timetables.filter(
          //         (x) =>
          //           x.flag === "Genap" && x.stationCode === item.stationCode
          //       )[0];
          //       let datatimetable = datadistance?.route.filter(
          //         (x) => x.route === chooseTrainNumber
          //       )[0];
          //       return {
          //         ...item,
          //         start: "",
          //         end: "",
          //         status: "",
          //         duration: 0,
          //         dweelingTime: 0,
          //         startPlan: datatimetable?.start,
          //         endPlan: datatimetable?.end,
          //         distance: datadistance?.distance,
          //         vOps: datadistance?.vOps,
          //         vMax: datadistance?.vMax,
          //       };
          //     });
          //     dataRoute = [
          //       ...dataRoute,
          //       {
          //         trainNumber: chooseTrainNumber,
          //         startTime: "",
          //         endTime: "",
          //         duration: 0,
          //         dweelingTime: 0,
          //         status: "",
          //         note: "",
          //         station,
          //       },
          //     ];
          //   }

          //   console.log("dataRoute", dataRoute);
          // } else {
          //   dataRoute = chooseDailySchedule.loopRouteTrain.route.filter(
          //     (x) => x.trainNumber !== chooseTrainNumber
          //   );
          //   console.log("dataRoute", dataRoute);
          // }
          // let loopRouteFormat = {
          //   ...chooseDailySchedule?.loopRouteTrain,
          //   route: dataRoute,
          // };
        }}
        valueConfirm={"Simpan"}
      />

      {/* <div className="print-source">
        <ContentPrint ref={element} />
      </div> */}

      <Dialog
        open={openDialogSetLRV}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent sx={{ width: 400 }}>
          <Typography>
            Apakah anda ingin mengupdate pengaturan Loop dari OCC
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Loop</TableCell>
                <TableCell>LRV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataStamformasi.length > 0 &&
                dataStamformasi[0]?.lrvList.map((itemLoop, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{itemLoop.loop}</TableCell>
                      <TableCell>{itemLoop.numberLrv}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: "#ababab",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Tutup
          </Button>
          <Button
            sx={{
              width: 150,
              color: "#fff",
              textTransform: "none",
            }}
            variant="contained"
            onClick={() => {
              if (dataStamformasi.length > 0) {
                const _dailyWork = dataScheduleTrainDriver.map((x) => ({
                  _id: x._id,
                  code: x.loopRouteTrain.code,
                  loopRouteTrain: [
                    ...new Set(x.loopRouteTrain.route.map((r) => r.loop)),
                  ],
                  loop: x.loopRouteTrain.loop,
                }));
                console.log(_dailyWork);

                const transformed = _dailyWork.flatMap((x) =>
                  x.loopRouteTrain.map((loop) => ({
                    _id: x._id,
                    code: x.code,
                    loop: loop,
                  }))
                );
                console.log(transformed);
                const datapost = transformed
                  .filter(
                    (x) =>
                      x.loop === "1" ||
                      x.loop === "2" ||
                      x.loop === "3" ||
                      x.loop === "4" ||
                      x.loop === "5" ||
                      x.loop === "6"
                  )
                  .map((item) => {
                    if (item.loop === "1") {
                      const _datafilter = dataStamformasi[0]?.lrvList.filter(
                        (x) => x.loop === "Loop 1"
                      );
                      return {
                        ...item,
                        lrv:
                          _datafilter.length > 0
                            ? _datafilter[0].numberLrv
                            : "",
                      };
                    }
                    if (item.loop === "2") {
                      const _datafilter = dataStamformasi[0]?.lrvList.filter(
                        (x) => x.loop === "Loop 2"
                      );
                      return {
                        ...item,
                        lrv:
                          _datafilter.length > 0
                            ? _datafilter[0].numberLrv
                            : "",
                      };
                    }
                    if (item.loop === "3") {
                      const _datafilter = dataStamformasi[0]?.lrvList.filter(
                        (x) => x.loop === "Loop 3"
                      );
                      return {
                        ...item,
                        lrv:
                          _datafilter.length > 0
                            ? _datafilter[0].numberLrv
                            : "",
                      };
                    }
                    if (item.loop === "4") {
                      const _datafilter = dataStamformasi[0]?.lrvList.filter(
                        (x) => x.loop === "Loop 4"
                      );
                      return {
                        ...item,
                        lrv:
                          _datafilter.length > 0
                            ? _datafilter[0].numberLrv
                            : "",
                      };
                    }
                  });
                console.log("datapost", datapost);
                updateSetLRV(
                  datapost.map((x) => ({
                    _id: x._id,
                    loop: x.loop,
                    lrv: x.lrv,
                  })),
                  filterStartDate
                );
                handleClose();
              }
            }}
          >
            Proses
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", pt: 12 }}>
        <Container maxWidth="xl">
          <Grid container justifyContent={"space-between"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4">Jadwal Kedinasan Harian</Typography>
            </div>
            <div>
              <Grid
                container
                alignItems="end"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  marginBottom: 3,
                }}
              >
                <div>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Dinas:
                  </Typography>
                  <TextField
                    type={"Date"}
                    placeholder="Pencarian"
                    value={filterStartDate}
                    onChange={(e) => {
                      let datework = e.target.value;
                      setfilterStartDate(datework);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={{ padding: 0 }}>
                            <SearchIcon
                              sx={{
                                fontSize: 15,
                                color: "gray",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 12,
                        height: 35.5,
                        backgroundColor: "#fff",
                        boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                    className={classes.searchTxt}
                  />
                </div>
                {/* <div style={{ marginLeft: 10 }}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Selesai:
                  </Typography>
                  <TextField
                    type={"Date"}
                    placeholder="Pencarian"
                    value={filterEndDate}
                    onChange={(e) => {
                      let datework = e.target.value;
                      setfilterEndDate(datework);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={{ padding: 0 }}>
                            <SearchIcon
                              sx={{
                                fontSize: 15,
                                color: "gray",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 12,
                        height: 35.5,
                        backgroundColor: "#fff",
                        boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                    className={classes.searchTxt}
                  />
                </div> */}
                <div style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      // console.log("cari", dinasan);
                      // if (dinasan === "Dinas OFF") {
                      //   getWorkingOffByRangeDate(
                      //     filterStartDate,
                      //     filterEndDate
                      //   );
                      // } else {
                      getData();
                      if (dinasan === "Langsir") {
                        searchDataLangsir();
                      }
                      // ?\}
                    }}
                  >
                    Cari
                  </Button>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      setLoader(true);
                      await handlePrint();
                    }}
                  >
                    Download
                  </Button>
                </div>
                {/* <div style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen({}, "add")}>
                    Tambah Daftar Izin
                  </Button>
                </div> */}
              </Grid>
            </div>
          </Grid>
          <ButtonGroup
            variant="contained"
            aria-label="large button group"
            sx={{ width: "100%", mb: 2 }}
          >
            <Button
              sx={{
                color: dinasan === "Masinis" ? "#fff" : "gray",
                bgcolor: dinasan === "Masinis" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                setDinasan("Masinis");
                getTrainDriver();
              }}
            >
              Mainline
            </Button>
            <Button
              sx={{
                color: dinasan === "Langsir" ? "#fff" : "gray",
                bgcolor: dinasan === "Langsir" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                setDinasan("Langsir");
                searchDataLangsir();
              }}
            >
              Langsir
            </Button>
          </ButtonGroup>
          {dinasan === "Masinis" && (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, marginRight: 10 }}
                onClick={() => {
                  setOpenDialogSetLRV(true);
                }}
              >
                Set LRV
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, marginRight: 10 }}
                onClick={() => {
                  setActionTrainNumber("Tambah");
                  setChooseTrainNumber("");
                  setOpenTrainNumber(true);
                }}
              >
                Perubahan Loop
              </Button>

              <Table
                sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={20}
                    >
                      No.
                    </TableCell>
                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={20}
                    >
                      Shift Code
                    </TableCell>

                    <TableCell
                      style={tableTextCellStyle}
                      colSpan={2}
                      align="center"
                    >
                      Train Route
                    </TableCell>

                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={150}
                    >
                      Start of Work
                    </TableCell>
                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={150}
                    >
                      Boarding the cabin
                    </TableCell>
                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={150}
                    >
                      Rest
                    </TableCell>
                    <TableCell
                      style={tableTextCellStyle}
                      align="center"
                      width={150}
                    >
                      End of Work
                    </TableCell>
                    <TableCell style={tableTextCellNameStyle} align="left">
                      Masinist
                    </TableCell>
                    {/* <TableCell style={tableRightStyle} align="center">
                      <p className={classes.tableLeftTxt} align="center">
                        No.LRV
                      </p>
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {_.orderBy(
                      dataLoopTrain.filter((x) =>
                        dinasan === "Masinis"
                          ? x.note === "Bertugas" && x.loop !== "Langsiran"
                          : x.note === dinasan
                      ),
                      [(item) => {
                        // Parsing jam dan menit dari string waktu "HH:mm"
                        const [hours, minutes] = item.start.split(":").map(Number);
                        return new Date(0, 0, 0, hours, minutes); // Waktu dalam bentuk Date
                      }, "loop"],
                      ["asc", "asc"]
                    ).map((item, index) => {
                      let dataTrainDriver = [];
                      let chooseTrainDriver = "0";
                      let trainDriverName = "";
                      let dailyschedule = dataScheduleTrainDriver.filter(
                        (x) => x.loopRouteTrain?._id === item._id
                      );
                      let itemroute = [];
                      let detailroute = [];
                      let trainJourneyLog = {};
                      let indexREST = 0
                      if (dailyschedule.length > 0) {
                        dataTrainDriver = dataScheduleTrainDriver.filter(
                          (x) => x.loopRouteTrain?._id === item._id
                        );
                        chooseTrainDriver = dailyschedule[0]?.trainDriver?._id;
                        trainDriverName = dailyschedule[0]?.trainDriver?.name;
                        itemroute = dailyschedule[0]?.loopRouteTrain?.route;
                        detailroute = dailyschedule[0]?.details;
                        trainJourneyLog = dailyschedule[0].trainJourneyLog;

                        indexREST = itemroute.findIndex(item => item.trainNumber === "REST");
                      }
                      return (
                        <>
                          {/* <TableRow>
                            {JSON.stringify(dailyschedule.length)}
                          </TableRow> */}
                          <TableRow
                            key={index++}
                            style={{
                              borderCollapse: "seperate",
                              backgroundColor: "#F3F3F3",
                              border: "5px solid #F6F7FF",
                            }}>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {item.code}
                            </TableCell>
                            <TableCell colSpan={2}>
                              {
                                detailroute.length>0 &&
                                <Table size="small">
                                  <TableRow>
                                    <TableCell align="center" width={40}>Loop</TableCell>
                                    <TableCell align="center" width={250}>LRV</TableCell>
                                    <TableCell align="left">
                                      <div style={{display:"flex", "justifyContent": "space-between"}}>
                                        <div>Train Number</div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  {
                                    detailroute.length>0 && _.orderBy(detailroute,["loop.loop", "asc"])?.map(itemdetail=>{
                                      return(
                                        <TableRow>
                                          <TableCell align="center">
                                            {itemdetail?.loop?.loop}

                                          </TableCell>
                                          <TableCell align="center">
                                            {itemdetail?.loop?.lrv?.map(item=>item+"|")}
                                          </TableCell>
                                          
                                          <TableCell align="left">
                                              {itemdetail && itemdetail?.trainNumber?.map((itemTrain) => {
                                                return (
                                                  <Tooltip
                                                    >
                                                    <span
                                                      style={{
                                                        padding: 1,
                                                        margin: 1,
                                                        color:itemTrain?.status === "Finish" ||  itemTrain?.status === "Start" ? "white" :  "black",
                                                        backgroundColor: itemTrain?.status === "Finish"? "red" : itemTrain?.status === "Start" ? "green": "#CFCFCF",
                                                      }}>
                                                      {itemTrain?.trainNumber}
                                                    </span>
                                                  </Tooltip>
                                                );
                                              })}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })

                                  }
                                  
                                </Table>
                              }
                              
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {item.start}
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {
                                itemroute && itemroute[0]?.station[0]?.startPlan.slice(0,5)
                              }
                              {/* {
                                trainJourneyLog?.firstBoarding ? moment(trainJourneyLog?.firstBoarding).format("HH:mm") : "-"
                              } */}
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {
                                itemroute && itemroute[indexREST-1]?.station[itemroute[indexREST-1]?.station.length - 2]?.endPlan.slice(0,5)
                              }
                              {/* {
                                trainJourneyLog?.restTime ? moment(trainJourneyLog?.restTime).format("HH:mm") : "-"
                              } */}
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              {item.end}
                            </TableCell>
                            <TableCell style={tableTextIsiNameStyle} align="left">
                              {
                                dailyschedule.map(itemTrainDriver =>{
                                  return(
                                    <>
                                      {itemTrainDriver.assistanTrainDriver ?
                                      <>
                                      <Typography>(Masinist : {itemTrainDriver.trainDriver?.name})</Typography>
                                      <Typography>(Asist : {itemTrainDriver.assistanTrainDriver?.name})</Typography>
                                      </>:
                                      <Typography><Typography>{itemTrainDriver.trainDriver?.name}</Typography></Typography>
                                      }
                                    </>
                                  )
                                })
                              }
                              
                            </TableCell>
                          </TableRow>
                        </>
                        
                      );
                    })}
                  </>
                </TableBody>
              </Table>
            </>
          )}
          {dinasan === "Langsir" && (
            <>
              <Typography variant="h5">Dinas Langsir</Typography>
              <Table
                sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell style={tableLeftStyle}>
                      <p className={classes.tableLeftTxt} align="center">
                        No.
                      </p>
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Kode
                    </TableCell>

                    <TableCell style={tableTextCellStyle} align="center">
                      Loop
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Mulai Dinas
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Habis Dinas
                    </TableCell>
                    <TableCell style={tableTextCellNameStyle} align="center">
                      Masinis
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {_.orderBy(
                      dataLoopTrain.filter((x) =>
                        dinasan === "Langsir"
                          ? x.note === "Bertugas" && x.loop === "Langsiran"
                          : x.note === dinasan
                      ),
                      ["start", "loop"],
                      ["asc", "asc"]
                    )?.map((item, index) => {
                      let trainDriverName = "";
                      let dailyschedule = dataScheduleTrainDriver.filter(
                        (x) => x.loopRouteTrain?._id === item._id
                      );
                      if (dailyschedule.length > 0) {
                        trainDriverName = dailyschedule[0]?.trainDriver?.name;
                      }
                      return (
                        <TableRow
                          key={index++}
                          style={{
                            borderCollapse: "seperate",
                            backgroundColor: "#F3F3F3",
                            border: "5px solid #F6F7FF",
                          }}
                        >
                          <TableCell style={tableTextIsiStyle} align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.code}
                          </TableCell>

                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.loop}
                          </TableCell>

                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.start}
                          </TableCell>
                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.end}
                          </TableCell>
                          <TableCell style={tableTextIsiNameStyle} align="left">
                            <Typography>{trainDriverName}</Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                </TableBody>
              </Table>
              <Typography variant="h5">Skema Langsir</Typography>
              <Table
                sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell style={tableLeftStyle}>
                      <p className={classes.tableLeftTxt} align="center">
                        No.
                      </p>
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Rangkaian LRV
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Jam Operasi
                    </TableCell>

                    <TableCell style={tableTextCellStyle} align="center">
                      Posisi Awal
                    </TableCell>

                    <TableCell style={tableTextCellStyle} align="center">
                      Posisi Akhir
                    </TableCell>
                    <TableCell style={tableTextCellNameStyle} align="center">
                      Masinis
                    </TableCell>
                    <TableCell style={tableTextCellNameStyle} align="center">
                      Dinas
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataLangsir &&
                    dataLangsir.length > 0 &&
                    dataLangsir.map((itemLangsir, indexLangsir) =>
                      itemLangsir.schemeLangsir?.map(
                        (itemScheme, indexScheme) => {
                          return (
                            <TableRow
                              style={{
                                borderCollapse: "seperate",
                                backgroundColor: "#F3F3F3",
                                border: "5px solid #F6F7FF",
                              }}
                            >
                              <TableCell style={tableLeftStyle}>
                                <p
                                  className={classes.tableLeftTxt}
                                  align="center"
                                >
                                  {indexScheme + 1}
                                </p>
                              </TableCell>
                              <TableCell
                                style={tableTextCellStyle}
                                align="center"
                              >
                                {itemScheme?.lrvlist?.map(
                                  (x) => x.numberLrv + "."
                                )}
                              </TableCell>
                              <TableCell
                                style={tableTextCellStyle}
                                align="center"
                              >
                                {itemScheme?.langsirTime}
                              </TableCell>

                              <TableCell
                                style={tableTextCellStyle}
                                align="center"
                              >
                                {itemScheme.startPosition?.stationName}
                              </TableCell>

                              <TableCell
                                style={tableTextCellStyle}
                                align="center"
                              >
                                {itemScheme.endPosition?.stationName}
                              </TableCell>
                              <TableCell
                                style={tableTextCellNameStyle}
                                align="center"
                              >
                                {/* {JSON.stringify(trainDriver)} */}
                                <Select
                                  styles={selectBoxStyles}
                                  menuPortalTarget={document.body}
                                  placeholder={"Pilih Masinis atau Penyelia"}
                                  options={[
                                    { value: "0", label: "Pilih Nama" },
                                    ...dataScheduleTrainDriver.map(x=>x.trainDriver).map((x) => {
                                      return { label: x.name, value: x._id };
                                    }),
                                  ]}
                                  isSearchable={true}
                                  isClearable={true}
                                  value={
                                    itemScheme?.profile
                                      ? {
                                          label: itemScheme.profile.name,
                                          value: itemScheme.profile.value,
                                        }
                                      : {
                                          label: "Pilih Masinis atau Penyelia",
                                          value: "0",
                                        }
                                  }
                                  onChange={
                                    (selected) => {
                                      const change = dataLangsir.map((x) => {
                                        return {
                                          ...x,
                                          schemeLangsir: x.schemeLangsir.map(
                                            (y) => {
                                              if (y._id === itemScheme._id) {
                                                if (selected) {
                                                  return {
                                                    ...y,
                                                    profile: {
                                                      _id: selected.value,
                                                      name: selected.label,
                                                    },
                                                  };
                                                } else {
                                                  return {
                                                    ...y,
                                                    profile: null,
                                                  };
                                                }
                                              } else {
                                                return y;
                                              }
                                            }
                                          ),
                                        };
                                      });
                                      console.log("change", change, selected);

                                      setSelectTrainDriver(
                                        selected
                                          ? selected
                                          : { label: "Pilih", value: "0" }
                                      );
                                      setDataLangsir(change);
                                    }
                                    // setSelectTrainDriver(
                                    //   selected ? selected : { label: "Pilih", value: "0" }
                                    // )
                                  }
                                />
                              </TableCell>
                              <TableCell
                                style={tableTextCellNameStyle}
                                align="center"
                              >
                                <Select
                                  styles={selectBoxStyles}
                                  menuPortalTarget={document.body}
                                  placeholder={"Pilih Masinis atau Penyelia"}
                                  options={[
                                    { value: "0", label: "Pilih Nama" },
                                    ...dataScheduleTrainDriver.filter(x=>x.trainDriver._id === selectTrainDriver.value).map((x) => {
                                      return { label: x.loopRouteTrain.code, value: x._id };
                                    }),
                                  ]}
                                  isSearchable={true}
                                  isClearable={true}
                                  value={
                                    itemScheme?.schedule
                                      ? {
                                          label: itemScheme.schedule.code,
                                          value: itemScheme.schedule.value,
                                        }
                                      : {
                                          label: "Pilih Dinas Harian",
                                          value: "0",
                                        }
                                  }
                                  onChange={
                                    (selected) => {
                                      const change = dataLangsir.map((x) => {
                                        return {
                                          ...x,
                                          schemeLangsir: x.schemeLangsir.map(
                                            (y) => {
                                              if (y._id === itemScheme._id) {
                                                if (selected) {
                                                  return {
                                                    ...y,
                                                    schedule: {
                                                      _id: selected.value,
                                                      code: selected.label,
                                                    },
                                                  };
                                                } else {
                                                  return {
                                                    ...y,
                                                    schedule: null,
                                                  };
                                                }
                                              } else {
                                                return y;
                                              }
                                            }
                                          ),
                                        };
                                      });
                                      console.log("change", change, selected);

                                      setSelectedSchedule(
                                        selected
                                          ? selected
                                          : { label: "Pilih", value: "0" }
                                      );
                                      setDataLangsir(change);
                                    }
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )
                    )}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  try {
                    // Melakukan update untuk setiap item di dalam dataLangsir
                    for (const item of dataLangsir) {
                      const datapost = {
                        schemeLangsir: item.schemeLangsir,
                      };

                      if(item.schemeLangsir.some(x=>x.schedule)){

                      }

                      await updateDataLangsir(item._id, datapost, {
                        operationDate:
                          moment(filterStartDate).format("YYYY-MM-DD"),
                      });
                    }

                    alert("Berhasil di-submit semua data langsir");
                  } catch (error) {
                    console.error("Gagal submit data langsir:", error);
                    alert("Gagal submit data langsir");
                  }
                }}
              >
                Submit Data Langsir
              </Button>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
