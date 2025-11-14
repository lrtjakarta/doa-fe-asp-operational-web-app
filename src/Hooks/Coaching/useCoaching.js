import moment from "moment";
import { useContext, useState } from "react";
import { CoachingContext, UserProfilContext } from "../../Context/index";

export default function UseCoaching() {
  const {
    getDataCoaching,
    coaching,
    postDataCoaching,
    openSnackbar,
    setOpenSnackbar,
    putDataCoaching,
    deleteDataCoaching,
  } = useContext(CoachingContext);

  const { userById } = useContext(UserProfilContext);

  const [selectedData, setSelectedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM"));
  const [selectedTrainDriver, setselectedTrainDriver] = useState({});
  const [supervisor, setsupervisor] = useState({});
  const [dateCoaching, setdateCoaching] = useState("");
  const [timeCoaching, settimeCoaching] = useState("");
  const [updated, setUpdated] = useState(null);
  const [listTrainDriver, setListTrainDriver] = useState([]);
  const [listSupervisor, setListSupervisor] = useState([]);
  const [phaseCoaching, setphaseCoaching] = useState("");
  const [categoryCoaching, setcategoryCoaching] = useState("");
  const [performanceProblems, setperformanceProblems] = useState("");
  const [solution, setsolution] = useState("");
  const [actionPlan, setactionPlan] = useState("");
  const [reviewPlan, setreviewPlan] = useState("");
  const [file, setfile] = useState([]);
  const [createBy, setcreateBy] = useState({});

  const handleFilterDate = (event) => {
    setDate(event.target.value);
    let monthly = event.target.value;
    // let createBy = JSON.parse(localStorage.getItem("profile"))?._id
    getDataCoaching({ monthly });
  };

  let data = {
    trainDriver: {},
    supervisor,
    dateCoaching,
    timeCoaching,
    categoryCoaching,
    phaseCoaching,
    performanceProblems,
    solution,
    actionPlan,
    reviewPlan,
    file,
    // createBy: JSON.parse(localStorage.profile),
    createBy: userById,
    updated,
  };

  const submitDataCoaching = (multiImage) => {
    data = {
      ...data,
      trainDriver: selectedTrainDriver,
      file: multiImage,
    };
    return postDataCoaching(data);
  };

  const updateDataCoaching = async (multiImage, id, updated) => {
    data = {
      ...data,
      trainDriver: selectedTrainDriver,
      file: multiImage,
      updated,
    };
    return putDataCoaching(id, data);
  };

  const handleSelect = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedData({});
  };

  const handleDelete = async () => {
    const result = await deleteDataCoaching(selectedData._id);
    if (result.status === "OK") {
      setOpenDialog(false);
      setSelectedData({});
    }
  };

  return {
    getDataCoaching,
    submitDataCoaching,
    handleFilterDate,
    handleDelete,
    date,
    setOpenSnackbar,
    openSnackbar,
    coaching,
    handleSelect,
    selectedData,
    openDialog,
    handleClose,
    updateDataCoaching,
    listTrainDriver,
    setListTrainDriver,
    listSupervisor,
    setListSupervisor,
    selectedTrainDriver,
    setselectedTrainDriver,
    supervisor,
    setsupervisor,
    categoryCoaching,
    setcategoryCoaching,
    timeCoaching,
    settimeCoaching,
    dateCoaching,
    setdateCoaching,
    phaseCoaching,
    setphaseCoaching,
    performanceProblems,
    setperformanceProblems,
    solution,
    setsolution,
    actionPlan,
    setactionPlan,
    reviewPlan,
    setreviewPlan,
    file,
    setfile,
    createBy,
    setcreateBy,
  };
}
