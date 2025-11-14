import {
  Box,
  Button,
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
import _ from "lodash";
import moment from "moment";
import { useContext, useEffect } from "react";
import useStyles, { StickyTableCell } from "./Styles";

// icon
import SearchIcon from "@mui/icons-material/Search";

// style
import { AttendanceContext } from "Context";
import { CSVLink } from "react-csv";
import useDailyWork from "../../../Hooks/DailyWork/useDailyWork";
import { tableTextCellStyle } from "./Styles";

export default function DataLogbook() {
  const classes = useStyles();
  const {
    loadLogBook,
    logBookData,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
  } = useDailyWork();
  const { getDataAttendance, attendance } = useContext(AttendanceContext);

  let today = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    const fetchData = () => {
      getDataAttendance({ startDate: today, endDate: today });
      loadLogBook();
    };
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", pt: 3, flexDirection: "column", flex: 1 }}>
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Data Logbook Dinasan
            </Typography>
          </Grid>

          <Grid item xs={7}>
            <Grid
              spacing={2}
              container
              alignItems="end"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                marginBottom: 3,
              }}
            >
              <Grid item xs={2.5}>
                <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                  Tgl Mulai:
                </Typography>
                <TextField
                  type={"Date"}
                  placeholder="Pencarian"
                  value={filterStartDate}
                  onChange={(e) => {
                    setfilterStartDate(e.target.value);
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
                  placeholder="Pencarian"
                  value={filterEndDate}
                  onChange={(e) => {
                    setfilterEndDate(e.target.value);
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
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => loadLogBook()}
                >
                  Cari
                </Button>
              </Grid>
              <Grid item xs={1.5}>
                <CSVLink
                  data={_.orderBy(
                    logBookData,
                    ["Tanggal", "Kode"],
                    ["asc", "asc"]
                  )
                    .filter((x) => x.Kode !== "OFF")
                    .map((x) => ({
                      ...x,
                      kejadian: x.CatatanKejadian.map(
                        (kj) =>
                          `(${kj.index}.${kj.title})${kj.value} pada ${moment(
                            kj.createdAt
                          ).format("HH:mm:ss")}\n`
                      ),
                      late_duration: x.Attendance?.time_out
                        ? moment(x.Attendance?.time_out, "HH:mm:ss") <
                          moment(x.MulaiDinas, "HH:mm")
                          ? "0"
                          : moment
                              .utc(
                                moment(x.Attendance?.time_out, "HH:mm:ss").diff(
                                  moment(`${x.MulaiDinas}:00`, "HH:mm:ss")
                                )
                              )
                              .format("HH:mm:ss")
                        : "-",
                    }))}
                  headers={[
                    { label: "Nama", key: "Nama" },
                    { label: "Kode", key: "Kode" },
                    { label: "Dinasan", key: "Dinasan" },
                    { label: "Hari", key: "Hari" },
                    { label: "Tanggal", key: "Tanggal" },
                    { label: "Loop", key: "Loop" },
                    { label: "HT", key: "HT" },
                    { label: "Tablet", key: "Tablet" },
                    { label: "HasilKesehatan", key: "HasilKesehatan" },
                    { label: "HasilAsesmen", key: "HasilAsesmen" },
                    { label: "CatatanKejadian", key: "kejadian" },
                    { label: "Keterlambatan", key: "late_duration" },
                    { label: "MulaiDinas", key: "MulaiDinas" },
                    { label: "HabisDinas", key: "HabisDinas" },
                    { label: "MasukDinas", key: "Attendance.time_out" },
                    { label: "PulangDinas", key: "Attendance.time_in" },
                    { label: "NilaiAbsen", key: "totalPoint.absense" },
                    { label: "NilaiKerapihan", key: "totalPoint.appearance" },
                    {
                      label: "NilaiKelengkapan",
                      key: "totalPoint.completeness",
                    },
                    {
                      label: "NilaiPengetahuan",
                      key: "totalPoint.knowledge",
                    },
                    { label: "NilaiTunjukSebut", key: "totalPoint.pointOut" },
                    { label: "NilaiAsesmen", key: "totalPoint.total" },
                    { label: "PenyeliaPenilai", key: "PenyeliaPenilai" },
                  ]}
                  filename={`LogBook-${filterStartDate}-${filterEndDate}.csv`}
                  separator=";"
                >
                  <Button fullWidth variant="contained" color="success">
                    Download
                  </Button>
                </CSVLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 3000, borderRadius: 3, mb: 3 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ padding: 0, backgroundColor: "#C4C4C4" }}>
                <StickyTableCell
                  rowSpan={2}
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "11px",
                    zIndex: 1102,
                  }}
                  align="center"
                >
                  No
                </StickyTableCell>
                <StickyTableCell
                  rowSpan={2}
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "11px",
                    zIndex: 1102,
                  }}
                  align="left"
                >
                  Masinis
                </StickyTableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Kode
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Dinasan
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Tanggal
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Loop
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  No LRV
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  HT
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  No.Tablet
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={{ ...tableTextCellStyle }}
                  align="center"
                >
                  Hasil Pemeriksaan Kesehatan
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={{ ...tableTextCellStyle }}
                  align="center"
                >
                  Hasil Asesmen Penyelia
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={{ ...tableTextCellStyle }}
                  align="center"
                >
                  Kejadian Harian
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Keterlambatan
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Jadwal
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Realisasi
                </TableCell>
                <TableCell
                  colSpan={6}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Penilaian
                </TableCell>
                <TableCell
                  rowSpan={2}
                  style={tableTextCellStyle}
                  align="center"
                >
                  Penyelia Penilai
                </TableCell>
              </TableRow>

              <TableRow style={{ padding: 0, backgroundColor: "#C4C4C4" }}>
                <TableCell style={tableTextCellStyle} align="center">
                  Hadir
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Pulang
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Hadir
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Pulang
                </TableCell>

                <TableCell style={tableTextCellStyle} align="center">
                  Kehadiran
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Kerapihan
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Kelengkapan
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Pengetahuan
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Tunjuk Sebut
                </TableCell>
                <TableCell style={tableTextCellStyle} align="center">
                  Total Nilai
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.orderBy(logBookData, ["Tanggal", "Kode"], ["asc", "asc"])
                .filter((x) => x.Kode !== "OFF")
                .map((itemLog, index) => {
                  let hasilKesehatan = itemLog.HasilKesehatan;
                  let hasilAssesment = itemLog.StatusAsesmen;
                  if (itemLog.HasilKesehatan === "1") {
                    hasilKesehatan = "Fit To Work";
                  }
                  if (itemLog.HasilKesehatan === "2") {
                    hasilKesehatan = "Fit To Work With Note";
                  }
                  if (itemLog.HasilKesehatan === "3") {
                    hasilKesehatan = "UnFit To Work";
                  }

                  let late_duration = itemLog.Attendance?.time_out
                    ? moment(itemLog.Attendance?.time_out, "HH:mm:ss") <
                      moment(itemLog.MulaiDinas, "HH:mm")
                      ? "0"
                      : moment
                          .utc(
                            moment(
                              itemLog.Attendance?.time_out,
                              "HH:mm:ss"
                            ).diff(
                              moment(`${itemLog.MulaiDinas}:00`, "HH:mm:ss")
                            )
                          )
                          .format("HH:mm:ss")
                    : "-";

                  // let checkIfLate = hhL?.toString() + mmL?.toString() + ssL?.toString()

                  return (
                    <TableRow>
                      <StickyTableCell
                        style={tableTextCellStyle}
                        align="center"
                      >
                        {index + 1}
                      </StickyTableCell>
                      <StickyTableCell style={tableTextCellStyle} align="left">
                        {itemLog.Nama}
                      </StickyTableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.Kode}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.Dinasan}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog?.Hari},{itemLog.Tanggal}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.Dinasan === "Mainline" ? itemLog.Loop : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog?.LRV?.toString()}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.HT}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.Tablet}
                      </TableCell>
                      <TableCell
                        style={{ ...tableTextCellStyle }}
                        align="center"
                      >
                        {hasilKesehatan}
                      </TableCell>
                      <TableCell
                        style={{ ...tableTextCellStyle }}
                        align="center"
                      >
                        {hasilAssesment}
                      </TableCell>
                      <TableCell style={{ ...tableTextCellStyle }} align="left">
                        {itemLog?.CatatanKejadian.length == 0 ? (
                          <center>-</center>
                        ) : (
                          _.orderBy(itemLog.CatatanKejadian, ["index"], ["asc"])
                            .filter((x) => x?.value !== "")
                            .map((itemNote, index) => {
                              return (
                                <p>
                                  {index + 1}.{itemNote.title} :{" "}
                                  {itemNote.value}
                                </p>
                              );
                            })
                        )}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {late_duration}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.MulaiDinas}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.HabisDinas}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.Attendance?.time_out
                          ? itemLog.Attendance?.time_out
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {attendance.length > 0
                          ? attendance.filter(
                              (val) =>
                                val?.id_finger === itemLog.Attendance?.id_finger
                            )[0]?.time_out
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {late_duration > "00:30:00"
                          ? "0"
                          : itemLog.totalPoint?.absense
                          ? itemLog.totalPoint?.absense
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.totalPoint?.appearance
                          ? itemLog.totalPoint?.appearance
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.totalPoint?.completeness
                          ? itemLog.totalPoint?.completeness
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.totalPoint?.knowledge
                          ? itemLog.totalPoint?.knowledge
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.totalPoint?.pointOut
                          ? itemLog.totalPoint?.pointOut
                          : "-"}
                      </TableCell>
                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.totalPoint?.total
                          ? itemLog.totalPoint?.total
                          : "-"}
                      </TableCell>

                      <TableCell style={tableTextCellStyle} align="center">
                        {itemLog.PenyeliaPenilai}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
