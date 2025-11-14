import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CardDetailMonthly from "Component/Card/CardDetailMonthly";
import useAchievement from "Hooks/Achievement/useAchievement";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import useTrainDriver from "../../Hooks/TrainDriver/useTrainDriver";
import Images from "../../Themes/Images";
import UseStyles, { Img, selectBoxStyles, textPaperStyle } from "./Styles";

const MonthlyRaport = () => {
  const classes = UseStyles();
  const history = useHistory();

  const {
    handleFilterDate,
    selectTrainDriver,
    setSelectTrainDriver,
    date,
    getDataCountCheckup,
    totalAssessment,
    countCheckup,
    getAbsenceSummary,
    absenceSummary,
    getTotalAssessment,
    getDataCabinRideResult,
    cabinRideResult,
  } = useAchievement();
  const { trainDriver, getDataTrainDriver } = useTrainDriver();
  const {
    getDataDistanceDuration,
    dataReportMonthly,
    dataTotalDistance,
    dataTotalSchedule,
    getDataTotalSchedule,
  } = UseDailyWork();

  const [monthly, setMonthly] = useState("");
  const [searchEnable, setSearchEnable] = useState(false);

  const fetchData = async () => {
    setSearchEnable(true);
    console.log("selected", selectTrainDriver);
    let trainDriverNik = selectTrainDriver?.nik;
    let trainDriverID = selectTrainDriver?.value;
    if (trainDriverID && trainDriverNik) {
      let monthlyData = monthly ? monthly : moment().format("YYYY-MM");
      await getDataCountCheckup(trainDriverNik, monthlyData);
      await getAbsenceSummary(trainDriverID, monthlyData);
      await getDataTotalSchedule(trainDriverID);
      await getTotalAssessment(trainDriverID, monthlyData);
      await getDataDistanceDuration(trainDriverID, monthlyData);
      await getDataDistanceDuration(trainDriverID);
      await getDataCabinRideResult(trainDriverNik, monthlyData);
      await setSearchEnable(false);
    } else {
      setSearchEnable(false);
    }
  };

  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      getDataTrainDriver();
    }
    return () => {
      ignore = true;
    };
  }, []);

  console.log("total assesment", totalAssessment);
  return (
    <>
      <div style={{ marginTop: 60 }}></div>
      <div
        style={{
          backgroundColor: "#d4d4d5",
          width: "100%",
          height: 70,
          padding: 50,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <div>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#464748",
                mt: 1.5,
              }}
            >
              Raport Bulanan
            </Typography>
          </div>
          <div>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <div>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Pilih Bulan
                </Typography>
                <TextField
                  type="month"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                  InputProps={{
                    style: {
                      width: 300,
                      fontSize: 12,
                      height: 36,
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: 7,
                      boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </div>
              <div style={{ marginLeft: 10 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Pilih Masinis atau Penyelia
                </Typography>
                <Select
                  styles={selectBoxStyles}
                  menuPortalTarget={document.body}
                  placeholder={"Pilih Masinis atau Penyelia"}
                  options={[
                    { value: "0", label: "Pilih Nama", nik: "" },
                    ...trainDriver.map((x) => {
                      return { label: x.name, value: x._id, nik: x.idNumber };
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
              <div>
                <Button
                  sx={{ ml: 2, mt: 2.5 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    fetchData();
                  }}
                >
                  Cari
                </Button>
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
      <Box sx={{ padding: "10px 50px" }}>
        <CardDetailMonthly nik={selectTrainDriver?.nik} search={searchEnable} />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={5}>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={5}>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: "#333333" }}
                >
                  Jumlah Hari
                </Typography>
                <Box sx={{ bgcolor: "#fff", borderRadius: 2, height: 110 }}>
                  <Grid
                    container
                    sx={{
                      py: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ m: "auto" }}>
                      <Typography sx={{ fontSize: 12 }}>Kerja</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {absenceSummary?.work ? absenceSummary?.work : 0}
                      </Typography>
                    </Box>
                    <Box sx={{ m: "auto" }}>
                      <Typography sx={{ fontSize: 12 }}>Cuti</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {absenceSummary?.cuti ? absenceSummary?.cuti : 0}
                      </Typography>
                    </Box>
                    <Box sx={{ m: "auto" }}>
                      <Typography sx={{ fontSize: 12 }}>Sakit</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {absenceSummary?.sakit ? absenceSummary?.sakit : 0}
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: "#333333" }}
                >
                  Logbook Dinasan
                </Typography>
                <Box sx={{ bgcolor: "#fff", borderRadius: 2, height: 110 }}>
                  <Grid
                    container
                    sx={{
                      py: 1,
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Grid item xs={6} sx={{ pl: 3 }}>
                      <Box>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Jam Dinas
                        </Typography>
                        <div>
                          <Grid container>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {dataTotalSchedule
                                ? dataTotalSchedule.toFixed(2)
                                : 0}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                marginTop: 1,
                                color: "#000",
                              }}
                            >
                              Jam
                            </Typography>
                          </Grid>
                        </div>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Jarak Tempuh
                        </Typography>
                        <div>
                          <Grid container>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {dataTotalDistance?.totalDistance
                                ? dataTotalDistance?.totalDistance.toFixed(2)
                                : 0}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                marginTop: 1,
                                color: "#000",
                              }}
                            >
                              Km
                            </Typography>
                          </Grid>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography sx={{ fontSize: 12 }}>
                          Jam Dinas Bulanan
                        </Typography>
                        <div>
                          <Grid container>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {absenceSummary?.workTime
                                ? absenceSummary?.workTime.toFixed(2)
                                : 0}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                marginTop: 1,
                                color: "#000",
                              }}
                            >
                              Jam
                            </Typography>
                          </Grid>
                        </div>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 12 }}>
                          Jarak Tempuh Bulanan
                        </Typography>
                        <div>
                          <Grid container>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {dataReportMonthly?.totalDistance
                                ? dataReportMonthly?.totalDistance.toFixed(2)
                                : 0}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                marginTop: 1,
                                color: "#000",
                              }}
                            >
                              Km
                            </Typography>
                          </Grid>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Typography
              sx={{ fontSize: 18, fontWeight: 500, color: "#333333" }}
            >
              Kondisi Kesehatan
            </Typography>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: "auto",
                    borderRadius: 2,
                    height: 110,
                    alignContent: "center",
                    backgroundColor: "primary.white",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      py: 1.3,
                      mx: 2.5,
                      alignItems: "center",
                      flex: 1,
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ display: "flex", flex: 1, alignItems: "center" }}
                    >
                      <Box sx={{ ml: -1, mr: 0.5 }}>
                        <Img src={Images.heart} width="35px" />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: "#A2A2A2",
                        }}
                      >
                        Fit to Work
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant="body2">
                      {countCheckup?.fittowork ? countCheckup?.fittowork : 0}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: "auto",
                    borderRadius: 2,
                    height: 110,
                    alignContent: "center",
                    backgroundColor: "primary.white",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      py: 1.3,
                      mx: 2.5,
                      alignItems: "center",
                      flex: 1,
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ display: "flex", flex: 1, alignItems: "center" }}
                    >
                      <Box>
                        <Img src={Images.danger} width="30px" />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: "#A2A2A2",
                        }}
                      >
                        Unfit to Work
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant="body2">
                      {countCheckup?.unfittowork
                        ? countCheckup?.unfittowork
                        : 0}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: "auto",
                    borderRadius: 2,
                    height: 110,
                    alignContent: "center",
                    backgroundColor: "primary.white",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      py: 1.3,
                      mx: 2.5,
                      alignItems: "center",
                      flex: 1,
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ display: "flex", flex: 1, alignItems: "center" }}
                    >
                      <Box>
                        <Img src={Images.report} width="35px" />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: "#A2A2A2",
                        }}
                      >
                        Fit to Work with Note
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant="body2">
                      {countCheckup?.fittoworkwithnote
                        ? countCheckup?.fittoworkwithnote
                        : 0}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          sx={{ fontSize: 18, fontWeight: 500, color: "#333333", mt: 1 }}
        >
          Penilaian Harian
        </Typography>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableBody>
            <TableRow sx={{ borderRadius: 2, bgcolor: "#ababab" }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16, color: "#fff" }}>
                  1. Harian
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16, color: "#fff" }}>
                  Total
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16, color: "#fff" }}>
                  Rata-rata
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Kehadiran</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kehadiran}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekehadiran}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Kerapihan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kerapihan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekerapihan}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Kelengkapan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kerapihan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekerapihan}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Uji Pengetahuan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.pengetahuan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagepengetahuan}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>
                  Nilai Tunjuk Sebut
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.nilaiTunjukSebut}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagenilaiTunjukSebut}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Grand Total</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
                  {_.sum([
                    totalAssessment?.resdata?.kehadiran,
                    totalAssessment?.resdata?.kerapihan,
                    totalAssessment?.resdata?.kerapihan,
                    totalAssessment?.resdata?.pengetahuan,
                    totalAssessment?.resdata?.nilaiTunjukSebut,
                  ])}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
                  {_.sum([
                    totalAssessment?.average?.averagekehadiran,
                    totalAssessment?.average?.averagekerapihan,
                    totalAssessment?.average?.averagekerapihan,
                    totalAssessment?.average?.averagepengetahuan,
                    totalAssessment?.average?.averagenilaiTunjukSebut,
                  ])}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2, bgcolor: "#ababab" }}>
              <TableCell width="50%" sx={{ py: 1.5 }} colSpan={3}>
                <Typography sx={{ fontSize: 16, color: "#fff" }}>
                  2. Cabin Ride
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 16 }}>Cabin Ride</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {_.sumBy(cabinRideResult, "result")}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {cabinRideResult.length > 0
                    ? _.sumBy(cabinRideResult, "result") /
                      cabinRideResult.length
                    : 0}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* <Typography
          sx={{ fontSize: 18, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Learning Hours
        </Typography>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>No</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Judul Training
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell width="10%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Tipe
                </Typography>
              </TableCell>
              <TableCell width="10%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Durasi
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Keterangan
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>1</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>
                  KOMUNIKASI DARURAT
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>6 Mei 2022</Typography>
              </TableCell>
              <TableCell width="10%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>WORKSHOP</Typography>
              </TableCell>
              <TableCell width="10%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>2</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>LRTJ-OCC</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}

        {/* <Typography
          sx={{ fontSize: 18, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Catatan Kinerja
        </Typography>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>No</Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Tgl Mulai
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Tgl Selesai
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Kategori
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Deskripsi
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Keterangan
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>1</Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>6/4/2022</Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>6/4/2022</Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>PESERTA</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>LOMBA BULAN K3</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}

        <Typography
          sx={{ fontSize: 18, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Peforma Ketepatan Lintas
        </Typography>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>No</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Indikator
                </Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Definisi
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, color: "#fff" }}>
                  Nilai
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="5%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>1</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>
                  TINGKAT KETEPATAN WAKTU
                </Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}>
                  Ketepatan waktu antar stasiun
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15 }}></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default MonthlyRaport;
