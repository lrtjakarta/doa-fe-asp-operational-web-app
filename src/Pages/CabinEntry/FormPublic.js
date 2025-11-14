import React, { useState } from "react";

import {
  Box,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Alert,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import HeaderV1 from "Component/CustomHeader/HeaderV1";
import AppTextField from "Component/input-fields/AppTextField";
import CustomNewTableDetail from "Component/CustomTable/CustomNewTableDetail";
import ColumnShapePemohon from "./column-shape-pemohon ";

import ApiOperational from "Services/ApiOperational";

function FormPublic() {
  // state
  const [formKepentingan, setFormKepentingan] = useState("");
  const [formWaktu, setFormWaktu] = useState(new Date());
  const [formStart, setFormStart] = useState(new Date());
  const [formEnd, setFormEnd] = useState(new Date());

  const [formPJNama, setFormPJNama] = useState("");
  const [formPJEmail, setFormPJEmail] = useState("");
  const [formPJNomor, setFormPJNomor] = useState("");

  const [formNamaPemohon, setFormNamaPemohon] = useState("");
  const [formPEmail, setFormPEmail] = useState("");
  const [formPNomor, setFormPNomor] = useState("");

  const [allPemohon, setAllPemohon] = useState([]);
  const [formPNama, setFormPNama] = useState("");
  const [formPNik, setFormPNik] = useState("");
  const [formPJabatan, setFormPJabatan] = useState("");
  const [formPDevisi, setFormPDevisi] = useState("");
  

  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  // handle
  const handleResetForm = () => {
    setFormPNama("");
    setFormPNik("");
    setFormPJabatan("");
    setFormPDevisi("");
  };

  const handleAddPemohon = () => {
    const newData = {
      officerName: formPNama,
      idNumber: formPNik,
      officerPosition: formPJabatan,
      officerDepartemen: formPDevisi,
    };
    if (allPemohon.length > 0) {
      setAllPemohon([...allPemohon, newData]);
      handleResetForm();
    } else {
      setAllPemohon([newData]);
      handleResetForm();
    }
  };

  const handleDeletePemohon = (row) => {
    const filter = allPemohon.filter((x) => x.idNumber !== row.idNumber);
    setAllPemohon(filter);
  };

  const handleSubmit = async (e) => {
    await setLoading(true);

    const result = await handleSave(e);

    // return;
    if (result.statusText === "OK") {
      setLoading(false);
      setNotifMsg("Data Berhasil Diajukan");
      console.log("Tambah Data Serah Terima Kartu Berhasil!!");
    } else {
      setNotifMsg("Gagal");
      setLoading(false);
    }
  };

  const handleSave = () => {
    const dataPJ = {
      officerName: formPJNama,
      officerEmail: formPJEmail,
      officerPhoneNumber: formPJNomor,
      date: new Date()
    };

    const dataPemohon = {
      officerName: formNamaPemohon,
      officerEmail: formPEmail,
      officerPhoneNumber: formPNomor,
      date: new Date()
    }

    const postData = {
      priority: formKepentingan, // kepentingan
      time: formWaktu, // waktu
      startDate: formStart, // tanggal mulai
      endDate: formEnd, // tanggal akhir
      responsiblePerson: dataPJ, // penanggung jawab
      requester: dataPemohon, // pemohon
      participants: allPemohon, // peserta
      approver: null, // yang menyetujui
      status: "Diajukan", // status
    };
    // console.log('post data', postData)
    // return
    return ApiOperational.postCabinEntry(postData);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", p: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <HeaderV1
              title="Izin Masuk Kabin Masinis"
              sub1="Home -"
              sub2="Operasional -"
              sub3="Izin Masuk Kabin Masinis"
            />
          </Grid>

          {notifMsg !== "" ? (
            <Grid item xs={12} sm={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
             <Alert sx={{width: '60%'}} ariant="filled" severity={notifMsg === 'Gagal' ? "error" : "success"}>
                {notifMsg}
             </Alert>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Pengajuan Permohonan
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Kepentingan"
                  sx={{ mt: "0px" }}
                  value={formKepentingan}
                  onChange={(e) => setFormKepentingan(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Waktu"
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
                  value={formWaktu}
                  onChange={(e) => setFormWaktu(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start"
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
                  value={formStart}
                  onChange={(e) => setFormStart(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End"
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
                  value={formEnd}
                  onChange={(e) => setFormEnd(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Penanggung Jawab
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Nama"
                  sx={{ mt: "0px" }}
                  value={formPJNama}
                  onChange={(e) => setFormPJNama(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Email"
                  sx={{ mt: "0px" }}
                  value={formPJEmail}
                  onChange={(e) => setFormPJEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="No.Telepon"
                  type="number"
                  sx={{ mt: "0px" }}
                  value={formPJNomor}
                  onChange={(e) => setFormPJNomor(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Pemohon
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Nama"
                  sx={{ mt: "0px" }}
                  value={formNamaPemohon}
                  onChange={(e) => setFormNamaPemohon(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Email"
                  sx={{ mt: "0px" }}
                  value={formPEmail}
                  onChange={(e) => setFormPEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="No.Telepon"
                  type="number"
                  sx={{ mt: "0px" }}
                  value={formPNomor}
                  onChange={(e) => setFormPNomor(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Informasi Permohonan
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Nama"
                  sx={{ mt: "0px" }}
                  value={formPNama}
                  onChange={(e) => setFormPNama(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="NIK"
                  type="number"
                  sx={{ mt: "0px" }}
                  value={formPNik}
                  onChange={(e) => setFormPNik(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Jabatan"
                  sx={{ mt: "0px" }}
                  value={formPJabatan}
                  onChange={(e) => setFormPJabatan(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <AppTextField
                  fullWidth
                  size="small"
                  label="Departemen / Instasi"
                  sx={{ mt: "0px" }}
                  value={formPDevisi}
                  onChange={(e) => setFormPDevisi(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton size="small" onClick={handleAddPemohon}>
                  <AddBoxOutlinedIcon sx={{ fontSize: 32, color: "#3E97FF" }} />
                </IconButton>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                {allPemohon.length > 0 && (
                  <CustomNewTableDetail
                    data={allPemohon}
                    columnShape={ColumnShapePemohon({
                      onDelete: handleDeletePemohon,
                    })}
                  />
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: 2,
                  mb: 7,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default FormPublic;
