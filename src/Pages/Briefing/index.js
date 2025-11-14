import CollectionsIcon from "@mui/icons-material/Collections";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Snackbar,
  Stack,
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
import { forwardRef, useEffect, useRef } from "react";
import NotFound from "../../Assets/Images/NotFound.png";

//styles
import {
  AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import StaticVar from "Config/StaticVar";
import useUploadImg from "Hooks/Upload/useUploadImg";
import Contact from "../../Component/Card/index";
import useStyles, { noteStyles } from "./Styles";

import UseBriefing from "Hooks/Briefing/useBriefing";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import html2pdf from "html2pdf.js";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { submitBtnStyle } from "./Styles";

import { useUserProfile } from "Context/UserProfile";
import moment from "moment";

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

export default function Briefing() {
  const classes = useStyles();

  const {
    handleMultiInputImage,
    multiUploadedImage,
    multiImage,
    setMultiImage,
    handleMultiUploadImgBase,
    dialogDelete,
    handleDeleteImage,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
    dialogUpload,
    handleCloseDialogUpload,
    loader,
    setLoader,
    openImg,
    setOpenImg,
    openCamera,
    setOpenCamera,
  } = useUploadImg();

  const { userById, profileData } = useUserProfile();
  const role =
    Array.isArray(userById.role) &&
    userById.role?.find((r) => r?.hasOwnProperty("name"))
      ? userById.role[0].name
      : "";

  const {
    text,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
    setText,
    setOpenSnackbar,
    openSnackbar,
    dataBriefing,
    handleSelect,
    selectedData,
    handleClose,
    getDataBriefing,
    openDialog,
    updateDataBriefing,
    submitnewdata,
  } = UseBriefing();

  const { dataScheduleTrainDriver, getDataScheduleTrainDriver } =
    UseDailyWork();
  const fetchData = async () => {
    let today = moment().format("YYYY-MM-DD");
    let querySend = {};
    let id = userById.profileId;
    await getDataScheduleTrainDriver({
      params: { trainDriverId: id, dailyWorkDate: today },
    });
    if (filterStartDate && filterEndDate) {
      querySend = {
        ...querySend,
        startDate: filterStartDate,
        endDate: filterEndDate,
      };
    } else if (filterStartDate) {
      querySend = { ...querySend, startDate: filterStartDate, endDate: today };
    } else if (filterEndDate) {
      querySend = { ...querySend, startDate: today, endDate: filterEndDate };
    } else {
      querySend = { ...querySend, startDate: today, endDate: today };
    }

    if (role !== "Masinis") {
      getDataBriefing(querySend);
    } else {
      const getdata = await getDataBriefing(querySend);
      if (getdata?.result.length > 0) {
        setText(getdata?.result[0]?.note);
        setMultiImage(getdata?.result[0].file);
      }
    }
  };

  console.log("data sche", dataScheduleTrainDriver);
  var element = useRef([]);
  var opt = {
    filename: `briefing-${moment().format("YYYYMMDDHHmmss")}.pdf`,
    html2canvas: { dpi: 300, letterRendering: true, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const handlePrint = async (condition) => {
    switch (condition) {
      case 1:
        setTimeout(() => {
          setLoader(false);
          console.log("element.current", element.current);
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

  useEffect(() => {
    fetchData();
  }, []);

  const Content = forwardRef((props, ref) => {
    const { dataDetail, hidden } = props;

    return (
      <DialogContent
        ref={ref}
        sx={
          dataDetail?.file?.length
            ? { width: 320 * dataDetail?.file?.length }
            : { width: 400 }
        }
      >
        {dataDetail?.file && (
          <Grid container spacing={2}>
            {dataDetail?.file?.map((item, i) => (
              <>
                <div key={i}>
                  <img
                    src={
                      StaticVar.URL_API +
                      "/uploads" +
                      item?.split("./uploads")[1]
                    }
                    alt={"Preview"}
                    width={290}
                    style={{ maxHeight: 350 }}
                    loading="lazy"
                    onError={(e) => (
                      (e.target.onerror = null), (e.target.src = NotFound)
                    )}
                  />
                </div>
              </>
            ))}
          </Grid>
        )}
        <div>
          <Grid container>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    Dibuat Oleh
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail.createBy?.name
                      ? dataDetail.createBy?.name
                      : "-"}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    NIK
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail.createBy?.idNumber
                      ? dataDetail.createBy?.idNumber
                      : ""}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    Kode
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail.dailyWorkTrainDriver?.loopRouteTrain?.code}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    No LRV
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail.dailyWorkTrainDriver?.LRVNumber}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    No KA
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {
                      dataDetail.dailyWorkTrainDriver?.loopRouteTrain?.route[0]
                        ?.trainNumber
                    }
                  </Typography>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    Tanggal
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {moment(
                      dataDetail?.dailyWorkTrainDriver?.dailyWorkDate
                    ).format("DD-MM-YYYY")}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    Jam Mulai
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail?.dailyWorkTrainDriver?.loopRouteTrain?.start}
                  </Typography>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Typography sx={{ fontSize: 13, color: "#b3b3b3", mr: 1 }}>
                    Jam Selesai
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dataDetail?.dailyWorkTrainDriver?.loopRouteTrain?.end}
                  </Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <div>
            <Typography sx={{ fontSize: 13, color: "#b3b3b3" }}>
              Catatan:
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {dataDetail?.note ? dataDetail?.note : "Tidak ada catatan"}
              <br />
            </Typography>
          </div>
        </div>
      </DialogContent>
    );
  });

  return (
    <>
      {/* Dialog Detail */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Content
          ref={(el) => {
            element.current[0] = el;
          }}
          dataDetail={selectedData}
        />
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: "#BB7E36",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      <div className={"print-source"}>
        {dataBriefing?.length > 0
          ? dataBriefing.map((row, index) => (
              <Content
                ref={(el) => {
                  element.current[index] = el;
                }}
                dataDetail={row}
              />
            ))
          : null}
      </div>

      {/* Snackbar */}
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Berhasil Mengirim Data Briefing
        </Alert>
      </Snackbar>

      {/* Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Dialog Hapus */}
      <Dialog
        open={dialogDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="delete-verification"
        aria-describedby="delete-verification"
      >
        <DialogTitle id="delete-verification">
          {"Apakah Anda yakin ingin menghapus gambar ini?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>Batal</Button>
          <Button onClick={handleDeleteImage} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Pilihan Upload */}
      <Dialog
        open={dialogUpload}
        onClose={handleCloseDialogUpload}
        aria-labelledby="upload-options"
        aria-describedby="upload-options"
      >
        <DialogContent>
          <Button onClick={handleMultiInputImage}>Pilih Gambar</Button>
          <Button>Ambil Gambar</Button>
        </DialogContent>
      </Dialog>

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
        <Typography sx={{ color: "#fff", fontSize: 15 }}>Briefing</Typography>
      </div>
      {/* {
          JSON.stringify(dataBriefing.map(x=>{return({_id:x._id, file: x.file, createdAt: x.createdAt, note:x.note})}))
        } */}
      {role === "Masinis" && (
        <>
          {dataBriefing.length > 0 ? (
            <Container maxWidth="xl" sx={{ mt: 2 }}>
              <div>
                <Box>
                  <Grid container>
                    <>
                      <Stack
                        flexDirection="row"
                        gap={3}
                        sx={{
                          mt: 5,
                          mb: 5,
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          accept="image/*"
                          hidden
                          ref={multiUploadedImage}
                          type="file"
                          onChange={(e) =>
                            handleMultiUploadImgBase(
                              e,
                              "briefing",
                              dataBriefing[0]?._id,
                              "upload"
                            )
                          }
                        />
                        {multiImage?.map((item, index) => (
                          <Box key={index}>
                            <Box
                              sx={{
                                flexDirection: "column",
                                width: 200,
                                height: 270,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                backgroundColor: "#F2F2F2",
                                textTransform: "none",
                                p: 0,
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={
                                  StaticVar.URL_API +
                                  "/uploads" +
                                  item?.split("./uploads")[1]
                                }
                                style={{
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                              <br />
                            </Box>
                            <Button
                              onClick={() => handleOpenDialogDelete(item)}
                              fullWidth
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                                py: 1,
                                "&:hover": {
                                  backgroundColor: "rgba(255,0,0,0.5)",
                                },
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        ))}
                        <Button
                          onClick={(openImg) => setOpenImg(true)}
                          sx={{
                            flexDirection: "column",
                            width: 200,
                            height: 270,
                            border: "1px dashed #BDBDBD",
                            borderRadius: 4,
                            backgroundColor: "#F2F2F2",
                            textTransform: "none",
                          }}
                        >
                          <div>
                            <AddPhotoAlternateOutlinedIcon
                              style={{
                                color: "#BDBDBD",
                                fontSize: 40,
                              }}
                            />
                            <Typography
                              style={{
                                fontStyle: "italic",
                                color: "#BDBDBD",
                              }}
                            >
                              Unggah Gambar
                            </Typography>
                          </div>
                        </Button>
                      </Stack>
                    </>
                  </Grid>
                </Box>
              </div>

              <Modal
                open={openImg}
                onClose={(openImg) => setOpenImg(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 350,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 5,
                    p: 4,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={(openCamera) => setOpenCamera(true)}
                    sx={{
                      flexDirection: "column",
                      width: 120,
                      height: 120,
                      border: "1px dashed #BDBDBD",
                      borderRadius: 4,
                      backgroundColor: "#F2F2F2",
                      textTransform: "none",
                    }}
                  >
                    <div>
                      <PhotoCameraIcon
                        style={{
                          color: "#BDBDBD",
                          fontSize: 40,
                        }}
                      />
                      <Typography
                        style={{
                          fontStyle: "italic",
                          color: "#BDBDBD",
                        }}
                      >
                        Ambil Gambar
                      </Typography>
                    </div>
                  </Button>
                  <Button
                    onClick={handleMultiInputImage}
                    sx={{
                      flexDirection: "column",
                      width: 120,
                      height: 120,
                      border: "1px dashed #BDBDBD",
                      borderRadius: 4,
                      backgroundColor: "#F2F2F2",
                      textTransform: "none",
                    }}
                  >
                    <div>
                      <CollectionsIcon
                        style={{
                          color: "#BDBDBD",
                          fontSize: 40,
                        }}
                      />
                      <Typography
                        style={{
                          fontStyle: "italic",
                          color: "#BDBDBD",
                        }}
                      >
                        Pilih dari Galeri
                      </Typography>
                    </div>
                  </Button>
                </Box>
              </Modal>
              <Modal
                open={openCamera}
                onClose={(openCamera) => setOpenCamera(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    bottom: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 768,
                    bgcolor: "none",
                    boxShadow: 24,
                    padding: 0,
                  }}
                >
                  <Camera
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    imageCompression={0.9}
                    onTakePhoto={(e) =>
                      handleMultiUploadImgBase(
                        e,
                        "briefing",
                        dataBriefing[0]?._id,
                        "capture"
                      )
                    }
                  />
                </Box>
              </Modal>
              <div style={{ marginTop: 20 }}>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tulis Komentar Disini"
                  InputProps={{
                    style: {
                      fontSize: 12,
                      minHeight: 75,
                      backgroundColor: "#fff",
                    },
                  }}
                  fullWidth
                  multiline
                  sx={noteStyles}
                />
              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: 20,
                }}
              >
                <Button
                  //onClick={() => submitDataBriefing(multiImage,dataScheduleTrainDriver.length > 0 ? dataScheduleTrainDriver[0] : "")}
                  onClick={async () => {
                    await updateDataBriefing(
                      multiImage,
                      text,
                      dataBriefing[0]._id
                    );
                    let createAt = moment().format("YYYY-MM-DD");
                    let createBy = userById?.profileId;
                    getDataBriefing(createAt, createBy);
                  }}
                  type="submit"
                  autocomplete="off"
                  variant="contained"
                  sx={submitBtnStyle}
                >
                  Simpan
                </Button>
              </div>
            </Container>
          ) : (
            <Container maxWidth="xl" sx={{ mt: 2 }}>
              <center>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 10 }}
                  style={{ fontSize: 20 }}
                  onClick={async () => {
                    let res = await submitnewdata(
                      dataScheduleTrainDriver[0],
                      profileData
                    );
                    if (res.status) {
                      fetchData();
                      window.location.reload();
                    }
                  }}
                >
                  Buat Data Baru Briefing
                </Button>
              </center>
            </Container>
          )}
        </>
      )}

      {role !== "Masinis" && (
        <Container maxWidth="xl" sx={{ mt: 2, pb: 5 }}>
          <Grid
            container
            alignItems="end"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              marginBottom: 3,
            }}
          >
            <div>
              <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                Tgl Mulai:
              </Typography>
              <TextField
                type={"Date"}
                value={filterStartDate}
                placeholder="Pencarian"
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
            </div>
            <div style={{ marginLeft: 10 }}>
              <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                Tgl Selesai:
              </Typography>
              <TextField
                type={"Date"}
                value={filterEndDate}
                placeholder="Pencarian"
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
            </div>
            <div style={{ marginLeft: 10 }}>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Cari
              </Button>
            </div>
            <div style={{ marginLeft: 10 }}>
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
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width={20}>No.</StyledTableCell>
                  <StyledTableCell align="left" width={150}>
                    Nama Masinis
                  </StyledTableCell>
                  <StyledTableCell align="left" width={100}>
                    NIK
                  </StyledTableCell>
                  <StyledTableCell align="left" width={150}>
                    Dinasan
                  </StyledTableCell>
                  <StyledTableCell align="left" width={200}>
                    Tanggal Dinasan
                  </StyledTableCell>
                  <StyledTableCell align="left" width={200}>
                    Foto
                  </StyledTableCell>
                  <StyledTableCell align="left" width={200}>
                    Log
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    Aksi
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBriefing?.length > 0 ? (
                  dataBriefing.map((row, index) => {
                    return (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.createBy?.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.createBy?.idNumber}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography>
                            Kode:{" "}
                            {row?.dailyWorkTrainDriver?.loopRouteTrain?.code}
                          </Typography>
                          <Typography>
                            Loop:{" "}
                            {row?.dailyWorkTrainDriver?.loopRouteTrain?.loop}
                          </Typography>
                          <Typography>
                            No. KA:{" "}
                            {
                              row?.dailyWorkTrainDriver?.loopRouteTrain
                                ?.route[0]?.trainNumber
                            }
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          <Typography>
                            Tanggal:{" "}
                            {moment(
                              row?.dailyWorkTrainDriver?.dailyWorkDate
                            ).format("DD-MM-YYYY")}
                          </Typography>
                          <Typography>
                            Jam Mulai:{" "}
                            {row?.dailyWorkTrainDriver?.loopRouteTrain?.start}
                          </Typography>
                          <Typography>
                            Jam Selesai:{" "}
                            {row?.dailyWorkTrainDriver?.loopRouteTrain?.end}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Grid container>
                            {row?.file.length > 0
                              ? row?.file.map((item, index) => (
                                  <CardMedia
                                    key={index}
                                    component="img"
                                    sx={{ width: 100, mr: 1, maxHeight: 150 }}
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
                          <br />
                          <i>
                            {moment(row?.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </i>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Dibuat : <br />{" "}
                          <i>
                            {moment(row?.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </i>
                          <br />
                          {row?.updated ? "Diperbarui :" : null}
                          <br />
                          <i>
                            {" "}
                            {row?.updated
                              ? moment(row?.updated).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )
                              : null}
                          </i>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleSelect(row)}
                          >
                            Detail
                          </Button>
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
      )}
    </>
  );
}
