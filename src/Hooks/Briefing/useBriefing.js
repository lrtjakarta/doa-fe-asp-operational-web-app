import moment from "moment";
import { useContext, useState } from "react";
import { BriefingContext } from "../../Context/index";

export default function UseBriefing() {
  const {
    getDataBriefing,
    postDataBriefing,
    openSnackbar,
    setOpenSnackbar,
    dataBriefing,
    putDataBriefing,
  } = useContext(BriefingContext);
  const [text, setText] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState("");
  const [filterStartDate, setfilterStartDate] = useState("");
  const [filterEndDate, setfilterEndDate] = useState("");

  const handleFilterDate = (event) => {
    setDate(event.target.value);
    let createAt = event.target.value;
    getDataBriefing(createAt);
  };

  const submitDataBriefing = async (multiImage, dailyWorkTrainDriver) => {
    const data = {
      dailyWorkTrainDriver: {
        createDate: dailyWorkTrainDriver?.createDate,
        createDateString: dailyWorkTrainDriver?.createDateString,
        createdAt: dailyWorkTrainDriver?.createdAt,
        dailyWorkDate: dailyWorkTrainDriver?.dailyWorkDate,
        dailyWorkDateString: dailyWorkTrainDriver?.dailyWorkDateString,
        loopRouteTrain: dailyWorkTrainDriver?.loopRouteTrain,
        monthlyWorkDateString: dailyWorkTrainDriver?.monthlyWorkDateString,
        readTakeGive: dailyWorkTrainDriver?.readTakeGive,
      },
      file: multiImage,
      note: text,
      // createBy: JSON.parse(localStorage.profile),
      createAt: moment().format("YYYY-MM-DD"),
    };
    // console.log(data)
    await postDataBriefing(data);
  };

  const submitnewdata = async (dailyWorkTrainDriver, userProfile) => {
    const data = {
      dailyWorkTrainDriver: {
        dailyWorkDate: dailyWorkTrainDriver?.dailyWorkDate,
        dailyWorkDateString: new Date(
          dailyWorkTrainDriver?.dailyWorkDate
        ).toDateString(),
        loopRouteTrain: dailyWorkTrainDriver?.loopRouteTrain,
        monthlyWorkDateString: dailyWorkTrainDriver?.monthlyWorkDateString,
        readTakeGive: dailyWorkTrainDriver?.readTakeGive,
      },
      trainDriver: userProfile,
      createBy: {
        _id: userProfile._id,
        name: userProfile.name,
        idNumber: userProfile.idNumber,
      },
      createdAt: moment().format("YYYY-MM-DD"),
    };
    return await postDataBriefing(data);
  };

  const updateDataBriefing = async (multiImage, note, _id) => {
    const data = { file: multiImage, note };
    console.log("data post", data);
    await putDataBriefing(_id, data);
  };

  const handleSelect = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
    console.log(data);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedData({});
  };

  return {
    submitDataBriefing,
    setText,
    text,
    dataBriefing,
    setOpenSnackbar,
    openSnackbar,
    getDataBriefing,
    text,
    setText,
    handleFilterDate,
    date,
    handleSelect,
    handleClose,
    selectedData,
    setSelectedData,
    openDialog,
    setOpenDialog,
    updateDataBriefing,
    submitnewdata,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
  };
}
