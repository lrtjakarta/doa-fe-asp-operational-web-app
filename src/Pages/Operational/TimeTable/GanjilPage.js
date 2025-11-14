import React, { useRef, useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  TableFooter,
  TablePagination,
  Chip,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Link } from "react-router-dom";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import _ from "lodash";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import {
  tableRowFirstStyle,
  buttonAddStyle,
  buttonDownloadStyle,
  centerStyle,
  judulTextStyle,
  searchBorderStyle,
  tableHeadStyle,
  tableRowStyle,
  tableRowAkhirStyle,
  tableRowAwalStyle,
  tableStyle,
  TabStyle,
  textPaginationStyle,
  List,
  selectBoxStyles,
} from "./Styles";

// componnets
import Dialog from "Component/Dialog/CustomDialog";
import CustomTable from "Component/Table/CustomTable";

// context
import {
  StationMasterContext,
  TrainRouteContext,
} from "Context";

function GanjilPage() {
  let [openDialogTimeTable, setOpenDialogTimeTable] = useState(false);

  let [edittable, setEditTable] = useState(false);
  const [time, setTime] = useState(new Date());

  const [rowCountArray, setRowCountArray] = useState([0]);
  const [colCountArray, setColCountArray] = useState([1, 2, 3, 4, 5, 6, 7]);

  const [stationGanjilSelected, setStationGanjilSelected] = useState([]);
  const [routetime, setRouteTime] = useState([]);

  const [selected, setSelected] = useState({});

  // context
  const {
    kaNumbers,
    stationMasters,
    setKANumbers,
    getKANumber,
    getStationMaster,
    getTimeTable,
    creteManyTimeTable,
    updateTimeTable,
  } = useContext(StationMasterContext);
  const { routelist, getRouteList } = useContext(TrainRouteContext);

  // handle table
  const handleSelectingGanjil = (e, index) => {
    let currentganjil = [...stationGanjilSelected];
    let fduplicate = currentganjil.filter((x) => x.loopIndex == index);

    if (fduplicate?.length > 0) {
      let withoutdouble = currentganjil.filter((x) => x.loopIndex !== index);

      setStationGanjilSelected([...withoutdouble, { ...e, loopIndex: index }]);
    } else {
      currentganjil.push({ ...e, loopIndex: index });
      setStationGanjilSelected(currentganjil);
    }
  };

  const handleDistanceGanjil = (e, index) => {
    let currentganjil = [...stationGanjilSelected];
    let fduplicate = currentganjil.filter((x) => x.loopIndex == index);

    if (fduplicate?.length > 0) {
      let withoutdouble = currentganjil.filter((x) => x.loopIndex !== index);

      setStationGanjilSelected([
        ...withoutdouble,
        { ...fduplicate[0], distance: parseFloat(e) },
      ]);
    }
  };

  const handlevOpsGanjil = (e, index) => {
    let currentganjil = [...stationGanjilSelected];
    let fduplicate = currentganjil.filter((x) => x.loopIndex == index);

    if (fduplicate?.length > 0) {
      let withoutdouble = currentganjil.filter((x) => x.loopIndex !== index);

      setStationGanjilSelected([
        ...withoutdouble,
        { ...fduplicate[0], vOps: parseFloat(e) },
      ]);
    }
  };

  const handlevMaxGanjil = (e, index) => {
    let currentganjil = [...stationGanjilSelected];
    let fduplicate = currentganjil.filter((x) => x.loopIndex == index);

    if (fduplicate?.length > 0) {
      let withoutdouble = currentganjil.filter((x) => x.loopIndex !== index);

      setStationGanjilSelected([
        ...withoutdouble,
        { ...fduplicate[0], vMax: parseFloat(e) },
      ]);
    }
  };

  const handleRemoveRowGanjil = (e, row) => {
    let currentrow = [...rowCountArray];
    let filterrm = currentrow.filter((x) => x !== row);

    let filterganjil = stationGanjilSelected.filter((x) => x.loopIndex !== row);

    setRowCountArray(filterrm);
    setStationGanjilSelected(filterganjil);
  };

  const handleAddRowGanjil = (e) => {
    let currentrow = [...rowCountArray];

    currentrow.push(e + 1);
    setRowCountArray(currentrow);
  };

  const handleSubmitTable = async () => {
    let datasend = stationGanjilSelected.map((x) => {
      return {
        ...x,
        flag: "Ganjil",
      };
    });

    let res = await creteManyTimeTable(datasend);
    if (res.status == "OK") {
      setEditTable(false);
    }
  };

  const handleSelectingTime = (col, row, value) => {
    let current = [...routetime];
    let duplicate = current.filter((x) => x.route == `${col}`);
    let withoutdouble = current.filter((x) => x.route !== `${col}`);

    if (duplicate?.length > 0) {
      if (row == "start") {
        current = [
          ...withoutdouble,
          {
            ...duplicate[0],
            start: moment(value).format("HH:mm:ss"),
            Vstart: moment(value).toISOString(),
          },
        ];
      } else {
        current = [
          ...withoutdouble,
          {
            ...duplicate[0],
            end: moment(value).format("HH:mm:ss"),
            Vend: moment(value).toISOString(),
          },
        ];
      }
    } else {
      if (row == "start") {
        current = [
          ...withoutdouble,
          {
            ...duplicate[0],
            start: moment(value).format("HH:mm:ss"),
            Vstart: moment(value).toISOString(),
          },
        ];
      } else {
        current = [
          ...withoutdouble,
          {
            ...duplicate[0],
            end: moment(value).format("HH:mm:ss"),
            Vend: moment(value).toISOString(),
          },
        ];
      }
    }

    setRouteTime(current);
  };

  const handleSubmitTimeTable = async () => {
    let datasend = { ...selected, route: routetime };
    console.log(datasend);

    let res = await updateTimeTable(selected._id, datasend);
    if (res.status == "OK") {
      fetchTimeTable();
      handleCloseTimeTableDialog();
    }
  };

  const handleCloseTimeTableDialog = () => {
    setOpenDialogTimeTable(false);
    setRouteTime([]);
  };

  const handleOpenTimeTableDialog = (e) => {
    let fselected = stationGanjilSelected.filter((x) => x.loopIndex == e);

    let froute = fselected[0]?.route.map((x) => {
      let newdate = moment(new Date()).format("DD-MM-YYYY");
      const [month, day, year] = newdate.split("-");
      const [shours, sminutes, sseconds] = x.start?.split(":");
      const Vstart = new Date(
        +year,
        +month - 1,
        +day,
        +shours,
        +sminutes,
        +sseconds
      );
      const [ehours, eminutes, eseconds] = x.end?.split(":");
      const Vend = new Date(
        +year,
        +month - 1,
        +day,
        +ehours,
        +eminutes,
        +eseconds
      );

      return {
        ...x,
        Vstart,
        Vend,
      };
    });

    console.log('fselected', fselected)
    console.log('froute', froute)

    setOpenDialogTimeTable(true);
    setSelected(fselected[0]);
    setRouteTime(froute);
  };

  const fetchTimeTable = async () => {
    let res = await getTimeTable({ params: { flag: "Ganjil" } });
    if (res.status === "OK") {
      let currentrowganjil =
        res?.result?.length > 0
          ? res?.result?.map((x) => {
              return x.loopIndex;
            })
          : [0];

      let stationListGanjil = res?.result?.map((x) => {
        return {
          ...x,
          value: x._id,
          label: x.stationName,
        };
      });

      setStationGanjilSelected(stationListGanjil);
      setRowCountArray(res?.result?.length > 0 ? currentrowganjil : [0]);
    }
  };

  useEffect(() => {
    getStationMaster();
    fetchTimeTable();
    getRouteList();
    getKANumber()
  }, []);

  let _stringtonumber = kaNumbers?.map((x) => parseFloat(x));
  let _fganjil = _stringtonumber.filter((x) => x % 2).sort();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} lg={12} xl={12} xs={12} md={12}>
            <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>No KA</TableCell>
                  {
                    _.orderBy(stationGanjilSelected, ["loopIndex"], ["asc"]).map(itemStation=>{
                      return(
                      <TableCell style={{textAlign:'center'}}>
                        {itemStation.stationCode}
                        <br/>
                        <small>(vOps|vMax|dist) <br/>{itemStation.vOps} km/j |{itemStation.vMax} km/j | {itemStation.distance} km</small>
                      </TableCell>)
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  _fganjil.map((itemKA, indexKA)=>{
                    return(
                      <TableRow>
                        <TableCell>{indexKA+1}</TableCell>
                        <TableCell>{itemKA}</TableCell>
                        {
                          _.orderBy(stationGanjilSelected, ["loopIndex"], ["asc"]).map(itemStation=>{
                            let _dataSelected = stationGanjilSelected.filter(x=>x._id ===itemStation._id)
                            let _timeTable = {}
                            let _routeSelected
                            if(_dataSelected.length>0)
                            {
                              _routeSelected = _dataSelected[0].route.filter(x=>x.route === itemKA.toString())
                              if(_routeSelected.length>0)
                              {
                                _timeTable = _routeSelected[0]
                              }
                            }
                            return(<TableCell style={{textAlign:'center'}}>
                            | {_timeTable?.end || "....."} | {_timeTable?.start || "....."} |
                            </TableCell>)
                          })
                        }
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
            </Paper>
            
            {/* <CustomTable
              header={[
                "No",
                "Stasiun",
                "Jarak (KM)",
                "V. Ops (KM/JAM)",
                "V. Max (KM/JAM)",
                "Time Table",
                "Aksi",
              ]}
              tablebody={
                <>
                  {rowCountArray.map((row, rowindex, arr) => {
                    return (
                      <TableRow key={rowindex}>
                        {colCountArray.map((col, index) => (
                          <TableCell
                            key={index}
                            align={`${col == 2 ? "left" : "center"}`}>
                            {col == 1 ? (
                              rowindex + 1
                            ) : col == 2 ? (
                              <>
                                <Select
                                  isDisabled={!edittable}
                                  styles={selectBoxStyles}
                                  menuPortalTarget={document.body}
                                  placeholder="Pilih Stasiun Ganjil"
                                  options={stationMasters}
                                  isSearchable={true}
                                  isClearable={true}
                                  value={
                                    stationGanjilSelected?.filter(
                                      (x) => x.loopIndex == row
                                    )[0]
                                  }
                                  onChange={(e) => {
                                    handleSelectingGanjil(e, row);
                                  }}
                                />
                              </>
                            ) : col == 3 ? (
                              <>
                                {
                                  // rowindex ==
                                  // 0 ? null :
                                  // arr.length -
                                  //     1 ==
                                  // rowindex ? null :
                                  // arr.length -
                                  //     1 ==
                                  // rowindex
                                  //     ? null
                                  <TextField
                                    disabled={!edittable}
                                    inputProps={{
                                      // maxLength: 13,
                                      step: "0.5",
                                    }}
                                    size="small"
                                    id="outlined-basic"
                                    placeholder="Jarak (km)"
                                    variant="outlined"
                                    type="number"
                                    value={
                                      stationGanjilSelected?.filter(
                                        (x) => x.loopIndex == row
                                      )[0]?.distance
                                    }
                                    onChange={(e) => {
                                      handleDistanceGanjil(e.target.value, row);
                                    }}
                                  />
                                }
                              </>
                            ) : col == 4 ? (
                              <>
                                {
                                  // rowindex ==
                                  // 0 ? null :
                                  // arr.length -
                                  //     1 ==
                                  // rowindex ? null :
                                  <TextField
                                    disabled={!edittable}
                                    inputProps={{
                                      // maxLength: 13,
                                      step: "0.5",
                                    }}
                                    size="small"
                                    id="outlined-basic"
                                    placeholder="V.Ops (km/jam)"
                                    variant="outlined"
                                    type="number"
                                    value={
                                      stationGanjilSelected?.filter(
                                        (x) => x.loopIndex == row
                                      )[0]?.vOps
                                    }
                                    onChange={(e) => {
                                      handlevOpsGanjil(e.target.value, row);
                                    }}
                                  />
                                }
                              </>
                            ) : col == 5 ? (
                              <>
                                {
                                  <TextField
                                    disabled={!edittable}
                                    inputProps={{
                                      // maxLength: 13,
                                      step: "0.5",
                                    }}
                                    size="small"
                                    id="outlined-basic"
                                    placeholder="V.Max (km/jam)"
                                    variant="outlined"
                                    type="number"
                                    value={
                                      stationGanjilSelected?.filter(
                                        (x) => x.loopIndex == row
                                      )[0]?.vMax
                                    }
                                    onChange={(e) => {
                                      handlevMaxGanjil(e.target.value, row);
                                    }}
                                  />
                                }
                              </>
                            ) : col == 6 ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  // sx={
                                  //     buttonAddStyle
                                  // }
                                  onClick={() =>
                                    handleOpenTimeTableDialog(row)
                                  }>
                                  Time Table
                                </Button>
                              </>
                            ) : (
                              <>
                                {rowCountArray?.length === rowindex + 1 &&
                                  rowindex !== 0 && (
                                    <IconButton
                                      onClick={() =>
                                        handleRemoveRowGanjil(rowindex, row)
                                      }
                                      aria-label="delete"
                                      color="primary">
                                      <RemoveCircleOutlineIcon />
                                    </IconButton>
                                  )}
                              </>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              }
            /> */}
            {/* <Stack
              justifyContent={"space-between"}
              style={{ backgroundColor: "#BB7E36" }}>
              <div />
              {edittable ? (
                <Button
                  // disabled={!edittable}
                  onClick={() =>
                    handleAddRowGanjil(rowCountArray[rowCountArray.length - 1])
                  }
                  size="large"
                  variant="outlined"
                  startIcon={<AddIcon sx={{ color: "#fff" }} />}>
                  <Typography sx={{ color: "#fff" }}>Tambah Row</Typography>
                </Button>
              ) : (
                <Typography textAlign={"center"} color="white" py={2}>
                  Klik Button "Edit" untuk menambah row.
                </Typography>
              )}
            </Stack> */}
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent="flex-end"
              alignItems={"center"}>
              {!edittable && (
                <Button
                  sx={{ width: "20%" }}
                  onClick={() => setEditTable(true)}
                  variant="contained"
                  size="large"
                  color="primary">
                  Edit
                </Button>
              )}

              {edittable && (
                <Button
                  onClick={() => setEditTable(false)}
                  sx={{ width: "20%" }}
                  variant="contained"
                  size="large"
                  color="error">
                  Batal
                </Button>
              )}

              {edittable && (
                <Button
                  onClick={handleSubmitTable}
                  sx={{ width: "20%" }}
                  variant="contained"
                  size="large">
                  Simpan
                </Button>
              )}
            </Stack>
          </Grid> */}
        </Grid>

        {/* form time table */}
        <Dialog
          maxWidth={"2xl"}
          open={openDialogTimeTable}
          title="Form Time Table Ganjil"
          handleClose={() => setOpenDialogTimeTable(false)}
          content={
            <>
             { <CustomTable
                header={["No", "Nomor KA", "Start", "End"]}
                tablebody={
                  <>
                    {_fganjil.map((row, rowindex) => {
                      return (
                        <TableRow key={rowindex}>
                          <TableCell align="center">{rowindex+1}</TableCell>
                          <TableCell align="center">{row}</TableCell>
                          <TableCell
                            padding="normal"
                            style={{
                              padding: "6px 10px",
                              // margin: 2
                            }}
                            align="center"
                            // key={index}
                            >

                            { stationGanjilSelected?.length > 0 && (
                              <>
                                <TextField type="time" format="HH:mm" value={moment(
                                      routetime.filter(
                                        (x) => x.route == row
                                      )[0]?.Vstart
                                    ).format("HH:mm")} onChange={(e) => {
                                  setTime(e.target.value);
                                  handleSelectingTime(row, "start", e.target.value);
                                }} />
                              </>
                            )}
                          </TableCell>
                          <TableCell
                            padding="normal"
                            style={{
                              padding: "6px 10px",
                              // margin: 2
                            }}
                            align="center"
                            // key={index}
                            >

                            { stationGanjilSelected?.length > 0 && (
                              <>
                                <TextField type="time" format="HH:mm" value={moment(
                                      routetime.filter(
                                        (x) => x.route == row
                                      )[0]?.Vend
                                    ).format("HH:mm")} onChange={(e) => {
                                  setTime(e.target.value);
                                  handleSelectingTime(row, "end", e.target.value);
                                }} />
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                }
              />}
            </>
          }
          action={
            <>
              <Button
                onClick={() => setOpenDialogTimeTable(false)}
                sx={{ width: "20%" }}
                variant="contained"
                size="large"
                color="error">
                Batal
              </Button>
              <Button
                onClick={handleSubmitTimeTable}
                sx={{ width: "20%" }}
                variant="contained"
                size="large">
                Simpan
              </Button>
            </>
          }
        />
      </Box>
    </LocalizationProvider>
  );
}

export default GanjilPage;
