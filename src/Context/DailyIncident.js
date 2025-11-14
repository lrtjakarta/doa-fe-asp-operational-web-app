import React, { useContext, createContext, useState } from "react"
import ApiOperational from "../Services/ApiOperational"

export const DailyIncidentContext = createContext({})

export default function DailyIncidentProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [dailyIncident, setDailyIncident] = useState([])

  const getDataDailyIncident = async (query) => {
    try {
      console.log('query', query)
      const res = await ApiOperational.getDailyIncident({ params: query })
      setDailyIncident(res.data)
      console.log("res.data", res.data)
      return { status: "OK", result: res.data }
    } catch (err) {
      return { status: "Failed", result: err }
    }
  }

  const postDataDailyIncident = async (data) => {
    try {
      const res = await ApiOperational.postDailyIncident(data)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  const putDataDailyIncident = async (id,data) => {
    try {
      const res = await ApiOperational.putDailyIncident(id,data)
      console.log('putDataDailyIncident', res.data)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  const deleteDataDailyIncident = async (id) => {
    try {
      const res = await ApiOperational.deleteDailyIncident(id)
      const result = dailyIncident.filter(item=> item._id !== id)
      setDailyIncident(result)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  return (
    <DailyIncidentContext.Provider
      value={{
        dailyIncident,
        getDataDailyIncident,
        postDataDailyIncident,
        putDataDailyIncident,
        deleteDataDailyIncident,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  )
}
