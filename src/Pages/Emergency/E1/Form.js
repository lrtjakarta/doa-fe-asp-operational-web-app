import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./DataTable.css";

import HeaderV1 from "Component/CustomHeader/HeaderV1";
import CustomNewTableDetail from "Component/CustomTable/CustomNewTableDetail";
import AppTextField from "Component/input-fields/AppTextField";
import Typography14 from "Component/Typography/Typography14";
import ColumnShapeInstruksi from "./column-shape-instruksi";
import QuillEditor from "./QuillEditor";

import getCurrentDate from "Utils/SetDate";
import getCurrentTime from "Utils/SetTime";

import { UserProfilContext } from "Context";
import { MasterEmergencyContext } from "Context/MasterEmergency";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import ApiOperational from "Services/ApiOperational";

function Form() {
  const history = useHistory();
  const location = useLocation();
  const { dataRow, type } = location.state.state;

  // context
  const { listMasterEmergency, getMasterEmergency } = useContext(
    MasterEmergencyContext
  );
  const { trainDriver, getDataTrainDriver } = useTrainDriver();
  const { userProfile } = useContext(UserProfilContext);

  // state
  const [formInfo1, setFormInfo1] = useState(null);
  const [formInfo2, setFormInfo2] = useState(null);
  const [formInfo3, setFormInfo3] = useState(null);
  const [formInfo4, setFormInfo4] = useState(null);

  const [allIntruksi, setAllIntruksi] = useState([]);
  const [formIntruksi, setFormIntruksi] = useState("");

  const [formIdNumberOfficer, setFormIdNumberOfficer] = useState("");
  const [formDate, setFormDate] = useState(getCurrentDate());
  const [formTime, setFormTime] = useState(getCurrentTime());
  const [formIdNumber, setFormIdNumber] = useState("");
  const [formMasinis, setFormMasinis] = useState(null);

  // handle
  const handleChange = (type, value) => {
    if (type === "info1") {
      setFormInfo1({
        ...formInfo1,
        information: value,
      });
    } else if (type === "info2") {
      setFormInfo2({
        ...formInfo2,
        information: value,
      });
    } else if (type === "info3") {
      setFormInfo3({
        ...formInfo3,
        information: value,
      });
    }
  };

  const handleAddInstruksi = () => {
    const newData = {
      title: formIntruksi,
    };

    if (allIntruksi.length > 0) {
      setAllIntruksi([...allIntruksi, newData]);
      setFormIntruksi("");
    } else {
      setAllIntruksi([newData]);
      setFormIntruksi("");
    }
  };

  const handleDeleteInstruksi = (row) => {
    const filter = allIntruksi.filter((x) => x.title !== row.title);
    setAllIntruksi(filter);
  };

  const resetForm = () => {
    setFormIdNumberOfficer("");
    setFormDate(getCurrentDate());
    setFormTime(getCurrentTime());
    setFormIdNumber("");
  };

  const handleSubmit = async () => {
    let _masinis;
    let _dispatcher;
    let _createdBy;
    let _createdDate;
    if (type === "Edit") {
      if (userProfile?.officerPosition === "Masinis") {
        _masinis = userProfile;
        _dispatcher = null;
      } else if (userProfile?.officerPosition === "Dispatcher") {
        _masinis = null;
        _dispatcher = userProfile;
      }
      _createdBy = dataRow?.createdBy;
      _createdDate = dataRow?.createdDate;
    } else {
      _createdBy = userProfile;
      _createdDate = new Date();
      if (formMasinis) {
        _masinis = {
          officerId: formMasinis?._id,
          officerName: formMasinis?.name,
          officerIdPosition: formMasinis?.jobPosition?._id,
          officerPosition: formMasinis?.jobPosition?.name,
          officerDepartemen: formMasinis?.departement?.name,
          officerNumber: formMasinis?.idNumber, // nipp
          officerPhoto: formMasinis?.imgPict || [],
        };
      }
      if (userProfile?.officerPosition === "Masinis") {
        _masinis = userProfile;
        _dispatcher = null;
      } else if (userProfile?.officerPosition === "Dispatcher") {
        _masinis = null;
        _dispatcher = userProfile;
      }
    }

    const postData = {
      serialNumber: formIdNumberOfficer, // Nomor urut
      masinis: _masinis, // id, name, jabatan, createdTime
      dispatcher: _dispatcher, // id, name, jabatan, createdTime
      date: formDate, // Tanggal
      time: formTime, // Waktu
      trainNumber: formIdNumber, // Nomor KA (train number)
      information: {
        name1: formInfo1,
        name2: formInfo2,
        name3: formInfo3,
        footer: formInfo4,
      }, // Informasi
      specialInstructions: allIntruksi, // Instruksi Khusus
      createdBy: _createdBy,
      createdDate: _createdDate,
    };

    if (type === "Edit") {
      try {
        const respon = await ApiOperational.updateEmergency1(
          dataRow?._id,
          postData
        );
        // console.log("respon", respon);
        if (respon.statusText === "OK") {
          resetForm();
          history.goBack(); // Mengirim respon ke parent (List)
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    } else {
      try {
        const respon = await ApiOperational.postEmergency1(postData);
        // console.log("respon", respon);
        if (respon.statusText === "OK") {
          resetForm();
          history.goBack(); // Mengirim respon ke parent (List)
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const getDataById = () => {
    const formatDate = new Date(dataRow.date).toISOString().split("T")[0];
    setFormInfo1(dataRow?.information?.name1);
    setFormInfo2(dataRow?.information?.name2);
    setFormInfo3(dataRow?.information?.name3);
    setAllIntruksi(dataRow?.specialInstructions);
    setFormIdNumberOfficer(dataRow?.serialNumber);
    setFormDate(formatDate);
    setFormTime(dataRow?.time);
    setFormIdNumber(dataRow?.trainNumber);
    setFormMasinis(dataRow?.masinis);
  };

  // useEffect
  useEffect(() => {
    getDataTrainDriver();
    getMasterEmergency({ title: ["Emergency 1", "All"] });
    if (type === "Edit") {
      getDataById();
    }
  }, []);

  useEffect(() => {
    if (type !== "Edit") {
      const _info1 = listMasterEmergency.filter((x) => x.idNumber === 1);
      const _info2 = listMasterEmergency.filter((x) => x.idNumber === 2);
      const _info3 = listMasterEmergency.filter((x) => x.idNumber === 3);
      const _info4 = listMasterEmergency.filter((x) => x.title === "All");

      setFormInfo1(_info1[0]);
      setFormInfo2(_info2[0]);
      setFormInfo3(_info3[0]);
    }
    const _info4 = listMasterEmergency.filter((x) => x.title === "All");
    setFormInfo4(_info4[0]);
  }, [listMasterEmergency]);

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ mb: 3 }}>
            <HeaderV1
              title="Emergency"
              sub1="Home -"
              sub2="Operasional -"
              sub3="Form Emergency 1"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AppTextField
              fullWidth
              size="small"
              label="No. Urut E1/2025/XXXX"
              sx={{ mt: "0px" }}
              value={formIdNumberOfficer}
              onChange={(e) => setFormIdNumberOfficer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Hari, Tanggal"
              InputLabelProps={{
                shrink: true, // Membuat label tetap di atas
                style: { fontSize: 12 }, // Mengatur ukuran font label
              }}
              InputProps={{
                style: {
                  fontSize: 12,
                  height: 35.5,
                },
              }}
              type="date"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Pukul"
              InputLabelProps={{
                shrink: true, // Membuat label tetap di atas
                style: { fontSize: 12 }, // Mengatur ukuran font label
              }}
              InputProps={{
                style: {
                  fontSize: 12,
                  height: 35.5,
                },
              }}
              type="time"
              value={formTime}
              onChange={(e) => setFormTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack direction="row" gap={1}>
              <AppTextField
                fullWidth
                size="small"
                label="KA No."
                sx={{ mt: "0px" }}
                value={formIdNumber}
                onChange={(e) => setFormIdNumber(e.target.value)}
              />
              <Autocomplete
                fullWidth
                freeSolo
                options={trainDriver}
                getOptionLabel={(option) => option.name}
                value={formMasinis}
                onChange={(event, newValue) => {
                  setFormMasinis(newValue);
                }}
                renderInput={(params) => (
                  <AppTextField
                    {...params}
                    size="small"
                    sx={{ mt: "0px" }}
                    label="Masinis"
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <table className="data-table">
              <tbody>
                <tr>
                  <td>
                    <Typography14 title="Diizinkan melewati sinyal tidak aman, untuk:" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} sm={12}>
            <QuillEditor
              value={formInfo1?.information}
              onChange={(e) => handleChange("info1", e)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography14 title="Intruksi Khusus:" />
          </Grid>
          <Grid item xs={12} sm={11}>
            <AppTextField
              fullWidth
              size="small"
              label="Masukkan instruksi khusus"
              sx={{ mt: "0px" }}
              value={formIntruksi}
              onChange={(e) => setFormIntruksi(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton size="small" onClick={handleAddInstruksi}>
              <AddBoxOutlinedIcon sx={{ fontSize: 32, color: "#3E97FF" }} />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={12}>
            {allIntruksi.length > 0 && (
              <CustomNewTableDetail
                data={allIntruksi}
                columnShape={ColumnShapeInstruksi({
                  onDelete: handleDeleteInstruksi,
                })}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <QuillEditor
              value={formInfo2?.information}
              onChange={(e) => handleChange("info2", e)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <QuillEditor
              value={formInfo3?.information}
              onChange={(e) => handleChange("info3", e)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Form;
