import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../Services/ApiOperational'
import { toast } from 'react-toastify'

export const LetterContext = createContext({})

export default function LetterProvider(props) {
  const [letter, setLetter] = useState([])
  const [filterLetter, setFilterLetter] = useState([])
  const [detailLetter, setdetailLetter] = useState({})

  const getDataLetter = async (params) => {
    try {
      let getLetter = await Api.getLetter(params)
      setLetter(getLetter?.data)
      setFilterLetter(getLetter?.data)
      return getLetter.data
    } catch (error) {
      console.log('error', error)
    }
  }

  const getDataDetailLetter = async (id) => {
    try {
      let getLetter = await Api.getLetter({ params: { id } })
      setdetailLetter(getLetter?.data[0])
      return getLetter?.data[0]
    } catch (error) {
      console.log('error', error)
    }
  }

  const putDataLetter = (id, sendData) => {
    return Api.updateLetter(id, sendData)
      .then((res) => {
        let updated = letter.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setLetter(sortById)
        setFilterLetter(sortById)
        toast.success('Berhasil')
        return { status: 'OK', result: res.data }
      })
      .catch((err) => {
        toast.error('Gagal')
        console.log('error', err)
        return { status: 'Failed', result: [] }
      })
  }

  const postDataLetter = (sendData) => {
    return Api.postLetter(sendData)
      .then((res) => {
        toast.success('Berhasil')
        setLetter([...letter, res.data])
        setFilterLetter([...letter, res.data])
        return { status: 'OK', result: res.data }
      })
      .catch((err) => {
        console.log('error', err)
        return { status: 'Failed', result: [] }
      })
  }

  const deleteDataLetter = (id, sendbody) => {
    return Api.deleteLetter(id, sendbody)
      .then((res) => {
        console.log('delete success', res.data)
        setLetter(letter.filter((item) => item._id !== id))
        setFilterLetter(letter.filter((item) => item._id !== id))
        return { status: 'OK', result: res.data }
      })
      .catch((err) => {
        console.log('error', err)
        return { status: 'Failed', result: [] }
      })
  }

  return (
    <LetterContext.Provider
      value={{
        letter,
        filterLetter,
        setFilterLetter,
        detailLetter,
        getDataLetter,
        getDataDetailLetter,
        putDataLetter,
        postDataLetter,
        setLetter,
        deleteDataLetter,
      }}
      {...props}
    />
  )
}
