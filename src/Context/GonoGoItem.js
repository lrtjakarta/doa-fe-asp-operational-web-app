import React, { useContext, createContext, useState } from 'react'
import ApiOperational from '../Services/ApiOperational'

export const GonoGoItemContext = createContext({})

export default function GonoGoItemProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [gonoGoItem, setGonoGoitem] = useState([])

  const getDataGonoGoItem = async (query) => {
    try {
      console.log('query', query)
      const res = await ApiOperational.getGonoGoItem({ params: query })
      setGonoGoitem(res.data)
      console.log('res.data', res.data)
      return { status: 'OK', result: res.data }
    } catch (err) {
      return { status: 400, result: err }
    }
  }

  const postDataGonoGoItem = async (data) => {
    try {
      const res = await ApiOperational.postGonoGoItem(data)
      // setOpenSnackbar(true)
      return { status: true, result: res.data }
    } catch (err) {
      // setOpenSnackbar(true)
      return { status: false, result: err }
    }
  }

  const putDataGonoGoItem = async (id, data) => {
    try {
      const res = await ApiOperational.putGonoGoItem(id, data)
      console.log('putDataGonoGoItem', res.data)
      setOpenSnackbar(true)
      return { status: 'OK', result: res.data }
    } catch (err) {
      setOpenSnackbar(true)
      return { status: 400, result: err }
    }
  }

  return (
    <GonoGoItemContext.Provider
      value={{
        gonoGoItem,
        getDataGonoGoItem,
        postDataGonoGoItem,
        putDataGonoGoItem,
        openSnackbar,
        setOpenSnackbar,
      }}
      {...props}
    />
  )
}
