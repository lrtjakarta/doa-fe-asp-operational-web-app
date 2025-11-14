import React, { useRef, useState, useEffect, useContext } from "react"
import { Box, Container, Grid, Table, TableHead, TableBody, TableRow, TableCell, Tab, Tabs, Typography,Button, Stack, Chip, TextField, Paper } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"

import Dialog from "Component/Dialog/CustomDialog"
import CustomTable from "Component/Table/CustomTable"
// lodash
import _ from "lodash"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { TabStyle, buttonAddStyle, judulTextStyle } from "./Styles"
import useQuery from "Utils/QueryParams"

import GanjilTab from "../TimeTable/GanjilPage"
import GenapTab from "../TimeTable/GenapPage"
import { StationMasterContext } from "Context"

// Form Dinasan Masinis

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

export default function TimeTablePage() {
    // tabs
    const theme = useTheme()
    const [openFormKA, setOpenFormKA] = useState(false)
    const [routes, setRoutes] = useState("")

    const [loop, setLoop] = useState("")
    const [kaLoop, setKALoop] = useState([])
    const [allKaNumber, setAllKaNumber] = useState([])
    const [idLoop, setIdLoop] = useState("")
    
    const {
        getKANumber,
        getMasterKANumber,
        masterKANumbers,
        kaNumbers,
        setKANumbers,
        updateKANumber,
        idKaNumbers,
        setIdKANumbers,
        categoryKANumber, 
        setcategoryKANumber,

        getLoops,
        updateLoops,
        createLoops,
        loops,
    } = useContext(StationMasterContext)

    const handleDeleteRoute = (e) => {
        let fremove = kaNumbers?.filter((y) => y !== e)
        setKANumbers(fremove)
    }

    const handleDeleteRouteLoop = (e) => {
        let fremove = allKaNumber?.filter((y) => y !== e)
        setAllKaNumber(fremove)
    }

    const clearState=()=>{
        setIdKANumbers("")
        setcategoryKANumber("")
        setAction("")
    }

    const handleSubmitKANumber = async () => {
        let res = await updateKANumber(idKaNumbers,{ route: kaNumbers })
        if (res.status == "OK") {
            setKANumbers(kaNumbers)
            setRoutes("")
            clearState()
        }
    }

    const handleSubmitKANumberLoop = async () => {
        let res = await updateLoops(idLoop,{ route: allKaNumber })
        if (res.status == "OK") {
            setLoop("")
            setAction("")
        }
    }

    const handleDeleteKANumber = async (idKA,_kaNumber) => {
        let res = await updateKANumber(idKA,{ route: _kaNumber })
        if (res.status == "OK") {
            setRoutes("")
            clearState()
        }
    }

    const handleChangeRoutes = (e) => {
        let currentroutes = [...kaNumbers]
        if (kaNumbers.includes(routes)) {
            let withoutdouble = currentroutes.filter((x) => x !== routes)
            setKANumbers([...withoutdouble, routes])
            setRoutes("")
        } else {
            currentroutes.push(routes)
            setKANumbers(currentroutes)
            setRoutes("")
        }
    }

    useEffect(() => {
        // getKANumber()
        getMasterKANumber()
        getLoops()
    }, [])

    const [action, setAction ]= useState("")

    const [valuetabs, setValuetabs] = useState(0)

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue)
    }

    return (
        <>
            <Box sx={{ display: "flex", pl: 10, mt: 10 }}>
                <Container maxWidth="xl">
                    <Box mb={2}>
                    <Typography sx={judulTextStyle}>Nomor KA</Typography>
                    </Box>
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
                            label="Nomor KA"
                            {...a11yProps(0)}
                        />
                        {/* Tab 2 */}
                        <Tab sx={TabStyle} label="Loop" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={valuetabs} index={0} dir={theme.direction}>
                        <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Nomor KA</TableCell>
                                    <TableCell>Keterangan</TableCell>
                                    <TableCell>Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {masterKANumbers.map((itemMaster,indexMaster)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{indexMaster+1}</TableCell>
                                                <TableCell>
                                                    <Stack
                                                        direction={"row"}
                                                        spacing={1}
                                                        justifyContent="center"
                                                        alignItems={"center"}
                                                        flexWrap="wrap"
                                                    >
                                                        {_.orderBy(itemMaster.route)?.map((x) => (
                                                            <Chip
                                                                style={{
                                                                    margin: "5px",
                                                                    fontSize: "14px"
                                                                }}
                                                                label={`${x}`}
                                                                // onDelete={() => {
                                                                //     let fremove = itemMaster.route?.filter((y) => y !== x)
                                                                //     handleDeleteKANumber(itemMaster._id,fremove)
                                                                //     // handleDeleteRoute(x)
                                                                // }}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>{itemMaster.category}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={()=>{setAction("edit"); setKANumbers(itemMaster.route); setcategoryKANumber(itemMaster.category); setIdKANumbers(itemMaster._id)}}>Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {
                                        action === "edit" &&
                                    
                                    <TableRow>
                                        <TableCell>{masterKANumbers.length+1}</TableCell>
                                        <TableCell >
                                            <Typography>Kategory : {categoryKANumber}</Typography>
                                            <Stack
                                                direction={"row"}
                                                spacing={1}
                                                justifyContent="center"
                                                alignItems={"center"}
                                                flexWrap="wrap"
                                            >
                                                {kaNumbers?.map((x) => (
                                                    <Chip
                                                        style={{
                                                            margin: "5px",
                                                            fontSize: "14px"
                                                        }}
                                                        label={`${x}`}
                                                        onDelete={() => handleDeleteRoute(x)}
                                                    />
                                                ))}
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                justifyContent="center"
                                                alignItems={"center"}
                                            >
                                                <TextField
                                                    value={routes}
                                                    onChange={(e) => setRoutes(e.target.value)}
                                                    // type="number"
                                                    autoFocus
                                                    margin="dense"
                                                    label="Rute"
                                                    fullWidth
                                                    variant="outlined"
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
                                            </Stack>

                                            <Button
                                                onClick={handleSubmitKANumber}
                                                variant="contained"
                                                sx={{ width: "25%",mt:1,mb:2, mr:2 }}
                                                color="primary"
                                                size="large"
                                            >
                                                Simpan
                                            </Button>
                                            <Button
                                                onClick={clearState}
                                                variant="contained"
                                                sx={{ width: "25%",mt:1,mb:2 }}
                                                color="secondary"
                                                size="large"
                                            >
                                                Batal
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    }
                            </TableBody>
                        </Table>
                        </Paper>
                    </TabPanel>
                    <TabPanel value={valuetabs} index={1} dir={theme.direction}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Loop</TableCell>
                                    <TableCell>Nomor KA</TableCell>
                                    <TableCell>Jumlah</TableCell>
                                    <TableCell>Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {loops.map((itemLoop,indexLoop)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{indexLoop+1}</TableCell>
                                                <TableCell>{itemLoop.loop}</TableCell>
                                                <TableCell>
                                                    <Stack
                                                        direction={"row"}
                                                        spacing={1}
                                                        justifyContent="center"
                                                        alignItems={"center"}
                                                        flexWrap="wrap"
                                                    >
                                                        {_.orderBy(itemLoop.route)?.map((x) => (
                                                            <Chip
                                                                style={{
                                                                    margin: "5px",
                                                                    fontSize: "14px"
                                                                }}
                                                                label={`${x}`}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>{itemLoop.route.length} KA</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={()=>{
                                                        let _allKA = []
                                                        masterKANumbers.map(itemKA=>
                                                            _allKA = [..._allKA, ...itemKA.route]
                                                        )
                                                        let _allLoop = []
                                                        loops.filter(x=>x._id !== itemLoop._id).map(itemLoop=>{
                                                            _allLoop = [..._allLoop, ...itemLoop.route]
                                                        })
                                                        const _kaLoop = _.difference(_allKA,_allLoop)
                                                        setAllKaNumber(_kaLoop)
                                                        setAction("edit loop"); 
                                                        setKALoop(itemLoop.route); 
                                                        setLoop(itemLoop.loop); 
                                                        setIdLoop(itemLoop._id)}}>Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {
                                        action === "edit loop" &&
                                    
                                    <TableRow>
                                        <TableCell>{loops.length+1}</TableCell>
                                        <TableCell colSpan={3} >
                                            <Typography>Loop : {loop}</Typography>
                                            <Stack
                                                direction={"row"}
                                                spacing={1}
                                                justifyContent="center"
                                                alignItems={"center"}
                                                flexWrap="wrap"
                                            >
                                                {allKaNumber?.map((x) => (
                                                    <Chip
                                                        style={{
                                                            margin: "5px",
                                                            fontSize: "14px"
                                                        }}
                                                        label={`${x}`}
                                                        onDelete={() => handleDeleteRouteLoop(x)}
                                                    />
                                                ))}
                                            </Stack>

                                            <Button
                                                onClick={handleSubmitKANumberLoop}
                                                variant="contained"
                                                sx={{ width: "25%",mt:1,mb:2, mr:2 }}
                                                color="primary"
                                                size="large"
                                            >
                                                Simpan
                                            </Button>
                                            <Button
                                                onClick={clearState}
                                                variant="contained"
                                                sx={{ width: "25%",mt:1,mb:2 }}
                                                color="secondary"
                                                size="large"
                                            >
                                                Batal
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    }
                            </TableBody>
                        </Table>
                        </Paper>
                    </TabPanel>
                    
                    
                    
                </Container>
            </Box>
        </>
    )
}
