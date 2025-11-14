import React, { useEffect, useState } from "react";

import { Box, Grid, Container, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

import HeaderV1 from "Component/CustomHeader/HeaderV1";
import AppTextField from "Component/input-fields/AppTextField";
import Typography16 from "Component/Typography/Typography16";
import QuillEditor from "./QuillEditor";

import ApiOperational from "Services/ApiOperational";

function Form({ handleClose, handleResponse, dataRow }) {
  // state
  const [formTitle, setFormTitle] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [formInformation, setFormInformation] = useState("");

  // handle
  const resetForm = () => {
    setFormTitle("");
    setFormNumber("");
    setFormInformation("");
  };

  const getDataRow = () => {
    const _dataRow = dataRow?.data
    setFormTitle(_dataRow?.title);
    setFormNumber(_dataRow.idNumber);
    setFormInformation(_dataRow?.information);
  }

  const handleSubmit = async () => {
    const postData = {
      title: formTitle,
      idNumber: formNumber,
      information: formInformation,
    };

    if(dataRow?.type === 'Edit') {
      try {
        const respon = await ApiOperational.updateMDEmergency(dataRow?.data?._id, postData);
        // console.log("respon", respon);
        if (respon.statusText === "OK") {
          resetForm();
          handleResponse(respon); // Mengirim respon ke parent (List)
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }

    } else {
      try {
        const respon = await ApiOperational.postMDEmergency(postData);
        // console.log("respon", respon);
        if (respon.statusText === "OK") {
          resetForm();
          handleResponse(respon); // Mengirim respon ke parent (List)
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
    
  };

  useEffect(() => {
    if(dataRow?.type === 'Edit'){
      getDataRow()
    }
  }, [dataRow])


  return (
    <Box sx={{ p: 3, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <HeaderV1
              title="Master Data Emergency"
              sub1="Home -"
              sub2="Operasional -"
              sub3="Form Master Data Emergency"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextField
              fullWidth
              size="small"
              label="Pilih Emergency"
              sx={{ mt: "0px" }}
              select
              SelectProps={{
                native: true,
                IconComponent: KeyboardArrowDown,
              }}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            >
              <option value=""></option>
              <option value="All">All</option>
              <option value="Emergency 1">Emergency 1</option>
              <option value="Emergency 2">Emergency 2</option>
              <option value="Emergency 3">Emergency 3</option>
              <option value="Emergency 4">Emergency 4</option>
              <option value="Emergency 5">Emergency 5</option>
              <option value="Emergency 6">Emergency 6</option>
              <option value="Emergency 7">Emergency 7</option>
              <option value="Emergency 8">Emergency 8</option>
            </AppTextField>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
            <Typography16 title="INFORMASI" fontWeight={700} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextField
              fullWidth
              size="small"
              label="No. Urut"
              type="number"
              sx={{ mt: "0px" }}
              value={formNumber}
              onChange={(e) => setFormNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <QuillEditor
              value={formInformation}
              onChange={(e) => setFormInformation(e)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Form;
