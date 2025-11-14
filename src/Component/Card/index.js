import {
  Avatar,
  Box,
  ButtonBase,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import useStyles from "./Styles";

// import style
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import QRCode from "react-qr-code";
import StaticVar from "../../Config/StaticVar";
import { ProfileContext, UserProfilContext } from "../../Context/index";
import { paperContent } from "./Styles";

export default function Coba(props) {
  const classes = useStyles();
  const { getProfileUser } = useContext(ProfileContext);
  const { getDailyWorkByTrainDriver, getDailyWorkById, dataDetailDaily } =
    UseDailyWork();
  const { getUserProfilById, userProfile, userWorkorder } =
    useContext(UserProfilContext);
  const { getDetailTrainDriver } = useTrainDriver();
  const [profile, setProfile] = useState({});
  const [dailywork, setDailyWork] = useState({});
  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.access_token);
    const id = decodedToken.id;
    getUserProfilById(id, { date: new Date() });

    // if (props.type === "traindriver") {
    //   getDetailTrainDriver(props.nik).then(async (data) => {
    //     setProfile(data);
    //     console.log("data profile driver", props.nik, data);
    //     if (localStorage.operational_id) {
    //       let _dailywork = await getDailyWorkById(localStorage.operational_id);
    //       console.log("dailywork operational", _dailywork);
    //       if (_dailywork.status) {
    //         setDailyWork(_dailywork.data);
    //       }
    //     } else {
    //       let _dailywork = await getDailyWorkByTrainDriver(
    //         data._id,
    //         moment().format("YYYY-MM-DD")
    //       );
    //       console.log("dailywork", _dailywork);
    //       if (_dailywork && _dailywork.length > 0) {
    //         setDailyWork(_dailywork[0]);
    //       }
    //     }
    //   });
    // } else {
    //   getProfileUser().then(async (data) => {
    //     setProfile(data);
    //     console.log("data profile user", data);
    //     if (localStorage.operational_id) {
    //       let _dailywork = await getDailyWorkById(localStorage.operational_id);
    //       console.log("dailywork operational", _dailywork);
    //       if (_dailywork.status) {
    //         setDailyWork(_dailywork.data);
    //       }
    //     } else {
    //       let _dailywork = await getDailyWorkByTrainDriver(
    //         data._id,
    //         moment().format("YYYY-MM-DD")
    //       );
    //       console.log("dailywork", _dailywork);
    //       if (_dailywork && _dailywork.length > 0) {
    //         setDailyWork(_dailywork[0]);
    //       }
    //     }
    //   });
    // }
  }, []);
  // console.log("daily work", userProfile);
  return (
    <>
      <Paper sx={paperContent}>
        {props.small ? (
          <Grid container columns={12} alignItems="center" spacing={1}>
            <Grid item xs={4} sm={2}>
              <ButtonBase className={classes.buttonImg}>
                <Avatar
                  alt={dailywork?.officerName}
                  src={StaticVar.URL_API + "/" + dailywork?.trainDriver?.photo}
                  style={{ width: 40, height: 40 }}
                />
              </ButtonBase>
            </Grid>

            <Grid item xs={5} sm={4}>
              <Grid container>
                <Grid item xs="auto">
                  <Typography
                    className={classes.littleTxt}
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    Nama
                  </Typography>
                  <Typography className={classes.bigTxt}>
                    {userProfile?.officerName || "-"}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    className={classes.littleTxt}
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    NIK
                  </Typography>
                  <Typography className={classes.bigTxt}>
                    {userProfile?.officerNumber || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={2}>
              <Grid container>
                <Grid item xs="auto">
                  <Grid container>
                    <Typography className={classes.littleTxt1}>Kode</Typography>
                    <Typography className={classes.bigTxt1}>
                      {userWorkorder?.workOrder?.code}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs="auto">
                  <Grid container>
                    <Typography className={classes.littleTxt1}>LRV</Typography>
                    <Typography className={classes.bigTxt1}>
                      {dataDetailDaily?.LRVList &&
                      dataDetailDaily?.LRVList.length > 0
                        ? dataDetailDaily?.LRVList.map((item) => item)
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs="auto">
                  <Grid container>
                    <Typography className={classes.littleTxt1}>Loop</Typography>
                    <Typography className={classes.bigTxt1}>
                      {dataDetailDaily?.loopRouteTrain?.loop}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Hidden only={["xs"]}>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs="auto">
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      Jam Dinas
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {userWorkorder?.workOrder?.start}-
                      {userWorkorder?.workOrder?.end}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      Nomor KA
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {
                        dataDetailDaily?.loopRouteTrain?.route.filter(
                          (x) => x.status !== "Finish"
                        )[0]?.trainNumber
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        ) : (
          <Grid container alignItems="center" sx={{ height: 128 }} spacing={2}>
            <Grid item>
              <Avatar
                alt={userProfile?.officerName}
                src={StaticVar.URL_PHOTO + "/" + userProfile?.photo}
                style={{ width: 80, height: 80 }}
              />
            </Grid>

            <Grid item md={2} xs={2}>
              <Box>
                <Typography className={classes.littleTxt} xs={12} md={12}>
                  Nama
                </Typography>
                <Typography className={classes.bigTxt}>
                  {userProfile?.officerName || "-"}
                </Typography>
                <Typography className={classes.littleTxt} xs={12} md={12}>
                  NIK
                </Typography>
                <Typography className={classes.bigTxt}>
                  {userProfile?.officerNumber || "-"}
                </Typography>
              </Box>
            </Grid>

            <Grid item md={3} xs={3}>
              <Typography sx={{ color: "#b3b3b3", textAlign: "center" }}>
                Jam Dinas
              </Typography>

              <Typography
                sx={{ fontSize: 30, color: "#000", textAlign: "center" }}
              >
                {userWorkorder?.workOrder?.start}-
                {userWorkorder?.workOrder?.end}
              </Typography>
            </Grid>

            <Grid item md={2} xs={2}>
              <Grid container sx={{ justifyContent: "center" }}>
                <div>
                  {profile.jobrole === "Penyelia" ? (
                    <QRCode value={profile?._id} size={100} />
                  ) : (
                    <>
                      <Typography
                        sx={{ color: "#b3b3b3", textAlign: "center" }}
                      >
                        Nomor KA
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 30,
                          color: "#000",
                          textAlign: "center",
                        }}
                      >
                        {dailywork?.loopRouteTrain?.route.filter(
                          (x) => x.status === ""
                        )[0]?.trainNumber
                          ? dailywork?.loopRouteTrain?.route.filter(
                              (x) => x.status === ""
                            )[0]?.trainNumber
                          : "-"}
                      </Typography>
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}
