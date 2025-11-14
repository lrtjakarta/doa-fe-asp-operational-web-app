import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useLetter from "Hooks/Letter/useLetter";
import html2pdf from "html2pdf.js";
import _ from "lodash";
import moment from "moment";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import QRCode from "react-qr-code";
import Select from "react-select";
import { Images } from "Themes";
import useStyles, { selectBoxStyles, tableRightStyle } from "./Styles";
// icon
import SearchIcon from "@mui/icons-material/Search";

// style
import { AttendanceContext, UserProfilContext } from "../../Context";
import {
  tableLeftStyle,
  tableTextCellStyle,
  tableTextIsiStyle,
} from "./Styles";

export default function HandOver() {
  const classes = useStyles();
  let today = moment(new Date()).format("YYYY-MM-DD");
  const { getNewDataAttendance } = useContext(AttendanceContext);

  const { getDataLetter, filterLetter } = useLetter();
  const detailLetter = filterLetter.filter(
    (item) => item.type === "Waktu Presensi"
  )[0];

  const element = useRef();
  const { userProfile } = useContext(UserProfilContext);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [selectTrainDriver, setSelectTrainDriver] = useState({});
  const [loader, setLoader] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [trainDriverList, setTrainDriverList] = useState([]);

  // Ambil data attendance (jadwal, train driver, absensi) dari getNewDataAttendance
  const handleFilter = async () => {
    let filterStart = moment(startDate ? startDate : new Date()).format(
      "YYYY-MM-DD"
    );
    let filterEnd = moment(endDate ? endDate : new Date()).format("YYYY-MM-DD");

    const data = await getNewDataAttendance({
      startDate: filterStart,
      endDate: filterEnd,
    });

    // Simpan daftar train driver untuk select
    if (Array.isArray(data)) {
      setTrainDriverList(
        data
          .map((x) => x.trainDriver)
          .filter(
            (v, i, arr) => v && arr.findIndex((a) => a._id === v._id) === i
          )
      );
    }

    // Filter by trainDriver jika dipilih
    let filtered = data || [];
    if (selectTrainDriver?.nik) {
      filtered = filtered.filter(
        (item) => item.trainDriver?.nik === selectTrainDriver.nik
      );
    }
    setAttendanceData(filtered);
  };

  useEffect(() => {
    // Load data awal
    (async () => {
      const data = await getNewDataAttendance({
        startDate: today,
        endDate: today,
      });
      setAttendanceData(data || []);
      // Simpan daftar train driver untuk select
      if (Array.isArray(data)) {
        setTrainDriverList(
          data
            .map((x) => x.trainDriver)
            .filter(
              (v, i, arr) => v && arr.findIndex((a) => a._id === v._id) === i
            )
        );
      }
    })();
    getDataLetter();
  }, []);

  // Fungsi utilitas untuk mengubah "HH:mm:ss.SSS" ke format deskriptif
  function formatDuration(durationStr) {
    if (!durationStr) return "-";
    const [hh, mm, ssms] = durationStr.split(":");
    const ss = ssms ? ssms.split(".")[0] : "0";
    const h = parseInt(hh, 10);
    const m = parseInt(mm, 10);
    const s = parseInt(ss, 10);

    let result = [];
    if (h > 0) result.push(`${h} jam`);
    if (m > 0) result.push(`${m} menit`);
    if (s > 0 && h === 0) result.push(`${s} detik`); // tampilkan detik hanya jika < 1 jam

    return result.length > 0 ? result.join(" ") : "0 detik";
  }

  // Data untuk tabel
  let _dataScheduleTrainDriver = (attendanceData || [])
    .map((item, index) => {
      // Ambil data dari attendanceRecord
      const attendance = item.attendanceRecord || {};
      const time_in = attendance.time_in_time || "";
      const time_out = attendance.time_out_time || "";
      const startTime = attendance.startTime || "-";
      const endTime = attendance.endTime || "-";
      const duration = attendance.duration || "";
      const late = attendance.late || "-";
      const goFastTime = attendance?.checking_fast;

      // Format tanggal dan jam masuk/keluar
      // const jamTiba =
      //   time_in_date && time_in ? `${time_in_date} ${time_in}` : "";
      // const jamPulang =
      //   time_out_date && time_out ? `${time_out_date} ${time_out}` : "";

      const jamTiba = time_in !== "Tidak ada data" ? time_in : "-";
      const jamPulang = time_out !== "Tidak ada data" ? time_out : "-";

      return {
        ...item,
        no: index + 1,
        name: item.profile?.name,
        nik: item.profile?.idNumber || item.profile?.nik,
        shift: item?.workOrder?.shift,
        dailyWorkDate: moment(item.dailyWorkDate).format("YYYY-MM-DD"),
        start: jamTiba,
        end: jamPulang,
        startTime,
        endTime,
        late: late,
        goFastTime,
        lateText: formatDuration(late), // jika ada field keterlambatan
        duration: duration,
        durationText: formatDuration(duration),
      };
    })
    .filter((x) => x.name); // filter jika tidak ada nama

  var opt = {
    filename: `presensi-${moment().format("YYYYMMDDHHmmss")}.pdf`,
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

  const exportExcel = _dataScheduleTrainDriver.map((item, index) => {
    return {
      No: index + 1,
      Nama: item?.name,
      Nik: item?.nik,
      "Kode Dinas": item?.workOrder?.code,
      // Shift: item.workOrder?.shift,
      Shift: item.workOrder?.start,
      "Jam Masuk Dinas": item?.startTime ? item?.startTime : "",
      "Jam Selesai Dinas": item?.endTime ? item?.endTime : "",
      "Jam Tiba": item?.start ? item?.start : "",
      "Jam Pulang": item?.end ? item?.end : "",
      Keterlambatan: item?.late ? item?.late : "",
      Durasi: item?.duration ? item?.duration : "",
    };
  });

  const TableContent = () => (
    <TableContainer
      sx={{ maxHeight: "100vh" }}
      classes={{ root: classes.customTableContainer }}
    >
      <Table
        stickyHeader
        sx={{
          minWidth: 650,
          borderRadius: 3,
          mb: 3,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "#C4C4C4" }}>
            <TableCell style={tableLeftStyle}>
              <p className={classes.tableLeftTxt} align="center">
                No.
              </p>
            </TableCell>
            <TableCell style={tableTextCellStyle} align="left">
              Name
            </TableCell>
            {/* <TableCell style={tableTextCellStyle} align="left">
              NIK
            </TableCell> */}
            <TableCell style={tableTextCellStyle} align="left">
              Shift Code
            </TableCell>
            {/* <TableCell style={tableTextCellStyle} align="center">
              Shift
            </TableCell> */}
            <TableCell style={tableTextCellStyle} align="center">
              Schedule In
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Schedule Out
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Clock In
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Clock Out
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Late Time
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Go Fast Time
            </TableCell>
            <TableCell style={tableTextCellStyle} align="center">
              Cabin Time
            </TableCell>
            <TableCell style={tableRightStyle} align="center">
              <p className={classes.tableLeftTxt} align="center">
                Work Time
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.orderBy(_dataScheduleTrainDriver, "startTime")?.map(
            (item, index) => {
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

                  <TableCell style={tableTextIsiStyle} align="left">
                    {item?.name}
                  </TableCell>
                  {/* <TableCell style={tableTextIsiStyle} align="left">
                  {item?.nik}
                </TableCell> */}
                  <TableCell style={tableTextIsiStyle} align="left">
                    {item?.workOrder?.code}
                  </TableCell>
                  {/* <TableCell style={tableTextIsiStyle} align="left">
                  {item?.dailyWorkDate + " " + item?.shift}
                </TableCell> */}
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.startTime}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.endTime}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.start}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.end}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item.late}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.goFastTime}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.cabinTime}
                  </TableCell>
                  <TableCell style={tableTextIsiStyle} align="center">
                    {item?.duration}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const ContentPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ border: "1.5px solid #000000" }}>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1.6px solid #000000",
                    width: "50%",
                  }}
                >
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
                      }}
                    >
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
                      }}
                    >
                      <Typography>Nomor Dokumen</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "25%",
                        py: 0,
                      }}
                    >
                      <Typography>{detailLetter?.numberHead}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "15%",
                        py: 0,
                      }}
                    >
                      <Typography>Nomor Revisi</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "15%",
                        py: 0,
                      }}
                    >
                      <Typography>{detailLetter?.revisionNumber}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1.6px solid #000000",
                        width: "10%",
                        py: 0,
                      }}
                    >
                      <Typography>Halaman</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "15%",
                        py: 0,
                      }}
                    >
                      <Typography>{detailLetter?.page}</Typography>
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box p={2}>
          <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table
              stickyHeader
              sx={{
                minWidth: 650,
                borderRadius: 3,
                mb: 3,
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                  <TableCell style={tableLeftStyle}>
                    <p className={classes.tableLeftTxt} align="center">
                      No.
                    </p>
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="left">
                    Nama
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="left">
                    NIK
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="left">
                    Kode Dinas
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Shift
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Jam Tiba
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Jam Pulang
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Keterlambatan
                  </TableCell>
                  <TableCell style={tableRightStyle} align="center">
                    <p className={classes.tableLeftTxt} align="center">
                      Durasi
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_.orderBy(_dataScheduleTrainDriver, "shift")?.map(
                  (item, index) => {
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

                        <TableCell style={tableTextIsiStyle} align="left">
                          {item?.name}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="left">
                          {item?.nik}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="left">
                          {item?.workOrder?.code}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="left">
                          {moment(item?.dailyWorkDate).format("YYYY-MM-DD") +
                            " " +
                            item?.workOrder?.start}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.start}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.start === item?.end ? "" : item?.end}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item.late}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.durationText}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Grid container justifyContent={"flex-end"} sx={{ pr: 20, pt: 20 }}>
            <div>
              <p align="center">
                {userProfile?.officeNumber ? (
                  <QRCode
                    value={
                      userProfile?.officeNumber
                        ? userProfile?.officeNumber
                        : "-"
                    }
                    size={100}
                  />
                ) : (
                  ""
                )}
              </p>
              <p align="center" className={classes.grayGridTxt}>
                {userProfile?.name}
                <br />
                NIK : {userProfile?.officeNumber}
              </p>
            </div>
          </Grid>
        </Box>
      </div>
    );
  });

  console.log("data schedule", _dataScheduleTrainDriver);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex", pt: 13 }}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h4">Waktu Kedatangan/Kepulangan</Typography>
            </Grid>

            <Grid item xs={8}>
              <Grid
                spacing={2}
                container
                alignItems="end"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  marginTop: -5,
                  marginBottom: 3,
                }}
              >
                <Grid item xs={2.5}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Mulai:
                  </Typography>
                  <TextField
                    type={"Date"}
                    value={startDate}
                    placeholder="Pencarian"
                    onChange={(e) => {
                      setStartDate(e.target.value);
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
                </Grid>
                <Grid item xs={2.5}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Selesai:
                  </Typography>
                  <TextField
                    type={"Date"}
                    value={endDate}
                    placeholder="Pencarian"
                    onChange={(e) => {
                      setEndDate(e.target.value);
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
                </Grid>
                <Grid item xs={3}>
                  <Select
                    styles={selectBoxStyles}
                    menuPortalTarget={document.body}
                    placeholder={"Cari Nama"}
                    options={[
                      { value: "0", label: "Cari Nama" },
                      ...trainDriverList.map((x) => ({
                        label: x.name,
                        value: x._id,
                        nik: x?.nik,
                      })),
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
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}
                  >
                    Cari
                  </Button>
                </Grid>
                <Grid item>
                  <CSVLink
                    data={exportExcel}
                    filename={`Presensi-${moment().format(
                      "YYYYMMDDHHmmss"
                    )}.csv`}
                    separator=";"
                  >
                    <Button variant="contained" color="success">
                      <DownloadForOfflineIcon />
                      Download
                    </Button>
                  </CSVLink>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <TableContent />
            <div className="print-source">
              <ContentPrint ref={element} />
            </div>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
