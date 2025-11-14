import { Avatar, ButtonBase, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// import style
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import moment from "moment";
import QRCode from "react-qr-code";
import StaticVar from "../../../Config/StaticVar";
import { ProfileContext } from "../../../Context/index";
import useStyles, { paperContent } from "../Styles";

export default function CardDetailMonthly(props) {
  const classes = useStyles();
  const { getProfileUser } = useContext(ProfileContext);
  const { getDailyWorkByTrainDriver, getDailyWorkById } = UseDailyWork();
  const { getDetailTrainDriver } = useTrainDriver();
  const [profile, setProfile] = useState({});
  const [dailywork, setDailyWork] = useState({});
  useEffect(() => {
    if (props.search) {
      getDetailTrainDriver(props.nik).then(async (data) => {
        if (data) {
          setProfile(data);
          let _dailywork = await getDailyWorkByTrainDriver(data._id);
          console.log("daily work", _dailywork);
          if (_dailywork && _dailywork.length > 0) {
            let dailyWR = _dailywork.filter(
              (val) => val.loopRouteTrain?.route?.length > 0
            );
            setDailyWork(dailyWR[0]);
          }
        }
      });
    }
  }, [props.search, props.nik]);

  let imgPict = "";
  if (profile?.imgPict?.length > 0) {
    imgPict = `${StaticVar.URL_PHOTO}/${profile?.imgPict[0]?.path}/${profile?.imgPict[0]?.uploadedName}`;
  }

  return (
    <>
      <Paper sx={paperContent}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <ButtonBase className={classes.buttonImg}>
              <Avatar
                alt={profile?.name}
                src={imgPict}
                style={{ width: 80, height: 80 }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.littleTxt} xs={12} md={12}>
              Nama
            </Typography>
            <Typography className={classes.bigTxt}>
              {profile?.name || "-"}
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography className={classes.littleTxt} xs={12} md={12}>
              NIK
            </Typography>
            <Typography className={classes.bigTxt}>
              {profile?.idNumber || "-"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.littleTxt} xs={12} md={12}>
              Tempat/Tanggal Lahir
            </Typography>
            {profile?.birth?.place ? (
              <Typography className={classes.bigTxt}>
                {profile?.birth?.place +
                  "," +
                  moment(profile?.birth?.date).format("DD/MM/YYYY") || "-"}
              </Typography>
            ) : (
              "-"
            )}
          </Grid>
          <Grid item xs={1.5}>
            <Typography className={classes.littleTxt} xs={12} md={12}>
              Jenis Kelamin
            </Typography>
            {profile?.gender ? (
              <Typography className={classes.bigTxt}>
                {profile?.gender || "-"}
              </Typography>
            ) : (
              "-"
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.littleTxt} xs={12} md={12}>
              Email
            </Typography>
            {profile?.email ? (
              <Typography className={classes.bigTxt}>
                {profile?.email || "-"}
              </Typography>
            ) : (
              "-"
            )}
          </Grid>
          <Grid item xs={2}>
            <Grid container></Grid>
            {props.nik ? <QRCode value={props.nik} size={100} /> : null}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
