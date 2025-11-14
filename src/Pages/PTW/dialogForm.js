import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import MultiUploadV1 from "Component/MultiUpload/MultiUploadV1";
import Typography16 from "Component/Typography/Typography16";
import StaticVar from "Config/StaticVar";
import { ProfileContext, StasiunContext, UserProfilContext } from "Context";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "Services/ApiOperational";
import PTWPopup from "./ptwPopup";

const dispatcherId = "6631bd56e69c8ba4bde7fa21";

const DialogForm = ({ open, edit, data = {}, onClose }) => {
  const { dataStasiun, getAllStasiun } = useContext(StasiunContext);
  const { listProfile, getListProfile } = useContext(ProfileContext);
  const { userById, userProfile } = useContext(UserProfilContext);

  const [openListPTW, setOpenListPTW] = useState(false);
  const [form, setForm] = useState({
    ptwNum: data?.ptwNum || "", // no PTW
    validDate: data?.validDate || null, // Tanggal Berlaku
    reqNum: data?.reqNum || "", // Nomor Request
    vendor: data?.vendor || "", // Nama perusahaan/vendor

    isPtw: data?.isPtw || null,
    jobType: data?.jobType || "",
    area: data?.area || [],
    jobResult: data?.jobResult || "",
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
    detailArea: data?.detailArea || "",
    jobLocation: data?.jobLocation || "", // lokasi aktual pekerjaan
    actualDate: data?.actualDate || new Date(),
    security: data?.security || userById,
    photo: data?.photo || null,
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [statusUpload, setStatusUpload] = useState(false);

  const handleFormChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleChangeArea = (newValue) => {
    let value = [];

    if (newValue?.length > 0) {
      value = newValue?.map((i) => ({ _id: i._id, name: i.stationName }));
    }

    setForm((prev) => ({ ...prev, area: value }));
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
    );

    if (validFiles.length !== files.length) {
      setErrors([
        ...errors,
        "Maaf, file yang Anda upload memiliki format yang salah. Silahkan Pilih format yang sesuai (JPEG, JPG, PNG)",
      ]);
    }

    const compressedFilesPromises = validFiles.map(async (file) => {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height in pixels
        useWebWorker: true, // Use web worker for faster compression
      };
      try {
        const compressedFile = await imageCompression(file, options);
        return {
          file: compressedFile,
          preview: URL.createObjectURL(compressedFile),
        };
      } catch (error) {
        console.error("Error compressing image:", error);
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      }
    });

    const compressedFiles = await Promise.all(compressedFilesPromises);

    //   console.log('compressedFiles', compressedFiles)

    setImages((prevImages) => [...prevImages, ...compressedFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    // console.log("values", form, edit);
    // return

    if (!form.vendor) {
      return toast.error("Harap memilih vendor terlebih dahulu");
    }

    let respon;
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image.file);
      });

      respon = await API.postManyImage("ams/eptw", formData);
    }

    let newForm;

    if (edit) {
      if (respon.statusText === "OK") {
        const _uploadedFiles = respon.data?.uploadedFiles;
        newForm = {
          ...form,
          photo: {
            ...data?.photo,
            uploadedFiles: [...data?.photo?.uploadedFiles, ..._uploadedFiles],
          },
        };
      } else {
        newForm = {
          ...form,
          photo: data?.photo,
        };
      }
    } else {
      if (respon.statusText === "OK") {
        newForm = {
          ...form,
          photo: respon.data,
        };
      } else {
        newForm = {
          ...form,
          photo: null,
        };
      }
    }

    if (edit) {
      await API.putPTW(data._id, newForm)
        .then((res) => {
          onClose(true);
        })
        .catch((err) => console.log("error put ptw", err));
    } else {
      API.postPTW(newForm).then((res) => {
        onClose(true);
      });
    }
  };

  useEffect(() => {
    getAllStasiun();
  }, [open]);

  const aksesUploadImage = userById.role.some((r) => r.name === "Security");

  console.log("userById", userById);

  return (
    <>
      <Dialog maxWidth="lg" open={open}>
        <DialogTitle>Form EPTW</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, pb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  onClick={() => setOpenListPTW(true)}
                  variant="contained"
                  fullWidth
                >
                  Pilih Vendor
                </Button>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="No Surat"
                  value={form.ptwNum}
                  InputLabelProps={{
                    shrink: Boolean(form.ptwNum),
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Tgl Mulai"
                  value={form.validDate || new Date(form.validDate)}
                  type="date"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="No Req"
                  value={form.reqNum}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Vendor"
                  value={form.vendor}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="tags-standard"
                  options={dataStasiun}
                  getOptionLabel={(option) => option.stationName}
                  value={dataStasiun?.filter((i) =>
                    form.area?.find((j) => j._id === i._id)
                  )}
                  onChange={(e, newValue) => handleChangeArea(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Area" />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  onChange={handleFormChange}
                  name="startTime"
                  label="Waktu mulai"
                  value={form.startTime}
                  type="time"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  onChange={handleFormChange}
                  name="endTime"
                  label="Waktu selesai"
                  value={form.endTime}
                  type="time"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleFormChange}
                  name="jobType"
                  label="Jenis Pekerjaan"
                  value={form.jobType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleFormChange}
                  name="detailArea"
                  label="Area Detail Pekerjaan"
                  value={form.detailArea}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleFormChange}
                  name="jobResult"
                  label="Hasil Pekerjaan"
                  value={form.jobResult}
                />
              </Grid>
              {aksesUploadImage && (
                <>
                  <Grid item xs={12}>
                    <MultiUploadV1
                      images={images}
                      errors={errors}
                      handleImageChange={handleImageChange}
                      handleDeleteImage={handleDeleteImage}
                      // handleUpload={handleUpload}
                      status={statusUpload}
                    />
                  </Grid>
                  {data?.photo && (
                    <>
                      <Grid item xs={12}>
                        <Typography16 title="Data Photo" fontWeight={700} />
                      </Grid>
                      {data?.photo?.uploadedFiles.map((item) => {
                        return (
                          <Grid item xs={12} md={3}>
                            <img
                              src={
                                StaticVar.URL_API +
                                "/uploads" +
                                `/${data?.photo?.path}` +
                                `/${item?.uploadedName}`
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </Grid>
                        );
                      })}
                    </>
                  )}
                </>
              )}

              {/* <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  onChange={handleFormChange}
                  name="isPtw"
                  label="Sesuai PTW?"
                  value={form.detailArea}
                >
                  <MenuItem value={true}>Ya</MenuItem>
                  <MenuItem value={false}>Tidak</MenuItem>
                </TextField>
              </Grid> */}

              <Grid item xs={12}>
                <Stack direction="row-reverse" spacing={1} mt={4}>
                  <Button
                    onClick={() => onSubmit()}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      {openListPTW && (
        <PTWPopup
          open={openListPTW}
          setForm={setForm}
          onClose={() => setOpenListPTW(false)}
        />
      )}
    </>
  );
};

export default DialogForm;
