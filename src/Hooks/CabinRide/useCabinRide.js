import { CabinRideContext } from "../../Context/index"
import { useContext, useState, useRef } from "react"
import usePagination from "@mui/material/usePagination"
import _ from 'lodash'
import { Link, useHistory, withRouter } from "react-router-dom"
import { toast } from "react-toastify"

export default function UseCabinRide() {
  const {

    cabinRide,
    filterCabinRide,
    getDataCabinRide,
    getDetailCabinRide,
    setFilterCabinRide,
    setCabinRide,
    putDataCabinRide,
    deleteDataCabinRide,
    postDataCabinRide,
    openSnackbar,
    setOpenSnackbar,

    getDataMasterCabinRide,
    getDetailMasterCabinRide,
    postDataMasterCabinRide,
    putDataMasterCabinRide,
    deleteDataMasterCabinRide,

    masterCabinRide,
    filterMasterCabinRide,
    detailMasterCabinRide,
  } = useContext(CabinRideContext)
  const [text, setText] = useState("")
  const [note, setNote] = useState("")
  
  const submitDataCabinRide = async () => {
    const data = {
        trainDriver : {},
        dailyWorkTrainDriver : {},
        dailyWorkSpv : {},
        cabinRide:{},
        note,
        month:"",
        createBy : JSON.parse(localStorage.profile)
    }
    // console.log(data)
    await postDataCabinRide(data)
  }

  //***************************************** */
  const { items } = usePagination({
    count: 5
})

const [searchText, setSearchText] = useState("")
const [value, setValue] = useState(null)

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
        return cabinRide.filter((el) => {
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
    setFilterCabinRide(dataset)
}

const [idRoute, setIdRoute] = useState("")
const [idRouteMaster, setIdRouteMaster] = useState("")
const [loop, setLoop] = useState("")
const [code, setCode] = useState("")
const [route, setRoute] = useState("")
const [start, setStart] = useState("")
const [end, setEnd] = useState("")
const [from, setFrom] = useState("")
const [finish, setFinish] = useState("")
const [lrv, setlrv] = useState("")

const [openForm, setOpenForm] = useState(false)

const history = useHistory()

const [question, setQuestion] = useState("")
const [questionMaster, setQuestionMaster] = useState("")
const [desc, setDesc] = useState([{ label: "", value: 0, rangepoint: [] }])
const [descMaster, setDescMaster] = useState([{ label: "", value: 0, rangepoint: [] }])

console.log("desc", desc)

const [anchorEl, setAnchorEl] = useState(null)
const buka = Boolean(anchorEl)
const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
}
const handleClose = () => {
    setAnchorEl(null)
}

const handleSubmit = async (event) => {
    event.preventDefault()
    let sendData = {
        question,
        desc
    }

    console.log(sendData)

    if (idRoute) {
        await putDataCabinRide(idRoute, sendData)
    } else {
        await postDataCabinRide(sendData)
    }

    toast.success(
        idRoute ? "Data Berhasil diubah" : "Data Berhasil ditambahkan"
    )
    setIdRoute("")
    setQuestion("")
    setDesc([{ label: "", value: 0, rangepoint: [] }])
    setOpenForm(false)
}

const handleSubmitMaster = async (event) => {
  event.preventDefault()
  let sendData = {
      question: questionMaster,
      desc: descMaster
  }

  console.log(sendData)

  if (idRouteMaster) {
      await putDataMasterCabinRide(idRouteMaster, sendData)
  } else {
      await postDataMasterCabinRide(sendData)
  }

  toast.success(
      idRouteMaster ? "Data Berhasil diubah" : "Data Berhasil ditambahkan"
  )
  setIdRouteMaster("")
  setQuestionMaster("")
  setDescMaster([{ label: "", value: 0, rangepoint: [] }])
  setOpenForm(false)
}

const handleDetail = async (id) => {
    setIdRoute(id)
    const result = await getDetailCabinRide(id)
    console.log("result", result)
    setQuestion(result.question)
    setDesc(result.desc)
}

const handleDetailMaster = async (id) => {
  setIdRouteMaster(id)
  const result = await getDetailMasterCabinRide(id)
  console.log("result", result)
  setQuestionMaster(result.question)
  setDescMaster(result.desc)
}

const handleDelete = (id) => {
    const resultDel = deleteDataCabinRide(id)
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

const handleDeleteMaster = (id) => {
  const resultDel = deleteDataMasterCabinRide(id)
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

const [dialog, setDialog] = useState(false)

const [dataSelected, setDataSelected] = useState({})

const idRef = useRef()
const handleDialog = (data) => {
    setDialog(data)
}

const handleDeleteModal = (item) => {
    console.log(item)
    setDialog(true)
    setDataSelected(item)
}

const handleDeleteSubmit = (choose) => {
    console.log(choose)
    const id = dataSelected?._id

    if (choose) {
        handleDelete(id)
        setDialog(false)
    } else {
        setDataSelected({})
        setDialog(false)
    }
}

const handleDeleteSubmitMaster = (choose) => {
  console.log(choose)
  const id = dataSelected?._id

  if (choose) {
      handleDeleteMaster(id)
      setDialog(false)
  } else {
      setDataSelected({})
      setDialog(false)
  }
}

const handleAddField = () => {
    const newData = {
        label: "",
        value: 0
    }
    const copyState = [...desc]
    copyState.push(newData)
    setDesc(copyState)
}

const handleAddFieldMaster = () => {
  const newData = {
      label: "",
      value: 0
  }
  const copyState = [...descMaster]
  copyState.push(newData)
  setDescMaster(copyState)
}

const handleDeleteField = (id) => {
    setDesc(desc.filter((_, i) => i !== id))
}

const handleDeleteFieldMaster = (id) => {
  setDescMaster(descMaster.filter((_, i) => i !== id))
}

const handleClearEdit = () => {
    setDesc([{ label: "", value: 0, rangepoint: [] }])
    setQuestion("")
    setIdRoute("")

    setDescMaster([{ label: "", value: 0, rangepoint: [] }])
    setQuestionMaster("")
    setIdRouteMaster("")
    // setOpenForm(false)
}

  return {
    submitDataCabinRide,
    setText,
    text,
    setNote,
    setOpenSnackbar,
    openSnackbar,

    //****************************** */
    items,
    getDataCabinRide,
    searchText,
    setSearchText,
    buka,
    handleClick,
    handleClose,
    handleDelete,
    cabinRide,
    filterCabinRide,
    setFilterCabinRide,
    setCabinRide,
    handleChange,
    filterData,
    anchorEl,
    handleSubmit,
    handleSubmitMaster,
    handleDetail,
    handleDetailMaster,
    dialog,
    handleDeleteSubmit,
    handleDeleteSubmitMaster,
    setDialog,
    handleDialog,
    handleDeleteModal,
    idRef,

    question,
    questionMaster,
    setQuestion,
    setQuestionMaster,
    desc,
    descMaster,
    setDesc,
    setDescMaster,
    handleAddField,
    handleAddFieldMaster,
    handleDeleteField,
    handleDeleteFieldMaster,
    idRoute,
    handleClearEdit,
    openForm,
    setOpenForm,

    value,
    setValue,

    getDataMasterCabinRide,
    getDetailMasterCabinRide,
    postDataMasterCabinRide,
    putDataMasterCabinRide,
    deleteDataMasterCabinRide,

    masterCabinRide,
    filterMasterCabinRide,
    detailMasterCabinRide,

  }
}
