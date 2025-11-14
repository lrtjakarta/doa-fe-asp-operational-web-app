import {
  React,
  useState,
  useRef,
  useEffect,
  useContext,
  forwardRef,
} from "react";
import {
  Container,
  Typography,
  Box,
  DialogContent,
  Dialog,
  DialogActions,
  Grid,
  Table,
  TableHead,
  InputAdornment,
  TableRow,
  TableContainer,
  TableBody,
  IconButton,
  TextField,
  Button,
  ButtonGroup,
  Tooltip,
  MenuItem,
  Collapse,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import usePagination from "@mui/material/usePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import riwayatData from "./Data";
import { styled } from "@mui/material/styles";
import useStyles, {
  selectBoxStyles,
  noteStyles,
  StickyTableCell,
  tableLeftStyle1,
  tableTextCellStyle1,
  tableTextIsiStyle1,
} from "./Styles";
import moment from "moment";
import StaticVar from "../../Config/StaticVar";
import _ from "lodash";

// dialog
import DialogFull from "../../Component/Dialog/DialogFull";
import DialogCustom from "../../Component/Dialog/Dialog";

// icon
import SearchIcon from "@mui/icons-material/Search";

// style
import {
  tableLeftIsiStyle,
  tableLeftStyle,
  tableRightStyle,
  tableTextCellStyle,
  tableTextCellNameStyle,
  tableTextIsiStyle,
  tableTextIsiNameStyle,
} from "./Styles";

import useDailyWork from "../../Hooks/DailyWork/useDailyWork";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import { ProfileContext, StationMasterContext } from "Context";
import Select from "react-select";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import UseAbsence from "../../Hooks/Absence/useAbsence";
import Checkbox from "@mui/material/Checkbox";
import html2pdf from "html2pdf.js";
import useLetter from "Hooks/Letter/useLetter";
import { Images } from "Themes";
import romanize from "Utils/Romanize";

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
  } = useDailyWork();

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
  const [openModal, setOpenModal] = useState(false);
  const [loopRouteTrainChoose, setLoopRouteTrainChoose] = useState({});
  const [dailyWorkChoose, setDailyWorkChoose] = useState({});

  const { profileUser, getProfileUser } = useContext(ProfileContext);
  const [dinasan, setDinasan] = useState("Masinis");

  const [openChooseLRV, setOpenChooseLRV] = useState(false);
  const [openTrainNumber, setOpenTrainNumber] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chooseTrainNumber, setChooseTrainNumber] = useState("");
  const [chooseDailySchedule, setChooseDailySchedule] = useState({});
  const [actionTrainNumber, setActionTrainNumber] = useState("");

  const { getTimeTable, timetables } = useContext(StationMasterContext);

  const { getDataLetter, filterLetter } = useLetter();

  const detailLetter = filterLetter.filter(
    (item) => item.type === "Dinasan Harian"
  )[0];

  const getData = async () => {
    await setLoader(true);
    await fetchDataLoop();
    await getTimeTable();
    // await getDataAbsence({
    //   startDate: filterStartDate,
    //   endDate: filterEndDate,
    // });
    // await getDataTrainDriver()
    // await getWorkingOffByRangeDate(filterStartDate, filterEndDate)
    await getTrainDriver();
    getDataLetter();
    setLoader(false);
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
  };

  const [openChangeTrainDriverModal, setOpenChangeTrainDriverModal] =
    useState(false);
  const [dailyWorkChooseOFF, setDailyWorkChooseOFF] = useState({});
  const [dailyWorkChooseMainline, setDailyWorkChooseMainline] = useState({});
  const [noteRotation, setNoteRotation] = useState("");

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

  let groupScheduleByDateOFF = _.groupBy(workingOFF, "dailyWorkDateString");

  const ContentPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <Box>
          <Table>
            <TableHead>
              <TableRow sx={{ border: "1.5px solid #000000" }}>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1.6px solid #000000",
                    width: "50%",
                  }}>
                  <Grid container justifyContent="center" alignItems="center">
                    <img
                      src={Images.logoIcon}
                      alt="img"
                      style={{
                        height: 30,
                        marginRight: 5,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <Typography sx={{ fontStyle: "italic", fontSize: 18 }}>
                      LRT
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 200,
                        fontStyle: "italic",
                      }}>
                      JAKARTA
                    </Typography>
                  </Grid>
                </TableCell>
                <TableCell align="center" sx={{ width: "50%" }}>
                  <Typography>{detailLetter?.titleHead}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ p: 0, border: "1.5px solid #000000" }}>
                <TableCell colSpan={2} sx={{ p: 0 }}>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "20%",
                        py: 0,
                      }}>
                      <Typography>Nomor Dokumen</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "25%",
                        py: 0,
                      }}>
                      <Typography>{detailLetter?.numberHead}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "15%",
                        py: 0,
                      }}>
                      <Typography>Nomor Revisi</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "15%",
                        py: 0,
                      }}>
                      <Typography>{detailLetter?.revisionNumber}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "10%",
                        py: 0,
                      }}>
                      <Typography>Halaman</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "15%",
                        py: 0,
                      }}>
                      <Typography>{detailLetter?.page}</Typography>
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            py: 3,
            textAlign: "center",
          }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
            {detailLetter?.titleDoc}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 200 }}>
            {"No. " +
              moment().format("DD") +
              " / " +
              detailLetter?.numberDoc +
              " / " +
              romanize(moment().format("M")) +
              " / " +
              moment().format("YYYY")}
          </Typography>
        </Box>
        <Table
          sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
          aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#C4C4C4" }}>
              <TableCell style={tableLeftStyle1}>
                <p className={classes.tableLeftTxt} align="center">
                  No.
                </p>
              </TableCell>
              <TableCell style={tableTextCellStyle1} align="center">
                Kode
              </TableCell>

              <TableCell style={tableTextCellStyle1} align="center">
                Masinis
              </TableCell>
              <TableCell style={tableTextCellStyle1} align="center">
                No.KA
              </TableCell>
              <TableCell style={tableTextCellStyle1} align="center">
                Mulai Dinas
              </TableCell>
              <TableCell style={tableTextCellStyle1} align="center">
                Habis Dinas
              </TableCell>
              <TableCell style={tableTextCellNameStyle} align="center">
                Masinis
              </TableCell>
              <TableCell style={tableRightStyle} align="center">
                <p className={classes.tableLeftTxt} align="center">
                  No.LRV
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupScheduleByDate)?.map(([key, value]) => (
              <>
                <TableRow
                  style={{
                    borderCollapse: "seperate",
                    backgroundColor: "#F1909C",
                    border: "5px solid #F6F7FF",
                  }}>
                  <TableCell
                    colSpan={8}
                    style={{ ...tableTextIsiStyle1, paddingLeft: 10 }}
                    align="left">
                    {moment(key).format("DD MMMM YYYY")}
                  </TableCell>
                </TableRow>

                {_.orderBy(
                  dataLoopTrain.filter(
                    (item) =>
                      item.note === "Bertugas" ||
                      item.note === "Penyelia" ||
                      item.note === "Cadangan"
                  ),
                  ["note", "code", "loop"],
                  ["asc", "asc", "asc"]
                ).map((item, index) => {
                  let dataTrainDriver = [];
                  let chooseTrainDriver = "0";
                  let dailyschedule = value.filter(
                    (x) => x.loopRouteTrain?._id === item._id
                  );
                  let itemroute = [];
                  if (dailyschedule.length > 0) {
                    dataTrainDriver = value.filter(
                      (x) => x.loopRouteTrain?._id === item._id
                    );
                    chooseTrainDriver = dailyschedule[0]?.trainDriver?._id;
                    itemroute = dailyschedule[0]?.loopRouteTrain?.route;
                  }

                  return (
                    <TableRow
                      key={index++}
                      style={{
                        borderCollapse: "seperate",
                        backgroundColor: "#F3F3F3",
                        border: "5px solid #F6F7FF",
                      }}>
                      <TableCell style={tableTextIsiStyle1} align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell style={tableTextIsiStyle1} align="center">
                        {item.code}
                      </TableCell>

                      <TableCell style={tableTextIsiStyle1} align="center">
                        {item.loop}
                      </TableCell>
                      <TableCell style={tableTextIsiStyle1} align="left">
                        {itemroute.map((itemTrain) => {
                          return (
                            <Tooltip
                              title={`Klik untuk menghapus Nomor KA ${itemTrain?.trainNumber}`}
                              onClick={() => {
                                setActionTrainNumber("Hapus");
                                setChooseTrainNumber(itemTrain?.trainNumber);
                                setChooseDailySchedule(dailyschedule[0]);
                                setDateDailyWork(
                                  dailyschedule[0]?.dailyWorkDateString
                                );
                                setOpenTrainNumber(true);
                              }}>
                              <span
                                style={{
                                  padding: 1,
                                  margin: 1,
                                  backgroundColor: "#CFCFCF",
                                }}>
                                {itemTrain?.trainNumber}
                              </span>
                            </Tooltip>
                          );
                        })}
                        {itemroute.length > 0 ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            style={{ margin: 1, padding: 1, width: 50 }}
                            onClick={() => {
                              setActionTrainNumber("Tambah");
                              setChooseTrainNumber("");
                              setChooseDailySchedule(dailyschedule[0]);
                              setDateDailyWork(
                                dailyschedule[0]?.dailyWorkDateString
                              );
                              setOpenTrainNumber(true);
                            }}>
                            +
                          </Button>
                        ) : null}

                        {/* {item.route[0]} */}
                      </TableCell>

                      <TableCell style={tableTextIsiStyle1} align="center">
                        {item.start}
                      </TableCell>
                      <TableCell style={tableTextIsiStyle1} align="center">
                        {item.end}
                      </TableCell>
                      <TableCell style={tableTextIsiNameStyle} align="left">
                        <Select
                          styles={selectBoxStyles}
                          menuPortalTarget={document.body}
                          //defaultValue={trainDriverHook.filter(x=>x._id === chooseTrainDriver).map(x=>{return({value:x._id, label:x.name})})[0]}
                          name="color"
                          options={[
                            { value: "0", label: "Pilih Nama" },
                            ...trainDriverHook.map((x) => {
                              return { value: x._id, label: x.name };
                            }),
                          ]}
                          value={
                            chooseTrainDriver !== "0"
                              ? trainDriverHook
                                  .filter((x) => x._id === chooseTrainDriver)
                                  .map((x) => {
                                    return { value: x._id, label: x.name };
                                  })[0]
                              : { value: "0", label: "Pilih Nama" }
                          }
                          //defaultValue={}
                          onChange={async (selectedOption) => {
                            if (selectedOption.value !== "0") {
                              await cancelDailyWork(
                                dataTrainDriver[0]?._id,
                                key
                              );
                              let loopRouteFormat = {};
                              if (dinasan === "Masinis") {
                                loopRouteFormat = {
                                  ...item,
                                  route: item.route.map((itemRoute) => {
                                    let station = [];
                                    if (Number(itemRoute) % 2 > 0) {
                                      station = _.orderBy(
                                        item?.station.filter(
                                          (x) => x.flag === "Ganjil"
                                        )[0].stationList,
                                        ["loopIndex"],
                                        ["asc"]
                                      ).map((item) => {
                                        let datadistance = timetables.filter(
                                          (x) =>
                                            x.flag === "Ganjil" &&
                                            x.stationCode === item.stationCode
                                        )[0];
                                        let datatimetable =
                                          datadistance?.route.filter(
                                            (x) => x.route === itemRoute
                                          )[0];
                                        return {
                                          ...item,
                                          start: "",
                                          end: "",
                                          status: "",
                                          duration: 0,
                                          dweelingTime: 0,
                                          startPlan: datatimetable?.start,
                                          endPlan: datatimetable?.end,
                                          distance: datadistance?.distance,
                                          vOps: datadistance?.vOps,
                                          vMax: datadistance?.vMax,
                                        };
                                      });
                                    } else {
                                      station = _.orderBy(
                                        item?.station.filter(
                                          (x) => x.flag === "Genap"
                                        )[0].stationList,
                                        ["loopIndex"],
                                        ["asc"]
                                      ).map((item) => {
                                        let datadistance = timetables.filter(
                                          (x) =>
                                            x.flag === "Genap" &&
                                            x.stationCode === item.stationCode
                                        )[0];
                                        let datatimetable =
                                          datadistance?.route.filter(
                                            (x) => x.route === itemRoute
                                          )[0];
                                        return {
                                          ...item,
                                          start: "",
                                          end: "",
                                          status: "",
                                          duration: 0,
                                          dweelingTime: 0,
                                          startPlan: datatimetable?.start,
                                          endPlan: datatimetable?.end,
                                          distance: datadistance?.distance,
                                          vOps: datadistance?.vOps,
                                          vMax: datadistance?.vMax,
                                        };
                                      });
                                    }
                                    return {
                                      trainNumber: itemRoute,
                                      startTime: "",
                                      endTime: "",
                                      duration: 0,
                                      dweelingTime: 0,
                                      status: "",
                                      note: "",
                                      station,
                                    };
                                  }),
                                };
                              } else {
                                loopRouteFormat = {
                                  ...item,
                                  route: item.route,
                                };
                              }
                              let datapost = {
                                dailyWorkDate: moment(key).format(
                                  "YYYY-MM-DD 07:00:00"
                                ),
                                trainDriver: trainDriverHook.filter(
                                  (x) => x._id === selectedOption.value
                                )[0],
                                supervisor: profileUser,
                                loopRouteTrain: loopRouteFormat,
                                createDate: new Date(),
                              };
                              console.log("datapost", datapost);
                              submitDataDailyWork(datapost, key);
                            } else {
                              console.log(
                                "disini",
                                dataTrainDriver[0]?._id,
                                key
                              );
                              await cancelDailyWork(
                                dataTrainDriver[0]?._id,
                                key
                              );
                            }
                          }}
                        />
                      </TableCell>
                      {dinasan === "Masinis" ? (
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {JSON.stringify(dataTrainDriver[0]?.LRVList)}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
              </>
            ))}
          </TableBody>
        </Table>

        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
            Daftar Izin
          </Typography>
          <Table
            sx={{ borderRadius: 3, mb: 3, mt: 2, width: "100%" }}
            aria-label="simple table">
            <TableHead>
              <StyledTableRow style={{ backgroundColor: "#fff", height: 40 }}>
                <StyledTableCell
                  style={{ width: 10, textAlign: "center", padding: 5 }}>
                  No
                </StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  Nama Masinis
                </StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  Ketidakhadiran
                </StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  Tanggal Mulai
                </StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  Tanggal Selesai
                </StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>Log</StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  Catatan
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filterAbsence && filterAbsence.length > 0 ? (
                filterAbsence.map((item, index) => (
                  <StyledTableRow
                    style={{
                      backgroundColor: "#fff",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <StyledTableCell
                      style={{ width: 10, textAlign: "center", padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {index + 1}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {item?.trainDriver?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {item?.trainDriver?.role}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {item?.trainDriver?.nik}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {item?.type}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {moment(item?.startDate).format("DD-MM-YYYY")}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {moment(item?.endDate).format("DD-MM-YYYY")}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Dibuat : <br />{" "}
                      <i>{item.createBy?.name ? item.createBy?.name : "-"}</i>
                      <br />
                      <i>
                        {moment(item?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                      </i>
                      <br />
                      {item?.updated ? "Diperbarui :" : null}
                      <br />
                      <i>
                        {" "}
                        {item?.updated
                          ? moment(item?.updated).format("DD-MM-YYYY HH:mm:ss")
                          : null}
                      </i>
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {item?.note}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow
                  style={{
                    backgroundColor: "#fff",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <StyledTableCell
                    colSpan={8}
                    style={{ width: 10, textAlign: "center", padding: 5 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                      Tidak ada data
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </div>
    );
  });

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
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
            onClick={handleClose}>
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
            }}>
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
        aria-describedby="scroll-dialog-description">
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
            onClick={handleClose}>
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
            }}>
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
        //fullWidth={true}
        open={openTrainNumber}
        //maxWidth = {"xs"}
        title={
          actionTrainNumber +
          " " +
          chooseTrainNumber +
          " Nomor KA. Kode Dinas : " +
          chooseDailySchedule?.loopRouteTrain?.code
        }
        content={
          <>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
            </FormControl>
          </>
        }
        cancel={handleClose}
        valueCancel="Batal"
        submit={true}
        confirm={async () => {
          let dataRoute = [];
          if (actionTrainNumber === "Tambah") {
            dataRoute = chooseDailySchedule.loopRouteTrain.route;
            if (Number(chooseTrainNumber) % 2 > 0) {
              let station = _.orderBy(
                chooseDailySchedule.loopRouteTrain?.station.filter(
                  (x) => x.flag === "Ganjil"
                )[0].stationList,
                ["loopIndex"],
                ["asc"]
              ).map((item) => {
                let datadistance = timetables.filter(
                  (x) =>
                    x.flag === "Ganjil" && x.stationCode === item.stationCode
                )[0];
                let datatimetable = datadistance?.route.filter(
                  (x) => x.route === chooseTrainNumber
                )[0];
                return {
                  ...item,
                  start: "",
                  end: "",
                  status: "",
                  duration: 0,
                  dweelingTime: 0,
                  startPlan: datatimetable?.start,
                  endPlan: datatimetable?.end,
                  distance: datadistance?.distance,
                  vOps: datadistance?.vOps,
                  vMax: datadistance?.vMax,
                };
              });
              dataRoute = [
                ...dataRoute,
                {
                  trainNumber: chooseTrainNumber,
                  startTime: "",
                  endTime: "",
                  duration: 0,
                  dweelingTime: 0,
                  status: "",
                  note: "",
                  station,
                },
              ];
            } else {
              let station = _.orderBy(
                chooseDailySchedule.loopRouteTrain?.station.filter(
                  (x) => x.flag === "Genap"
                )[0].stationList,
                ["loopIndex"],
                ["asc"]
              ).map((item) => {
                let datadistance = timetables.filter(
                  (x) =>
                    x.flag === "Genap" && x.stationCode === item.stationCode
                )[0];
                let datatimetable = datadistance?.route.filter(
                  (x) => x.route === chooseTrainNumber
                )[0];
                return {
                  ...item,
                  start: "",
                  end: "",
                  status: "",
                  duration: 0,
                  dweelingTime: 0,
                  startPlan: datatimetable?.start,
                  endPlan: datatimetable?.end,
                  distance: datadistance?.distance,
                  vOps: datadistance?.vOps,
                  vMax: datadistance?.vMax,
                };
              });
              dataRoute = [
                ...dataRoute,
                {
                  trainNumber: chooseTrainNumber,
                  startTime: "",
                  endTime: "",
                  duration: 0,
                  dweelingTime: 0,
                  status: "",
                  note: "",
                  station,
                },
              ];
            }

            console.log("dataRoute", dataRoute);
          } else {
            dataRoute = chooseDailySchedule.loopRouteTrain.route.filter(
              (x) => x.trainNumber !== chooseTrainNumber
            );
            console.log("dataRoute", dataRoute);
          }
          let loopRouteFormat = {
            ...chooseDailySchedule?.loopRouteTrain,
            route: dataRoute,
          };
          updateDataScheduleTrainDriver(
            chooseDailySchedule._id,
            { loopRouteTrain: loopRouteFormat },
            dateDailyWork
          );
          handleClose();
        }}
        valueConfirm={actionTrainNumber}
      />

      <div className="print-source">
        <ContentPrint ref={element} />
      </div>

      <Box sx={{ display: "flex", pt: 12 }}>
        <Container maxWidth="xl">
          {JSON.stringify(dataLoopTrain)}
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
                }}>
                <div>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Mulai:
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
                <div style={{ marginLeft: 10 }}>
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
                </div>
                <div style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      console.log("cari", dinasan);
                      if (dinasan === "Dinas OFF") {
                        getWorkingOffByRangeDate(
                          filterStartDate,
                          filterEndDate
                        );
                      } else {
                        getData();
                      }
                    }}>
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
                    }}>
                    Download
                  </Button>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen({}, "add")}>
                    Tambah Daftar Izin
                  </Button>
                </div>
              </Grid>
            </div>
          </Grid>
          <ButtonGroup
            variant="contained"
            aria-label="large button group"
            sx={{ width: "100%", mb: 2 }}>
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
                // fetchDataLoop('Masinis')
                setDinasan("Masinis");
                getTrainDriver();
              }}>
              Masinis
            </Button>
            <Button
              sx={{
                color: dinasan === "Cadangan" ? "#fff" : "gray",
                bgcolor: dinasan === "Cadangan" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                // fetchDataLoop('Cadangan')
                setDinasan("Cadangan");
                getTrainDriver();
              }}>
              Cadangan
            </Button>
            <Button
              sx={{
                color: dinasan === "Penyelia" ? "#fff" : "gray",
                bgcolor: dinasan === "Penyelia" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                // fetchDataLoop('Penyelia')
                setDinasan("Penyelia");
                getTrainDriver();
              }}>
              Penyelia
            </Button>
            <Button
              sx={{
                color: dinasan === "Dinas OFF" ? "#fff" : "gray",
                bgcolor: dinasan === "Dinas OFF" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                // fetchDataLoop('OFF')
                setDinasan("Dinas OFF");
                getWorkingOffByRangeDate(filterStartDate, filterEndDate);
              }}>
              Dinas OFF
            </Button>
            <Button
              sx={{
                color: dinasan === "Daftar Izin" ? "#fff" : "gray",
                bgcolor: dinasan === "Daftar Izin" ? "#BB7E36" : "#DCDCDC",
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                // fetchDataLoop('Penyelia')
                setDinasan("Daftar Izin");
              }}>
              Daftar Izin
            </Button>
          </ButtonGroup>
          {dinasan === "Daftar Izin" ? (
            <div>
              <Table
                sx={{ borderRadius: 3, mb: 3, mt: 2, width: "100%" }}
                aria-label="simple table">
                <TableHead>
                  <StyledTableRow
                    style={{ backgroundColor: "#fff", height: 40 }}>
                    <StyledTableCell
                      style={{ width: 10, textAlign: "center", padding: 5 }}>
                      No
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Nama Masinis
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Ketidakhadiran
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Tanggal Mulai
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Tanggal Selesai
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Log
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Catatan
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 300, padding: 5 }}>
                      Aksi
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {filterAbsence && filterAbsence.length > 0 ? (
                    filterAbsence.map((item, index) => (
                      <StyledTableRow
                        style={{
                          backgroundColor: "#fff",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}>
                        <StyledTableCell
                          style={{
                            width: 10,
                            textAlign: "center",
                            padding: 5,
                          }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {index + 1}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.trainDriver?.name}
                          </Typography>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.trainDriver?.role}
                          </Typography>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.trainDriver?.nik}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.type}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {moment(item?.startDate).format("DD-MM-YYYY")}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {moment(item?.endDate).format("DD-MM-YYYY")}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          Dibuat : <br />{" "}
                          <i>
                            {item.createBy?.name ? item.createBy?.name : "-"}
                          </i>
                          <br />
                          <i>
                            {moment(item?.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </i>
                          <br />
                          {item?.updated ? "Diperbarui :" : null}
                          <br />
                          <i>
                            {" "}
                            {item?.updated
                              ? moment(item?.updated).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )
                              : null}
                          </i>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.note}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ padding: 5 }}>
                          <Button
                            size="small"
                            color="warning"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => handleOpen(item, "edit")}>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                              Ubah
                            </Typography>
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            onClick={() => handleOpen(item, "delete")}>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                              Hapus
                            </Typography>
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow
                      style={{
                        backgroundColor: "#fff",
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <StyledTableCell
                        colSpan={8}
                        style={{ width: 10, textAlign: "center", padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          Tidak ada data
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : dinasan !== "Dinas OFF" ? (
            <Table
              sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
              aria-label="simple table">
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
                    {dinasan === "Masinis" ? "Loop" : "Dinas"}
                  </TableCell>
                  {dinasan === "Masinis" ? (
                    <TableCell style={tableTextCellStyle} align="center">
                      No.KA
                    </TableCell>
                  ) : null}

                  <TableCell style={tableTextCellStyle} align="center">
                    Mulai Dinas
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Habis Dinas
                  </TableCell>
                  <TableCell style={tableTextCellNameStyle} align="center">
                    {dinasan !== "Penyelia" ? "Masinis" : dinasan}
                  </TableCell>
                  {dinasan === "Masinis" ? (
                    <TableCell style={tableRightStyle} align="center">
                      <p className={classes.tableLeftTxt} align="center">
                        No.LRV
                      </p>
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupScheduleByDate)?.map(([key, value]) => (
                  <>
                    <TableRow
                      style={{
                        borderCollapse: "seperate",
                        backgroundColor: "#F1909C",
                        border: "5px solid #F6F7FF",
                      }}>
                      <TableCell
                        colSpan={8}
                        style={{ ...tableTextIsiStyle, paddingLeft: 10 }}
                        align="left">
                        {moment(key).format("DD MMMM YYYY")}
                      </TableCell>
                    </TableRow>

                    {_.orderBy(
                      dataLoopTrain.filter((x) =>
                        dinasan === "Masinis"
                          ? x.note === "Bertugas"
                          : x.note === dinasan
                      ),
                      ["code", "loop"],
                      ["asc", "asc"]
                    ).map((item, index) => {
                      let dataTrainDriver = [];
                      let chooseTrainDriver = "0";
                      let dailyschedule = value.filter(
                        (x) => x.loopRouteTrain?._id === item._id
                      );
                      let itemroute = [];
                      if (dailyschedule.length > 0) {
                        dataTrainDriver = value.filter(
                          (x) => x.loopRouteTrain?._id === item._id
                        );
                        chooseTrainDriver = dailyschedule[0]?.trainDriver?._id;
                        itemroute = dailyschedule[0]?.loopRouteTrain?.route;
                      }

                      return (
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

                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.loop}
                          </TableCell>
                          {dinasan === "Masinis" ? (
                            <TableCell style={tableTextIsiStyle} align="left">
                              {itemroute.map((itemTrain) => {
                                return (
                                  <Tooltip
                                    title={`Klik untuk menghapus Nomor KA ${itemTrain?.trainNumber}`}
                                    onClick={() => {
                                      setActionTrainNumber("Hapus");
                                      setChooseTrainNumber(
                                        itemTrain?.trainNumber
                                      );
                                      setChooseDailySchedule(dailyschedule[0]);
                                      setDateDailyWork(
                                        dailyschedule[0]?.dailyWorkDateString
                                      );
                                      setOpenTrainNumber(true);
                                    }}>
                                    <span
                                      style={{
                                        padding: 1,
                                        margin: 1,
                                        backgroundColor: "#CFCFCF",
                                      }}>
                                      {itemTrain?.trainNumber}
                                    </span>
                                  </Tooltip>
                                );
                              })}
                              {itemroute.length > 0 ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  style={{ margin: 1, padding: 1, width: 50 }}
                                  onClick={() => {
                                    setActionTrainNumber("Tambah");
                                    setChooseTrainNumber("");
                                    setChooseDailySchedule(dailyschedule[0]);
                                    setDateDailyWork(
                                      dailyschedule[0]?.dailyWorkDateString
                                    );
                                    setOpenTrainNumber(true);
                                  }}>
                                  +
                                </Button>
                              ) : null}

                              {/* {item.route[0]} */}
                            </TableCell>
                          ) : null}

                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.start}
                          </TableCell>
                          <TableCell style={tableTextIsiStyle} align="center">
                            {item.end}
                          </TableCell>
                          <TableCell style={tableTextIsiNameStyle} align="left">
                            <Select
                              styles={selectBoxStyles}
                              menuPortalTarget={document.body}
                              //defaultValue={trainDriverHook.filter(x=>x._id === chooseTrainDriver).map(x=>{return({value:x._id, label:x.name})})[0]}
                              name="color"
                              options={[
                                { value: "0", label: "Pilih Nama" },
                                ...trainDriverHook.map((x) => {
                                  return { value: x._id, label: x.name };
                                }),
                              ]}
                              value={
                                chooseTrainDriver !== "0"
                                  ? trainDriverHook
                                      .filter(
                                        (x) => x._id === chooseTrainDriver
                                      )
                                      .map((x) => {
                                        return { value: x._id, label: x.name };
                                      })[0]
                                  : { value: "0", label: "Pilih Nama" }
                              }
                              //defaultValue={}
                              onChange={async (selectedOption) => {
                                if (selectedOption.value !== "0") {
                                  await cancelDailyWork(
                                    dataTrainDriver[0]?._id,
                                    key
                                  );
                                  let loopRouteFormat = {};
                                  if (dinasan === "Masinis") {
                                    loopRouteFormat = {
                                      ...item,
                                      route: item.route.map((itemRoute) => {
                                        let station = [];
                                        if (Number(itemRoute) % 2 > 0) {
                                          station = _.orderBy(
                                            item?.station.filter(
                                              (x) => x.flag === "Ganjil"
                                            )[0].stationList,
                                            ["loopIndex"],
                                            ["asc"]
                                          ).map((item) => {
                                            let datadistance =
                                              timetables.filter(
                                                (x) =>
                                                  x.flag === "Ganjil" &&
                                                  x.stationCode ===
                                                    item.stationCode
                                              )[0];
                                            let datatimetable =
                                              datadistance?.route.filter(
                                                (x) => x.route === itemRoute
                                              )[0];
                                            return {
                                              ...item,
                                              start: "",
                                              end: "",
                                              status: "",
                                              duration: 0,
                                              dweelingTime: 0,
                                              startPlan: datatimetable?.start,
                                              endPlan: datatimetable?.end,
                                              distance: datadistance?.distance,
                                              vOps: datadistance?.vOps,
                                              vMax: datadistance?.vMax,
                                            };
                                          });
                                        } else {
                                          station = _.orderBy(
                                            item?.station.filter(
                                              (x) => x.flag === "Genap"
                                            )[0].stationList,
                                            ["loopIndex"],
                                            ["asc"]
                                          ).map((item) => {
                                            let datadistance =
                                              timetables.filter(
                                                (x) =>
                                                  x.flag === "Genap" &&
                                                  x.stationCode ===
                                                    item.stationCode
                                              )[0];
                                            let datatimetable =
                                              datadistance?.route.filter(
                                                (x) => x.route === itemRoute
                                              )[0];
                                            return {
                                              ...item,
                                              start: "",
                                              end: "",
                                              status: "",
                                              duration: 0,
                                              dweelingTime: 0,
                                              startPlan: datatimetable?.start,
                                              endPlan: datatimetable?.end,
                                              distance: datadistance?.distance,
                                              vOps: datadistance?.vOps,
                                              vMax: datadistance?.vMax,
                                            };
                                          });
                                        }
                                        return {
                                          trainNumber: itemRoute,
                                          startTime: "",
                                          endTime: "",
                                          duration: 0,
                                          dweelingTime: 0,
                                          status: "",
                                          note: "",
                                          station,
                                        };
                                      }),
                                    };
                                  } else {
                                    loopRouteFormat = {
                                      ...item,
                                      route: item.route,
                                    };
                                  }
                                  let datapost = {
                                    dailyWorkDate: moment(key).format(
                                      "YYYY-MM-DD 07:00:00"
                                    ),
                                    trainDriver: trainDriverHook.filter(
                                      (x) => x._id === selectedOption.value
                                    )[0],
                                    supervisor: profileUser,
                                    loopRouteTrain: loopRouteFormat,
                                    createDate: new Date(),
                                  };
                                  submitDataDailyWork(datapost, key);
                                } else {
                                  console.log(
                                    "disini",
                                    dataTrainDriver[0]?._id,
                                    key
                                  );
                                  await cancelDailyWork(
                                    dataTrainDriver[0]?._id,
                                    key
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          {dinasan === "Masinis" ? (
                            <TableCell style={tableTextIsiStyle} align="center">
                              {JSON.stringify(dataTrainDriver[0]?.LRVList)}
                              <br />
                              {dataTrainDriver.length > 0 ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    openModalDialogChooseLRV(dataTrainDriver[0])
                                  }>
                                  SET
                                </Button>
                              ) : null}
                            </TableCell>
                          ) : null}
                        </TableRow>
                      );
                    })}
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table
              sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
              aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                  <TableCell style={tableTextCellStyle} align="center">
                    No
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    NIK
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Nama Masinis
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Jabatan
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupScheduleByDateOFF)?.map(([key, value]) => (
                  <>
                    <TableRow
                      style={{
                        borderCollapse: "seperate",
                        backgroundColor: "#F1909C",
                        border: "5px solid #F6F7FF",
                      }}>
                      <TableCell
                        colSpan={8}
                        style={{ ...tableTextIsiStyle, paddingLeft: 10 }}
                        align="left">
                        {moment(key).format("DD MMMM YYYY")}
                      </TableCell>
                    </TableRow>
                    {value.map((itemOFF, index) => {
                      return (
                        <TableRow
                          style={{
                            borderCollapse: "seperate",
                            //borderSpacing: '5px',
                            backgroundColor: "#F3F3F3",
                            border: "5px solid #F6F7FF",
                          }}>
                          <TableCell style={tableTextCellStyle} align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell style={tableTextCellStyle} align="center">
                            {itemOFF.trainDriver.nik}
                          </TableCell>
                          <TableCell style={tableTextCellStyle} align="center">
                            {itemOFF.trainDriver.name}
                            {itemOFF?.rotationTrainDriver ? (
                              <i style={{ color: "red" }}>
                                <br />
                                <small>
                                  menggantikan{" "}
                                  {
                                    itemOFF?.rotationTrainDriver?.after
                                      ?.trainDriver?.name
                                  }
                                  <br />
                                  dikarenakan{" "}
                                  {itemOFF?.rotationTrainDriver?.note} pada{" "}
                                  {moment(
                                    itemOFF?.rotationTrainDriver?.rotationDate
                                  ).format("HH:mm:ss")}
                                </small>
                              </i>
                            ) : (
                              ""
                            )}
                          </TableCell>
                          <TableCell style={tableTextCellStyle} align="center">
                            {itemOFF.trainDriver.jobrole}
                          </TableCell>
                          <TableCell style={tableTextCellStyle} align="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ marginRight: 5 }}
                              onClick={async () => {
                                await cancelDailyWorkOFF(itemOFF._id);
                                alert("Data Terhapus");
                                await getWorkingOffByRangeDate(
                                  filterStartDate,
                                  filterEndDate
                                );
                              }}>
                              Hapus
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                openModalChange(itemOFF);
                              }}>
                              Masuk Dinas
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </Container>
      </Box>
    </>
  );
}
