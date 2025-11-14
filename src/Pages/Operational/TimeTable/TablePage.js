import React, { useRef, useState, useContext, useEffect, useImperativeHandle, forwardRef } from "react";
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
  Autocomplete,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Link } from "react-router-dom";
// import Select from "react-select";
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

const TablePage = forwardRef(({stationList, routeTrainId}, ref) =>{
  let [openDialogTimeTable, setOpenDialogTimeTable] = useState(false);

  let [edittable, setEditTable] = useState(false);
  const [time, setTime] = useState("");

  const [rowCountArray, setRowCountArray] = useState([0]);
  const [colCountArray, setColCountArray] = useState([1, 2, 3, 4, 5, 6, 7]);

  const [stationGanjilSelected, setStationGanjilSelected] = useState([]);
  const [routetime, setRouteTime] = useState([]);

  const [selected, setSelected] = useState({});

  const [kaSelected, setKASelected] = useState("")

  //Menggunakan useImperativeHandle untuk expose fungsi ke parent
  useImperativeHandle(ref, ()=>({
    callTimeTable :  fetchTimeTable
  }))

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
    timetables,

    getKATimeTable,
    kaTimeTables,
    setKATimeTables,
    masterKANumbers
  } = useContext(StationMasterContext);
  const { routelist, getRouteList, routeId, setRouteId } = useContext(TrainRouteContext);

  const [kaNumberNew, setKANumberNew] = useState([])
  const [stationSelected, setStationSelected] = useState({})

  const handleSelectingTime = (col, row, value) => {
    let current = routetime;
    let duplicate = current.filter((x) => x.route == `${col}`);
    let withoutdouble = current.filter((x) => x.route !== `${col}`);
    console.log(col, row, value)
    console.log('current', current)
    console.log('duplicate', duplicate)
    console.log('withoutdouble', withoutdouble)
    // if (duplicate?.length > 0) {
      if (row == "start") {
        current = [...withoutdouble,
          {
            route: duplicate[0]?.route || col,
            end : duplicate[0]?.end || "",
            start: value,//moment(value).format("HH:mm:ss"),
            // Vstart: moment(value).toISOString(),
          },
        ];
      } else {
        current = [
          ...withoutdouble,
          {
            route: duplicate[0]?.route || col,
            start : duplicate[0]?.start || "",
            end: value,//moment(value).format("HH:mm:ss"),
            // Vend: moment(value).toISOString(),
          },
        ];
      }
    // } else {
    //   if (row == "start") {
    //     current = [
    //       ...withoutdouble,
    //       {
    //         ...duplicate[0],
    //         start: value,//,moment(value).format("HH:mm:ss"),
    //         // Vstart: moment(value).toISOString(),
    //       },
    //     ];
    //   } else {
    //     current = [
    //       ...withoutdouble,
    //       {
    //         ...duplicate[0],
    //         end: value,//moment(value).format("HH:mm:ss"),
    //         // Vend: moment(value).toISOString(),
    //       },
    //     ];
    //   }
    // }
    console.log('current route time', current)
    setRouteTime(current);
  };

  const handleSubmitTimeTable = async () => {
    let datasend = { ...selected, route: routetime };
    console.log(datasend);
    if(selected){
      let res = await updateTimeTable(selected._id, datasend);
      if (res.status == "OK") {
        fetchTimeTable();
        handleCloseTimeTableDialog();
      }
    }
    else{
      if(kaNumberNew.length>0){
        let _routetime = []
        routetime.filter(itemRoute=>{
          let _check = kaNumberNew.filter(x=>x === itemRoute.route)
          if(_check.length>0)
          {
            _routetime = [..._routetime, itemRoute]
          }
        })
        const dataPost = [{
          loopIndex: stationSelected?.loopIndex,
          routeTrainId : routeId,
          stationId: stationSelected?._id,
          "stationName" : stationSelected?.stationName,
          "stationCode" :stationSelected?.stationCode,
          "stationLocation" : stationSelected?.stationLocation,
          "stationPosition" : stationSelected?.stationPosition,
          route: _routetime
        }]
        console.log('dataPost', dataPost)
        let res = await creteManyTimeTable(dataPost)
        if (res.status == "OK") {
          fetchTimeTable();
          handleCloseTimeTableDialog();
        }
      }
      else{
        let _routetime = routetime
        const dataPost = [{
          loopIndex: stationSelected?.loopIndex,
          routeTrainId : routeId,
          stationId: stationSelected?._id,
          "stationName" : stationSelected?.stationName,
          "stationCode" :stationSelected?.stationCode,
          "stationLocation" : stationSelected?.stationLocation,
          "stationPosition" : stationSelected?.stationPosition,
          route: _routetime
        }]
        console.log('dataPost', dataPost)
        let res = await creteManyTimeTable(dataPost)
        if (res.status == "OK") {
          fetchTimeTable();
          handleCloseTimeTableDialog();
        }
      }
    }
    
  };

  const handleCloseTimeTableDialog = () => {
    setOpenDialogTimeTable(false);
    setRouteTime([]);
    setKANumberNew([])
  };

  const handleOpenTimeTableDialog = (e) => {
    let fselected = timetables.filter((x) => x.stationName == e);

    let froute = fselected[0]?.route

    console.log('fselected', fselected)
    console.log('froute', froute)

    setOpenDialogTimeTable(true);
    setSelected(fselected[0]);
    setRouteTime(froute || []);
    setKANumberNew([])
  };

  const fetchTimeTable = async () => {
    await getKATimeTable({params:{routeTrainId}})
    let res = await getTimeTable({ params: { routeTrainId  } });
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
    // fetchTimeTable();
    getRouteList();
    // getKANumber()
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
                    _.orderBy(stationList, ["loopIndex"], ["asc"]).map(itemStation=>{
                      return(
                      <TableCell style={{textAlign:'center'}}>
                        {itemStation.stationName}
                        <br/>
                        <small>(vOps|vMax|dist) <br/>{itemStation.vOps} km/j |{itemStation.vMax} km/j | {itemStation.distance} km</small>
                        <br/>
                        <IconButton
                              onClick={() => {
                                  // onUpdate(x)
                                  setStationSelected(itemStation)
                                  handleOpenTimeTableDialog(itemStation.stationName)
                              }}
                          >
                              <EditIcon
                                  sx={{
                                      color: "#BB7E36"
                                  }}
                              />
                          </IconButton>
                          {/* <IconButton
                              // onClick={() =>
                              //     onDelete(x)
                              // }
                          >
                              <DeleteIcon
                                  sx={{
                                      color: "#BB7E36"
                                  }}
                              />
                          </IconButton> */}
                      </TableCell>)
                    })
                  }
                  {/* <TableCell>Aksi</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  kaTimeTables.map((itemKA, indexKA)=>{
                    return(
                      <TableRow>
                        <TableCell>{indexKA+1}</TableCell>
                        <TableCell>{itemKA}</TableCell>
                        {
                          _.orderBy(stationList, ["loopIndex"], ["asc"]).map(itemStation=>{
                            let _dataSelected = timetables.filter(x=>(x.stationName === itemStation.stationName || x.stationId === itemStation._id))
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
            
            
          </Grid>

          
        </Grid>

        {/* form time table */}
        <Dialog
          maxWidth={"2xl"}
          open={openDialogTimeTable}
          title={"Form Time Table "+ stationSelected.stationName}
          handleClose={() => setOpenDialogTimeTable(false)}
          content={
            <>
             { <CustomTable
                header={["No", "Nomor KA", "Tiba", "Berangkat"]}
                tablebody={
                  <>
                    {[...kaTimeTables, ...kaNumberNew].map((row, rowindex) => {
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
                             

                            { timetables?.length > 0 ? (
                              <>
                                <TextField value={routetime.filter((x) => x.route == row)[0]?.end} onChange={(e) => {
                                  setTime(e.target.value);
                                  handleSelectingTime(row, "end", e.target.value);
                                }} />
                              </>
                            ):
                            <TextField value={routetime.filter(
                              (x) => x.route == row
                            )[0]?.end} onChange={(e) => {
                              setTime(e.target.value);
                              handleSelectingTime(row, "end", e.target.value);
                            }} />
                            }
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
                            { timetables?.length > 0 ? (
                              <>
                                <TextField value={routetime.filter(
                                        (x) => x.route == row
                                      )[0]?.start} onChange={(e) => {
                                  setTime(e.target.value);
                                  handleSelectingTime(row, "start", e.target.value);
                                }} />
                              </>
                            ):
                            <TextField value={routetime.filter(
                              (x) => x.route == row
                            )[0]?.start} onChange={(e) => {
                              setTime(e.target.value);
                              handleSelectingTime(row, "start", e.target.value);
                            }} />
                            }
                          </TableCell>
                          
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell colSpan={3}>
                        <Stack direction={"row"}>
                          <Select value={kaSelected} onChange={e=>setKASelected(e.target.value)}>
                            <MenuItem value="">Nomor KA</MenuItem>
                            {
                              masterKANumbers[0]?.route.map(itemKA=>{
                                return(<MenuItem value={itemKA}>{itemKA}</MenuItem>)
                              })
                            }
                          </Select>
                          {/* <Autocomplete
                            id="tags-filled"
                            options={masterKANumbers[0]?.route || []}
                            // defaultValue={[top100Films[13].title]}
                            // freeSolo
                            selectOnFocus
                            onChange={(
                                event,
                                newValue
                            ) => {
                                setKASelected(newValue);
                            }}
                            value={kaSelected}
                            renderInput={(
                                params
                            ) => (
                                <TextField
                                    {...params}
                                    label="Nomor KA"
                                    style={{width:'200px'}}
                                />
                            )}
                            sx={{
                                bgcolor:
                                    "#fff"
                            }}
                        /> */}
                        <Button variant="contained" color="primary" onClick={()=>{
                          console.log('routetime', routetime)
                          setRouteTime([...routetime, {route : kaSelected, start: "", end: ""}])
                          setKANumberNew([...kaNumberNew, kaSelected])
                          // 
                        }}>Tambah</Button>
                        </Stack>
                      
                      </TableCell>
                    </TableRow>
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
})

export default TablePage;
