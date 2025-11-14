import { DailyWorkContext, GonoGoItemContext } from "../../Context/index"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"

export default function UseGonoGoItem() {
  const {
    getDataGonoGoItem,
    gonoGoItem,
    postDataGonoGoItem,
    openSnackbar,
    setOpenSnackbar,
    putDataGonoGoItem
  } = useContext(GonoGoItemContext)
const { getDataScheduleTrainDriver } = useContext(DailyWorkContext)
  const [text, setText] = useState("")
  const [selectedData, setSelectedData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [filterStartDate, setfilterStartDate] = useState('')
  const [filterEndDate, setfilterEndDate] = useState('')

  const submitDataGonoGoItem = async (multiImage,dailyWorkTrainDriver) => {
    const data = {
      dailyWorkTrainDriver : 
        {
          createDate: dailyWorkTrainDriver?.createDate,
          createDateString: dailyWorkTrainDriver?.createDateString,
          createdAt: dailyWorkTrainDriver?.createdAt,
          dailyWorkDate: dailyWorkTrainDriver?.dailyWorkDate,
          dailyWorkDateString: dailyWorkTrainDriver?.dailyWorkDateString,
          loopRouteTrain:dailyWorkTrainDriver?.loopRouteTrain,
          monthlyWorkDateString:dailyWorkTrainDriver?.monthlyWorkDateString,
          readTakeGive:dailyWorkTrainDriver?.readTakeGive
        }
      ,
      file: multiImage,
      note: text,
      createBy: JSON.parse(localStorage.profile),
      createdAt : moment().format("YYYY-MM-DD")
    }
    await postDataGonoGoItem(data)
  }

  const updateDataGonoGoItem = async (multiImage, note, _id) => {
    const data = {file: multiImage, note}
    console.log('data post', data)
    await putDataGonoGoItem(_id, data)
  }

  const submitnewdata = async (dailyWorkTrainDriver) => {
    const data = {
      dailyWorkTrainDriver : 
        {
          dailyWorkDate: dailyWorkTrainDriver?.dailyWorkDate,
          dailyWorkDateString: dailyWorkTrainDriver?.dailyWorkDateString,
          loopRouteTrain:dailyWorkTrainDriver?.loopRouteTrain,
          monthlyWorkDateString:dailyWorkTrainDriver?.monthlyWorkDateString,
          readTakeGive:dailyWorkTrainDriver?.readTakeGive
        }
      ,
      trainDriver : JSON.parse(localStorage.profile),
      createBy: JSON.parse(localStorage.profile),
      createdAt : moment().format("YYYY-MM-DD")
    }
    
    return await postDataGonoGoItem(data)
  }

  const handleSelect = (data) => {
    setSelectedData(data)
    setOpenDialog(true)
    console.log(data)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setSelectedData({})
  }

  return {
    getDataGonoGoItem,
    submitDataGonoGoItem,
    setText,
    text,
    setOpenSnackbar,
    openSnackbar,
    gonoGoItem,
    handleSelect,
    selectedData,
    openDialog,
    handleClose,
    submitnewdata,
    updateDataGonoGoItem,
    filterStartDate, setfilterStartDate,
    filterEndDate, setfilterEndDate
  }
}
