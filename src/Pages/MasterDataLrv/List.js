import {
  Box,
  Grid,
  Button,
  Card,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Dialog,
} from "@mui/material";

import HeaderV1 from "Component/CustomHeader/HeaderV1";
import Typography18 from "Component/Typography/Typography18";
import AppTextField from "Component/input-fields/AppTextField";

import useStyles, {
  tableCellStyle,
  tableCellStyleRight,
  tableCellStyleLeft,
} from "./Styles";

import ApiOperational from "../../Services/ApiOperational";

import { MasterLrvContext } from "Context";

import React, { useEffect, useState, useContext } from "react";

function List() {
  const classes = useStyles();

  // context
  const { listMasterLrv, getDataNoGoItem } = useContext(MasterLrvContext);

  //   state
  const [dialogForm, setDialogForm] = useState(false);
  const [formLrv, setFormLrv] = useState("");
  const [dataRow, setDataRow] = useState(null)

  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  // handle
  const handleAdd = (type, rowData) => {
    if(type === 'Edit') {
        setDialogForm(true);
        setFormLrv(rowData.numberLrv)
        setDataRow(rowData)
    } else {
        setDialogForm(true);
        setFormLrv('')
    }
  };

  const handleSubmit = async (e) => {
    await setLoading(true);

    const result = await handleSave(e);
    // return
    if (result.statusText === "OK") {
      setLoading(false);
      setDialogForm(false);
      console.log("Tambah Data Berhasill!!!");
      window.location.reload();
    } else {
      setNotifMsg("Gagal!");
      setLoading(false);
    }
  };

  const handleSave = () => {
    const postData = {
      numberLrv: formLrv,
    };

    if(dataRow !== null) {
        return ApiOperational.updateMasterLRV(dataRow._id,postData);
    } else {
        return ApiOperational.postMasterLRV(postData);
    }
  };

  //   useEffect
  useEffect(() => {
    getDataNoGoItem();
  }, []);

  return (
    <Box sx={{ p: "30px", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <HeaderV1
            title="Master Data LRV"
            sub1="Home -"
            sub2="Operasional -"
            sub3="Daftar Master Data LRV"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={() => handleAdd('Add')}>
            Tambah
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card
            sx={{
              minWidth: 275,
              bgcolor: "#f6f7ff",
              boxShadow: "none",
              border: "none",
            }}
          >
            <TableContainer
              sx={{
                padding: "10px",
              }}
            >
              <Table
                sx={{
                  minWidth: 250,
                  borderCollapse: "separate",
                  borderSpacing: "0px 5px",
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      bgcolor: "#464748",
                      color: "#fff",
                      borderRadius: "10px",
                      pt: "10px",
                    }}
                  >
                    <TableCell sx={tableCellStyleLeft}>
                      <p>No.</p>
                    </TableCell>
                    <TableCell sx={tableCellStyle} align="left">
                      <p>Nomor LRV</p>
                    </TableCell>
                    <TableCell
                      sx={tableCellStyleRight}
                      align="center"
                      style={{ width: 100 }}
                    >
                      <p>Aksi</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listMasterLrv.length > 0
                    ? listMasterLrv.map((item, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              bgcolor: "#fff",
                              pt: "10px",
                            }}
                          >
                            <TableCell
                              className={classes.tableLeftTxt}
                              component="th"
                              scope="row"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">{item.numberLrv}</TableCell>
                            <TableCell align="center">
                                <Button variant='outlined' onClick={() => handleAdd("Edit",item)}>Edit</Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog Form */}
      <Dialog fullWidth maxWidth="sm" open={dialogForm}>
        <Box sx={{ p: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography18 title="Form LRV" fontWeight={700} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AppTextField
                fullWidth
                size="small"
                label="LRV"
                sx={{ mt: "0px" }}
                value={formLrv}
                onChange={(e) => setFormLrv(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
              }}
            >
              <Button variant="outlined" onClick={() => setDialogForm(false)}>
                Kembali
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
}

export default List;
