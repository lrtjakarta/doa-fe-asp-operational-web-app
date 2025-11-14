import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useEffect } from "react";
import Select from "react-select";

//img

//styles
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from "@mui/icons-material";
import CollectionsIcon from "@mui/icons-material/Collections";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StaticVar from "Config/StaticVar";
import { useUserProfile } from "Context/UserProfile";
import UseCoaching from "Hooks/Coaching/useCoaching";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import useUploadImg from "Hooks/Upload/useUploadImg";
import moment from "moment";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import useQuery from "Utils/QueryParams";
import ContentEditor from "../../Component/ContentEditor";
import useStyles, { selectBoxStyles } from "./Styles";

export default function FormCoaching(props) {
  const classes = useStyles();
  let query = useQuery();
  const id = props?.id ? props.id : query.get("id");
  const action = props?.action ? props.action : query.get("action");

  const history = useHistory();

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
    openImg,
    setOpenImg,
    openCamera,
    setOpenCamera,
  } = useUploadImg();

  const { userById } = useUserProfile();

  const {
    listTrainDriver,
    setListTrainDriver,
    listSupervisor,
    setListSupervisor,
    categoryCoaching,
    setcategoryCoaching,
    selectedTrainDriver,
    setselectedTrainDriver,
    timeCoaching,
    settimeCoaching,
    supervisor,
    setsupervisor,
    dateCoaching,
    setdateCoaching,
    phaseCoaching,
    setphaseCoaching,
    performanceProblems,
    setperformanceProblems,
    solution,
    setsolution,
    actionPlan,
    setactionPlan,
    reviewPlan,
    setreviewPlan,
    submitDataCoaching,
    updateDataCoaching,
    getDataCoaching,
  } = UseCoaching();

  const {
    trainDriver,
    getDataTrainDriver,
    trainDriverHook,
    getMasinis,
    getPenyelia,
  } = useTrainDriver();

  const fetchData = async () => {
    const responseTrainDriver = await getDataTrainDriver();
    let listDataTrainDriver = responseTrainDriver?.filter(
      (item) => item.jobPosition?.name === "Masinis"
    );
    let listDataSupervisor = responseTrainDriver?.filter(
      (item) => item.jobPosition?.name === "Penyelia"
    );
    setListTrainDriver(listDataTrainDriver);
    setListSupervisor(listDataSupervisor);
    if (props?.dataDetail) {
      setselectedTrainDriver(props?.dataDetail?.trainDriver);
      setsupervisor(props?.dataDetail?.supervisor);
      setdateCoaching(props?.dataDetail?.dateCoaching);
      settimeCoaching(props?.dataDetail?.timeCoaching);
      setcategoryCoaching(props?.dataDetail?.categoryCoaching);
      setphaseCoaching(props?.dataDetail?.phaseCoaching);
      setperformanceProblems(props?.dataDetail?.performanceProblems);
      setsolution(props?.dataDetail?.solution);
      setactionPlan(props?.dataDetail?.actionPlan);
      setreviewPlan(
        moment(props?.dataDetail?.reviewPlan).format("YYYY-MM-DDTHH:mm")
      );
      setMultiImage(props?.dataDetail?.file);
    }
    if (id) {
      const response = await getDataCoaching({ id });
      if (response.status === "OK" && response.result.length > 0) {
        setselectedTrainDriver(response.result[0]?.trainDriver);
        setsupervisor(response.result[0]?.supervisor);
        setdateCoaching(response.result[0]?.dateCoaching);
        settimeCoaching(response.result[0]?.timeCoaching);
        setcategoryCoaching(response.result[0]?.categoryCoaching);
        setphaseCoaching(response.result[0]?.phaseCoaching);
        setperformanceProblems(response.result[0]?.performanceProblems);
        setsolution(response.result[0]?.solution);
        setactionPlan(response.result[0]?.actionPlan);
        setreviewPlan(
          moment(response.result[0]?.reviewPlan).format("YYYY-MM-DDTHH:mm")
        );
        setMultiImage(response.result[0]?.file);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("props", props);

  return (
    <>
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
      <Container maxWidth="xl" sx={{ pt: 13 }}>
        <Paper sx={{ padding: "20px 50px" }}>
          <Typography variant="h4" align="center" sx={{ my: 3 }}>
            FORM COACHING
          </Typography>
          <Table style={{ width: "100%" }}>
            <TableRow>
              <TableCell style={{ width: "19%" }}>
                <Typography>Nama Penyelia</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{supervisor?.name}</Typography>
                ) : (
                  <Select
                    styles={selectBoxStyles}
                    menuPortalTarget={document.body}
                    placeholder={"Pilih Penyelia"}
                    options={listSupervisor}
                    isSearchable={true}
                    isClearable={true}
                    value={listSupervisor.filter(
                      (option) => option.value === supervisor?.value
                    )}
                    onChange={(selected) =>
                      setsupervisor(selected ? selected : {})
                    }
                  />
                )}
              </TableCell>
              <TableCell style={{ width: "19%" }}>
                <Typography>NIK</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{supervisor?.idNumber}</Typography>
                ) : (
                  <TextField
                    type="text"
                    value={supervisor?.idNumber}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "19%" }}>
                <Typography>Nama Masinis</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{selectedTrainDriver?.name}</Typography>
                ) : (
                  <Select
                    styles={selectBoxStyles}
                    menuPortalTarget={document.body}
                    placeholder={"Pilih Masinis"}
                    options={listTrainDriver}
                    isSearchable={true}
                    isClearable={true}
                    value={listTrainDriver.filter(
                      (option) => option.value === selectedTrainDriver?.value
                    )}
                    onChange={(selected) =>
                      setselectedTrainDriver(selected ? selected : {})
                    }
                  />
                )}
              </TableCell>
              <TableCell style={{ width: "19%" }}>
                <Typography>NIK</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{selectedTrainDriver?.idNumber}</Typography>
                ) : (
                  <TextField
                    type="text"
                    value={selectedTrainDriver?.idNumber}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "19%" }}>
                <Typography>Tanggal</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{dateCoaching}</Typography>
                ) : (
                  <TextField
                    type="date"
                    value={dateCoaching}
                    onChange={(e) => setdateCoaching(e.target.value)}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
              <TableCell style={{ width: "19%" }}>
                <Typography>Waktu</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{timeCoaching}</Typography>
                ) : (
                  <TextField
                    type="time"
                    value={timeCoaching}
                    onChange={(e) => settimeCoaching(e.target.value)}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "19%" }}>
                <Typography>Kategori Coaching</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{categoryCoaching}</Typography>
                ) : (
                  <TextField
                    type="text"
                    value={categoryCoaching}
                    onChange={(e) => setcategoryCoaching(e.target.value)}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
              <TableCell style={{ width: "19%" }}>
                <Typography>Fase Coaching</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{phaseCoaching}</Typography>
                ) : (
                  <TextField
                    type="text"
                    value={phaseCoaching}
                    onChange={(e) => setphaseCoaching(e.target.value)}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography>Unggah Gambar</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <div>
                  <Box>
                    <Grid container>
                      <>
                        <Stack
                          flexDirection="row"
                          gap={3}
                          sx={{
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
                                "coaching",
                                userById?._id,
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
                                  borderBottomLeftRadius: `${
                                    action === "edit" || action === "add"
                                      ? "0"
                                      : "10px"
                                  }`,
                                  borderBottomRightRadius: `${
                                    action === "edit" || action === "add"
                                      ? "0"
                                      : "10px"
                                  }`,
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
                              {action === "edit" || action === "add" ? (
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
                              ) : (
                                ""
                              )}
                            </Box>
                          ))}
                          {action === "edit" || action === "add" ? (
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
                          ) : (
                            ""
                          )}
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
                      top: "50%",
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
                          "coaching",
                          JSON.parse(localStorage?.profile)._id,
                          "capture"
                        )
                      }
                    />
                  </Box>
                </Modal>
              </TableCell>
            </TableRow>

            <TableRow>
              {action === "detail" ? (
                <>
                  <TableCell style={{ width: "19%" }}>
                    <Typography>Permasalahan Kinerja</Typography>
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell colSpan={4}>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: performanceProblems }}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={6}>
                  <Typography sx={{ mb: 1 }}>Permasalahan Kinerja</Typography>
                  <ContentEditor
                    handleChange={(event, editor) =>
                      setperformanceProblems(editor.getData())
                    }
                    value={performanceProblems}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              {action === "detail" ? (
                <>
                  <TableCell style={{ width: "19%" }}>
                    <Typography>Solusi Yang Disepakati</Typography>
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell colSpan={4}>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: solution }}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={6}>
                  <Typography sx={{ mb: 1 }}>Solusi Yang Disepakati</Typography>
                  <ContentEditor
                    handleChange={(event, editor) =>
                      setsolution(editor.getData())
                    }
                    value={solution}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              {action === "detail" ? (
                <>
                  <TableCell style={{ width: "19%" }}>
                    <Typography>Action Plan Terhadap Solusi</Typography>
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell colSpan={4}>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: actionPlan }}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={6}>
                  <Typography sx={{ mb: 1 }}>
                    Action Plan Terhadap Solusi
                  </Typography>
                  <ContentEditor
                    handleChange={(event, editor) =>
                      setactionPlan(editor.getData())
                    }
                    value={actionPlan}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "19%" }}>
                <Typography>Rencana Review</Typography>
              </TableCell>
              <TableCell style={{ width: 15 }}>:</TableCell>
              <TableCell style={{ width: "30%" }}>
                {action === "detail" ? (
                  <Typography>{reviewPlan}</Typography>
                ) : (
                  <TextField
                    type="datetime-local"
                    value={reviewPlan}
                    onChange={(e) => setreviewPlan(e.target.value)}
                    InputProps={{
                      style: {
                        width: "100%",
                        fontSize: 12,
                        height: 33,
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: "100%",
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </Table>
          <Grid container spacing={2} sx={{ alignItems: "center", my: 3 }}>
            {supervisor?.idNumber && (
              <Grid item xs={6}>
                <p align="center" className={classes.textGridTxt}>
                  Coach
                </p>
                <p align="center">
                  <QRCode value={supervisor?.idNumber} size={100} />
                </p>
                <p align="center" className={classes.grayGridTxt}>
                  {supervisor?.name}
                  <br />
                  NIK : {supervisor?.idNumber}
                </p>
              </Grid>
            )}
            {selectedTrainDriver?.idNumber && (
              <Grid item xs={6}>
                <p align="center" className={classes.textGridTxt}>
                  Coachee
                </p>
                <p align="center">
                  <QRCode value={selectedTrainDriver?.idNumber} size={100} />
                </p>
                <p align="center" className={classes.grayGridTxt}>
                  {selectedTrainDriver?.name}
                  <br />
                  NIK : {selectedTrainDriver?.idNumber}
                </p>
              </Grid>
            )}

            {props?.action ? null : (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  onClick={() => history.goBack()}
                  sx={{
                    color: "#A56C28",
                    bgcolor: "#fff",
                    border: "2px solid #A56C28",
                    width: 300,
                    fontSize: 18,
                    mr: 3,
                    mt: 3,
                    "&:hover": {
                      backgroundColor: "#BB7E36",
                      color: "#fff",
                      border: "none",
                    },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
                </Button>
                {action === "edit" || action === "add" ? (
                  <Button
                    onClick={async () => {
                      if (action === "edit") {
                        const response = await updateDataCoaching(
                          multiImage,
                          id,
                          action === "edit" ? new Date() : null
                        );
                        if (response.status === "OK") {
                          history.push("/app/operational/coaching");
                        }
                      } else {
                        const response = await submitDataCoaching(multiImage);
                        if (response.status === "OK") {
                          history.push("/app/operational/coaching");
                        }
                      }
                    }}
                    variant="contained"
                    sx={{
                      color: "#fff",
                      bgcolor: "#BB7E36",
                      border: "1px solid #A56C28",
                      width: 300,
                      fontSize: 18,
                      mr: 3,
                      mt: 3,
                      "&:hover": {
                        backgroundColor: "#BB7E36",
                        color: "#fff",
                        border: "none",
                      },
                    }}
                  >
                    Submit
                  </Button>
                ) : null}
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

{
  /*  */
}
