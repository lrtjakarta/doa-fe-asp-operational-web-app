import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import StaticVar from "Config/StaticVar";
import { UserProfilContext } from "Context";
import UseInformationUpload from "Hooks/InformationUpload/useInformationUpload";
import useUploadImg from "Hooks/Upload/useUploadImg";
import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import "react-html5-camera-photo/build/css/index.css";
import { useHistory } from "react-router-dom";
import "../../../node_modules/video-react/dist/video-react.css";
import useStyles, { border, form, noteStyles2 } from "./Styles";
import { decodeToken } from "react-jwt";

const decodedToken = decodeToken(localStorage.getItem("access_token"));
export default function InformationUpload() {
  const classes = useStyles();

  const { userById, getUserLoginById } = useContext(UserProfilContext);

  const [tab, setTab] = useState(0);
  const history = useHistory();

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const {
    videoSrc,
    setVideoSrc,
    handleCloseDialogDelete,
    handleDeleteVideo,
    deleteIdVideo,
    loader,
    setLoader,
    handleEditVideo,
    handleInputVideo,
    uploadedVideo,
    handleOpenDialogVideoDelete,
    dialogVideoDelete,
    handleUploadVideo,
    editedVideo,
    handleInputEditVideo,
    videoFilename,
    editedFile,
    resetState,
  } = useUploadImg();

  const {
    setOpenSnackbar,
    openSnackbar,
    submitDataInformationUpload,
    getDataInformationUpload,
    informationUpload,
    setDuration,
    duration,
  } = UseInformationUpload();

  const fetchData = async () => {
    const response = await getDataInformationUpload();
    if (response.status === "OK" && response.result.length > 0) {
      setVideoSrc(_.orderBy(response.result[0].video, ["index"], ["asc"]));
    }
  };

  useEffect(() => {
    fetchData();
    getUserLoginById(decodedToken?.id);
    videoEl.current = videoEl.current.slice(0, videoSrc.length);
  }, []);

  const videoEl = useRef([]);
  const handleLoadedMetadata = () => {
    console.log(`The video is ${videoEl.current[0]?.duration} seconds long.`);
    const _duration = videoEl.current[0]?.duration;
    if (_duration) {
      setDuration(_duration);
    }
  };

  console.log("video src", videoSrc);
  return (
    <>
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
          Berhasil Menyimpan data materi refreshing
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

      <Dialog
        open={dialogVideoDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="delete-verification"
        aria-describedby="delete-verification"
      >
        <DialogTitle id="delete-verification">
          {"Apakah Anda yakin ingin menghapus Video ini?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>Batal</Button>
          <Button
            onClick={async () => {
              const response = await handleDeleteVideo();
              console.log("first", response);
              if (response.status === "OK") {
                console.log("deleteIdVideo", deleteIdVideo);
                const fil = videoSrc.filter(
                  (item) => item?.file !== deleteIdVideo
                );
                setVideoSrc(fil);
              }
            }}
            autoFocus
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", pl: 10, pt: 10, mb: 10 }}>
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: 18 }}>Materi Refreshing</Typography>
          <Box>
            <Box>
              <Stack
                flexDirection="row"
                gap={3}
                sx={{
                  mt: 1,
                  mb: 4,
                  flexWrap: "wrap",
                }}
              >
                <input
                  accept="video/*"
                  hidden
                  key={videoSrc.file}
                  ref={uploadedVideo}
                  type="file"
                  onChange={(e) =>
                    handleUploadVideo(
                      e,
                      "informationupload",
                      userById._id,
                      "object"
                    )
                  }
                />

                <input
                  accept="video/*"
                  hidden
                  key={videoSrc.file}
                  ref={editedVideo}
                  type="file"
                  onChange={(e) =>
                    handleEditVideo(
                      e,
                      "informationupload",
                      userById._id,
                      "object"
                    )
                  }
                />
                <Grid container spacing={2}>
                  {videoSrc.map((item, index) => {
                    return (
                      <Grid item xs={3} key={index}>
                        <Box
                          sx={{
                            flexDirection: "column",
                            width: "100%",
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
                          <Card
                            sx={{
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                              p: 1,
                              pr: 0,
                              borderRadius: 0,
                              justifyContent: "space-between",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={9}>
                                <Grid container spacing={1}>
                                  <Grid item xs={6}>
                                    <Typography>Judul</Typography>
                                    <TextField
                                      placeholder={"Tulis Judul Disini"}
                                      sx={form}
                                      onChange={(e) => {
                                        const datatemp = videoSrc.map(
                                          (x, i) => {
                                            if (i === index) {
                                              x.title = e.target.value;
                                            }
                                            return x;
                                          }
                                        );
                                        setVideoSrc(datatemp);
                                      }}
                                      value={item?.title}
                                    ></TextField>
                                  </Grid>

                                  <Grid item xs={3}>
                                    <Typography>Urutan</Typography>
                                    <TextField
                                      placeholder={"Urutan"}
                                      sx={form}
                                      type="number"
                                      onChange={(e) => {
                                        const datatemp = videoSrc.map(
                                          (x, i) => {
                                            if (i === index) {
                                              x.index = e.target.value;
                                            }
                                            return x;
                                          }
                                        );
                                        setVideoSrc(datatemp);
                                      }}
                                      value={item?.index}
                                    ></TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={3}>
                                <IconButton
                                  onClick={async () => {
                                    handleInputEditVideo(item);
                                  }}
                                >
                                  <EditIcon
                                    sx={{
                                      color: "#BB7E36",
                                    }}
                                  />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleOpenDialogVideoDelete(item?.file)
                                  }
                                >
                                  <DeleteIcon
                                    sx={{
                                      color: "red",
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Card>
                          <video
                            src={StaticVar.URL_API + "/" + item?.file}
                            onLoadedMetadata={handleLoadedMetadata}
                            ref={(el) => (videoEl.current[index] = el)}
                            playsInline
                            controls
                            height={200}
                          />
                        </Box>
                        <Box
                          sx={{
                            flexDirection: "column",
                            backgroundColor: "#fff",
                          }}
                        >
                          <TextField
                            onChange={(e) => {
                              const datatemp    = videoSrc.map((x, i) => {
                                if (i === index) {
                                  x.description = e.target.value;
                                }
                                return x;
                              });
                              setVideoSrc(datatemp);
                            }}
                            value={item?.description}
                            placeholder="Tulis Deskripsi Disini"
                            InputProps={{
                              style: {
                                fontSize: 12,
                                minHeight: 75,
                              },
                            }}
                            sx={noteStyles2}
                            fullWidth
                            multiline
                          />

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={item?.publish}
                                    onChange={(e) => {
                                      const datatemp = videoSrc.map((x, i) => {
                                        if (i === index) {
                                          x.publish = e.target.checked;
                                        }
                                        return x;
                                      });
                                      setVideoSrc(datatemp);
                                    }}
                                    inputProps={{
                                      "aria-label": "controlled",
                                    }}
                                  />
                                }
                                label={
                                  <Typography fontSize={16}>Publish</Typography>
                                }
                              />
                            </FormGroup>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                  <Grid item xs={3}>
                    <Button
                      onClick={handleInputVideo}
                      sx={{
                        flexDirection: "column",
                        width: "100%",
                        height: 230,
                        border: "1px dashed #BDBDBD",
                        borderRadius: 2,
                        backgroundColor: "#F2F2F2",
                        textTransform: "none",
                      }}
                    >
                      <div>
                        <PlayCircleOutlineIcon
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
                          Tambahkan Video
                        </Typography>
                      </div>
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Button
              onClick={async () => history.goBack()}
              variant='contained'
              sx={{
                color: '#A56C28',
                bgcolor: '#fff',
                border: '2px solid #A56C28',
                width: 300,
                fontSize: 14,
                mx: 5,
                my: 3,
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  border: '2px solid #A56C28',
                },
              }}>
              <ArrowBackIosNewIcon sx={{ mr: 1, fontSize: 14 }} /> Kembali
            </Button> */}
            <Button
              variant="contained"
              onClick={async () => {
                let newVideoSrc = [...videoSrc];

                if (!editedFile) {
                  newVideoSrc = newVideoSrc.map((item) => {
                    if (item?.file?.includes(videoFilename)) {
                      item.duration = duration;
                    }

                    return item;
                  });
                }

                await submitDataInformationUpload(
                  newVideoSrc,
                  "video",
                  informationUpload[0] || {},
                  userById
                );
                resetState();
                fetchData();
              }}
              color="primary"
              sx={{
                color: "#fff",
                width: 300,
                fontSize: 14,
                mx: 5,
                my: 3,
              }}
            >
              Simpan
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

{
  /*  */
}
