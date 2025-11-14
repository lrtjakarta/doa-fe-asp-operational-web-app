import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext
} from "react"
import { TrainRouteContext } from "../../Context/index"
import usePagination from "@mui/material/usePagination"
import _ from "lodash"
import { Link, useHistory, withRouter } from "react-router-dom"
import useQuery from "Utils/QueryParams"

export default function UseTrainRoute(props) {
    let query = useQuery()
    // const id = query.get("id");

    const { items } = usePagination({
        count: 5
    })

    const [searchText, setSearchText] = useState("")
    const {
        trainRoute,
        filterTrainRoute,
        getDetailTrainRoute,
        setFilterTrainRoute,
        setTrainRoute,
        putDataTrainRoute,
        getDataTrainRoute,
        postDataTrainRoute,
        deleteDataTrainRoute,
        trainCadangan,
        trainBertugas,
        trainPenyelia
    } = useContext(TrainRouteContext)
    // handle change event of search input
    const handleChange = (value) => {
        setSearchText(value)
        filterData(value)
    }

    // filter records by search text
    const filterData = (value) => {
        var searchQuery = value.toString().toLowerCase()

        let listdata = [
            "no",
            "photo",
            "name",
            "phone",
            "address",
            "license",
            "nik",
            "birth",
            "status",
            "ket",
            "category",
            "jabatan",
            "divisi",
            "departemen"
        ].map((x, i) => {
            return trainRoute.filter((el) => {
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
        setFilterTrainRoute(dataset)
    }

    const [idRoute, setIdRoute] = useState("")
    const [loop, setLoop] = useState("")
    const [code, setCode] = useState("")
    const [route, setRoute] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [from, setFrom] = useState("")
    const [finish, setFinish] = useState("")
    const [lrv, setlrv] = useState("")
    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null)
    const buka = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSubmit = async function (event) {
        event.preventDefault()
        let sendData = {
            loop,
            code,
            route,
            start,
            end,
            from,
            finish,
            lrv
        }

        console.log(sendData)

        if (idRoute) {
            return putDataTrainRoute(idRoute, sendData)
        } else {
            return postDataTrainRoute(sendData)
        }
    }

    const handleDetail = (id) => {
        console.log(id)
        setIdRoute(id)
        const result = getDetailTrainRoute(id)
        console.log("result", result)
        result
            .then((res) => {
                const startDate = new Date(res.start)
                const endDate = new Date(res.end)
                setCode(res.code)
                setRoute(res.route)
                // setStart(
                //   `${startDate.getFullYear()}/${startDate.getMonth()}/${startDate.getDate()}`
                // );
                // setEnd(
                //   `${endDate.getFullYear()}/${endDate.getMonth()}/${endDate.getDate()}`
                // );
                setStart(res.start)
                setEnd(res.end)
                setlrv(res.lrv)
                setFrom(res.from)
                setFinish(res.finish)
                setLoop(res.loop)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        const resultDel = deleteDataTrainRoute(id)
        resultDel
            .then((res) => {
                setCode("")
                setRoute("")
                setStart("")
                setEnd("")
                setlrv("")
                setFrom("")
                setFinish("")
                setLoop("")
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [dialog, setDialog] = useState({
        isLoading: false
    })

    const [dataSelected, setDataSelected] = useState({})

    const idRef = useRef()
    const handleDialog = (isLoading) => {
        setDialog({
            isLoading
        })
    }

    const handleDeleteModal = (item) => {
        console.log(item)
        handleDialog(true)
        setDataSelected(item)
    }

    const handleDeleteSubmit = (choose) => {
        console.log(choose)
        const id = dataSelected?._id
        if (choose) {
            handleDelete(id)
            handleDialog(false)
        } else {
            setDataSelected({})
            handleDialog(false)
        }
    }

    const handleGet = async (id) => {
        const result = await getDataTrainRoute(id)
        setTrainRoute(result)
    }

    // useEffect(() => {
    //   getDataTrainRoute();
    //   // } else {
    //   //   handleDetail();
    //   // }
    // }, []);

    return {
        items,
        getDataTrainRoute,
        searchText,
        setSearchText,
        buka,
        handleClick,
        handleClose,
        handleDelete,
        trainRoute,
        filterTrainRoute,
        setFilterTrainRoute,
        setTrainRoute,
        handleChange,
        filterData,
        anchorEl,
        handleSubmit,
        handleDetail,
        dialog,
        handleDeleteSubmit,
        setDialog,
        handleDialog,
        handleDeleteModal,
        idRef,
        loop,
        setLoop,
        code,
        setCode,
        route,
        setRoute,
        start,
        setStart,
        end,
        setEnd,
        lrv,
        setlrv,
        from,
        setFrom,
        finish,
        setFinish,
        trainCadangan,
        trainBertugas,
        trainPenyelia
    }
}
