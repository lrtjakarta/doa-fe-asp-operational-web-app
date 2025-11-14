import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useLetter from "Hooks/Letter/useLetter";
import { Images } from "Themes";
import html2pdf from "html2pdf.js";
import _ from "lodash";
import moment from "moment";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

import useStyles, {
  buttonAddStyle,
  tableTextCellStyle,
  tableTextCellStyle1,
  tableTextIsiStyle,
  tableTextIsiStyle1,
} from "./StyleTakeGive";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export default function TakeGiveSupervisor(props) {
  const classes = useStyles();

  const {
    dataScheduleTrainDriver,
    dataScheduleLastSupervisor,
    dataScheduleSupervisor,
    getDailyWork,
    startTime,
    endTime,
    putDailyWork,
    info,
  } = UseDailyWork();

  const { getDataLetter, filterLetter } = useLetter();

  const [loader, setLoader] = useState(false);

  const detailLetter = filterLetter.filter(
    (item) => item.type === "Serah Terima Penyelia"
  )[0];

  let opt = {
    margin: [
      // detailLetter?.padding,
      detailLetter?.padding,
      // detailLetter?.padding,
      detailLetter?.padding,
    ],
    filename: `serah-terima-penyelia-${moment().format("YYYYMMDDHHmmss")}.pdf`,
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
      format: [550, 480],
    },
  };

  let print = useRef();

  const handlePrint = () => {
    setLoader(true);
    setTimeout(() => {
      html2pdf().from(print.current).set(opt).save();
      setLoader(false);
    }, 10000);
  };

  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      const fetchData = async () => {
        await getDailyWork();
        await getDataLetter();
      };
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const Content = forwardRef((props, ref) => {
    return (
      <Box ref={ref} sx={{ height: 2050 }}>
        <center style={{ marginBottom: 10 }}>
          <Box>
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
                          height: 25,
                          marginRight: 5,
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <Typography sx={{ fontStyle: "italic", fontSize: 14 }}>
                        LRT
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 200,
                          fontStyle: "italic",
                        }}
                      >
                        JAKARTA
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "50%" }}>
                    <Typography
                      sx={{ textTransform: "uppercase", fontSize: 14 }}
                    >
                      {detailLetter?.numberHead}
                    </Typography>
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
                        <Typography sx={{ fontSize: 12 }}>
                          Nomor Dokumen
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1.6px solid #000000",
                          width: "25%",
                          py: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 12 }}>
                          {detailLetter?.numberHead}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1.6px solid #000000",
                          width: "15%",
                          py: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 12 }}>
                          Nomor Revisi
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1.6px solid #000000",
                          width: "15%",
                          py: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 12 }}>
                          {detailLetter?.revisionNumber}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1.6px solid #000000",
                          width: "10%",
                          py: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 12 }}>Halaman</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: "15%",
                          py: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 12 }}>
                          {detailLetter?.page}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </center>
        <Box
          sx={{
            justifyContent: "center",
            py: 1,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {detailLetter?.numberDoc}
          </Typography>
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item md={12}>
            <Typography>
              Hari / Tanggal :{" "}
              {moment(dataScheduleSupervisor?.dailyWorkDate).format(
                "DD-MM-YYYY"
              )}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <table>
              <tr>
                <td>1. Penyelia</td>
                <td>:</td>
                <td>{dataScheduleSupervisor?.trainDriver?.name}</td>
              </tr>
              <tr>
                <td>2. Dinasan</td>
                <td>:</td>
                <td>
                  {dataScheduleSupervisor?.loopRouteTrain?.code +
                    " - " +
                    dataScheduleSupervisor?.loopRouteTrain?.loop}
                </td>
              </tr>
              <tr>
                <td>3. Jam Dinasan</td>
                <td>:</td>
                <td>{startTime + " - " + endTime}</td>
              </tr>
            </table>
          </Grid>
          <Grid item md="6">
            <table>
              <tr>
                <td>1. Penyelia sebelumnya</td>
                <td>:</td>
                <td>{dataScheduleLastSupervisor?.trainDriver?.name}</td>
              </tr>
              <tr>
                <td>2. Dinasan sebelumnya</td>
                <td>:</td>
                <td>
                  {dataScheduleLastSupervisor?.loopRouteTrain?.code
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.code
                    : "" +
                      " - " +
                      dataScheduleLastSupervisor?.loopRouteTrain?.loop
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.loop
                    : ""}{" "}
                  pada{" "}
                  {moment(dataScheduleLastSupervisor?.dailyWorkDate).format(
                    "DD-MM-YYYY"
                  )}
                </td>
              </tr>
              <tr>
                <td>3. Jam Dinasan</td>
                <td>:</td>
                <td>
                  {dataScheduleLastSupervisor?.loopRouteTrain?.start
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.start
                    : "" +
                      " - " +
                      dataScheduleLastSupervisor?.loopRouteTrain?.end
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.end
                    : ""}
                </td>
              </tr>
            </table>
          </Grid>

          {
            //dataScheduleLastSupervisor?.completeState ?
            <Grid item md={12}>
              <Table sx={{ borderRadius: 3, mb: 3 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell style={tableTextCellStyle1}>No.</TableCell>
                    <TableCell style={tableTextCellStyle1} align="left">
                      Nama ASP
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      Kode Dinas
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      Loop
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      Mulai Dinas
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      Habis Dinas
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      Nomor KA
                    </TableCell>
                    <TableCell style={tableTextCellStyle1} align="center">
                      No.LRV
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_.orderBy(
                    dataScheduleTrainDriver,
                    ["loopRouteTrain.code", "loopRouteTrain.loop"],
                    ["asc", "asc"]
                  ).map((item, index) => {
                    return (
                      <TableRow
                        key={index++}
                        // sx={{
                        //   borderSpacing: '5px',
                        //   borderBottom: '30',
                        //   borderRadius: 3,
                        // }}
                        style={{
                          borderCollapse: "seperate",
                          //borderSpacing: '5px',
                          backgroundColor: "#F3F3F3",
                          border: "5px solid #F6F7FF",
                        }}
                      >
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="left">
                          {item?.trainDriver?.name}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {item?.loopRouteTrain?.code}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {item?.loopRouteTrain?.loop}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {item?.loopRouteTrain?.start}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {item?.loopRouteTrain?.end}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="left">
                          {item?.loopRouteTrain?.route.map((itemTrain) => {
                            return (
                              <span
                                style={{
                                  padding: 2,
                                  margin: 2,
                                  backgroundColor: "#CFCFCF",
                                }}
                              >
                                {itemTrain?.trainNumber}
                              </span>
                            );
                          })}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle1} align="center">
                          {item?.LRVList?.map((itemLRV) => {
                            return (
                              <span
                                style={{
                                  padding: 2,
                                  margin: 2,
                                  backgroundColor: "#CFCFCF",
                                }}
                              >
                                LRV No.{itemLRV}
                              </span>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Typography variant="h6">
                Catatan Kondisi Perka sebelumnya
              </Typography>
              <Alert severity="info">
                {dataScheduleLastSupervisor?.noteLRV}
              </Alert>

              <Grid container justifyContent={"space-between"} sx={{ mt: 5 }}>
                <div>
                  <p align="center">Penyelia Sebelumnya</p>
                  <p align="center">
                    {dataScheduleLastSupervisor?.trainDriver?.nik ? (
                      <QRCode
                        value={
                          dataScheduleLastSupervisor?.trainDriver?.nik
                            ? dataScheduleLastSupervisor?.trainDriver?.nik
                            : "-"
                        }
                        size={100}
                      />
                    ) : (
                      ""
                    )}
                  </p>
                  <p align="center" className={classes.grayGridTxt}>
                    {dataScheduleLastSupervisor?.trainDriver?.name}
                    <br />
                    NIK : {dataScheduleLastSupervisor?.trainDriver?.nik}
                  </p>
                </div>
                <div>
                  <p align="center">Penyelia Saat Ini</p>
                  <p align="center">
                    {dataScheduleSupervisor?.trainDriver?.nik ? (
                      <QRCode
                        value={
                          dataScheduleSupervisor?.trainDriver?.nik
                            ? dataScheduleSupervisor?.trainDriver?.nik
                            : "-"
                        }
                        size={100}
                      />
                    ) : (
                      ""
                    )}
                  </p>
                  <p align="center" className={classes.grayGridTxt}>
                    {dataScheduleSupervisor?.trainDriver?.name}
                    <br />
                    NIK : {dataScheduleSupervisor?.trainDriver?.nik}
                  </p>
                </div>
              </Grid>
            </Grid>
          }
        </Grid>
      </Box>
    );
  });

  return (
    <Container sx={{ mt: 3 }} maxWidth="xl">
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container justifyContent={"space-between"}>
        <div>
          <Typography variant="h5">TIMBANG TERIMA DINAS PENYELIA</Typography>
        </div>

        <div>
          <Button variant="contained" sx={buttonAddStyle} onClick={handlePrint}>
            Print PDF
          </Button>
        </div>
      </Grid>
      <div className="print-source">
        <Content ref={print} />
      </div>
      {info === "" ? (
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item md={12}>
            <Typography>
              Hari / Tanggal :{" "}
              {moment(dataScheduleSupervisor?.dailyWorkDate).format(
                "DD-MM-YYYY"
              )}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <table>
              <tr>
                <td>1. Penyelia</td>
                <td>:</td>
                <td>{dataScheduleSupervisor?.trainDriver?.name}</td>
              </tr>
              <tr>
                <td>2. Dinasan</td>
                <td>:</td>
                <td>
                  {dataScheduleSupervisor?.loopRouteTrain?.code +
                    " - " +
                    dataScheduleSupervisor?.loopRouteTrain?.loop}
                </td>
              </tr>
              <tr>
                <td>3. Jam Dinasan</td>
                <td>:</td>
                <td>{startTime + " - " + endTime}</td>
              </tr>
            </table>
          </Grid>
          <Grid item md="6">
            <table>
              <tr>
                <td>1. Penyelia sebelumnya</td>
                <td>:</td>
                <td>{dataScheduleLastSupervisor?.trainDriver?.name}</td>
              </tr>
              <tr>
                <td>2. Dinasan sebelumnya</td>
                <td>:</td>
                <td>
                  {dataScheduleLastSupervisor?.loopRouteTrain?.code
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.code
                    : "" +
                      " - " +
                      dataScheduleLastSupervisor?.loopRouteTrain?.loop
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.loop
                    : ""}{" "}
                  pada{" "}
                  {moment(dataScheduleLastSupervisor?.dailyWorkDate).format(
                    "DD-MM-YYYY"
                  )}
                </td>
              </tr>
              <tr>
                <td>3. Jam Dinasan</td>
                <td>:</td>
                <td>
                  {dataScheduleLastSupervisor?.loopRouteTrain?.start
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.start
                    : "" +
                      " - " +
                      dataScheduleLastSupervisor?.loopRouteTrain?.end
                    ? dataScheduleLastSupervisor?.loopRouteTrain?.end
                    : ""}
                </td>
              </tr>
            </table>
          </Grid>

          {
            //dataScheduleLastSupervisor?.completeState ?
            <Grid item md={12}>
              <Typography
                variant="h5"
                align="center"
                style={{
                  padding: 2,
                  backgroundColor: "#C4C4C4",
                  marginBottom: 1,
                }}
              >
                Table Dinas Masinis{" "}
                {moment(dataScheduleLastSupervisor?.dailyWorkDate).format(
                  "DD-MM-YYYY"
                )}
              </Typography>
              <Table sx={{ borderRadius: 3, mb: 3 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#C4C4C4" }}>
                    <TableCell style={tableTextCellStyle}>No.</TableCell>
                    <TableCell style={tableTextCellStyle} align="left">
                      Nama ASP
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      Kode Dinas
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
                    <TableCell style={tableTextCellStyle} align="center">
                      Nomor KA
                    </TableCell>
                    <TableCell style={tableTextCellStyle} align="center">
                      No.LRV
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_.orderBy(
                    dataScheduleTrainDriver,
                    ["loopRouteTrain.code", "loopRouteTrain.loop"],
                    ["asc", "asc"]
                  ).map((item, index) => {
                    return (
                      <TableRow
                        key={index++}
                        // sx={{
                        //   borderSpacing: '5px',
                        //   borderBottom: '30',
                        //   borderRadius: 3,
                        // }}
                        style={{
                          borderCollapse: "seperate",
                          //borderSpacing: '5px',
                          backgroundColor: "#F3F3F3",
                          border: "5px solid #F6F7FF",
                        }}
                      >
                        <TableCell style={tableTextIsiStyle} align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="left">
                          {item?.trainDriver?.name}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.loopRouteTrain?.code}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.loopRouteTrain?.loop}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.loopRouteTrain?.start}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.loopRouteTrain?.end}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="left">
                          {item?.loopRouteTrain?.route.map((itemTrain) => {
                            return (
                              <span
                                style={{
                                  padding: 2,
                                  margin: 2,
                                  backgroundColor: "#CFCFCF",
                                }}
                              >
                                {itemTrain?.trainNumber}
                              </span>
                            );
                          })}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align="center">
                          {item?.LRVList?.map((itemLRV) => {
                            return (
                              <span
                                style={{
                                  padding: 2,
                                  margin: 2,
                                  backgroundColor: "#CFCFCF",
                                }}
                              >
                                LRV No.{itemLRV}
                              </span>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Typography variant="h6">
                Catatan Kondisi Perka sebelumnya
              </Typography>
              <Alert severity="info">
                {dataScheduleLastSupervisor?.noteLRV}
              </Alert>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, fontSize: 15 }}
                onClick={async () => {
                  console.log("_id", dataScheduleSupervisor?._id);

                  const datapost = {
                    readTakeGive: true,
                    handOverWork: {
                      handOverWorkId: dataScheduleLastSupervisor?._id,
                      dailyWorkDate: dataScheduleLastSupervisor?.dailyWorkDate,
                      trainDriver: dataScheduleLastSupervisor?.trainDriver,
                      loopRouteTrain:
                        dataScheduleLastSupervisor?.loopRouteTrain,
                      handOverTime: new Date(),
                      handOverNote: dataScheduleLastSupervisor?.noteLRV,
                      hamdOverReport: {},
                    },
                  };
                  console.log("datapost", datapost);
                  let datarespon = await putDailyWork(
                    dataScheduleSupervisor?._id,
                    datapost
                  );
                  if (datarespon.status) {
                    window.location.reload();
                  }
                }}
              >
                Terima Kedinasan
              </Button>
            </Grid>
            // :
            // <Grid item md={12}>
            //     <Alert severity="info" sx={{mt:2, mb:2}}>
            //         <Typography variant="h6">Harap bersabar menunggu. Penyelia sebelumnya belum menyelesaikan tugas kedinasan. Jam dinas Penyelia sebelumnya mulai {dataScheduleLastSupervisor?.loopRouteTrain?.start + " sampai " + dataScheduleLastSupervisor?.loopRouteTrain?.end} </Typography>
            //     </Alert>
            // </Grid>
          }
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6">{info}</Typography>
        </Alert>
      )}
    </Container>
  );
}
