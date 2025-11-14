import { React, useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  TableCell,
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useStyles, { selectBoxStyles, tableTextIsiStyle1 } from "./Styles";
import moment from "moment";
import _ from "lodash";
import { CSVLink } from "react-csv";
import Select from "react-select";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import PrintIcon from "@mui/icons-material/Print";

// icon
import SearchIcon from "@mui/icons-material/Search";

// style
import {
  tableLeftStyle,
  tableTextCellStyle,
  tableTextIsiStyle,
} from "./Styles";
import useDailyWork from "../../Hooks/DailyWork/useDailyWork";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import { button, tableCellStyle } from "./Styles";

export default function PrecisionTrack() {
  const classes = useStyles();

  const {
    dataDailyScheduleExport,
    dataDailyScheduleStationExport,
    dataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    fetchDataHandOverMasinisByRange,
    selectTrainDriver,
    setSelectTrainDriver,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
  } = useDailyWork();
  const { trainDriver, getMasinis } = useTrainDriver();
  const [loader, setLoader] = useState(false);
  const [displayTrainJourney, setDisplayTrainJourney] = useState([]);

  useEffect(() => {
    handleFetchData();
    getMasinis();
  }, []);

  const handleFetchData = async () => {
    await setLoader(true);
    await fetchDataHandOverMasinisByRange();
    await setLoader(false);
  };

  let groupScheduleByDate = _.groupBy(
    _.orderBy(dataDailySchedule, ["dailyWorkDateString"], ["asc"]),
    "dailyWorkDateString"
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex", pt: 13 }}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h4">Ketepatan Lintas</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="end">
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={2.2}>
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
                </Grid>
                <Grid item xs={2.2}>
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
                </Grid>
                <Grid item xs={4.6} sx={{ display: "flex", alignItems: "end" }}>
                  <Select
                    styles={selectBoxStyles}
                    menuPortalTarget={document.body}
                    placeholder={"Cari Nama"}
                    options={[
                      { value: "0", label: "Cari Nama" },
                      ...trainDriver.map((x) => {
                        return { label: x.name, value: x._id };
                      }),
                    ]}
                    isSearchable={true}
                    isClearable={true}
                    //value={trainDriver.filter(option => option.value === selectTrainDriver?.value)}
                    value={selectTrainDriver}
                    onChange={(selected) =>
                      setSelectTrainDriver(
                        selected ? selected : { label: "Pilih", value: "0" }
                      )
                    }
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: "flex", alignItems: "end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchData}>
                    Cari
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <Grid container justifyContent={"flex-end"}>
                <CSVLink
                  data={dataDailyScheduleStationExport}
                  //headers={headers}
                  filename={`KetepatanLintas-Station-${dateDailyWork}.csv`}
                  separator=";">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: 10,
                      mr: 1,
                      "&:hover": {
                        backgroundColor: "#BB7E36",
                        color: "#fff",
                        border: "none",
                      },
                    }}>
                    <DownloadForOfflineIcon />
                    Data Stasiun
                  </Button>
                </CSVLink>

                <CSVLink
                  data={dataDailyScheduleExport}
                  //headers={headers}
                  filename={`KetepatanLintas-${dateDailyWork}.csv`}
                  separator=";">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: 10,
                      "&:hover": {
                        backgroundColor: "#BB7E36",
                        color: "#fff",
                        border: "none",
                      },
                    }}>
                    <DownloadForOfflineIcon />
                    Data KA
                  </Button>
                </CSVLink>
                <Button
                  onClick={() => window.print()}
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: 10,
                    //width: 100,
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "#BB7E36",
                      color: "#fff",
                      border: "none",
                    },
                  }}>
                  <PrintIcon />
                  Cetak
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <TableContainer sx={{ maxHeight: 500, mb: 3, mt: 2 }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                  <TableCell style={tableLeftStyle}>
                    <p className={classes.tableLeftTxt} align="center">
                      No.
                    </p>
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Nomor KA
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Nomor LRV
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Berangkat
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Tiba
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Waktu Tempuh
                  </TableCell>
                  <TableCell
                    style={tableTextCellStyle}
                    colSpan={2}
                    align="center">
                    Keterlambatan
                  </TableCell>
                  <TableCell style={tableTextCellStyle} align="center">
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupScheduleByDate)?.map(([key, value]) => (
                  <>
                    <TableRow
                      style={{
                        borderCollapse: "seperate",
                        backgroundColor: "#BB7E36",
                      }}>
                      <TableCell
                        colSpan={9}
                        style={{
                          ...tableTextIsiStyle1,
                          paddingLeft: 10,
                          color: "#fff",
                        }}
                        align="left">
                        {moment(key).format("DD MMMM YYYY")}
                      </TableCell>
                    </TableRow>
                    {_.orderBy(
                      value,
                      ["loopRouteTrain.code", "loopRouteTrain.loop"],
                      ["asc", "asc"]
                    ).map((item, index) => {
                      return (
                        <>
                          <TableRow
                            key={index++}
                            style={{
                              borderCollapse: "seperate",
                              backgroundColor: "#F1909C",
                              border: "1px solid #F6F7FF",
                            }}>
                            <TableCell
                              style={tableTextIsiStyle}
                              align="center"></TableCell>
                            <TableCell
                              colSpan="5"
                              style={tableTextIsiStyle}
                              align="left">
                              {item?.trainDriver?.name}
                              <small>
                                {" "}
                                ( Kode : {item?.loopRouteTrain?.code} -{" "}
                                {item?.loopRouteTrain?.loop})
                              </small>
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              Berangkat
                            </TableCell>
                            <TableCell style={tableTextIsiStyle} align="center">
                              Tiba
                            </TableCell>
                            <TableCell
                              style={tableTextIsiStyle}
                              align="center"></TableCell>
                          </TableRow>
                          {item?.loopRouteTrain?.route.map(
                            (itemRoute, indexRoute) => {
                              var duration = moment(
                                moment(itemRoute?.endTime, "HH:mm:ss")
                              ).diff(
                                moment(itemRoute?.startTime, "HH:mm:ss"),
                                "seconds"
                              );
                              return (
                                <>
                                  <TableRow
                                    key={index++}
                                    style={{
                                      borderCollapse: "seperate",
                                      backgroundColor: "#F3F3F3",
                                      border: "1px solid #F6F7FF",
                                      padding: 1,
                                    }}>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {indexRoute + 1}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {itemRoute.trainNumber}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {JSON.stringify(itemRoute.LRVList)}
                                    </TableCell>

                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {itemRoute?.startTime}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {itemRoute?.endTime}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {duration ? (
                                        <span>
                                          {Math.floor(duration / 60)} mnt{" "}
                                          {duration % 60} dtk{" "}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {_.orderBy(
                                        itemRoute.station,
                                        ["loopIndex"],
                                        ["desc"]
                                      )[0]?.start &&
                                        moment
                                          .utc(
                                            moment(
                                              _.orderBy(
                                                itemRoute.station,
                                                ["loopIndex"],
                                                ["asc"]
                                              )[0]?.start,
                                              "HH:mm:ss"
                                            ).diff(
                                              moment(
                                                `${
                                                  _.orderBy(
                                                    itemRoute.station,
                                                    ["loopIndex"],
                                                    ["asc"]
                                                  )[0].startPlan
                                                }:00`,
                                                "HH:mm:ss"
                                              )
                                            )
                                          )
                                          .format("HH:mm:ss")}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {_.orderBy(
                                        itemRoute.station,
                                        ["loopIndex"],
                                        ["desc"]
                                      )[0]?.end &&
                                      _.orderBy(
                                        itemRoute.station,
                                        ["loopIndex"],
                                        ["desc"]
                                      )[0]?.endPlan <
                                        _.orderBy(
                                          itemRoute.station,
                                          ["loopIndex"],
                                          ["desc"]
                                        )[0]?.end
                                        ? moment
                                            .utc(
                                              moment(
                                                _.orderBy(
                                                  itemRoute.station,
                                                  ["loopIndex"],
                                                  ["desc"]
                                                )[0]?.end,
                                                "HH:mm:ss"
                                              ).diff(
                                                moment(
                                                  `${
                                                    _.orderBy(
                                                      itemRoute.station,
                                                      ["loopIndex"],
                                                      ["desc"]
                                                    )[0]?.endPlan
                                                  }:00`,
                                                  "HH:mm:ss"
                                                )
                                              )
                                            )
                                            .format("HH:mm:ss")
                                        : "- " +
                                          moment
                                            .utc(
                                              moment(
                                                _.orderBy(
                                                  itemRoute.station,
                                                  ["loopIndex"],
                                                  ["desc"]
                                                )[0]?.endPlan,
                                                "HH:mm:ss"
                                              ).diff(
                                                moment(
                                                  `${
                                                    _.orderBy(
                                                      itemRoute.station,
                                                      ["loopIndex"],
                                                      ["desc"]
                                                    )[0]?.end
                                                  }:00`,
                                                  "HH:mm:ss"
                                                )
                                              )
                                            )
                                            .format("HH:mm:ss")}
                                    </TableCell>
                                    <TableCell
                                      style={{ padding: 3 }}
                                      align="center">
                                      {displayTrainJourney.filter(
                                        (x) => x === itemRoute.trainNumber
                                      ).length > 0 ? (
                                        <Button
                                          size="small"
                                          variant="contained"
                                          color="primary"
                                          onClick={() => {
                                            setDisplayTrainJourney(
                                              displayTrainJourney.filter(
                                                (x) =>
                                                  x !== itemRoute.trainNumber
                                              )
                                            );
                                          }}>
                                          Tutup
                                        </Button>
                                      ) : (
                                        <Button
                                          size="small"
                                          variant="contained"
                                          color="primary"
                                          onClick={() => {
                                            setDisplayTrainJourney([
                                              ...displayTrainJourney,
                                              itemRoute.trainNumber,
                                            ]);
                                          }}>
                                          Lihat
                                        </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  {displayTrainJourney.filter(
                                    (x) => x === itemRoute.trainNumber
                                  ).length > 0 ? (
                                    <TableRow>
                                      <TableCell colSpan={8}>
                                        <Table
                                          style={{
                                            borderCollapse: "separate",
                                            borderSpacing: "0px 2px",
                                            align: "center",
                                          }}
                                          className={classes.tableTxt}
                                          sx={{ alignItems: "center" }}
                                          aria-label="simple table">
                                          <TableHead>
                                            <TableRow style={{ height: 30 }}>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                rowSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Posisi</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                rowSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>V Max</p>
                                                <small>(Km/Jam)</small>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                rowSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Jarak</p>
                                                <small>(Km)</small>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                rowSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Stasiun</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                colSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Waktu</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                colSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Realisasi</p>
                                              </TableCell>
                                              {/* <TableCell className={classes.tableCellTxt} rowSpan={2} style={tableCellStyle} align="center">
                                      <p>Durasi</p>
                                    </TableCell> */}
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                rowSpan={2}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Dwelling Time</p>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Tiba</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Berangkat</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Tiba</p>
                                              </TableCell>
                                              <TableCell
                                                className={classes.tableCellTxt}
                                                style={tableCellStyle}
                                                align="center">
                                                <p>Berangkat</p>
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {_.orderBy(
                                              itemRoute.station,
                                              ["loopIndex"],
                                              ["asc"]
                                            ).map((itemStation) => {
                                              return (
                                                <>
                                                  <TableRow
                                                    key={
                                                      itemStation.statiunCode
                                                    }
                                                    sx={{
                                                      "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                      bgcolor:
                                                        itemStation.status ===
                                                        "Start"
                                                          ? "green"
                                                          : itemStation.status ===
                                                            "Finish"
                                                          ? "#EF7C8E"
                                                          : "#F8F8F8",
                                                    }}>
                                                    <TableCell
                                                      align="center"
                                                      className={
                                                        classes.tableLeftTxt
                                                      }
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}
                                                      component="th"
                                                      scope="row">
                                                      {
                                                        itemStation.stationPosition
                                                      }
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      style={{
                                                        position: "relative",
                                                      }}
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}
                                                      component="th"
                                                      scope="row">
                                                      {itemStation.distance >
                                                      0 ? (
                                                        <p>
                                                          {itemStation.vMax}
                                                        </p>
                                                      ) : null}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      style={{
                                                        position: "relative",
                                                      }}
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}
                                                      component="th"
                                                      scope="row">
                                                      {itemStation.distance >
                                                      0 ? (
                                                        <p>
                                                          {itemStation.distance}
                                                        </p>
                                                      ) : null}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}
                                                      component="th"
                                                      scope="row">
                                                      {itemStation.stationName}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}>
                                                      {itemStation?.endPlan}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}>
                                                      {itemStation.startPlan}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}>
                                                      {itemStation?.end}
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}>
                                                      {itemStation.start}
                                                    </TableCell>

                                                    {/* <TableCell align="center" sx={{ border: 'none',paddingTop:1,paddingBottom:1, color : itemStation.status === "Start" ? "white": "black", fontSize:18 }}>
                                              {itemStation.duration}
                                            </TableCell> */}
                                                    <TableCell
                                                      align="center"
                                                      className={
                                                        classes.tableRightTxt
                                                      }
                                                      sx={{
                                                        border: "none",
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        color:
                                                          itemStation.status ===
                                                          "Start"
                                                            ? "white"
                                                            : "black",
                                                        fontSize: 18,
                                                      }}>
                                                      {itemStation?.dweelingTime >
                                                      0
                                                        ? moment()
                                                            .startOf("day")
                                                            .seconds(
                                                              itemStation.dweelingTime
                                                            )
                                                            .format("H:mm:ss")
                                                        : ""}
                                                    </TableCell>
                                                  </TableRow>
                                                </>
                                              );
                                            })}
                                          </TableBody>
                                        </Table>
                                      </TableCell>
                                    </TableRow>
                                  ) : null}
                                </>
                              );
                            }
                          )}
                        </>
                      );
                    })}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
