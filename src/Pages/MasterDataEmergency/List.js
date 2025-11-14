import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Grid,
  Button,
  Dialog,
  Card,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Tooltip,
  IconButton,
  TablePagination,
  Stack,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import useStyles, {
  tableCellStyle,
  tableCellStyleRight,
  tableCellStyleLeft,
} from "./Styles";

import HeaderV1 from "Component/CustomHeader/HeaderV1";
import Typography18 from "Component/Typography/Typography18";
import Form from "./Form";

import { MasterEmergencyContext } from "Context/MasterEmergency";
import ApiOperational from "Services/ApiOperational";


function List() {
  const history = useHistory();

  // context
  const { listMasterEmergency, getMasterEmergency } = useContext(
    MasterEmergencyContext
  );

  // state
  const [dialogForm, setDialogForm] = useState(false);
  const [allData, setAllData] = useState([]);
  const [dataRow, setDataRow] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogDelete, setDialogDelete] = useState(false);

  // handle
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleForm = () => {
    setDialogForm(true);
    setDataRow({
      type: "Add",
      data: null,
    });
  };

  const handleResponse = (data) => {
    // setResponseData(data);
    // console.log("hasil respon", data);
    if (data) {
      setDialogForm(false); // Menutup dialog setelah submit
      getMasterEmergency();
    }
  };

  const handleEdit = (row) => {
    setDialogForm(true);
    setDataRow({
      type: "Edit",
      data: row,
    });
  };

  const handleDelete = (row) => {
    setDialogDelete(true);
    setDataRow(row)
  };

  const handleDeleteData = async() => {
    const respon = await ApiOperational.deleteMDEmergency(dataRow._id)
    if(respon){
      setDialogDelete(false);
      getMasterEmergency();
    }
  }

  // useEffect
  useEffect(() => {
    getMasterEmergency();
  }, []);

  useEffect(() => {
    setAllData(listMasterEmergency);
  }, [listMasterEmergency]);

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <HeaderV1
            title="Master Data Emergency"
            sub1="Home -"
            sub2="Operasional -"
            sub3="List Master Data Emergency"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleForm}>
            Tambah
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TableContainer
            sx={{
              padding: "10px",
            }}
            component={Paper}
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
                    <p>Versi</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p>Urut</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p>Informasi</p>
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
                {allData.length > 0 ? (
                  <>
                    {allData
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell align="center">{item?.idNumber}</TableCell>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: 14, mt: "-10px" }}
                              dangerouslySetInnerHTML={{
                                __html: item?.information,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(item)}
                              >
                                <EditOutlinedIcon sx={{ color: "#3E97FF" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(item)}
                              >
                                <DeleteOutlineOutlinedIcon
                                  sx={{ color: "#F1416C" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      {/* Dialog Form*/}
      <Dialog fullWidth={true} maxWidth="sm" open={dialogForm}>
        <Form
          handleClose={() => setDialogForm(false)}
          handleResponse={handleResponse}
          dataRow={dataRow}
        />
      </Dialog>

      {/* Dialog Delete */}
      <Dialog fullWidth={true} maxWidth="sm" open={dialogDelete}>
        <Box sx={{ p: 3,}}>
        <Box
          sx={{
           
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography18
            fontWeight={700}
            title="Apa Anda Yakin untuk menghapus data ini?"
          />
         
        </Box>
        <Stack direction="row" justifyContent='center' spacing={1}>
            <Button variant="outlined" color='error' onClick={() => setDialogDelete(false)}>Close</Button>
            <Button variant="contained" color='error' onClick={handleDeleteData}>Delete</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
}

export default List;
