import {
  Backdrop,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import StaticVar from "Config/StaticVar";
import { useUserProfile } from "Context/UserProfile";
import UseCoaching from "Hooks/Coaching/useCoaching";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import useUploadImg from "Hooks/Upload/useUploadImg";
import html2pdf from "html2pdf.js";
import moment from "moment";
import { forwardRef, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import NotFound from "../../Assets/Images/NotFound.png";
import Contact from "../../Component/Card/index";
import FormCoaching from "./Form";
import useStyles from "./Styles";

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

export default function Coaching() {
  const classes = useStyles();
  const history = useHistory();

  const {
    handleSelect,
    selectedData,
    handleClose,
    getDataCoaching,
    openDialog,
    handleFilterDate,
    date,
    handleDelete,
    coaching,
  } = UseCoaching();

  const { userById } = useUserProfile();

  const { setLoader, loader } = useUploadImg();

  const { getDailyWorkByTrainDriver } = UseDailyWork();

  var element = useRef([]);
  var opt = {
    filename: `coaching-${moment().format("YYYYMMDDHHmmss")}.pdf`,
    html2canvas: {
      dpi: 300,
      letterRendering: true,
      useCORS: true,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };

  const handlePrint = async (condition) => {
    switch (condition) {
      case 1:
        setTimeout(() => {
          setLoader(false);
          if (element?.current.length > 0) {
            element.current.map((item, index) =>
              html2pdf().from(element.current[index]).set(opt).save()
            );
          }
        }, 5000);
        break;
      default:
        html2pdf().from(element.current[0]).set(opt).save();
        break;
    }
  };

  const Content = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <FormCoaching dataDetail={props?.dataDetail} action="detail" />
        {/* <CoachingFormTemplate dataDetail={props?.dataDetail} /> */}
      </div>
    );
  });

  const fetchData = async () => {
    let createAt = moment().format("YYYY-MM-DD");
    let monthly = moment().format("YYYY-MM");
    let createBy = userById?._id;
    await getDailyWorkByTrainDriver(createBy, createAt);
    // if (
    //   Array.isArray(userById?.role) &&
    //   userById?.role[0]?.name?.toLowerCase() === "supervisor"
    // ) {
    //   getDataCoaching({ monthly });
    // }
    getDataCoaching({ monthly });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      ``
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent sx={{ width: 600 }}>
          <Typography>
            Apakah anda yakin menghapus Coaching dengan Kategori :{" "}
            {selectedData?.categoryCoaching} , Fase :{" "}
            {selectedData?.phaseCoaching}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              color: "#000",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Tutup
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      {/* Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={"print-source"}>
        {coaching?.length > 0
          ? coaching.map((row, index) => (
              <Content
                ref={(el) => {
                  element.current[index] = el;
                }}
                dataDetail={row}
              />
            ))
          : null}
      </div>
      <Container maxWidth="xl" sx={{ pt: 13 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} sx={{ paddingRight: "20px" }}>
            <Contact />
          </Grid>
        </Grid>
      </Container>
      <div
        style={{
          width: "100%",
          backgroundColor: "#A2A2A2",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: 15 }}>Coaching</Typography>
      </div>
      {/* {JSON.parse(localStorage.getItem("user"))?.role === "supervisor" && (
      )} */}
      <Container maxWidth="xl" sx={{ mt: 2, pb: 5 }}>
        <Grid container justifyContent={"flex-end"}>
          <div style={{ marginRight: 10 }}>
            <Grid container justifyContent={"flex-end"} alignItems="center">
              <Typography sx={{ mb: 2, mr: 1 }}>Pilih Bulan : </Typography>
              <TextField
                type="month"
                value={date}
                InputProps={{
                  style: {
                    width: 300,
                    fontSize: 12,
                    height: 33,
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: 7,
                    boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                  },
                }}
                sx={{
                  width: 300,
                  mb: 2,
                }}
                onChange={handleFilterDate}
              />
            </Grid>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={async () => {
                setLoader(true);
                await handlePrint(1);
              }}
            >
              Download
            </Button>
          </div>
          <div>
            <Grid container justifyContent={"flex-end"} alignItems="center">
              <Button
                onClick={async () => {
                  // const response = await submitDataCoaching()
                  // console.log('first', response)
                  // if (response.status === 'OK') {
                  history.push("/app/operational/coaching/form?action=add");
                  // }
                }}
                variant="contained"
                sx={{ mb: 2, width: 150, textDecoration: "none" }}
              >
                Tambah
              </Button>
            </Grid>
          </div>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width={20}>No.</StyledTableCell>
                <StyledTableCell align="left" width={200}>
                  Coaching
                </StyledTableCell>
                <StyledTableCell align="left" width={120}>
                  Tentang
                </StyledTableCell>
                <StyledTableCell align="left" width={270}>
                  Tanggal
                </StyledTableCell>
                <StyledTableCell align="left" width={200}>
                  Foto
                </StyledTableCell>
                <StyledTableCell align="left" width={150}>
                  Log
                </StyledTableCell>
                <StyledTableCell align="center" width={50}>
                  Aksi
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coaching?.length > 0 ? (
                coaching.map((row, index) => {
                  return (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Penyelia : {row?.supervisor?.name}
                        <br />
                        NIK : {row?.supervisor?.nik}
                        <br />
                        <br />
                        Masinis : {row?.trainDriver?.name}
                        <br />
                        NIK : {row?.trainDriver?.nik}
                        <br />
                        <br />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography>
                          Kategori : {row?.categoryCoaching}
                        </Typography>
                        <Typography>Fase : {row?.phaseCoaching}</Typography>
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        <Typography>
                          Tanggal Dibuat : <br />
                          {row?.createdAt
                            ? moment(row?.createdAt).format("DD-MM-YYYY HH:mm")
                            : "-"}{" "}
                          WIB
                        </Typography>
                        <Typography>
                          Tanggal dan Waktu Pelatihan : <br />
                          {row?.dateCoaching
                            ? moment(row?.dateCoaching).format("DD-MM-YYYY")
                            : "-"}{" "}
                          - {row?.timeCoaching} WIB
                        </Typography>
                        {
                          <Typography>
                            Tanggal Rencana Review : <br />
                            {row?.reviewPlan
                              ? moment(row?.reviewPlan).format("DD-MM-YYYY")
                              : "-"}
                          </Typography>
                        }
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Grid container>
                          {row?.file.length > 0
                            ? row?.file.map((item, index) => (
                                <CardMedia
                                  key={index}
                                  component="img"
                                  sx={{ width: 100, mr: 1, maxHeight: 70 }}
                                  image={
                                    item
                                      ? StaticVar.URL_API +
                                        "/uploads" +
                                        item?.split("./uploads")[1]
                                      : NotFound
                                  }
                                  onError={(e) => (
                                    (e.target.onerror = null),
                                    (e.target.src = NotFound)
                                  )}
                                  alt="Foto Riwayat"
                                />
                              ))
                            : null}
                        </Grid>
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        Dibuat Oleh : <br /> <i>{row?.createBy?.name}</i>
                        <br />
                        pada tanggal : <br />{" "}
                        <i>
                          {moment(row?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        </i>
                        <br />
                        {row?.updated ? "Diperbarui :" : null}
                        <br />
                        <i>
                          {" "}
                          {row?.updated
                            ? moment(row?.updated).format("DD-MM-YYYY HH:mm:ss")
                            : null}
                        </i>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          sx={{ mt: 1, color: "#fff", width: 100 }}
                          variant="contained"
                          onClick={() =>
                            history.push(
                              "/app/operational/coaching/form?id=" +
                                row?._id +
                                "&action=detail"
                            )
                          }
                        >
                          Detail
                        </Button>
                        {row?.createBy?._id === userById?._id ? (
                          <>
                            <Button
                              sx={{ mt: 1, color: "#fff", width: 100 }}
                              variant="contained"
                              color="warning"
                              onClick={() =>
                                history.push(
                                  "/app/operational/coaching/form?id=" +
                                    row?._id +
                                    "&action=edit"
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              sx={{ mt: 1, color: "#fff", width: 100 }}
                              variant="contained"
                              color="error"
                              onClick={() => handleSelect(row)}
                            >
                              Hapus
                            </Button>
                          </>
                        ) : null}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    colSpan={9}
                  >
                    Tidak ada data
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

{
  /*  */
}
