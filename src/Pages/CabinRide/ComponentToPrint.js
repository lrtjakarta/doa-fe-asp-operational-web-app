import React, {
    // React,
    useState,
    Fragment,
    useContext,
    useEffect,
    forwardRef
} from "react"
import {
    Container,
    Typography,
    Box,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TextField,
    Grid,
    Button,
    Alert,
    Snackbar,
    MenuItem,
    Stack,
    Modal
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Link, useHistory } from "react-router-dom"
import useStyles from "./Styles"
import moment from "moment"
import _, { concat } from "lodash"
import DeleteIcon from "@mui/icons-material/Delete"
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from "@mui/icons-material"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import CollectionsIcon from "@mui/icons-material/Collections"

import Camera, { FACING_MODES } from "react-html5-camera-photo"

import useQuery from "Utils/QueryParams"
import QRCode from "react-qr-code"

import CardCabinRide from "../../Component/Card/CardCabinRide/index"
import { CabinRideContext } from "Context"
import { toast } from "react-toastify"
import useUploadImg from "Hooks/Upload/useUploadImg"
import StaticVar from "Config/StaticVar"

// style
import {
    tableLeftIsiStyle,
    tableLeftStyle,
    tableRightIsiStyle,
    tableRightStyle,
    tableTextCellStyle,
    tableTextIsiStyle,
    alamatStyle,
    border,
    tableStyle
} from "./Styles"
import "./style.css"

export const ComponentToPrint = React.forwardRef((props, ref) => {
    console.log(props)
    const classes = useStyles()
    let query = useQuery()
    const history = useHistory()

    const id = query.get("id")

    const { getCabinRide, cabinrides, updateCabinRide } =
        useContext(CabinRideContext)

    const [note, setNote] = useState("")
    const [lrvVal, setLrvVal] = useState("")
    const [selectedKA, setSelectedKA] = useState("")
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedNilai, setSelectedNilai] = useState({})
    const [changedCR, setChangedCR] = useState([])
    // const [alldesc, setAlldesc] = useState([])
    const [skorNilai, setSkorNilai] = useState([])
    const [value, setValue] = useState(0)
    const [selectedVal, setSelectedVal] = useState([])
    const [open, setOpen] = useState(false)

    // console.log("selectedVal", selectedVal)

    // upload image
    const { multiImage, setMultiImage } = useUploadImg()

    console.log("multiImage", multiImage)

    const fetchDate = async (e) => {
        let month = moment(new Date()).format("YYYY-MM")
        let res = await getCabinRide({
            // params: { month, id }
            params: { id }
        })
        console.log("length", res.result?.length)
        if (res.status == "OK") {
            let _filter = await res?.result[0]?.cabinRide?.map((x) => x.desc)
            let _result = await res?.result[0]
            setSelectedVal([].concat.apply([], _filter))
            setLoading(false)
            setNote(_result?.note)
            setChangedCR(_result?.cabinRide)
            setSkorNilai(_result?.cabinRide)
            setSelectedKA(_result?.looptrain)
            setLrvVal(_result?.LRVNumber)
            setMultiImage(_result?.file)
            // toast.success("Berhasil update cabin ride.")
            if (e?.submit) {
                setOpen(true)

                history.push("/app/operational/cabinride")
                toast.success("Berhasil update cabin ride.")
            }
        } else {
            toast.error("Gagal update nilai.")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDate()
    }, [])

    let _fdesc = skorNilai?.map((y) => y.desc.map((x) => parseInt(x.result)))
    let _concat = [].concat.apply([], _fdesc)

    console.log("component prints", multiImage)

    return (
        <>
            <div
                ref={ref}
                // className="print"
            >
                <Box
                // sx={{ display: "flex", pt: 10 }}
                >
                    <Container maxWidth="xl" sx={{ mb: 5 }}>
                        <Grid container justifyContent={"space-between"}>
                            <Grid item md={6} lg={6}>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        Nama
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        : {cabinrides[0]?.trainDriver?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        NIK
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        : {cabinrides[0]?.trainDriver?.nik}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        Tanggal
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        :{" "}
                                        {cabinrides[0]?.createdAt &&
                                            moment(
                                                cabinrides[0]?.createdAt
                                            ).format("DD-MM-YYYY")}
                                    </TableCell>
                                </TableRow>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        No. LRV
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        : {cabinrides[0]?.LRVNumber}
                                        {/* {
                                            cabinrides[0]?.dailyWorkTrainDriver
                                                ?.loopRouteTrain?.lrv
                                        } */}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        No. KA
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        : {cabinrides[0]?.looptrain}
                                        {/* {
                                            cabinrides[0]?.dailyWorkTrainDriver
                                                ?.loopRouteTrain?.code
                                        } */}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        Jam Mulai/Berakhir
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ padding: "10px" }}
                                    >
                                        :{" "}
                                        {cabinrides[0]?.createdAt &&
                                            moment(
                                                cabinrides[0]?.createdAt
                                            ).format("HH:mm")}{" "}
                                        /{" "}
                                        {cabinrides[0]?.finishTime &&
                                            moment(
                                                cabinrides[0]?.finishTime
                                            ).format("HH:mm")}
                                    </TableCell>
                                </TableRow>
                            </Grid>
                        </Grid>

                        <Table
                            sx={({ borderRadius: 3, mb: 3 }, tableStyle)}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow
                                    style={{ backgroundColor: "#C4C4C4" }}
                                >
                                    <TableCell style={tableLeftStyle}>
                                        <p
                                            className={classes.tableLeftTxt}
                                            align="center"
                                        >
                                            No.
                                        </p>
                                    </TableCell>
                                    <TableCell
                                        style={tableTextCellStyle}
                                        align="center"
                                    >
                                        Cabin Ride
                                    </TableCell>
                                    <TableCell
                                        style={tableTextCellStyle}
                                        align="center"
                                    >
                                        Uraian
                                    </TableCell>
                                    <TableCell
                                        style={tableTextCellStyle}
                                        align="center"
                                    >
                                        Bobot
                                    </TableCell>
                                    <TableCell
                                        style={tableTextCellStyle}
                                        align="center"
                                    >
                                        Nilai Realisasi
                                    </TableCell>
                                    <TableCell
                                        style={tableTextCellStyle}
                                        align="center"
                                    >
                                        Keterangan
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cabinrides[0] &&
                                    cabinrides[0]?.cabinRide.map(
                                        (item, index) => (
                                            <Fragment>
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        borderSpacing: "5px",
                                                        borderBottom: "30",
                                                        borderRadius: 3
                                                    }}
                                                    style={{
                                                        borderCollapse:
                                                            "seperate",
                                                        // borderSpacing: "5px",
                                                        backgroundColor: "#Fff"
                                                    }}
                                                >
                                                    <TableCell
                                                        rowSpan={
                                                            item.desc.length + 1
                                                        }
                                                        style={
                                                            tableLeftIsiStyle
                                                        }
                                                        component="th"
                                                        align="center"
                                                    >
                                                        {index + 1}
                                                    </TableCell>

                                                    <TableCell
                                                        rowSpan={
                                                            item.desc.length + 1
                                                        }
                                                        style={
                                                            tableTextIsiStyle
                                                        }
                                                    >
                                                        {item.question}
                                                    </TableCell>
                                                </TableRow>
                                                {_.sortBy(item?.desc, [
                                                    "label"
                                                ]).map((val) => (
                                                    <TableRow
                                                        sx={{
                                                            borderRadius: 3
                                                        }}
                                                        style={{
                                                            backgroundColor:
                                                                "#Fff"
                                                        }}
                                                    >
                                                        <TableCell
                                                            style={
                                                                tableTextIsiStyle
                                                            }
                                                            align="left"
                                                        >
                                                            {val.label}
                                                        </TableCell>
                                                        <TableCell
                                                            style={
                                                                tableTextIsiStyle
                                                            }
                                                            align="center"
                                                        >
                                                            {val.value}
                                                        </TableCell>
                                                        <TableCell
                                                            style={
                                                                tableTextIsiStyle
                                                            }
                                                            align="center"
                                                        >
                                                            {val.result}
                                                        </TableCell>
                                                        <TableCell
                                                            style={
                                                                tableTextIsiStyle
                                                            }
                                                            align="left"
                                                        >
                                                            {val.keterangan}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </Fragment>
                                        )
                                    )}
                                <TableRow
                                    sx={{
                                        borderSpacing: "5px",
                                        borderBottom: "30",
                                        borderRadius: 3
                                    }}
                                    style={{
                                        borderCollapse: "seperate",
                                        borderSpacing: "5px",
                                        backgroundColor: "#Fff"
                                    }}
                                >
                                    <TableCell
                                        style={tableLeftIsiStyle}
                                        scope="row"
                                        align="center"
                                        colSpan={4}
                                    >
                                        Total
                                    </TableCell>
                                    <TableCell align="center">
                                        {_.sum(_concat)}
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Grid container spacing={2}>
                            {note && (
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography sx={{ marginTop: 2 }}>
                                        Catatan
                                    </Typography>
                                    <TextField
                                        disabled
                                        placeholder="Masukkan catatan disini "
                                        multiline
                                        // rows={4}
                                        sx={alamatStyle}
                                        style={border}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                        value={note}
                                    ></TextField>
                                </Grid>
                            )}

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                {multiImage?.length > 0 && (
                                    <Stack
                                        flexDirection="row"
                                        gap={3}
                                        sx={{
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        {multiImage?.map((item, index) => (
                                            <Box key={index}>
                                                <Box
                                                    sx={{
                                                        flexDirection: "column",
                                                        width: 200,
                                                        height: 270,
                                                        borderTopRightRadius: 10,
                                                        borderTopLeftRadius: 10,
                                                        backgroundColor:
                                                            "#F2F2F2",
                                                        textTransform: "none",
                                                        p: 0,
                                                        overflow: "hidden",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            StaticVar.URL_API +
                                                            "/upload/" +
                                                            item
                                                        }
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                    <br />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems={"center"}
                            mt={2}
                            justifyContent="space-around"
                            // spacing={5}
                        >
                            <Grid item textAlign={"center"}>
                                <Typography textAlign={"center"}>
                                    Masinis
                                </Typography>
                                <QRCode
                                    value={
                                        cabinrides[0]?.trainDriver?.nik
                                            ? cabinrides[0]?.trainDriver?.nik
                                            : "-"
                                    }
                                    size={100}
                                />
                                {/* <Typography sx={{ mb: 10 }} /> */}
                                <Typography textAlign={"center"}>
                                    {cabinrides[0]?.trainDriver?.name}
                                </Typography>
                                <Typography textAlign={"center"}>
                                    NIK: {cabinrides[0]?.trainDriver?.nik}
                                </Typography>
                            </Grid>
                            <Grid item textAlign={"center"}>
                                <Typography textAlign={"center"}>
                                    Penyelia
                                </Typography>
                                {/* <Typography sx={{ mb: 10 }} /> */}

                                <QRCode
                                    value={
                                        cabinrides[0]?.createBy?.nik
                                            ? cabinrides[0]?.createBy?.nik
                                            : "-"
                                    }
                                    size={100}
                                />
                                <Typography textAlign={"center"}>
                                    {cabinrides[0]?.createBy?.name}
                                </Typography>
                                <Typography textAlign={"center"}>
                                    NIK: {cabinrides[0]?.createBy?.nik}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </div>
        </>
    )
})
