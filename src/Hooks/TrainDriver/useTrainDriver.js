import { TrainDriverContext } from '../../Context/index'
import React, { useContext, useEffect, useState } from 'react'
import useQuery from 'Utils/QueryParams'

export default function useTrainDriver() {
  const {
    detailTrainDriver,
    getDetailTrainDriver,
    trainDriver,
    getDataTrainDriver,
  } = useContext(TrainDriverContext)

  const [trainDriverHook, setTrainDriverHook] = useState([])

  const getProfileTrainDriverByNIK = (data) => {
    console.log('data params', data)
    getDetailTrainDriver(data)
  }

  const getMasinis = async () => {
    if (trainDriver.length > 0) {
      setTrainDriverHook(
        trainDriver.filter(
          (x) => x.jobrole === 'Masinis' || x.jobrole === 'Asisten Masinis',
        ),
      )
    } else {
      let loaddata = await getDataTrainDriver()
      setTrainDriverHook(
        loaddata.filter(
          (x) => x.jobrole === 'Masinis' || x.jobrole === 'Asisten Masinis',
        ),
      )
    }
  }

  const getPenyelia = async () => {
    if (trainDriver.length > 0) {
      setTrainDriverHook(trainDriver.filter((x) => x.jobrole === 'Penyelia'))
    } else {
      let loaddata = await getDataTrainDriver()
      setTrainDriverHook(loaddata.filter((x) => x.jobrole === 'Penyelia'))
    }
  }

  const getTrainDriver = async () => {
    if (trainDriver.length > 0) {
      setTrainDriverHook(trainDriver)
    } else {
      let loaddata = await getDataTrainDriver()
      setTrainDriverHook(loaddata)
    }
  }

  return {
    detailTrainDriver,
    getDetailTrainDriver,
    getProfileTrainDriverByNIK,
    getTrainDriver,
    trainDriver,
    getDataTrainDriver,
    trainDriverHook,
    getMasinis,
    getPenyelia,
  }
}
