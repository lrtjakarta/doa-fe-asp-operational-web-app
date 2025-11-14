import { AbsenceContext } from "../../Context/index"
import { useContext, useEffect, useState } from "react"
import moment from "moment"
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver"

export default function UseAbsence() {
  const {
    getDataAbsence,
    absence,filterAbsence,
    postDataAbsence,deleteDataAbsence,
    putDataAbsence,
    openSnackbar,
    setOpenSnackbar,
  } = useContext(AbsenceContext)
  const { trainDriver } = useTrainDriver();
  const [selectedData, setSelectedData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogDelete,setOpenDialogDelete] = useState(false)
  const [selectTrainDriver,setSelectTrainDriver] = useState({})
  const [createDate,setCreateDate] = useState("")
  const [createBy,setCreateBy] = useState({})
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [note,setNote] = useState("")
  const [action,setAction] = useState("")
  const [type,setType] = useState("")  
  const [id,setId] = useState("")  
  const [monthlyWork, setMonthlyWork]= useState("")

  const submitDataAbsence = async () => {
    if(action === "edit"){
      const data = {
          trainDriver : trainDriver.filter(x=>x._id === selectTrainDriver.value)[0],
          startDate,
          endDate,
          note,
          type
      }
      const result = await putDataAbsence(id,data)
      if(result.status === "OK"){
        let monthly = ""
        if(monthlyWork === ""){
          monthly = moment().format("YYYY-MM")
        }
        console.log('monthly', monthly)
        getDataAbsence({monthly:monthlyWork})
          handleClose()
      }
    }
    else if(action === "delete"){
      const result = await deleteDataAbsence(id)
      console.log("result",result)
      if(result.status === "OK"){
        let monthly = ""
        if(monthlyWork === ""){
          monthly = moment().format("YYYY-MM")
        }
        console.log('monthly', monthly)
        getDataAbsence({monthly:monthlyWork})
          handleClose()
      }
    }
    else{
      const data = {
          trainDriver : trainDriver.filter(x=>x._id === selectTrainDriver.value)[0],
          createDate : new Date(),
          createBy : JSON.parse(localStorage.getItem("profile")),
          startDate,
          endDate,
          note,
          type
      }
      const result = await postDataAbsence(data)
      console.log("result",result)
      if(result.status === "OK"){
        getDataAbsence({monthly:monthlyWork})
          handleClose()
      }
    }
  }

  const checkValue = (val) => {
    setId(val?._id)
    setSelectTrainDriver(val?.trainDriver)
    setCreateDate(val?.createDate)
    setCreateBy(val?.createBy)
    setStartDate(moment(val?.startDate).format("YYYY-MM-DD"))
    setEndDate(moment(val?.endDate).format("YYYY-MM-DD"))
    setNote(val?.note)
    setType(val?.type)
  }

  const handleOpen = (data,xaction) => {
    setAction(xaction)
    if(xaction === "edit" || xaction === "delete"){  
      checkValue(data)
      if(xaction === "edit"){
        setOpenDialog(true)
      }
      else{
        setOpenDialogDelete(true)
      }
    }
    else{
      setOpenDialog(true)
      checkValue()
    }
  }

  const handleClose = () => {
    setOpenDialog(false)
    setOpenDialogDelete(false)
  }

  const listType = [
    {
        label:"Cuti",
        value:"Cuti"
    },
    {
        label:"Sakit",
        value:"Sakit"
    },
    {
        label:"OFF",
        value:"OFF"
    },
    {
        label:"Dinas Dalam",
        value:"DD"
    },
    {
        label:"Dinas Luar",
        value:"DL"
    },
    {
        label:"Diklat",
        value:"DT"
    },
    {
        label:"Refreshment",
        value:"Refreshment"
    },
  ]

  return {
    getDataAbsence,filterAbsence,
    submitDataAbsence,action,setAction,
    setOpenSnackbar,
    openSnackbar,setOpenDialogDelete,
    absence,openDialogDelete,
    listType,
    handleOpen,
    selectedData,
    openDialog,setOpenDialog,
    handleClose,
    selectTrainDriver,setSelectTrainDriver,
    createDate,setCreateDate,
    createBy,setCreateBy,
    startDate,setStartDate,
    endDate,setEndDate,
    note,setNote,
    type,setType,
    monthlyWork, setMonthlyWork
  }
}
