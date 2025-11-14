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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
    Stack,
    Chip
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
// lodash
import _ from "lodash"
import PropTypes from "prop-types"

//context
import { useContext } from "react"
import UseTrainRoute from "Hooks/TrainRoute/useTrainRoute"
// import trainRouteContext from "../../Context";

import { useHistory } from "react-router-dom"
import Dialog from "Component/CustomDialog/index"
import { allData } from "./Data"
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
    TabStyle
} from "./Styles"

// import useStyles from "./Styles";

// icon
import DeleteIcon from "@mui/icons-material/Delete"
import DownloadIcon from "@mui/icons-material/Download"
import EditIcon from "@mui/icons-material/Edit"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SearchIcon from "@mui/icons-material/Search"

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

export default function DailySchedule(props) {
    let { data, onUpdate, onDelete, change } = props
    console.log("change", change)
    // const classes = useStyles();
    const navigate = useHistory()

    return (
        <>
            <Card
                // sx={{ minWidth: 275 }}
                style={{ marginTop: "20px" }}
            >
                <CardContent>
                    <TableContainer>
                        <Table sx={tableStyle}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>
                                        No.
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
                                        {change ? "Dinas" : "LOOP"}
                                    </TableCell>
                                    <TableCell
                                        style={tableHeadStyle}
                                        align="left"
                                    >
                                      Keterangan
                                    </TableCell>
                                    {/* {change ? null : (
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Rute
                                        </TableCell>
                                    )} */}

                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        Waktu
                                        <Typography
                                            component="div"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row"
                                            }}
                                        >
                                            <Typography sx={{ m: "auto" }}>
                                                MD
                                            </Typography>
                                            <Typography sx={{ m: "auto" }}>
                                                HD
                                            </Typography>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ m: "auto" }}>
                                            Nomor KA
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        style={tableHeadStyle}
                                        align="center"
                                    >
                                        AKSI
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_.sortBy(data, ["code"])?.map((x, i) => (
                                    <TableRow
                                        key={i + 1}
                                        sx={{ bgcolor: "#F3F3F3" }}
                                    >
                                        <TableCell
                                            style={tableRowAwalStyle}
                                            component="th"
                                            scope="row"
                                        >
                                            {i + 1}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={tableRowStyle}
                                        >
                                            <Typography>{x.code}</Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={tableRowStyle}
                                        >
                                            {x.loop}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            style={tableRowStyle}
                                        >
                                            {x.note === "Bertugas" ? "Mainline" : x.note}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={tableRowStyle}
                                        >
                                            <Typography
                                                component="div"
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        m: "auto",
                                                        fontWeight: 200,
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {x.start}
                                                </Typography>{" "}
                                                -{" "}
                                                <Typography
                                                    sx={{
                                                        m: "auto",
                                                        fontWeight: 200,
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {x.end}
                                                </Typography>
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            {JSON.stringify(x.route)}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            style={tableRowAkhirStyle}
                                        >
                                            {/* <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "flex-end"
                                                }}
                                            > */}
                                            <Stack direction={"row"}>
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
                                                    onClick={() => {
                                                        onDelete(x)
                                                    }}
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            color: "red"
                                                        }}
                                                    />
                                                </IconButton>
                                            </Stack>

                                            {/* {dialog.isLoading && (
                                                    <Dialog
                                                        onDialog={(e) => {
                                                            onDelete(x)
                                                            // handleDeleteModal(x);
                                                            // console.log(e.target.value);
                                                            // handleDeleteSubmit(
                                                            //     e,
                                                            //     x._id,
                                                            //     x.user?._id
                                                            // )
                                                        }}
                                                    />
                                                )} */}
                                            {/* </Box> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    )
}
