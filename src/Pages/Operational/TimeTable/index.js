import React, { useRef, useState, useEffect, useContext } from "react"
import { Box, Container, Grid, Tab, Tabs, Typography,Button, Stack, Chip, TextField, ButtonGroup } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"

import Dialog from "../../../Component/Dialog/CustomDialog"
import CustomTable from "../../../Component/Table/CustomTable"
// lodash
import _ from "lodash"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { TabStyle, buttonAddStyle, btnGroupSelected, btnGroupUnSelected, judulTextStyle } from "./Styles"
import useQuery from "Utils/QueryParams"

import GanjilTab from "./GanjilPage"
import GenapTab from "./GenapPage"
import TimeTableTab from "./TablePage"
import { StationMasterContext, TrainRouteContext } from "Context"

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

// Form Dinasan Masinis

export default function TimeTablePage() {
    // tabs
    const [valuetabs, setValuetabs] = useState(0)
    const theme = useTheme()

    const { setRouteId } = useContext(TrainRouteContext);

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue)
    }

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
        deleteRouteTrain,
        getTimeTable,
        getKATimeTable,
        kaTimeTables,
        getMasterKANumber,
    } = useContext(StationMasterContext)

    useEffect(()=>{
        getRouteTrain()
    },[])

    const [routeSelected, setRouteSelected] = useState("")
    const [stationList, setStationList] = useState([])

    const timeTableRef = useRef()


    return (
        <>
            <Box sx={{ display: "flex", pl: 10, mt: 7 }}>
                <Container maxWidth="xl">
                    <Grid container sx={{ mt: 5 }} justifyContent='space-between'>
                        <Typography sx={judulTextStyle}>Time Table KA</Typography>
                    </Grid>
                    <ButtonGroup style={{width:'100%'}}>
                        {
                            routeTrain.map((itemRoute, indexRoute)=>{
                                return(<Button  style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} variant="contained"  sx={itemRoute._id === routeSelected ? btnGroupSelected : btnGroupUnSelected} onClick={async()=>
                                   {
                                    setRouteSelected(itemRoute._id) 
                                    setRouteId(itemRoute._id)
                                    setStationList(itemRoute.station)
                                    await getKATimeTable({params:{routeTrainId:itemRoute._id}})
                                    await getTimeTable({params:{routeTrainId:itemRoute._id}})
                                    getMasterKANumber({category:itemRoute.category})
                                  }
                                }>
                                    <div><Typography>{itemRoute.name}</Typography></div>
                                    <div><Typography variant="span">{itemRoute.category}</Typography></div>
                                </Button>)
                            })
                        }
                    </ButtonGroup>

                    <TimeTableTab stationList={stationList} ref={timeTableRef} routeTrainId={routeSelected} />
                    {/* <Tabs
                        sx={{ mt: 4 }}
                        indicatorColor="white"
                        value={valuetabs}
                        onChange={handleChangetabs}
                        textColor="gray"
                        variant="fullWidth"
                    >
                        {
                            routeTrain.map((itemRoute, indexRoute)=>{
                                return(
                                    <Tab
                                        sx={TabStyle}
                                        label={<>
                                            <Typography>{itemRoute.name}</Typography>
                                            <Typography variant="span">{itemRoute.category}</Typography>
                                        </>}
                                        {...a11yProps(indexRoute)}
                                    />
                                )
                            })
                        }
                        <Tab sx={TabStyle} label="KA GENAP" {...a11yProps(1)} />
                    </Tabs> */}

                    {/* <TabPanel value={valuetabs} index={0} dir={theme.direction}>
                        <GanjilTab />
                    </TabPanel>

                    <TabPanel value={valuetabs} index={1} dir={theme.direction}>
                        <GenapTab />
                    </TabPanel> */}
                </Container>
            </Box>
            
        </>
    )
}
