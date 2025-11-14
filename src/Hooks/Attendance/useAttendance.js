import moment from "moment";
import React, {
    useContext,
    useState,
} from "react"
import { AssessmentContext, CheckupContext } from "../../Context";
import apis from "../../Services/ApiOperational";

export default function UseMedical(){
    const [date, setDate] = useState(moment().format("YYYY-MM"));
    const [searchText, setSearchText] = useState('');
    const [checkupStatus, setCheckupStatus] = useState('');
    const [absenceSummary, setAbsenceSummary] = useState({});
    const { getDataCountCheckup,countCheckup,checkup,filterCheckup,setFilterCheckup } = useContext(CheckupContext)
    const { getTotalAssessment,totalAssessment } = useContext(AssessmentContext)
    const [selectTrainDriver,setSelectTrainDriver] = useState({})
    const [filterStartDate, setfilterStartDate] = useState('')
    const [filterEndDate, setfilterEndDate] = useState('')

    const handleFilterDate = async (event) => {
        setDate(event.target.value)
        let monthly = event.target.value
        let createBy = JSON.parse(localStorage.getItem("profil"))?.nik
        let trainDriverID = JSON.parse(localStorage.getItem("profil"))?._id
        await getDataCountCheckup(createBy,monthly)
        await getAbsenceSummary(trainDriverID, monthly)
        getTotalAssessment(createBy,monthly)
    }

    const getAbsenceSummary = async (trainDriverID, monthly) => {
        apis.getAbsenceSummary({params:{trainDriverID, monthly}}).then(res=>{
          if(res.data.length > 0){
            setAbsenceSummary(res.data[0])
          }
          else{
            setAbsenceSummary({work:0,cuti:0,sakit:0,workTime:0})
          }
        }).catch(err=>console.log(err))
    }
    
    const handleChange = (value) => {
        setSearchText(value)
        filterData(value)
      }
    
      const filterData = (value) => {
        var searchQuery = value.toString().toLowerCase()
        let filtertext = checkup.filter((item) => item?.createBy?.name.toString().toLowerCase().indexOf(searchQuery) !== -1)
        setFilterCheckup(filtertext)
      }
      const handleFilterMedicalStatus = (value) => {
        setCheckupStatus(value)
        if(value !== "10"){
          const resFilter = checkup.filter(item=>item?.status === value)
          setFilterCheckup(resFilter)
        }
        else{
          setFilterCheckup(checkup)
        }
      }

    return {
        getDataCountCheckup,checkup,filterCheckup,getTotalAssessment,
        handleFilterMedicalStatus,totalAssessment,absenceSummary,
        date,setDate,getAbsenceSummary,
        checkupStatus, setCheckupStatus,
        handleFilterDate,
        searchText,countCheckup,
        handleChange,filterStartDate, setfilterStartDate,
        filterEndDate, setfilterEndDate,
        selectTrainDriver,setSelectTrainDriver
    }
}