import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  Slider,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ContentEditor from "Component/ContentEditor";
import _ from "lodash";
import { useContext, useEffect } from "react";

//styles
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from "@mui/icons-material";
import StaticVar from "Config/StaticVar";
import Cropper from "react-easy-crop";
import "react-html5-camera-photo/build/css/index.css";
import "../../../node_modules/video-react/dist/video-react.css";
import useInformationUpload from "../../Hooks/InformationUpload/useInformationUpload";
import useUploadImg from "../../Hooks/Upload/useUploadImg";
import { form } from "./Styles";
// components
import { IconButton } from "@material-ui/core";
import { UserProfilContext } from "Context";
import { decodeToken } from "react-jwt";
import CustomDialog from "../../Component/Dialog/CustomDialog";

const decodedToken = decodeToken(localStorage.getItem("access_token"));

export default function InformationUpload() {
  const { userById, getUserLoginById } = useContext(UserProfilContext);

  const {
    uploadedImage,
    dialogDelete,
    handleDeleteImage,
    image,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
    setImage,
    setDeleteIdImage,
    deleteIdImage,
    handleInputImage,
    handleUploadImgBase,
    loader,
    setLoader,
    handleEditCrop,
    size,
    setSize,
    onChangeZoom,
    handleCancelCrop,
    onCropComplete,
    calculateZoom,
    crop,
    setCrop,
    zoom,
    resetState,
  } = useUploadImg();

  const {
    setOpenSnackbar,
    openSnackbar,
    openForm,
    action,
    setAction,
    setOpenForm,
    setInformationUpload,
    informationUpload,
    title,
    handleOpenEdit,
    setTitle,
    duration,
    setDuration,
    indexNumber,
    setIndexNumber,
    getDataInformationUpload,
    description,
    setDescription,
    submitDataInformationUpload,
    typeInstruction,
    updateDataInformationUpload,
    controlProps,
    isPublished,
    setIsPublished,
  } = useInformationUpload();

  const handleClose = () => {
    setTitle("");
    setIndexNumber(0);
    setDuration(0);
    setDescription("");
    setIsPublished(false);
    setImage(null);
    setOpenForm(false);
  };

  useEffect(() => {
    getDataInformationUpload();
    getUserLoginById(decodedToken?.id);
  }, []);

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
          Berhasil Mengirim Data Instruksi
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
          <Button
            onClick={async () => {
              await handleDeleteImage();
              const fil =
                informationUpload.length > 0 &&
                informationUpload[0].image.filter(
                  (item) => item.file !== deleteIdImage
                );
              console.log("fil", fil);
              await updateDataInformationUpload(
                informationUpload[0]?._id,
                fil,
                "image"
              );
              let dataNew = { ...informationUpload[0], image: fil };
              setInformationUpload([dataNew]);
            }}
            autoFocus
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex" }}>
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: 18, mb: 3 }}>
            Peraturan/Instruksi Tugas Masinis
          </Typography>

          <Button
            onClick={() => {
              setOpenForm(true);
              setAction("create");
            }}
            variant="contained"
            color="primary"
            sx={{ height: 35 }}
          >
            <div>
              <Typography
                style={{
                  color: "#fff",
                }}
              >
                Tambah
              </Typography>
            </div>
          </Button>
          <Box>
            <Grid container>
              <>
                <Stack
                  flexDirection="row"
                  gap={3}
                  sx={{
                    mt: 1,
                    mb: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {informationUpload.length > 0 &&
                    _.orderBy(
                      informationUpload[0].image,
                      ["index"],
                      ["asc"]
                    ).map((item, index) => (
                      <Box key={index}>
                        <Card
                          sx={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            borderRadius: 0,
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            {item?.title && (
                              <Typography sx={{ fontSize: 12 }}>
                                Judul : {item?.title}
                              </Typography>
                            )}
                            <Typography sx={{ fontSize: 12 }}>
                              Tipe : {item?.typeInstruction}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              onClick={() => {
                                handleOpenEdit(item);
                                setDeleteIdImage(item.file);
                                setImage({ file: item.file });
                              }}
                            >
                              <EditIcon
                                sx={{
                                  color: "#BB7E36",
                                }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={() => handleOpenDialogDelete(item.file)}
                            >
                              <DeleteIcon
                                sx={{
                                  color: "red",
                                }}
                              />
                            </IconButton>
                          </div>
                        </Card>
                        <Box
                          sx={{
                            flexDirection: "column",
                            width: 300,
                            backgroundColor: "#F2F2F2",
                            textTransform: "none",
                            p: 0,
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={StaticVar.URL_API + "/" + item.file}
                            style={{
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Card sx={{ display: "flex", width: 300, p: 2 }}>
                          <Box
                            sx={{
                              flexDirection: "column",
                              flexGrow: 1,
                            }}
                          >
                            <Typography sx={{ fontSize: 12 }}>
                              Durasi : {item?.duration}
                            </Typography>
                            {item.description && (
                              <Typography sx={{ fontSize: 12 }}>
                                Deskripsi :{" "}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                ></div>
                              </Typography>
                            )}
                          </Box>

                          <Typography sx={{ color: "success.main" }}>
                            {item?.publish ? (
                              <Chip color="success" label="Publish" />
                            ) : (
                              <Chip label="Unpublish" color="error" />
                            )}
                          </Typography>
                        </Card>
                      </Box>
                    ))}
                </Stack>
              </>
            </Grid>
          </Box>

          <CustomDialog
            open={openForm}
            handleClose={handleClose}
            title="Form Peraturan/Instruksi"
            content={
              <div>
                <Box>
                  <FormControlLabel
                    control={
                      <Radio
                        {...controlProps("Text")}
                        sx={{
                          color: "#BB7E36",
                          "&.Mui-checked": {
                            color: "#BB7E36",
                          },
                        }}
                      />
                    }
                    label="Text"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        {...controlProps("Image")}
                        sx={{
                          color: "#BB7E36",
                          "&.Mui-checked": {
                            color: "#BB7E36",
                          },
                        }}
                      />
                    }
                    label="Image"
                  />
                </Box>
                {typeInstruction === "Image" ? (
                  <>
                    <Stack
                      flexDirection="row"
                      sx={{
                        mt: 1,
                        mb: 4,
                        pl: 2,
                      }}
                    >
                      <input
                        accept="image/*"
                        hidden
                        ref={uploadedImage}
                        type="file"
                        onChange={(e) => {
                          handleUploadImgBase(
                            e,
                            "informationupload",
                            userById._id,
                            "upload",
                            "object"
                          );
                        }}
                        onClick={(event) => {
                          event.target.value = null;
                        }}
                      />
                      {image ? (
                        <Grid container spacing={2}>
                          <Grid
                            item
                            md={4}
                            sx={{
                              flexDirection: "column",
                              position: "relative",
                              borderTopRightRadius: 10,
                              borderTopLeftRadius: 10,
                              textTransform: "none",
                              p: 0,
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                flexDirection: "column",
                                height: 200,
                                position: "relative",
                              }}
                            >
                              <Cropper
                                image={StaticVar.URL_API + "/" + image.file}
                                crop={crop}
                                zoom={zoom}
                                aspect={2 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                // onZoomChange={setZoom}
                              />
                            </div>
                            <Slider
                              value={zoom}
                              min={1}
                              step={1}
                              max={30}
                              scale={calculateZoom}
                              onChange={onChangeZoom}
                              valueLabelDisplay="auto"
                              aria-labelledby="non-linear-slider"
                            />
                            <div>
                              <Typography>Zoom: {zoom}x</Typography>
                              <Typography>Aspect Ratio: 2:1</Typography>
                              <Typography>
                                Posisi: {crop?.x} x {crop?.y}
                              </Typography>
                              <Typography>
                                Ukuran: {size?.width} x {size?.height}
                              </Typography>
                            </div>
                            <div
                              style={{
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                display: "flex",
                                paddingBottom: 5,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => handleCancelCrop()}
                              >
                                Cancel
                              </Button>
                              <Button
                                sx={{ ml: 1 }}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleEditCrop(
                                    StaticVar.URL_API + "/" + image.file,
                                    "informationupload",
                                    userById?._id,
                                    "object"
                                  )
                                }
                              >
                                Edit
                              </Button>
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={8}
                            sx={{
                              flexDirection: "column",
                              width: "100%",
                              mt: -5,
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography>Durasi (detik)</Typography>
                                <TextField
                                  placeholder={"Tulis Durasi Waktu (detik)"}
                                  sx={form}
                                  type="number"
                                  // style={border}
                                  inputProps={{
                                    style: {
                                      fontSize: 12,
                                      height: 1,
                                    },
                                  }}
                                  onChange={(e) => setDuration(e.target.value)}
                                  value={duration}
                                ></TextField>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography>Urutan</Typography>
                                <TextField
                                  placeholder={"Tulis Urutan"}
                                  sx={form}
                                  type="number"
                                  // style={border}
                                  inputProps={{
                                    style: {
                                      fontSize: 12,
                                      height: 1,
                                    },
                                  }}
                                  onChange={(e) =>
                                    setIndexNumber(e.target.value)
                                  }
                                  value={indexNumber}
                                ></TextField>
                              </Grid>
                            </Grid>
                            <ContentEditor
                              handleChange={(event, editor) =>
                                setDescription(editor.getData())
                              }
                              value={description}
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
                                      checked={isPublished}
                                      onChange={(e) =>
                                        setIsPublished(e.target.checked)
                                      }
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography fontSize={18}>
                                      Publish
                                    </Typography>
                                  }
                                />
                              </FormGroup>
                            </Box>
                          </Grid>
                        </Grid>
                      ) : (
                        <Button
                          onClick={handleInputImage}
                          sx={{
                            flexDirection: "column",
                            width: 300,
                            height: 180,
                            border: "1px dashed #BDBDBD",
                            borderRadius: 2,
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
                              Tambahkan Gambar
                            </Typography>
                          </div>
                        </Button>
                      )}
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack
                      flexDirection="row"
                      sx={{
                        mt: 1,
                        mb: 4,
                        pl: 2,
                      }}
                    >
                      <input
                        accept="image/*"
                        hidden
                        ref={uploadedImage}
                        type="file"
                        onChange={(e) => {
                          handleUploadImgBase(
                            e,
                            "informationupload",
                            // JSON.parse(localStorage?.profile)._id,
                            userById?._id,
                            "upload",
                            "object"
                          );
                        }}
                        onClick={(event) => {
                          event.target.value = null;
                        }}
                      />
                      {image ? (
                        <Grid container spacing={2}>
                          <Grid
                            item
                            md={4}
                            sx={{
                              flexDirection: "column",
                              position: "relative",
                              borderTopRightRadius: 10,
                              borderTopLeftRadius: 10,
                              textTransform: "none",
                              p: 0,
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                flexDirection: "column",
                                height: 200,
                                position: "relative",
                              }}
                            >
                              <Cropper
                                image={StaticVar.URL_API + "/" + image.file}
                                crop={crop}
                                zoom={zoom}
                                aspect={2 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                // onZoomChange={setZoom}
                              />
                            </div>
                            <Slider
                              value={zoom}
                              min={1}
                              step={1}
                              max={30}
                              scale={calculateZoom}
                              onChange={onChangeZoom}
                              valueLabelDisplay="auto"
                              aria-labelledby="non-linear-slider"
                            />
                            <div>
                              <Typography>Zoom: {zoom}x</Typography>
                              <Typography>Aspect Ratio: 2:1</Typography>
                              <Typography>
                                Posisi: {crop?.x} x {crop?.y}
                              </Typography>
                              <Typography>
                                Ukuran: {size?.width} x {size?.height}
                              </Typography>
                            </div>
                            <div
                              style={{
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                display: "flex",
                                paddingBottom: 5,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => handleCancelCrop()}
                              >
                                Cancel
                              </Button>
                              <Button
                                sx={{ ml: 1 }}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleEditCrop(
                                    StaticVar.URL_API + "/" + image.file,
                                    "informationupload",
                                    userById?._id,
                                    "object"
                                  )
                                }
                              >
                                Edit
                              </Button>
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={8}
                            sx={{
                              flexDirection: "column",
                              width: "100%",
                              mt: -5,
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item md={8}>
                                <Typography>Judul</Typography>
                                <TextField
                                  placeholder={"Tulis Judul"}
                                  sx={form}
                                  type="text"
                                  onChange={(e) => setTitle(e.target.value)}
                                  value={title}
                                ></TextField>
                              </Grid>
                              <Grid item md={2}>
                                <Typography>Durasi (detik) </Typography>
                                <TextField
                                  placeholder={"Tulis Durasi Waktu (detik)"}
                                  sx={form}
                                  type="number"
                                  // style={border}
                                  // inputProps={{
                                  //   style: {
                                  //     fontSize: 12,
                                  //     height: 1,
                                  //   },
                                  // }}
                                  onChange={(e) => setDuration(e.target.value)}
                                  value={duration}
                                ></TextField>
                              </Grid>

                              <Grid item md={2}>
                                <Typography>Urutan</Typography>
                                <TextField
                                  placeholder={"Tulis Urutan"}
                                  sx={form}
                                  type="number"
                                  // style={border}
                                  // inputProps={{
                                  //   style: {
                                  //     fontSize: 12,
                                  //     height: 1,
                                  //   },
                                  // }}
                                  onChange={(e) =>
                                    setIndexNumber(e.target.value)
                                  }
                                  value={indexNumber}
                                ></TextField>
                              </Grid>
                            </Grid>
                            <ContentEditor
                              handleChange={(event, editor) =>
                                setDescription(editor.getData())
                              }
                              value={description}
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
                                      checked={isPublished}
                                      onChange={(e) =>
                                        setIsPublished(e.target.checked)
                                      }
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography fontSize={18}>
                                      Publish
                                    </Typography>
                                  }
                                />
                              </FormGroup>
                            </Box>
                          </Grid>
                        </Grid>
                      ) : (
                        <Button
                          onClick={handleInputImage}
                          sx={{
                            flexDirection: "column",
                            width: 300,
                            height: 180,
                            border: "1px dashed #BDBDBD",
                            borderRadius: 2,
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
                              Tambahkan Gambar
                            </Typography>
                          </div>
                        </Button>
                      )}
                    </Stack>
                  </>
                )}
              </div>
            }
            action={
              <>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    width: "25%",
                    border: "2px solid gray",
                    color: "gray",
                    height: 34,
                  }}
                >
                  Batal
                </Button>
                <Button
                  onClick={async () => {
                    if (action === "edit") {
                      const fileDeleteOld =
                        informationUpload.length > 0 &&
                        informationUpload[0].image.filter(
                          (item) => item.file !== deleteIdImage
                        );
                      const fileDeleteNew = {
                        title,
                        file: image?.file,
                        duration,
                        index: indexNumber,
                        publish: isPublished,
                        description,
                        typeInstruction,
                      };
                      const mergeFile = [...fileDeleteOld, fileDeleteNew];
                      await updateDataInformationUpload(
                        informationUpload[0]?._id,
                        mergeFile,
                        "image"
                      );
                      let dataNew = {
                        ...informationUpload[0],
                        image: mergeFile,
                      };
                      setInformationUpload([dataNew]);
                      setOpenForm(false);
                      resetState();
                    } else {
                      const result = await submitDataInformationUpload(
                        image,
                        "image",
                        informationUpload[0] || {},
                        userById
                      );
                      if (result.status === "OK") {
                        handleCancelCrop();
                        setTitle("");
                        setDuration("");
                        setDescription("");
                        setIsPublished(false);
                        resetState();
                      }
                    }
                  }}
                  variant="contained"
                  sx={{ width: "25%" }}
                  color="primary"
                >
                  Simpan
                </Button>
              </>
            }
          />
        </Container>
      </Box>
    </>
  );
}

{
  /*  */
}
