import React, { useContext, createContext, useState } from 'react'
import ApiOperational from '../Services/ApiOperational'

export const BriefingContext = createContext({})

export default function BriefingProvider(props) {
  const [dataBriefing, setDataBriefing] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const getDataBriefing = async (query) => {
    try {
      // let query = {}
      // if(createdAt){
      //   query = {...query, createdAt}
      // }
      // if(createBy){
      //   query = {...query, createBy}
      // }
      const res = await ApiOperational.getBriefing({ params: query })
      setDataBriefing(res.data)
      return { status: 'OK', result: res.data }
    } catch (err) {
      return { status: 400, result: err }
    }
  }

  const postDataBriefing = (data) => {
    return ApiOperational.postBriefing(data)
      .then((res) => {
        setOpenSnackbar(true)
        console.log('Post Briefing', res.data)
        return { status: true, result: res.data }
      })
      .catch((err) => {
        setOpenSnackbar(true)
        return { status: 400, result: err }
      })
  }

  const putDataBriefing = async (id, data) => {
    try {
      const res = await ApiOperational.putBriefing(id, data)
      setOpenSnackbar(true)
      return { status: 'OK', result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: 400, result: err }
    }
  }

  return (
    <BriefingContext.Provider
      value={{
        dataBriefing,
        setDataBriefing,
        postDataBriefing,
        getDataBriefing,
        openSnackbar,
        setOpenSnackbar,
        putDataBriefing,
      }}
      {...props}
    />
  )
}
