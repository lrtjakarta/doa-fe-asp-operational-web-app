import React, { useEffect, useState } from "react"
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
    Dialog,
    DialogTitle,
    DialogActions
} from "@mui/material"
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"
import { useTheme } from "@mui/material/styles"
import usePagination from "@mui/material/usePagination"
import UseCabinRide from "Hooks/CabinRide/useCabinRide"

// icon
import DownloadIcon from "@mui/icons-material/Download"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

// components
import CustomDialog from "Component/Dialog/CustomDialog"

// style
import {
    buttonAddStyle,
    tableLeftIsiStyle,
    tableLeftStyle,
    tableRightStyle,
    tableTextCellStyle,
    tableTextIsiStyle,
    tableStyle,
    tableHeadStyle,
    judulTextStyle
} from "./Styles"

import _ from 'lodash'

const filter = createFilterOptions()

export default function CabinRide() {
    const {
        masterCabinRide,
        filterMasterCabinRide,
        question,
        questionMaster,
        setQuestion,
        setQuestionMaster,
        handleSubmit,
        handleSubmitMaster,
        desc,
        descMaster,
        setDesc,
        setDescMaster,
        handleAddField,
        handleAddFieldMaster,
        handleDeleteField,
        handleDeleteFieldMaster,
        handleDeleteModal,
        handleDeleteSubmit,
        handleDeleteSubmitMaster,
        dialog,
        handleDetail,
        handleDetailMaster,
        idRoute,
        idRouteMaster,
        handleClearEdit,
        getDataMasterCabinRide,
        openForm,
        setOpenForm,
        value,
        setValue
    } = UseCabinRide()
    const theme = useTheme()
    const { items } = usePagination({
        count: 5
    })

    // console.log("filterCabinRide", filterCabinRide)

    useEffect(() => {
        // if (id) {
        //     handleDetail()
        // } else {
            getDataMasterCabinRide()
        // }
    }, [])

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
                                    Management Cabin Ride
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={buttonAddStyle}
                                onClick={() => {
                                    setOpenForm(true)
                                    handleClearEdit()
                                }}
                            >
                                <AddIcon sx={{ mr: 0.5, fontWeight: "bold" }} />{" "}
                                Tambah
                            </Button>
                        </Grid>
                    </Grid>
                    <Box>
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
                                            align="center"
                                        >
                                            Cabin Ride
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Uraian
                                        </TableCell>
                                        <TableCell
                                            style={tableHeadStyle}
                                            align="center"
                                        >
                                            Bobot
                                        </TableCell>
                                        <TableCell
                                            style={tableRightStyle}
                                            align="center"
                                        >
                                            Keterangan
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterMasterCabinRide?.map((x, i) => (
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
                                                {x.question || "-"}
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
                                                {x.desc?.map((item) => (
                                                    <TableRow
                                                        style={{
                                                            py: 1,
                                                            px: 1.5,
                                                            backgroundColor:
                                                                "#fff"
                                                        }}
                                                    >
                                                        {item.label}
                                                    </TableRow>
                                                )) || "-"}
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
                                                {x.desc?.map((item) => (
                                                    <TableRow
                                                        style={{
                                                            backgroundColor:
                                                                "#fff"
                                                        }}
                                                    >
                                                        {item.value}
                                                    </TableRow>
                                                )) || "-"}
                                            </TableCell>
                                            <TableCell
                                                sx={tableRightStyle}
                                                align="center"
                                            >
                                                <IconButton
                                                    onClick={() => {
                                                        handleDetailMaster(x._id)
                                                        setOpenForm(true)
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
                                                        handleDeleteModal(x)
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
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </Box>

            <CustomDialog
                open={openForm}
                handleClose={() => setOpenForm(false)}
                title="Form Cabin Ride"
                bgcolor="#F6F7FF"
                content={
                    <>
                        <Box
                            component="form"
                            onSubmit={handleSubmitMaster}
                            sx={{ my: 5 }}
                        >
                            <Grid container spacing={0.5} sx={{ m: "auto" }}>
                                <Grid
                                    item
                                    xs={0.5}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        height: "74px",
                                        mt: 0.5
                                    }}
                                >
                                    { idRouteMaster 
                                        ? masterCabinRide.findIndex(
                                              (p) => p._id === idRouteMaster
                                          ) + 1
                                        : masterCabinRide.length + 1}
                                </Grid>
                                <Grid item xs={11.5}>
                                    <Grid container spacing={0.5}>
                                        <Grid item xs={12}>
                                            <TextField
                                                value={questionMaster}
                                                onChange={(e) => {
                                                    setQuestionMaster(e.target.value)
                                                }}
                                                id="outlined-basic"
                                                variant="outlined"
                                                placeholder="Isi Cabin Ride"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    bgcolor: "#fff",
                                                    borderTopRightRadius: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.5
                                            }}
                                        >
                                            {descMaster?.map((data, index) => {
                                                return (
                                                    <Grid
                                                        container
                                                        spacing={0.5}
                                                    >
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                value={
                                                                    data.label
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newData =
                                                                        descMaster.slice()
                                                                    newData[
                                                                        index
                                                                    ] = {
                                                                        ...descMaster[
                                                                            index
                                                                        ],
                                                                        label: e
                                                                            .target
                                                                            .value
                                                                    }

                                                                    setDescMaster(
                                                                        newData
                                                                    )
                                                                }}
                                                                id="outlined-basic"
                                                                variant="outlined"
                                                                placeholder="Isi Uraian"
                                                                name="uraian"
                                                                sx={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    bgcolor:
                                                                        "#fff"
                                                                }}
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Autocomplete
                                                                multiple
                                                                id="tags-filled"
                                                                options={[]}
                                                                // defaultValue={[top100Films[13].title]}
                                                                // freeSolo
                                                                selectOnFocus
                                                                onChange={(
                                                                    event,
                                                                    newValue
                                                                ) => {
                                                                    // if (typeof newValue === "string") {
                                                                    //   setValue({
                                                                    //     title: newValue
                                                                    //   });
                                                                    // } else

                                                                    // setDesc(
                                                                    //     newData
                                                                    // )
                                                                    if (
                                                                        newValue &&
                                                                        newValue.inputValue
                                                                    ) {
                                                                        // Create a new value from the user input
                                                                        // setValue({
                                                                        //   title: newValue.inputValue
                                                                        // });

                                                                        const newData =
                                                                            descMaster.slice()

                                                                        newData[
                                                                            index
                                                                        ] = {
                                                                            ...descMaster[
                                                                                index
                                                                            ],
                                                                            rangepoint:
                                                                                newValue.inputValue
                                                                        }
                                                                        // setValue(
                                                                        //     newValue.inputValue
                                                                        // )
                                                                        setDescMaster(
                                                                            newData
                                                                        )
                                                                    } else {
                                                                        const newData =
                                                                            descMaster.slice()

                                                                        newData[
                                                                            index
                                                                        ] = {
                                                                            ...descMaster[
                                                                                index
                                                                            ],
                                                                            rangepoint:
                                                                                newValue
                                                                        }
                                                                        setDescMaster(
                                                                            newData
                                                                        )
                                                                        // setValue(
                                                                        //     newValue
                                                                        // )
                                                                    }
                                                                }}
                                                                value={
                                                                    data.rangepoint
                                                                }
                                                                getOptionLabel={(
                                                                    option
                                                                ) => {
                                                                    // Value selected with enter, right from the input
                                                                    if (
                                                                        typeof option ===
                                                                        "string"
                                                                    ) {
                                                                        return option
                                                                    }
                                                                    // Add "xxx" option created dynamically
                                                                    if (
                                                                        option.inputValue
                                                                    ) {
                                                                        return option.inputValue
                                                                    }
                                                                    // Regular option
                                                                    // return option.title;
                                                                    return option
                                                                }}
                                                                filterOptions={(
                                                                    options,
                                                                    params
                                                                ) => {
                                                                    const filtered =
                                                                        filter(
                                                                            options,
                                                                            params
                                                                        )

                                                                    const {
                                                                        inputValue
                                                                    } = params
                                                                    // Suggest the creation of a new value
                                                                    const isExisting =
                                                                        options.some(
                                                                            // (option) => inputValue === option.title
                                                                            (
                                                                                option
                                                                            ) =>
                                                                                inputValue ===
                                                                                option
                                                                        )
                                                                    if (
                                                                        inputValue !==
                                                                            "" &&
                                                                        !isExisting
                                                                    ) {
                                                                        console.log(
                                                                            inputValue
                                                                        )
                                                                        filtered.push(
                                                                            parseFloat(
                                                                                inputValue
                                                                            )
                                                                        )
                                                                        // filtered.push({
                                                                        //   inputValue,
                                                                        //   title: `Add "${inputValue}"`
                                                                        // });
                                                                    }

                                                                    return filtered
                                                                }}
                                                                // renderOption={
                                                                //   (props, option) => (
                                                                //     <Chip variant="outlined" label={option.title} {...props} />
                                                                //   )
                                                                // }
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <TextField
                                                                        {...params}
                                                                        // variant="filled"
                                                                        label="Pilihan Nilai"
                                                                        // placeholder="Favorites"
                                                                    />
                                                                )}
                                                                sx={{
                                                                    bgcolor:
                                                                        "#fff"
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1.5}>
                                                            <TextField
                                                                value={
                                                                    data.value
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newData =
                                                                        descMaster.slice()
                                                                    newData[
                                                                        index
                                                                    ] = {
                                                                        ...descMaster[
                                                                            index
                                                                        ],
                                                                        value: e
                                                                            .target
                                                                            .value
                                                                    }

                                                                    setDescMaster(
                                                                        newData
                                                                    )
                                                                }}
                                                                type="number"
                                                                name="bobot"
                                                                id="outlined-basic"
                                                                variant="outlined"
                                                                placeholder="Nilai Uraian"
                                                                sx={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    bgcolor:
                                                                        "#fff"
                                                                }}
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item xs={0.5}>
                                                            {descMaster?.length -
                                                                1 !==
                                                            index ? (
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleDeleteFieldMaster(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <RemoveIcon
                                                                        sx={{
                                                                            color: "#FF00000"
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            ) : (
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleAddFieldMaster()
                                                                    }
                                                                >
                                                                    <AddCircleIcon
                                                                        sx={{
                                                                            color: "#BB7E36"
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                }
                action={
                    <>
                        {(idRouteMaster ||
                            questionMaster?.length > 0 ||
                            descMaster?.length > 1 ||
                            descMaster[0]?.label?.length > 0 ||
                            descMaster[0]?.value !== 0) && (
                            <Button
                                type="submit"
                                autocomplete="off"
                                variant="contained"
                                onClick={() => {
                                    handleClearEdit()
                                    setOpenForm(false)
                                }}
                                sx={{
                                    border: "none !important",
                                    border: 0.5,
                                    borderRadius: 2,
                                    textDecoration: "none",
                                    width: "30%",
                                    mr: 3,
                                    mt: 3,
                                    backgroundColor: "#f2f2f2",
                                    color: "#BB7E36",
                                    "&:hover": {
                                        color: "#f2f2f2",
                                        bgcolor: "#BB7E36"
                                    }
                                }}
                            >
                                {`Batal`}
                            </Button>
                        )}
                        <Button
                            type="submit"
                            autocomplete="off"
                            variant="contained"
                            onClick={(e) => handleSubmitMaster(e)}
                            sx={{
                                color: "#f2f2f2",
                                border: "none !important",
                                bgcolor: "#BB7E36",
                                border: 0.5,
                                borderRadius: 2,
                                textDecoration: "none",
                                width: "30%",
                                mr: 3,
                                mt: 3,
                                "&:hover": {
                                    backgroundColor: "#f2f2f2",
                                    color: "#BB7E36"
                                }
                            }}
                        >
                            Simpan
                        </Button>
                    </>
                }
            />

            {/* dialog delete */}
            <Dialog
                open={dialog}
                onClose={() => handleDeleteSubmitMaster(false)}
                aria-labelledby="alert-delete-title"
                aria-describedby="alert-delete"
            >
                <DialogTitle id="alert-delete-title">
                    {"Apakah anda yakin untuk menghapus field ini?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleDeleteSubmitMaster(false)}>
                        Batal
                    </Button>
                    <Button onClick={() => handleDeleteSubmitMaster(true)} autoFocus>
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
