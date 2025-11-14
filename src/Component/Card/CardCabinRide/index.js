import * as React from "react"
import {
    Typography,
    Container,
    Grid,
    Box,
    Paper,
    ButtonBase,
    Avatar
} from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import useStyles from "./Styles"

import moment from "moment"
// import logo
import org from "../../../Assets/Images/org.png"
import qrcode from "../../../Assets/Images/qrcode.png"
import QRCode from "react-qr-code"

import StaticVar from "../../../Config/StaticVar"

// import style
import { Img, paperContent, buttonImg, boxTittle, qr, qrImg } from "./Styles"

// data 1
function createData(text1, text2) {
    return { text1, text2 }
}

export default function Coba(props) {
    const classes = useStyles()
    let { trainDriver, dailyWorkTrainDriver } = props.profile
    let { startTime, finishTime, createdAt } = props.cabinride

    console.log("cabinride", props.cabinride)

    return (
        <>
            <Box maxWidth="xl" sx={{ mx: "2px" }}>
                {/* <Typography className={classes.mainTxt}>
          Form Pemeriksaan Kesehatan
        </Typography>
        <Typography className={classes.secondTxt}>Biodata Masinis</Typography> */}
                <Paper sx={paperContent}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.buttonImg}>
                                {trainDriver?.photo ? (
                                    <Avatar
                                        src={`${
                                            StaticVar.URL_API +
                                            "/upload/" +
                                            trainDriver.photo
                                        }`}
                                        sx={{
                                            ml: { xs: 5, md: 2 },
                                            width: { xs: 60, sm: 80, md: 100 },
                                            height: { xs: 60, sm: 80, md: 100 }
                                        }}
                                    />
                                ) : (
                                    <Avatar
                                        alt={"Foto Profil"}
                                        src=""
                                        sx={{ width: 100, height: 100 }}
                                    />
                                )}

                                {/* {org !== undefined ? (
                  <Img alt="complex" sx={{ m: "auto" }} src={org} />
                ) : (
                  <AccountCircleIcon />
                )} */}
                            </ButtonBase>
                        </Grid>

                        <Grid item xs={12} sm container>
                            {/* Box */}
                            <Box sx={(boxTittle, { m: "auto" })}>
                                <Grid
                                    spacing={1}
                                    container
                                    justifyContent="space-between"
                                    rowSpacing={2}
                                    // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    // sx={{ m: "auto" }}
                                >
                                    <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            Nama
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {trainDriver?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            jabatan
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {trainDriver?.jobrole}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            No. LRV
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {
                                                dailyWorkTrainDriver
                                                    ?.loopRouteTrain?.lrv
                                            }
                                        </Typography>
                                    </Grid> */}
                                    {/* <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            No. KA
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {
                                                dailyWorkTrainDriver
                                                    ?.loopRouteTrain?.code
                                            }
                                        </Typography>
                                    </Grid> */}
                                    <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            Tanggal
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {createdAt &&
                                                moment(createdAt).format(
                                                    "DD-MM-YYYY"
                                                )}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            Jam Mulai
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {/* {
                                                dailyWorkTrainDriver
                                                    ?.loopRouteTrain?.start
                                            } */}
                                            {createdAt &&
                                                moment(createdAt).format(
                                                    "HH:mm"
                                                )}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        // xs={1.5}
                                        sx={{ mt: 2, my: "auto" }}
                                    >
                                        <Typography
                                            className={classes.littleTxt}
                                            xs={12}
                                            md={12}
                                        >
                                            Jam Berakhir
                                        </Typography>
                                        <Typography className={classes.bigTxt}>
                                            {/* {
                                                dailyWorkTrainDriver
                                                    ?.loopRouteTrain?.end
                                            } */}
                                            {finishTime &&
                                                moment(finishTime).format(
                                                    "HH:mm"
                                                )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item ml={-25} sx={{ m: "auto" }}>
                            <Typography
                                className={classes.qr}
                                sx={{ ml: 0.5, mb: -3 }}
                            >
                                QRcode
                            </Typography>

                            {trainDriver?.nik && (
                                <QRCode
                                    style={{ qrImg }}
                                    value={trainDriver?.nik}
                                    size={80}
                                />
                            )}

                            {/* <Img
                                sx={qrImg}
                                className={classes.qrImg}
                                alt="complex"
                                src={qrcode}
                            /> */}
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
