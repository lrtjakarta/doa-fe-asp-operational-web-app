import React, { useContext, createContext, useState } from 'react'
import ApiOperational from '../Services/ApiOperational'

export const AbsenceContext = createContext({})

export default function AbsenceProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [absence, setAbsence] = useState([])
  const [filterAbsence, setFilterAbsence] = useState([])

  const getDataAbsence = async (params) => {
    try {
      let query = {}
      if (params?.createdAt) {
        query = { ...query, createdAt: params?.createdAt }
      }
      if (params?.createBy) {
        query = { ...query, createBy: params?.createBy }
      }
      if (params?.monthly) {
        query = { ...query, monthly: params?.monthly }
      }
      if (params?.startDate && params?.endDate) {
        query = {
          ...query,
          startDate: params?.startDate,
          endDate: params?.endDate,
        }
      }
      const res = await ApiOperational.getAbsence({ params: query })
      setAbsence(res.data)
      setFilterAbsence(res.data)
      return { status: 'OK', result: res.data }
    } catch (err) {
      return { status: 400, result: err }
    }
  }

  const postDataAbsence = async (data) => {
    try {
      const res = await ApiOperational.postAbsence(data)
      setOpenSnackbar(true)
      return { status: 'OK', result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: 'Failed', result: err }
    }
  }

  const putDataAbsence = async (id, data) => {
    try {
      const res = await ApiOperational.putAbsence(id, data)
      let dataupdate = absence.map((x) => {
        if (x._id === res.data._id) {
          return res.data
        } else {
          return x
        }
      })
      setAbsence(dataupdate)
      setFilterAbsence(dataupdate)
      setOpenSnackbar(true)
      return { status: 'OK', result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: 'Failed', result: err }
    }
  }

  const deleteDataAbsence = async (id) => {
    try {
      const res = await ApiOperational.deleteAbsence(id)
      const result = absence.filter((item) => item._id !== id)
      setAbsence(result)
      setFilterAbsence(result)
      setOpenSnackbar(true)
      return { status: 'OK', result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: 'Failed', result: err }
    }
  }

  return (
    <AbsenceContext.Provider
      value={{
        absence,
        filterAbsence,
        setFilterAbsence,
        getDataAbsence,
        putDataAbsence,
        postDataAbsence,
        deleteDataAbsence,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  )
}
