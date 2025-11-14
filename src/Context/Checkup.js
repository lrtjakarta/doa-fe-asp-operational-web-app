import React, { useContext, createContext, useState } from "react"
import ApiMedicalCheckup from "../Services/ApiOperational"

export const CheckupContext = createContext({})

export default function CheckupProvider(props) {
    const [dataCheckup, setDataCheckup] = useState([])
    const [filterCheckup, setFilterCheckup] = useState([])
    const [countCheckup, setCountCheckup] = useState({});

    const getDataCountCheckup = (nik,monthly) => {
      if(nik){
        return ApiMedicalCheckup.getCountCheckup({ params: { nik , monthly} }).then(res=>{
          if(res.data.length > 0){
            setCountCheckup(res.data[0])
          }
          else{
            setCountCheckup({fittowork: 0,
              fittoworkwithnote: 0,
              retake1: 0,
              retake2: 0,
              unfittowork: 0})
          }
        }).catch(err=>console.log("error",err))
      }
      }

    const getDataCheckup = async (params) => {
        try {
            const res = await ApiMedicalCheckup.getCheckup({ params: params })
            console.log("getDataCheckup", res.data)
            return { status: "OK", result: res.data }
        } catch (err) {
            return { status: 400, result: err }
        }
    }

    return (
        <CheckupContext.Provider
            value={{
                getDataCountCheckup,
                getDataCheckup,countCheckup, setCountCheckup,
                dataCheckup,
                setDataCheckup,
                filterCheckup,
                setFilterCheckup
            }}
            {...props}
        />
    )
}
