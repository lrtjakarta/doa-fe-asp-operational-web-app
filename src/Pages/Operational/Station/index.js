import React, { Fragment, useEffect, useState, useContext } from "react"
import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
    IconButton,
    TextField,
    Stack,
    Tab, Tabs,
    Select,
    MenuItem
} from "@mui/material"
import _ from 'lodash'
import { styled, useTheme } from "@mui/material/styles"
import usePagination from "@mui/material/usePagination"

// icon
import DownloadIcon from "@mui/icons-material/Download"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

// components
import CustomDialog from "../../../Component/Dialog/CustomDialog"
import Dialog from "../../../Component/CustomDialog/index"

import PropTypes from "prop-types"

// style
import {
    TabStyle,
    buttonAddStyle,
    tableLeftIsiStyle,
    tableLeftStyle,
    tableRightIsiStyle,
    tableRightStyle,
    tableTextCellStyle,
    tableTextIsiStyle,
    tableStyle,
    tableHeadStyle,
    judulTextStyle
} from "./Styles"

import { StationMasterContext } from "../../../Context"

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, pt: 2, width: "100%" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    }
}

export default function CabinRide() {
    const {
        getStationMaster,
        createStationMaster,
        updateStationMaster,
        deleteStationMaster,
        stationMasters,
        filterstation,

        routeTrain,
        getRouteTrain,
        updateRouteTrain,
        createRouteTrain,
        deleteRouteTrain
    } = useContext(StationMasterContext)
    const theme = useTheme()
    const { items } = usePagination({
        count: 5
    })

    const [openForm, setOpenForm] = useState(false)
    const [openFormRute, setOpenFormRute] = useState(false)
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [location, setLocation] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [note, setNote] = useState("")

    const [position, setPosition] = useState("")
    const [selected, setSelected] = useState("")
    const [action, setAction] = useState("")
    const [opendelete, setOpenDelete] = useState(false)

    const [opendeleterute, setOpenDeleteRute] = useState(false)

    const [nameRoute, setNameRoute] = useState("")
    const [categoryRoute, setCategoryRoute] = useState("")
    const [stationRoute, setStationRoute] = useState([])

    const [stationSelected, setStationSelected] = useState("")
    const [loopIndex, setLoopIndex] = useState(0)
    const [vMax, setVMax] = useState(0)
    const [vOps, setVOps] = useState(0)
    const [distance, setDistance] = useState(0)

    console.log("filterstation", filterstation)

    const onResetState = () => {
        setName("")
        setCode("")
        setLocation([])
        setLatitude("")
        setLongitude("")
        setPosition("")
    }

    const onResetStateRute = () => {
        setNameRoute("")
        setCategoryRoute("")
        setStationRoute([])
    }

    const handleSubmit = async () => {
        let datasend = {
            stationName: name,
            stationCode: code,
            stationLocation: [parseInt(longitude), parseInt(latitude)],
            stationPosition: position,
            stationNote: note
        }
        console.log("req.body", datasend)
        if (action == "edit") {
            let res = await updateStationMaster(selected, datasend)
            console.log("res", res)

            if (res.status == "OK") {
                setOpenForm(false)
                onResetState()
            }
        } else {
            let res = await createStationMaster(datasend)
            console.log("res", res)
            if (res.status == "OK") {
                setOpenForm(false)
                onResetState()
            }
        }
    }

    const handleSubmitRute = async () => {
        let datasend = {
            name: nameRoute,
            category: categoryRoute,
            station : stationRoute
        }
        console.log("req.body", datasend)
        if (action == "edit Rute") {
            let res = await updateRouteTrain(selected, datasend)
            console.log("res", res)

            if (res.status == "OK") {
                setOpenFormRute(false)
                onResetStateRute()
            }
        } else {
            let res = await createRouteTrain(datasend)
            console.log("res", res)
            if (res.status == "OK") {
                setOpenFormRute(false)
                onResetStateRute()
            }
        }
    }

    const onUpdate = (e) => {
        // console.log(e)
        setOpenForm(true)
        setAction("edit")
        setSelected(e._id)
        setName(e.stationName)
        setCode(e.stationCode)
        setLatitude(e.stationLocation[1] ? e.stationLocation[1] : "")
        setLongitude(e.stationLocation[0] ? e.stationLocation[0] : "")
        setPosition(e.stationPosition)
        setNote(e.stationNote ? e.stationNote : "Stasiun")
    }

    const onUpdateRute = (e) => {
        console.log('onUpdateRute', e)
        setOpenFormRute(true)
        setAction("edit Rute")
        setSelected(e._id)
        setNameRoute(e.name)
        setCategoryRoute(e.category)
        setStationRoute(e.station)
    }

    const onDelete = (e) => {
        console.log(e)
        setSelected(e._id)
        setOpenDelete(true)
    }

    const onDeleteRute = (e) => {
        console.log(e)
        setSelected(e._id)
        setOpenDeleteRute(true)
    }

    const handleOnDialog = (e) => {
        console.log(e)
        if (e) {
            handleDeleteSubmit(selected)
        } else {
            setOpenDelete(false)
        }
    }

    const handleOnDialogRute = (e) => {
        console.log(e)
        if (e) {
            handleDeleteRuteSubmit(selected)
        } else {
            setOpenDeleteRute(false)
        }
    }

    const handleDeleteSubmit = async (e) => {
        console.log("selected", e)
        let res = await deleteStationMaster(e)
        if (res.status == "OK") {
            setOpenDelete(false)
        }
    }

    const handleDeleteRuteSubmit = async (e) => {
        console.log("selected", e)
        let res = await deleteRouteTrain(e)
        if (res.status == "OK") {
            setOpenDeleteRute(false)
        }
    }

    useEffect(() => {
        getStationMaster()
        getRouteTrain()
    }, [])

    const [valuetabs, setValuetabs] = useState(0)

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue)
    }

    return (
        <>
            <Box sx={{ display: "flex", pl: 10, mt: 10, mb: 10 }}>
                <Container maxWidth="xl">
                    <Grid
                        sx={{ mt: 5 }}
                        container
                        justifyContent="space-between"
                        alignItems={"center"}
                    >
                        <Grid item>
                            <Typography
                                component="span"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <Typography sx={judulTextStyle}>
                                    Management Lokasi
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box>
                        <Tabs
                            sx={{ mt: 4 }}
                            indicatorColor="white"
                            value={valuetabs}
                            onChange={handleChangetabs}
                            textColor="gray"
                            variant="fullWidth"
                        >
                            {/* Tab 1 */}
                            <Tab
                                sx={TabStyle}
                                label="Lokasi"
                                {...a11yProps(0)}
                            />
                            {/* Tab 2 */}
                            <Tab sx={TabStyle} label="Rute Perjalanan" {...a11yProps(1)} />
                        </Tabs>

                        <TabPanel value={valuetabs} index={0} dir={theme.direction}>
                        <Button
                            variant="contained"
                            sx={buttonAddStyle}
                            onClick={() => {
                                setAction("add")
                                setOpenForm(true)
                                onResetState()
                            }}
                        >
                            <AddIcon sx={{ mr: 0.5, fontWeight: "bold" }} />{" "}
                            Tambah
                        </Button>
                        <TableContainer sx={{ mt: 2 }}>
                            
                            <Table sx={tableStyle} aria-label="simple table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            borderRadius: "20px",
                                            overflow: "hidden",
                                            backgroundColor: "#C4C4C4"
                                        }}
                                    >
                                        <TableCell style={tableLeftStyle}>
                                            <p
                                                align="center"
                                                style={{
                                                    color: "#000",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    [theme.breakpoints.down(
                                                        "sm"
                                                    )]: {
                                                        fontSize: 14,
                                                        padding: "10px"
                                                    }
                                                }}
                                            >
                                                No.
                                            </p>
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="left"
                                        >
                                            Nama
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Kode
                                        </TableCell>

                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Lokasi
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Keterangan
                                        </TableCell>
                                        <TableCell
                                            style={tableRightStyle}
                                            align="center"
                                        >
                                            Aksi
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterstation?.length > 0 ? (
                                        filterstation?.map((x, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    borderRadius: 3
                                                }}
                                                style={{
                                                    backgroundColor: "#Fff"
                                                }}
                                            >
                                                <TableCell
                                                    style={{
                                                        textColor:
                                                            "#000000 !important"
                                                    }}
                                                    component="th"
                                                    scope="row"
                                                    align="center"
                                                    sx={tableLeftIsiStyle}
                                                >
                                                    {i + 1}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    sx={tableTextIsiStyle}
                                                >
                                                    {x.stationName}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "16px",
                                                        border: "none",
                                                        fontWeight: 400,
                                                        color: "#000",
                                                        backgroundColor: "#fff",
                                                        py: 2
                                                    }}
                                                >
                                                    {x.stationCode}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        fontSize: "16px",
                                                        border: "none",
                                                        fontWeight: 400,
                                                        color: "#000",
                                                        backgroundColor: "#fff",
                                                        py: 2
                                                    }}
                                                >
                                                    {x.stationLocation} -{" "}
                                                    {x.stationPosition}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        fontSize: "16px",
                                                        border: "none",
                                                        fontWeight: 400,
                                                        color: "#000",
                                                        backgroundColor: "#fff",
                                                        py: 2
                                                    }}
                                                >
                                                    {x.stationNote}
                                                </TableCell>
                                                <TableCell
                                                    sx={tableRightStyle}
                                                    align="center"
                                                >
                                                    <IconButton
                                                        onClick={() => {
                                                            onUpdate(x)
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={{
                                                                color: "#BB7E36"
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() =>
                                                            onDelete(x)
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            sx={{
                                                                color: "#BB7E36"
                                                            }}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow
                                            sx={{
                                                borderRadius: 3
                                            }}
                                            style={{
                                                backgroundColor: "#Fff"
                                            }}
                                        >
                                            <TableCell
                                                colSpan={5}
                                                sx={tableRightStyle}
                                                align="center"
                                            >
                                                Data Kosong
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </TabPanel>

                        <TabPanel value={valuetabs} index={1} dir={theme.direction}>
                        <Button
                                variant="contained"
                                sx={buttonAddStyle}
                                onClick={() => {
                                    setAction("add rute")
                                    setOpenFormRute(true)
                                    onResetStateRute()
                                }}
                            >
                                <AddIcon sx={{ mr: 0.5, fontWeight: "bold" }} />{" "}
                                Tambah
                            </Button>
                        <TableContainer sx={{ mt: 2 }}>
                        <Table sx={tableStyle} aria-label="simple table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            borderRadius: "20px",
                                            overflow: "hidden",
                                            backgroundColor: "#C4C4C4"
                                        }}
                                    >
                                        <TableCell style={tableLeftStyle}>
                                            <p
                                                align="center"
                                                style={{
                                                    color: "#000",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    [theme.breakpoints.down(
                                                        "sm"
                                                    )]: {
                                                        fontSize: 14,
                                                        padding: "10px"
                                                    }
                                                }}
                                            >
                                                No.
                                            </p>
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="left"
                                        >
                                            Nama
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Keterangan
                                        </TableCell>

                                        <TableCell
                                            style={tableHeadStyle}
                                            align="left"
                                        >
                                            Rute
                                        </TableCell>
                                        <TableCell
                                            style={tableRightStyle}
                                            align="center"
                                        >
                                            Aksi
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    routeTrain?.map((x, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    borderRadius: 3
                                                }}
                                                style={{
                                                    backgroundColor: "#Fff"
                                                }}
                                            >
                                                <TableCell
                                                    style={{
                                                        textColor:
                                                            "#000000 !important"
                                                    }}
                                                    component="th"
                                                    scope="row"
                                                    align="center"
                                                    sx={tableLeftIsiStyle}
                                                >
                                                    {i + 1}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    sx={tableTextIsiStyle}
                                                >
                                                    {x.name}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "16px",
                                                        border: "none",
                                                        fontWeight: 400,
                                                        color: "#000",
                                                        backgroundColor: "#fff",
                                                        py: 2
                                                    }}
                                                >
                                                    {x.category}
                                                </TableCell>
                                                <TableCell>
                                                    <ol>
                                                        {
                                                            _.orderBy(x.station, ["loopIndex"], ["asc"]).map(itemStation=>(<li>{itemStation.stationName || "-"} <pre /> vMax: {itemStation.vMax || "-"} km/j | vMax: {itemStation.vOps || "-"} km/j | distance: {itemStation.distance || "-"} km </li>))
                                                        }
                                                    </ol>
                                                </TableCell>
                                                <TableCell
                                                    sx={tableRightStyle}
                                                    align="center"
                                                >
                                                    <IconButton
                                                        onClick={() => {
                                                            onUpdateRute(x)
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={{
                                                                color: "#BB7E36"
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() =>
                                                            onDeleteRute(x)
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            sx={{
                                                                color: "#BB7E36"
                                                            }}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </TabPanel>

                        
                    </Box>
                </Container>
            </Box>

            <CustomDialog
                open={openForm}
                handleClose={() => setOpenForm(false)}
                title="Form Master Lokasi"
                maxWidth={"md"}
                content={
                    <>
                        <Stack
                            direction={"column"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                id="code"
                                label="Nama Stasiun"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                label="Kode Stasiun"
                                fullWidth
                                variant="outlined"
                            />
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                autoFocus
                                margin="dense"
                                label="Posisi"
                                placeholder="5+600"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={latitude}
                                onChange={(e) =>
                                    setLatitude(e.target.value)
                                }
                                type="number"
                                autoFocus
                                margin="dense"
                                label="Latitude"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={longitude}
                                onChange={(e) =>
                                    setLongitude(e.target.value)
                                }
                                type="number"
                                autoFocus
                                margin="dense"
                                label="Longitude"
                                fullWidth
                                variant="outlined"
                            />
                        </Stack>
                        <Select label="Keterangan" fullWidth  value={note} onChange={e=>setNote(e.target.value)}>
                            <MenuItem value="Stasiun">Stasiun</MenuItem>
                            <MenuItem value="Langsir">Langsir</MenuItem>
                        </Select>
                    </>
                }
                action={
                    <>
                        <Button
                            onClick={() => setOpenForm(false)}
                            variant="outlined"
                            // sx={{ width: "25%" }}
                            color="secondary"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            // sx={{ width: "25%" }}
                            color="primary"
                        >
                            Simpan
                        </Button>
                    </>
                }
            />

            <CustomDialog
                open={openFormRute}
                handleClose={() => setOpenFormRute(false)}
                title="Form Rute"
                maxWidth={"md"}
                content={
                    <>
                        <Stack
                            direction={"column"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                value={nameRoute}
                                onChange={(e) => setNameRoute(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="code"
                                label="Nama Rute"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                value={categoryRoute}
                                onChange={(e) => setCategoryRoute(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                label="Kategori"
                                fullWidth
                                variant="outlined"
                            />
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <Table>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Lokasi</TableCell>
                                    <TableCell>Loop Index</TableCell>
                                    <TableCell>vMax (km/j)</TableCell>
                                    <TableCell>vOps (km/j)</TableCell>
                                    <TableCell>distance (km)</TableCell>
                                    <TableCell>Aksi</TableCell>
                                </TableRow>
                                {
                                    _.orderBy(stationRoute, ["loopIndex"], ["asc"]).map((itemRoute, indexRoute)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{indexRoute+1}</TableCell>
                                                <TableCell>{itemRoute.stationName}</TableCell>
                                                <TableCell>{itemRoute.loopIndex}</TableCell>
                                                <TableCell>{itemRoute.vMax}</TableCell>
                                                <TableCell>{itemRoute.vOps}</TableCell>
                                                <TableCell>{itemRoute.distance}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => setStationRoute(stationRoute.filter(x=>x._id !== itemRoute._id))} >
                                                        <DeleteIcon sx={{color: "#BB7E36"}}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Select value={stationSelected} onChange={e=>setStationSelected(e.target.value)}>
                                            {
                                                filterstation.map(itemStatiun=>{
                                                    return(
                                                        <MenuItem value={itemStatiun._id}>{itemStatiun.stationName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <TextField label="Loop Index" type={"Number"} value={loopIndex} onChange={e=>setLoopIndex(e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField label="vMax" type={"Number"} value={vMax} onChange={e=>setVMax(e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField label="vOps" type={"Number"} value={vOps} onChange={e=>setVOps(e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField label="distance" type={"Number"} value={distance} onChange={e=>setDistance(e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button varian="contained" color="primary" onClick={()=>{
                                            let _stationSelected = filterstation.filter(x=>x._id === stationSelected)
                                            console.log('_stationSelected', _stationSelected, stationRoute)
                                            if(_stationSelected.length>0)
                                            {
                                                setStationRoute([...stationRoute,
                                                    {
                                                        _id: _stationSelected[0]._id,
                                                        stationName : _stationSelected[0].stationName,
                                                        loopIndex,
                                                        vMax,
                                                        vOps,
                                                        distance
                                                    }
                                                ])
                                            }
                                            
                                        }}>+ Tambah</Button>
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </Stack>
                    </>
                }
                action={
                    <>
                        <Button
                            onClick={() => setOpenFormRute(false)}
                            variant="outlined"
                            // sx={{ width: "25%" }}
                            color="secondary"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmitRute}
                            variant="contained"
                            // sx={{ width: "25%" }}
                            color="primary"
                        >
                            Simpan
                        </Button>
                    </>
                }
            />

            {opendelete && (
                <Dialog
                    onDialog={handleOnDialog}
                    // onDialog={() => {
                    //     handleOnDialog()
                    //     // handleDeleteSubmit(selected)
                    // }}
                />
            )}

            {opendeleterute && (
                <Dialog
                    onDialog={handleOnDialogRute}
                    // onDialog={() => {
                    //     handleOnDialog()
                    //     // handleDeleteSubmit(selected)
                    // }}
                />
            )}
        </>
    )
}
