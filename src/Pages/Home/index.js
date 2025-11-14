import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import useStyles from "./Styles";
// import icon
import {
  CalendarMonth as CalendarMonthIcon,
  CalendarToday as CalendarTodayIcon,
  AddRoad as AddRoadIcon,
  MobileFriendly as MobileFriendlyIcon,
  Groups as GroupsIcon,
  Report as ReportIcon,
  LocalPostOffice as LocalPostOfficeIcon,
  HistoryEdu as HistoryEduIcon,
  Summarize as SummarizeIcon,
  FactCheck as FactCheckIcon,
  Group as GroupIcon,
  ReportProblem as ReportProblemIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  Airplay as AirplayIcon,
  AccessTime as AccessTimeIcon,
  ExpandMore as ExpandMoreIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
// import component
import Contact from "../../Component/Card/index";
import { ProfileContext } from "../../Context/index";

// import style
import { Img } from "./Styles";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import DialogModal from "Component/Dialog/Dialog";
import QRCode from "react-qr-code";
import moment from "moment";

import useQuery from "Utils/QueryParams";
import StaticVar from "Config/StaticVar";

export default function TrainJourney(props) {
  const [open, setOpen] = useState(false);
  const { profileUser } = useContext(ProfileContext);
  const {
    dataDetailDaily,
    dataDailySchedule,
    getKaIncidentScheduleTrainDriver,
    kaIncidentScheduleTrainDriver,
    getDailyWorkById,
    fetchDataAssignmentMasinis,
    getDailyWorkByIdLocal,
    setDataScheduleSPV,
    dataScheduleSPV,
    getScheduleSupervisor,
    putDataScheduleSupervisor,
  } = UseDailyWork();

  const [menulist, setMenuList] = useState([]);
  const [messageSPV, setMessageSPV] = useState("");

  const classes = useStyles();
  let query = useQuery();
  const mode = query.get("mode");

  useEffect(() => {
    // const user = JSON.parse(localStorage.user);
    // const profile = JSON.parse(localStorage.profile);
    // if (mode === "tablet" || user?.role === "traindriver") {
    //   const _data = [
    //     {
    //       menu: "Serah Terima Masinis",
    //       link: "/app/operational/scan",
    //       mode: "web",
    //     },
    //     {
    //       menu: "Go/No Go Item",
    //       link: "/app/operational/gonogoitem",
    //       mode: "web",
    //     },
    //     { menu: "Briefing", link: "/app/operational/briefing", mode: "web" },
    //     {
    //       menu: "Perjalanan KA",
    //       link: "/app/operational/trainjourney",
    //       mode: "web",
    //     },
    //     {
    //       menu: "Serah Terima Tablet",
    //       link: "/app/operational/tablet",
    //       mode: "web",
    //     },
    //     {
    //       menu: "Surat Tugas",
    //       link: "/app/operational/workorder",
    //       mode: "web",
    //     },
    //   ];
    //   setMenuList(_data);
    //   const fetctData = async () => {
    //     let dataresponseLocal = await getDailyWorkByIdLocal(
    //       localStorage.operational_id
    //     );
    //     await getKaIncidentScheduleTrainDriver(
    //       dataresponseLocal?.loopRouteTrain?.loop,
    //       moment(dataresponseLocal?.dailyWorkDate).format("YYYY-MM-DD")
    //     );
    //     await getScheduleSupervisor(
    //       "Penyelia",
    //       moment(new Date()).format("YYYY-MM-DD")
    //     );
    //   };
    //   fetctData();
    // } else {
      const _data = [
            {
          menu: "Perjalanan KA",
          link: "/app/operational/trainjourney",
          mode: "web",
        },
        {
          menu: "Serah Terima Tablet",
          link: "/app/operational/tablet",
          mode: "web",
        },

        
        {
          menu: "Dinas Bulanan ",
          link: "/app/operational/monthlywork",
          mode: "web",
          rgba: "rgba(208, 0, 0, 0.2)",
          icon: <CalendarMonthIcon sx={{ color: "#d00000" }} />,
        },
        {
          menu: "Dinas Harian",
          link: "/app/operational/dailywork",
          mode: "web",
          rgba: "rgba(138, 177, 125, 0.2)",
          icon: <CalendarTodayIcon sx={{ color: "#8ab17d" }} />,
        },
        {
          menu: "Ketepatan Lintas",
          link: "/app/operational/precisiontrack",
          mode: "web",
          rgba: "rgba(233, 196, 106, 0.2)",
          icon: <AddRoadIcon sx={{ color: "#e9c46a" }} />,
        },
        {
          menu: "Surat Tugas Masinis",
          link: "/app/operational/assignment",
          mode: "web",
          rgba: "rgba(2, 62, 138, 0.2)",
          icon: <LocalPostOfficeIcon sx={{ color: "#023e8a" }} />,
        },
        {
          menu: "Serah Terima Masinis",
          link: "/app/operational/handover",
          mode: "web",
          rgba: "rgba(2, 62, 138, 0.2)",
          icon: <HistoryEduIcon sx={{ color: "#023e8a" }} />,
        },
        {
          menu: "Waktu Presensi",
          link: "/app/operational/attendance",
          mode: "web",
          rgba: "rgba(238, 137, 89, 0.2)",
          icon: <AccessTimeIcon sx={{ color: "#3085f0" }} />,
        },
        {
          menu: "Raport Bulanan",
          link: "/app/operational/monthlyraport",
          mode: "web",
          rgba: "rgba(238, 137, 89, 0.2)",
          icon: <ReportIcon sx={{ color: "#ee8959" }} />,
        },
        {
          menu: "Cabin Ride",
          link: "/app/operational/cabinride",
          mode: "web",
          rgba: "rgba(238, 137, 89, 0.2)",
          icon: <MobileFriendlyIcon sx={{ color: "#ee8959" }} />,
        },
        {
          menu: "Go/No Go Item",
          link: "/app/operational/gonogoitem",
          mode: "web",
          rgba: "rgba(102, 65, 138, 0.2)",
          icon: <SummarizeIcon sx={{ color: "#66418a" }} />,
        },
        {
          menu: "Briefing",
          link: "/app/operational/briefing",
          mode: "web",
          rgba: "rgba(229, 107, 111, 0.2)",
          icon: <GroupsIcon sx={{ color: "#e56b6f" }} />,
        },
        {
          menu: "Preliminary Incident Report",
          link: "/app/operational/preliminaryreport",
          mode: "web",
          rgba: "rgba(40, 114, 113, 0.2)",
          icon: <FactCheckIcon sx={{ color: "#287271" }} />,
        },
        {
          menu: "Coaching",
          link: "/app/operational/coaching",
          mode: "web",
          rgba: "rgba(230, 50, 50, 0.2)",
          icon: <GroupIcon sx={{ color: "#e63232" }} />,
        },
        {
          menu: "Kejadian Harian",
          link: "/app/operational/dailyincident",
          mode: "web",
          rgba: "rgba(0, 180, 216, 0.2)",
          icon: <ReportProblemIcon sx={{ color: "#00b4d8" }} />,
        },
        {
          menu: "Peraturan / Instruksi",
          link: "/app/operational/instruction",
          mode: "web",
          rgba: "rgba(248, 150, 30, 0.2)",
          icon: <IntegrationInstructionsIcon sx={{ color: "#f8961e" }} />,
        },
        {
          menu: "Materi Refreshing",
          link: "/app/operational/materialrefreshing",
          mode: "web",
          rgba: "rgba(127, 201, 107, 0.2)",
          icon: <AirplayIcon sx={{ color: "#7fc96b" }} />,
        },
      ];
      setMenuList(_data);
    //   const fetchData = async (data) => {
    //     const messageSupervisor = await getScheduleSupervisor(
    //       "Penyelia",
    //       moment(new Date()).format("YYYY-MM-DD"),
    //       profile._id
    //     );
    //     setMessageSPV(messageSupervisor[0].messageSPV);
    //     await fetchDataAssignmentMasinis();
    //   };
    //   fetchData();
    // }
  }, []);
  const [openDialog, setOpenDialog] = useState(false);

  const [timer, setTimer] = useState(10); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef(); // <-- React ref

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(async () => {
        // <-- set tick ref current value
        console.log("start", tick);
        setTimer((timer) => {
          if (timer < 1) {
            handleClose();
          }
          return timer - 1;
        });
        const response = await getDailyWorkById(localStorage.operational_id);
        console.log("response", response);
        if (response.status) {
          if (response.data.status === "Terima Tablet") {
            localStorage.removeItem("user");
            localStorage.removeItem("profile");
            await localStorage.removeItem("authtoken");
            localStorage.removeItem("operational_id");
            setInterval(false);
            window.location.reload();
          }
        }
      }, 5000);
    } else {
      clearInterval(tick.current); // <-- access tick ref current value
    }

    return () => clearInterval(tick.current); // <-- clear on unmount!
  }, [start]);

  const handleClose = () => {
    setOpenDialog(false);
    setStart(false);
  };

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          // pt: JSON.parse(localStorage.user)?.role === "traindriver" ? 10 : 13,
          pt:10
        }}>
        {/* <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            
          </Grid>
        </Grid> */}
        <Contact />

        <DialogModal
          fullWidth={true}
          open={openDialog}
          maxWidth={"sm"}
          title="Kode QR"
          content={
            <center>
              <QRCode value={dataDetailDaily._id} size={250} />
              <p>Nomor : {dataDetailDaily._id}</p>
            </center>
          }
          cancel={handleClose}
          valueCancel="Batal"
          submit={false}
        />

        <Box sx={{ flexGrow: 1, mt: 2 }}>
          {mode === "tablet" && (
            <>
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <ErrorIcon color="warning" />
                  <Typography sx={{ ml: 1 }}>Pesan Penyelia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container justifyContent={"space-between"}>
                    {dataScheduleSPV
                      .filter((item) => item?.messageSPV)
                      .map((item) => (
                        <Grid item md={2.5}>
                          <Grid container>
                            <Typography className={classes.littleTxt1}>
                              Nama
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.trainDriver?.name}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              NIK
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.trainDriver?.nik}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Kode
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.loopRouteTrain?.code}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Jam Dinas
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.loopRouteTrain?.start}-
                              {item?.loopRouteTrain?.end}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Pesan
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.messageSPV}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <ErrorIcon color="warning" />
                  <Typography sx={{ ml: 1 }}>
                    Catatan dinas sebelumnya
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {kaIncidentScheduleTrainDriver.length > 0
                    ? kaIncidentScheduleTrainDriver?.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            borderTop: "1px solid #ababab",
                            paddingBottom: 10,
                            paddingTop: 10,
                          }}>
                          <Grid container sx={{ alignItems: "center" }}>
                            <Grid item xs="2">
                              <div>
                                <Typography
                                  className={classes.littleTxt}
                                  xs={12}
                                  sm={12}
                                  md={12}>
                                  Nama
                                </Typography>
                                <Typography className={classes.bigTxt}>
                                  {item?.trainDriver?.name}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  className={classes.littleTxt}
                                  xs={12}
                                  sm={12}
                                  md={12}>
                                  NIK
                                </Typography>
                                <Typography className={classes.bigTxt}>
                                  {item?.trainDriver?.nik}
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs="1">
                              <div>
                                <Typography
                                  className={classes.littleTxt}
                                  xs={12}
                                  sm={12}
                                  md={12}>
                                  Jam Dinas
                                </Typography>
                                <Typography className={classes.bigTxt}>
                                  {item?.loopRouteTrain?.start}-
                                  {item?.loopRouteTrain?.end}
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs="1">
                              <div>
                                <Typography
                                  className={classes.littleTxt}
                                  xs={12}
                                  sm={12}
                                  md={12}>
                                  Kode
                                </Typography>
                                <Typography className={classes.bigTxt}>
                                  {item?.loopRouteTrain?.code}
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs="4">
                              <Grid container sx={{ alignItems: "center" }}>
                                <Grid item xs="auto">
                                  {item && item?.kaIncident?.length > 0
                                    ? item?.kaIncident
                                        .filter(
                                          (item) => item.title !== "image"
                                        )
                                        .map((itemka, indexka) => (
                                          <div key={indexka}>
                                            <div style={{ display: "flex" }}>
                                              <Typography>
                                                <small>
                                                  {indexka + 1}. {itemka?.title}{" "}
                                                  :
                                                </small>{" "}
                                              </Typography>
                                              <Typography>
                                                <small>
                                                  <i>{itemka?.value}</i>
                                                </small>{" "}
                                              </Typography>
                                            </div>
                                          </div>
                                        ))
                                    : ""}
                                </Grid>
                                <Grid item xs="auto" sx={{ pl: 2 }}>
                                  {item && item?.kaIncident?.length > 0
                                    ? item?.kaIncident.map(
                                        (itemka, indexka) => (
                                          <Grid container key={indexka}>
                                            {itemka.file?.length > 0
                                              ? itemka.file.map((img) => (
                                                  <img
                                                    src={
                                                      StaticVar.URL_PHOTO +
                                                      "/" +
                                                      img
                                                    }
                                                    style={{ height: 100 }}
                                                  />
                                                ))
                                              : ""}
                                          </Grid>
                                        )
                                      )
                                    : null}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      ))
                    : null}
                </AccordionDetails>
              </Accordion>
            </>
          )}
          {mode !== "tablet" && (
            <>
              <TextField
                value={messageSPV}
                onChange={(e) => setMessageSPV(e.target.value)}
                style={{ width: "100%", backgroundColor: "white" }}
                multiline={true}
                placeholder="Isi Pesan Untuk Masinis"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, mb: 1, mr: 1 }}
                onClick={async () => {
                  await putDataScheduleSupervisor(dataScheduleSPV[0]?._id, {
                    ...dataScheduleSPV[0],
                    messageSPV,
                  });
                  alert("Data Terkirim");
                }}>
                Submit
              </Button>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <ErrorIcon color="warning" />
                  <Typography sx={{ ml: 1 }}>
                    Pesan Perjalanan KA Masinis
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container justifyContent={"space-between"}>
                    {dataDailySchedule
                      .filter((item) => item?.message)
                      .map((item) => (
                        <Grid item md={2.5}>
                          <Grid container>
                            <Typography className={classes.littleTxt1}>
                              Nama
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.trainDriver?.name}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              NIK
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.trainDriver?.nik}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Kode
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.loopRouteTrain?.code}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Jam Dinas
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.loopRouteTrain?.start}-
                              {item?.loopRouteTrain?.end}
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Typography
                              className={classes.littleTxt1}
                              xs={12}
                              sm={12}
                              md={12}>
                              Pesan
                            </Typography>
                            <Typography className={classes.bigTxt}>
                              {item?.message}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          )}

          <Grid container sx={{ py: 3 }} spacing={2}>
            {menulist.map((item, i) => {
              return (
                <Grid item md="4" key={i}>
                  <div
                    onClick={() => {
                      let link = item.link;
                      if (
                        item.menu === "Serah Terima Tablet" &&
                        JSON.parse(localStorage.profile)?.jobrole !== "Penyelia"
                      ) {
                        if (item.menu === "Serah Terima Tablet") {
                          setOpenDialog(true);
                          if (item.menu === "Serah Terima Tablet") {
                            setTimer(10);
                            setStart(true);
                            // intervalHandOver = setInterval(()=>{console.log('check')}, 2000)
                          }
                        } else {
                          props.history.push(link);
                        }
                      } else {
                        props.history.push(link);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: 180,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      padding: "50px 30px 0 30px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#b3b3b3",
                        color: "gray",
                        border: "none",
                      },
                      "&.:selected": {
                        backgroundColor: "#b3b3b3",
                        color: "gray",
                      },
                    }}>
                    <div style={{ display: "block", textAlign: "center" }}>
                      <center>
                        <div
                          style={{
                            backgroundColor: `${item.rgba}`,
                            height: 30,
                            width: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                            borderRadius: 3,
                          }}>
                          {item.icon}
                        </div>
                        <Typography
                          sx={{
                            fontSize: 18,
                            color: "#000",
                          }}>
                          {item.menu}
                        </Typography>
                      </center>
                    </div>
                  </div>
                </Grid>
              );
            })}
            {/* <Grid item md="3">
              <a href="tel:+6281294167130">
              <div 
                style={{
                  width: '100%',
                  height: 180,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: '50px 30px 0 30px',
                  cursor: 'pointer',
                  "&:hover": {
                    backgroundColor: "#b3b3b3",
                    color: "gray",
                    border: "none",
                  },
                  "&.:selected": {
                    backgroundColor: "#b3b3b3",
                    color: "gray",
                  },
                }}
              >
                <div style={{display: 'block'}}>
                  <div style={{backgroundColor: "rgba(106, 4, 15,0.2)", height: 30, width: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 3}}>
                    <CalendarMonthIcon sx={{color: "#6a040f"}} />
                  </div>
                  <Typography sx={{ fontSize: 18, color: "#000", width: 120 }}>
                    Emergency Call Test
                  </Typography>
                </div>
              </div>
              </a>
              </Grid> */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
