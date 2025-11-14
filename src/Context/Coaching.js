import React, { useContext, createContext, useState } from "react"
import ApiOperational from "../Services/ApiOperational"

export const CoachingContext = createContext({})

export default function CoachingProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [coaching, setCoaching] = useState([])

  const getDataCoaching = async (query) => {
    try {
      console.log('query', query)
      const res = await ApiOperational.getCoaching({ params: query })
      setCoaching(res.data)
      console.log("res.data", res.data)
      return { status: "OK", result: res.data }
    } catch (err) {
      return { status: "Failed", result: err }
    }
  }

  const postDataCoaching = async (data) => {
    try {
      const res = await ApiOperational.postCoaching(data)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  const putDataCoaching = async (id,data) => {
    try {
      const res = await ApiOperational.putCoaching(id,data)
      console.log('putDataCoaching', res.data)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  const deleteDataCoaching = async (id) => {
    try {
      const res = await ApiOperational.deleteCoaching(id)
      const result = coaching.filter(item=> item._id !== id)
      setCoaching(result)
      setOpenSnackbar(true)
      return { status: "OK", result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: "Failed", result: err }
    }
  }

  return (
    <CoachingContext.Provider
      value={{
        coaching,
        getDataCoaching,
        postDataCoaching,
        putDataCoaching,
        deleteDataCoaching,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  )
}
