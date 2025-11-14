import React, { useRef, useState, useEffect } from "react"
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Tab,
    TableCell,
    TableRow,
    Tabs,
    TextField,
    Typography,
    Stack,
    Chip,
    Autocomplete, 
    createFilterOptions,
    Table
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import Select from "react-select"

// lodash
import _ from "lodash"
import PropTypes from "prop-types"

//context
import { useContext } from "react"
import UseTrainRoute from "Hooks/TrainRoute/useTrainRoute"

import { useHistory } from "react-router-dom"
// import
import { masinisData } from "./Data"
import {
    appBarStyle,
    buttonAddStyle,
    buttonDownloadStyle,
    buttonTodayStyle,
    centerStyle,
    judulTextStyle,
    searchBorderStyle,
    tableHeadAbsensiStyle,
    tableRowAbsensiStyle,
    tableHeadStyle,
    tableRowStyle,
    tableRowAkhirStyle,
    tableRowAwalStyle,
    tableStyle,
    TabStyle,
    textfieldstyle,
    selectBoxStyles
} from "./Styles"

import SearchIcon from "@mui/icons-material/Search"

// context
import { TrainRouteContext, StationMasterContext } from "Context/index"

// component
import TableTrainRoute from "./TableTrainRoute"
import CustomDialog from "Component/Dialog/CustomDialog"
import Dialog from "Component/CustomDialog/index"
import CustomTable from "Component/Table/CustomTable"

import { SnippetFolderRounded } from "@mui/icons-material"

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

export default function DailySchedule() {
    // const classes = useStyles();
    // const filter = createFilterOptions()

    const navigate = useHistory()
    const {
        getDataTrainRoute,
        trainCadangan,
        trainBertugas,
        trainPenyelia,
        postDataTrainRoute,
        putDataTrainRoute,
        deleteDataTrainRoute
    } = useContext(TrainRouteContext)
    const {
        getStationMaster,
        createStationMaster,
        updateStationMaster,
        deleteStationMaster,
        stationMasters,
        filterstation,
        getKANumber,
        kaNumbers,
        setKANumbers,
        updateKANumber,
        idKaNumbers
    } = useContext(StationMasterContext)

    // tabs
    const [valuetabs, setValuetabs] = React.useState(0)
    const theme = useTheme()

    const [opendialog, setOpenDialog] = useState(false)
    const [opendelete, setOpenDelete] = useState(false)

    const [loop, setLoop] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [code, setCode] = useState("")
    const [from, setFrom] = useState("")
    const [finish, setFinish] = useState("")
    const [routes, setRoutes] = useState("")
    const [lrv, setLrv] = useState("")
    const [note, setNote] = useState("")
    const [flag, setFlag] = useState("")
    const [stationGanjilSelected, setStationGanjilSelected] = useState([])
    const [stationGenapSelected, setStationGenapSelected] = useState([])
    const [rowCountArray, setRowCountArray] = useState([0])
    const [colCountArray, setColCountArray] = useState([1, 2, 3, 4, 5, 6])

    // genap
    const [rowCountArrayGenap, setRowCountArrayGenap] = useState([0])
    const [colCountArrayGenap, setColCountArrayGenap] = useState([
        1, 2, 3, 4, 5, 6
    ])
    const [allroutes, setAllRoutes] = useState([])
    const [action, setAction] = useState("")
    const [selected, setSelected] = useState("")

    const handleSelectingGanjil = (e, index) => {
        let currentganjil = [...stationGanjilSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGanjilSelected([
                ...withoutdouble,
                { ...e, loopIndex: index }
            ])
        } else {
            currentganjil.push({ ...e, loopIndex: index })
            setStationGanjilSelected(currentganjil)
        }
    }

    const handleDistanceGanjil = (e, index) => {
        let currentganjil = [...stationGanjilSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGanjilSelected([
                ...withoutdouble,
                { ...fduplicate[0], distance: parseFloat(e) }
            ])
        }
    }

    const handlevOpsGanjil = (e, index) => {
        let currentganjil = [...stationGanjilSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGanjilSelected([
                ...withoutdouble,
                { ...fduplicate[0], vOps: parseFloat(e) }
            ])
        }
    }

    const handlevMaxGanjil = (e, index) => {
        let currentganjil = [...stationGanjilSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGanjilSelected([
                ...withoutdouble,
                { ...fduplicate[0], vMax: parseFloat(e) }
            ])
        }
    }

    const handleAddRowGanjil = (e) => {
        console.log(e)
        let currentrow = [...rowCountArray]

        currentrow.push(e + 1)
        setRowCountArray(currentrow)
    }

    const handleRemoveRowGanjil = (e, row) => {
        let currentrow = [...rowCountArray]
        let filterrm = currentrow.filter((x) => x !== row)

        let filterganjil = stationGanjilSelected.filter(
            (x) => x.loopIndex !== row
        )

        setRowCountArray(filterrm)
        setStationGanjilSelected(filterganjil)
    }

    const handleSelectingGenap = (e, index) => {
        let currentgenap = [...stationGenapSelected]
        console.log(e, index)
        let fduplicate = currentgenap.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentgenap.filter(
                (x) => x.loopIndex !== index
            )

            setStationGenapSelected([
                ...withoutdouble,
                { ...e, loopIndex: index }
            ])
        } else {
            currentgenap.push({ ...e, loopIndex: index })
            setStationGenapSelected(currentgenap)
        }
    }

    const handleDistanceGenap = (e, index) => {
        let currentganjil = [...stationGenapSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGenapSelected([
                ...withoutdouble,
                { ...fduplicate[0], distance: parseFloat(e) }
            ])
        }
    }

    const handlevOpsGenap = (e, index) => {
        let currentganjil = [...stationGenapSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGenapSelected([
                ...withoutdouble,
                { ...fduplicate[0], vOps: parseFloat(e) }
            ])
        }
    }

    const handlevMaxGenap = (e, index) => {
        let currentganjil = [...stationGenapSelected]
        let fduplicate = currentganjil.filter((x) => x.loopIndex == index)

        if (fduplicate?.length > 0) {
            let withoutdouble = currentganjil.filter(
                (x) => x.loopIndex !== index
            )

            setStationGenapSelected([
                ...withoutdouble,
                { ...fduplicate[0], vMax: parseFloat(e) }
            ])
        }
    }

    const handleAddRowGenap = (e) => {
        console.log(e)
        let currentrow = [...rowCountArrayGenap]

        currentrow.push(e + 1)
        setRowCountArrayGenap(currentrow)
    }

    const handleRemoveRowGenap = (e, row) => {
        let currentrow = [...rowCountArrayGenap]
        let filterrm = currentrow.filter((x) => x !== row)

        let filterganjil = stationGenapSelected.filter(
            (x) => x.loopIndex !== row
        )

        setRowCountArrayGenap(filterrm)
        setStationGenapSelected(filterganjil)
    }

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue)
    }

    // menuitem hari ini
    const [anchorEl, setAnchorEl] = React.useState(null)

    // menuitem tambah dinasan
    const [searchText, setSearchText] = useState("")
    const [products, setProducts] = useState(masinisData)

    // untuk filter search
    const handleChange = (value) => {
        setSearchText(value)
        filterData(value)
    }

    const filterData = (value) => {
        var searchQuery = value.toString().toLowerCase()

        let listdata = [
            "code",
            "no",
            "route",
            "loop",
            "start",
            "end",
            "from",
            "to",
            "nolrv"
        ].map((x, i) => {
            return masinisData.filter((el) => {
                if (el[x]) {
                    return (
                        el[x].toString().toLowerCase().indexOf(searchQuery) !==
                        -1
                    )
                }
            })
        })

        var dataset = _.maxBy(listdata, function (o) {
            return o.length
        })
        setProducts(dataset)
    }

    const handleChangeRoutes = (e) => {
        let currentroutes = [...allroutes]
        if (allroutes.includes(routes)) {
            let withoutdouble = currentroutes;//currentroutes.filter((x) => x !== routes )
            if(routes !== "REST"){
                withoutdouble = currentroutes.filter((x) => x !== routes);
            }
            setAllRoutes([...withoutdouble, routes])
            setRoutes("")
        } else {
            currentroutes.push(routes)
            setAllRoutes(currentroutes)
            setRoutes("")
        }
    }

    const handleDeleteRoute = (e) => {
        console.log("delete", e)
        let fremove = allroutes?.filter((y) => y !== e)
        setAllRoutes(fremove)
    }

    const handleSubmit = async () => {
        let datasend = {
            code,
            loop,
            start,
            end,
            from,
            finish,
            route: allroutes,
            lrv,
            note,
            station: [
                {
                    flag: "Ganjil",
                    stationList: stationGanjilSelected
                    // stationList: stationGanjilSelected.map((x, index) => {
                    //     return {
                    //         ...x,
                    //         loopIndex: index + 1
                    //     }
                    // })
                },
                {
                    flag: "Genap",
                    stationList: stationGenapSelected
                    // stationList: stationGenapSelected.map((x, index) => {
                    //     return {
                    //         ...x,
                    //         loopIndex: index + 1
                    //     }
                    // })
                }
            ]
        }

        if (action == "edit") {
            let res = await putDataTrainRoute(selected, datasend)
            console.log("res", res)

            if (res.status == "OK") {
                setOpenDialog(false)
                onResetState()
            }
        } else {
            let res = await postDataTrainRoute(datasend)
            console.log("res", res)
            if (res.status == "OK") {
                setOpenDialog(false)
                onResetState()
            }
        }
    }

    const onResetState = () => {
        // console.log(e)
        // setOpenDialog(true)
        // setAction("edit")
        setSelected("")
        setCode("")
        setLoop("")
        setStart("")
        setEnd("")
        setFrom("")
        setFinish("")
        setAllRoutes("")
        setLrv("")
        setNote("")
        setFlag("")
        setStationGanjilSelected([])
        setStationGenapSelected([])
        setRowCountArray([0])
        setRowCountArrayGenap([0])
    }

    const onUpdate = (e) => {
        console.log(e)
        let currentrowganjil =
            e?.station[0]?.stationList.length > 0
                ? e?.station[0]?.stationList.map((x) => {
                      return x.loopIndex
                  })
                : [0]
        let currentrowgenap =
            e?.station[1]?.stationList.length > 0
                ? e?.station[1]?.stationList.map((x) => {
                      return x.loopIndex
                  })
                : [0]

        let stationListGanjil = e?.station[0]?.stationList?.map((x) => {
            return {
                ...x,
                value: x._id,
                label: x.stationName
            }
        })

        let stationListGenap = e?.station[1]?.stationList?.map((x) => {
            return {
                ...x,
                value: x._id,
                label: x.stationName
            }
        })
        // console.log("currentrowganjil", currentrowganjil, currentrowgenap)
        setOpenDialog(true)
        setAction("edit")
        setSelected(e._id)
        setCode(e.code)
        setLoop(e.loop)
        setStart(e.start)
        setEnd(e.end)
        setFrom(e.from)
        setFinish(e.finish)
        setAllRoutes(e.route)
        setLrv(e.lrv)
        setNote(e.note)
        setFlag(e?.station[0]?.flag)
        setStationGanjilSelected(
            e?.station[0]?.stationList ? stationListGanjil : []
        )
        setStationGenapSelected(
            e?.station[1]?.stationList ? stationListGenap : []
        )
        setRowCountArray(e?.station[0]?.stationList ? currentrowganjil : [0])
        setRowCountArrayGenap(
            e?.station[1]?.stationList ? currentrowgenap : [0]
        )
    }

    const onDelete = (e) => {
        console.log(e)
        setSelected(e._id)
        setOpenDelete(true)
    }

    const handleDeleteSubmit = async () => {
        let res = await deleteDataTrainRoute(selected)
        if (res.status == "OK") {
            setOpenDelete(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getDataTrainRoute()
            await getStationMaster()
            await getKANumber()
        }
        fetchData();
    }, [])

    // console.log(kaNumbers)

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    }

    return (
        <>
            <Box
                sx={{
                    // display: "flex",
                    pl: 8,
                    mt: 12
                    // , overflowX: "hidden"
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ mb: 2 }}>
                        <Grid sx={centerStyle} container>
                            <Grid item xs={7}>
                                <Typography sx={judulTextStyle}>
                                    Dinas - Perjalanan KA
                                </Typography>
                                {/* <Typography sx={{ fontWeight: 200 }}>No. 09 / DH / ASP / II / 2022</Typography> */}
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    
                                <Grid item xs={8} sx={{ mt: 2 }}>
                                    <TextField
                                        value={searchText}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                        placeholder="Pencarian"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton>
                                                        <SearchIcon
                                                            sx={{
                                                                fontSize: 17,
                                                                color: "gray",
                                                                ml: 0
                                                            }}
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                fontSize: 12,
                                                height: 35,
                                                backgroundColor: "#fff",
                                                width: "100%"
                                            }
                                        }}
                                        sx={searchBorderStyle}
                                    />
                                </Grid>

                                <Grid item xs={4} sx={{ mt: 2 }}>
                                    <Button
                                        onClick={() => {
                                            setOpenDialog(true)
                                            setAction("add")
                                            onResetState()
                                            setNote(
                                                valuetabs == 0
                                                    ? "Bertugas"
                                                    : valuetabs == 1
                                                    ? "Cadangan"
                                                    : "Penyelia"
                                            )
                                        }}
                                        variant="contained"
                                        sx={buttonAddStyle}
                                    >
                                        <AddIcon
                                            sx={{
                                                mr: 0.5,
                                                fontWeight: "bold"
                                            }}
                                        />{" "}
                                        Tambah
                                    </Button>
                                </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mb: 2 }}>

                        <TableTrainRoute
                            data={trainBertugas}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                        {/* <Tabs
                            sx={{ mt: 4 }}
                            indicatorColor="white"
                            value={valuetabs}
                            onChange={handleChangetabs}
                            textColor="gray"
                            variant="fullWidth"
                        >
                            <Tab
                                sx={TabStyle}
                                label="Bertugas"
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={TabStyle}
                                label="Cadangan"
                                {...a11yProps(1)}
                            />
                            <Tab
                                sx={TabStyle}
                                label="Penyelia"
                                {...a11yProps(2)}
                            />
                        </Tabs> */}

                        {/* <TabPanel
                            value={valuetabs}
                            index={0}
                            dir={theme.direction}
                        >
                            <TableTrainRoute
                                data={trainBertugas}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        </TabPanel> */}
                        {/* <TabPanel
                            value={valuetabs}
                            index={1}
                            dir={theme.direction}
                        >
                            <TableTrainRoute
                                data={trainCadangan}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                change
                            />
                        </TabPanel>
                        <TabPanel
                            value={valuetabs}
                            index={2}
                            dir={theme.direction}
                        >
                            <TableTrainRoute
                                data={trainPenyelia}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                change
                            />
                        </TabPanel> */}
                    </Box>
                </Container>
            </Box>

            <CustomDialog
                maxWidth={"md"}
                open={opendialog}
                handleClose={() => setOpenDialog(false)}
                title="Form Dinas"
                content={
                    <>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                id="code"
                                label="Kode"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                id="start"
                                label="Waktu MD"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                // type="number"
                                autoFocus
                                margin="dense"
                                id="end"
                                label="Waktu HD"
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
                            {valuetabs == 0 ? (
                                <TextField
                                    value={loop}
                                    onChange={(e) => setLoop(e.target.value)}
                                    // type="number"
                                    autoFocus
                                    margin="dense"
                                    label="Loop"
                                    fullWidth
                                    variant="outlined"
                                />
                            ) : null}

                            {valuetabs !== 0 ? (
                                <TextField
                                    value={loop}
                                    onChange={(e) => setLoop(e.target.value)}
                                    // type="number"
                                    autoFocus
                                    margin="dense"
                                    label="Dinas"
                                    fullWidth
                                    variant="outlined"
                                />
                            ) : null}
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={1}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                // disabled
                                select
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                autoFocus
                                margin="dense"
                                label="Catatan"
                                fullWidth
                                variant="outlined"
                            >
                                {["Bertugas", "Cadangan", "Penyelia"].map(
                                    (option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    )
                                )}
                            </TextField>
                           
                        </Stack>
                        <Table>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Nomor KA</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    1
                                </TableCell>
                                <TableCell>
                                {allroutes?.length > 0 && valuetabs === 0 && (
                                    <Stack
                                        my={2}
                                        direction={"row"}
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems={"center"}
                                    >
                                        {allroutes?.map((x) => {
                                            return(
                                            <>
                                                <Chip
                                                    label={`${x}`}
                                                    onDelete={() => handleDeleteRoute(x)}
                                                />
                                            </>
                                        )})}
                                    </Stack>
                                )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>
                                    <Stack
                                        direction={"row"}
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems={"center"}
                                    >
                                    {valuetabs == 0 && (
                                        <>
                                            <Autocomplete
                                                id="tags-filled"
                                                options={["REST",...kaNumbers]}
                                                // defaultValue={[top100Films[13].title]}
                                                // freeSolo
                                                selectOnFocus
                                                onChange={(
                                                    event,
                                                    newValue
                                                ) => {
                                                    setRoutes(newValue);
                                                }}
                                                value={routes}
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
                                            />
                                            <Button
                                                onClick={handleChangeRoutes}
                                                variant="contained"
                                                sx={{
                                                    ...buttonAddStyle,
                                                    px: 5,
                                                    py: 1.5
                                                }}
                                            >
                                                <AddIcon
                                                    sx={{
                                                        mr: 0.5,
                                                        fontWeight: "bold"
                                                    }}
                                                />
                                                Tambah
                                            </Button>
                                        </>
                                    )}
                                    </Stack>
                                
                                </TableCell>
                            </TableRow>
                        </Table>
                        

                        
                        {false && valuetabs == 0 && (
                            <Grid container spacing={2}>
                                <Grid item md={6} sx={12} lg={6}>
                                    <Typography>Ganjil</Typography>
                                    <CustomTable
                                        header={[
                                            "No",
                                            "Stasiun",
                                            "Jarak",
                                            "V. Ops",
                                            "V. Max",
                                            "Aksi"
                                        ]}
                                        tablebody={
                                            <>
                                                {rowCountArray.map(
                                                    (row, rowindex, arr) => {
                                                        return (
                                                            <TableRow
                                                                key={rowindex}
                                                            >
                                                                {colCountArray.map(
                                                                    (
                                                                        col,
                                                                        index
                                                                    ) => (
                                                                        <TableCell
                                                                            // rowSpan={
                                                                            //     col ==
                                                                            //         3 ||
                                                                            //     col ==
                                                                            //         4 ||
                                                                            //     col ==
                                                                            //         5
                                                                            //         ? 2
                                                                            //         : 1
                                                                            // }
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {col ==
                                                                            1 ? (
                                                                                rowindex +
                                                                                1
                                                                            ) : col ==
                                                                              2 ? (
                                                                                <>
                                                                                    <Select
                                                                                        styles={
                                                                                            selectBoxStyles
                                                                                        }
                                                                                        menuPortalTarget={
                                                                                            document.body
                                                                                        }
                                                                                        placeholder="Pilih Stasiun Ganjil"
                                                                                        options={
                                                                                            stationMasters
                                                                                        }
                                                                                        isSearchable={
                                                                                            true
                                                                                        }
                                                                                        isClearable={
                                                                                            true
                                                                                        }
                                                                                        value={
                                                                                            stationGanjilSelected?.filter(
                                                                                                (
                                                                                                    x
                                                                                                ) =>
                                                                                                    x.loopIndex ==
                                                                                                    row
                                                                                            )[0]
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            handleSelectingGanjil(
                                                                                                e,
                                                                                                row
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                            ) : col ==
                                                                              3 ? (
                                                                                <>
                                                                                    {rowindex ==
                                                                                    0 ? null : (
                                                                                        // arr.length -
                                                                                        //     1 ==
                                                                                        // rowindex
                                                                                        //     ? null
                                                                                        <TextField
                                                                                            inputProps={{
                                                                                                // maxLength: 13,
                                                                                                step: "0.5"
                                                                                            }}
                                                                                            size="small"
                                                                                            id="outlined-basic"
                                                                                            placeholder="Jarak (km)"
                                                                                            variant="outlined"
                                                                                            type="number"
                                                                                            value={
                                                                                                stationGanjilSelected?.filter(
                                                                                                    (
                                                                                                        x
                                                                                                    ) =>
                                                                                                        x.loopIndex ==
                                                                                                        row
                                                                                                )[0]
                                                                                                    ?.distance
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                handleDistanceGanjil(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                                    row
                                                                                                )
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            ) : col ==
                                                                              4 ? (
                                                                                <>
                                                                                    {rowindex ==
                                                                                    0 ? null : (
                                                                                        <TextField
                                                                                            inputProps={{
                                                                                                // maxLength: 13,
                                                                                                step: "0.5"
                                                                                            }}
                                                                                            size="small"
                                                                                            id="outlined-basic"
                                                                                            placeholder="V.Ops (km/jam)"
                                                                                            variant="outlined"
                                                                                            type="number"
                                                                                            value={
                                                                                                stationGanjilSelected?.filter(
                                                                                                    (
                                                                                                        x
                                                                                                    ) =>
                                                                                                        x.loopIndex ==
                                                                                                        row
                                                                                                )[0]
                                                                                                    ?.vOps
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                handlevOpsGanjil(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                                    row
                                                                                                )
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            ) : col ==
                                                                              5 ? (
                                                                                <>
                                                                                    {rowindex ==
                                                                                    0 ? null : (
                                                                                        <TextField
                                                                                            inputProps={{
                                                                                                // maxLength: 13,
                                                                                                step: "0.5"
                                                                                            }}
                                                                                            size="small"
                                                                                            id="outlined-basic"
                                                                                            placeholder="V.Max (km/jam)"
                                                                                            variant="outlined"
                                                                                            type="number"
                                                                                            value={
                                                                                                stationGanjilSelected?.filter(
                                                                                                    (
                                                                                                        x
                                                                                                    ) =>
                                                                                                        x.loopIndex ==
                                                                                                        row
                                                                                                )[0]
                                                                                                    ?.vMax
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                handlevMaxGanjil(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                                    row
                                                                                                )
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {rowCountArray?.length ===
                                                                                        rowindex +
                                                                                            1 &&
                                                                                        rowindex !==
                                                                                            0 && (
                                                                                            <IconButton
                                                                                                onClick={() =>
                                                                                                    handleRemoveRowGanjil(
                                                                                                        rowindex,
                                                                                                        row
                                                                                                    )
                                                                                                }
                                                                                                aria-label="delete"
                                                                                                color="primary"
                                                                                            >
                                                                                                <RemoveCircleOutlineIcon />
                                                                                            </IconButton>
                                                                                        )}
                                                                                </>
                                                                            )}
                                                                        </TableCell>
                                                                    )
                                                                )}
                                                            </TableRow>
                                                        )
                                                    }
                                                )}
                                            </>
                                        }
                                    />
                                    <Stack
                                        justifyContent={"space-between"}
                                        style={{ backgroundColor: "#BB7E36" }}
                                    >
                                        <div />
                                        <IconButton
                                            onClick={() =>
                                                handleAddRowGanjil(
                                                    rowCountArray[
                                                        rowCountArray.length - 1
                                                    ]
                                                )
                                            }
                                            aria-label="delete"
                                            color="primary"
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                                <Grid item md={6} sx={12} lg={6}>
                                    <Typography>Genap</Typography>
                                    <CustomTable
                                        header={[
                                            "No",
                                            "Stasiun",
                                            "Jarak",
                                            "V. Ops",
                                            "V. Max",
                                            "Aksi"
                                        ]}
                                        tablebody={
                                            <>
                                                {rowCountArrayGenap.map(
                                                    (row, rowindex) => (
                                                        <TableRow
                                                            key={rowindex}
                                                        >
                                                            {colCountArrayGenap.map(
                                                                (
                                                                    col,
                                                                    index
                                                                ) => (
                                                                    <TableCell
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {col ==
                                                                        1 ? (
                                                                            rowindex +
                                                                            1
                                                                        ) : col ==
                                                                          2 ? (
                                                                            <>
                                                                                <Select
                                                                                    styles={
                                                                                        selectBoxStyles
                                                                                    }
                                                                                    menuPortalTarget={
                                                                                        document.body
                                                                                    }
                                                                                    placeholder="Pilih Stasiun Genap"
                                                                                    options={
                                                                                        stationMasters
                                                                                    }
                                                                                    isSearchable={
                                                                                        true
                                                                                    }
                                                                                    isClearable={
                                                                                        true
                                                                                    }
                                                                                    value={
                                                                                        stationGenapSelected?.filter(
                                                                                            (
                                                                                                x
                                                                                            ) =>
                                                                                                x.loopIndex ==
                                                                                                row
                                                                                        )[0]
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        handleSelectingGenap(
                                                                                            e,
                                                                                            row
                                                                                        )
                                                                                    }}
                                                                                />
                                                                                {/* <TextField
                                                                                select
                                                                                value={
                                                                                    stationGenapSelected?.filter(
                                                                                        (
                                                                                            x
                                                                                        ) =>
                                                                                            x.loopIndex ==
                                                                                            row
                                                                                    )[0]
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleSelectingGenap(
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                        row
                                                                                    )
                                                                                }
                                                                                autoFocus
                                                                                margin="dense"
                                                                                label="Stasiun"
                                                                                fullWidth
                                                                                variant="outlined"
                                                                            >
                                                                                {stationMasters?.map(
                                                                                    (
                                                                                        option,
                                                                                        index
                                                                                    ) => (
                                                                                        <MenuItem
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            value={
                                                                                                option
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option?.stationName
                                                                                            }
                                                                                        </MenuItem>
                                                                                    )
                                                                                )}
                                                                            </TextField> */}
                                                                            </>
                                                                        ) : col ==
                                                                          3 ? (
                                                                            <>
                                                                                {rowindex ==
                                                                                0 ? null : (
                                                                                    // arr.length -
                                                                                    //     1 ==
                                                                                    // rowindex
                                                                                    //     ? null
                                                                                    <TextField
                                                                                        inputProps={{
                                                                                            // maxLength: 13,
                                                                                            step: "0.5"
                                                                                        }}
                                                                                        size="small"
                                                                                        id="outlined-basic"
                                                                                        placeholder="Jarak (km)"
                                                                                        variant="outlined"
                                                                                        type="number"
                                                                                        value={
                                                                                            stationGenapSelected?.filter(
                                                                                                (
                                                                                                    x
                                                                                                ) =>
                                                                                                    x.loopIndex ==
                                                                                                    row
                                                                                            )[0]
                                                                                                ?.distance
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            handleDistanceGenap(
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                                row
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </>
                                                                        ) : col ==
                                                                          4 ? (
                                                                            <>
                                                                                {rowindex ==
                                                                                0 ? null : (
                                                                                    <TextField
                                                                                        inputProps={{
                                                                                            // maxLength: 13,
                                                                                            step: "0.5"
                                                                                        }}
                                                                                        size="small"
                                                                                        id="outlined-basic"
                                                                                        placeholder="V.Ops (km/jam)"
                                                                                        variant="outlined"
                                                                                        type="number"
                                                                                        value={
                                                                                            stationGenapSelected?.filter(
                                                                                                (
                                                                                                    x
                                                                                                ) =>
                                                                                                    x.loopIndex ==
                                                                                                    row
                                                                                            )[0]
                                                                                                ?.vOps
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            handlevOpsGenap(
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                                row
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </>
                                                                        ) : col ==
                                                                          5 ? (
                                                                            <>
                                                                                {rowindex ==
                                                                                0 ? null : (
                                                                                    <TextField
                                                                                        inputProps={{
                                                                                            // maxLength: 13,
                                                                                            step: "0.5"
                                                                                        }}
                                                                                        size="small"
                                                                                        id="outlined-basic"
                                                                                        placeholder="V.Max (km/jam)"
                                                                                        variant="outlined"
                                                                                        type="number"
                                                                                        value={
                                                                                            stationGenapSelected?.filter(
                                                                                                (
                                                                                                    x
                                                                                                ) =>
                                                                                                    x.loopIndex ==
                                                                                                    row
                                                                                            )[0]
                                                                                                ?.vMax
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            handlevMaxGenap(
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                                row
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {rowCountArrayGenap?.length ===
                                                                                    rowindex +
                                                                                        1 &&
                                                                                    rowindex !==
                                                                                        0 && (
                                                                                        <IconButton
                                                                                            onClick={() =>
                                                                                                handleRemoveRowGenap(
                                                                                                    rowindex,
                                                                                                    row
                                                                                                )
                                                                                            }
                                                                                            aria-label="delete"
                                                                                            color="primary"
                                                                                        >
                                                                                            <RemoveCircleOutlineIcon />
                                                                                        </IconButton>
                                                                                    )}
                                                                            </>
                                                                        )}
                                                                    </TableCell>
                                                                )
                                                            )}
                                                        </TableRow>
                                                    )
                                                )}
                                            </>
                                        }
                                    />
                                    <Stack
                                        justifyContent={"space-between"}
                                        style={{ backgroundColor: "#BB7E36" }}
                                    >
                                        <div />
                                        <IconButton
                                            onClick={() =>
                                                handleAddRowGenap(
                                                    rowCountArrayGenap[
                                                        rowCountArrayGenap.length -
                                                            1
                                                    ]
                                                )
                                            }
                                            aria-label="delete"
                                            color="primary"
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        )}

                        {/* <Stack
                            direction={"row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                        >
                            <TextField
                                select
                                value={flag}
                                onChange={(e) => setFlag(e.target.value)}
                                autoFocus
                                margin="dense"
                                label="Flag"
                                fullWidth
                                variant="outlined"
                            >
                                {["Ganjil", "Genap"].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack> */}
                        {/* <Stack
                            direction={"column"}
                            spacing={2}
                            justifyContent="center"
                            alignItems={"center"}
                            marginTop="8px"
                        >
                            <Stack
                                width="100%"
                                direction={"row"}
                                spacing={2}
                                justifyContent="center"
                                alignItems={"center"}
                            >
                                <Typography>Ganjil: </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">
                                        Stasiun
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={stationGanjilSelected}
                                        onChange={handleSelectGanjilStation}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => {
                                            // let _selected = []
                                            let _selected = selected?.map(
                                                (x) => {
                                                    return x?.stationName
                                                }
                                            )
                                            return _selected.join(", ")
                                        }}
                                        MenuProps={MenuProps}
                                    >
                                        {stationMasters.map((name, index) => (
                                            <MenuItem
                                                key={name._id}
                                                value={name}
                                            >
                                                <Checkbox
                                                    checked={
                                                        stationGanjilSelected?.filter(
                                                            (x) =>
                                                                x._id ==
                                                                name._id
                                                        ).length > 0
                                                        // stationGanjilSelected.indexOf(
                                                        //     name._id
                                                        // ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={name?.stationName}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack
                                width="100%"
                                direction={"row"}
                                spacing={2}
                                justifyContent="center"
                                alignItems={"center"}
                            >
                                <Typography>Genap: </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">
                                        Stasiun
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={stationGenapSelected}
                                        onChange={handleSelectGenapStation}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => {
                                            // let _selected = []
                                            let _selected = selected?.map(
                                                (x) => {
                                                    return x?.stationName
                                                }
                                            )
                                            return _selected.join(", ")
                                        }}
                                        MenuProps={MenuProps}
                                    >
                                        {stationMasters.map((name, index) => (
                                            <MenuItem
                                                key={name._id}
                                                value={name}
                                            >
                                                <Checkbox
                                                    checked={
                                                        stationGenapSelected?.filter(
                                                            (x) =>
                                                                x._id ==
                                                                name._id
                                                        ).length > 0
                                                        // stationSelected.indexOf(
                                                        //     name._id
                                                        // ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={name?.stationName}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack> */}
                    </>
                }
                action={
                    <>
                        <Button
                            onClick={() => setOpenDialog(false)}
                            variant="outlined"
                            sx={{ width: "25%" }}
                            color="secondary"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ width: "25%" }}
                            color="primary"
                        >
                            Simpan
                        </Button>
                    </>
                }
            />

            {opendelete && (
                <Dialog
                    onDialog={() => {
                        handleDeleteSubmit(selected)
                    }}
                />
            )}
        </>
    )
}
