import { DailyWorkPlanningContext } from '../../Context/index'
import React, { useContext, useState } from 'react'
import moment from 'moment'

export default function UseDailyWorkPlanning() {
  const {
    dataLoopTrain,
    getDataLoopTrain,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    postDataScheduleTrainDriver,
    updateDataScheduleTrainDriver,
    updateRouteDataScheduleTrainDriverStation,
    getDataLoopTrainMasinis,
    dataDetailDaily,
    getDetailDaily,
    updateRouteDataScheduleTrainDriver,
    deleteDataScheduleTrainDriver,
    postDataScheduleTrainDriverMonthly,
    postDataScheduleTrainDriverRealisasi,
    updateDataScheduleTrainDriverStatus,
    getDataScheduleLastTrainDriver,
    dataScheduleLastTrainDriver,
    dataScheduleTrainDriverRealisasi,
    getDataScheduleTrainDriverRealisasi,
    deleteDataScheduleTrainDriverRealisasi,
    postDataScheduleTrainDriverMonthlyImport
  } = useContext(DailyWorkPlanningContext)

  const [dataDailySchedule, setDataDailySchedule] = useState([])
  const [dataDailyScheduleBackUp, setDataDailyScheduleBackUp] = useState([])
  const [dateDailyWork, setDateDailyWork] = useState('')
  const [dataDetailDailyLocal, setDataDetailLocal] = useState({})
  const [loadingSubmit, setLoadingSubmit] = useState('')

  const updateChangeHandOver = async (id, data, date) => {
    const datarespon = await updateDataScheduleTrainDriver(id, data, date)
    if (datarespon.status) {
      fetchDataHandOverMasinis()
    }
  }

  const submitDataDailyWork = (data, date) => {
    postDataScheduleTrainDriver(data, date)
  }

  const submitDataMonthlyWorkImport = async(data, trainDriver, dataLoopTrain, monthlyWork, timetables)=>{
    return  postDataScheduleTrainDriverMonthlyImport({data: data, trainDriver, dataLoopTrain, monthlyWork, timetables})
  }

  const submitDataDailyWorkRealisasi = async (id, data, date) => {
    setLoadingSubmit(id)
    const resdata = await postDataScheduleTrainDriverRealisasi(data, date)
    if (resdata.status) {
      setLoadingSubmit('')
    }
  }

  const submitDataMonthlyWork = (data, date) => {
    return postDataScheduleTrainDriverMonthly(data, date)
  }

  const startTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date)
  }

  const startTimeTrainStation = (data) => {
    updateRouteDataScheduleTrainDriverStation(data)
  }

  const stopTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date)
  }

  const finishWork = (id, data, date) => {
    updateDataScheduleTrainDriver(id, data, date)
  }

  const giveWork = (id, data, date) => {
    updateDataScheduleTrainDriver(id, data, date)
  }

  const cancelDailyWork = (id, date, monthly, local) => {
    deleteDataScheduleTrainDriver(id, date, monthly, local)
  }

  const cancelDailyWorkRealisasi = (id, date, monthly, local) => {
    deleteDataScheduleTrainDriverRealisasi(id, date, monthly, local)
  }

  const getDailyWorkByTrainDriver = (id, date) => {
    return getDataScheduleTrainDriver({
      params: { trainDriverId: id, dailyWorkDate: date },
    })
  }

  const getDailyWorkById = (id) => {
    return getDetailDaily(id, true)
  }

  const getDailyWorkByIdLocal = async (id) => {
    let response = await getDetailDaily(id, false)
    if (response.status) {
      setDataDetailLocal(response.data[0])
      return response.data[0]
    } else {
      return {}
    }
  }

  const putDailyWork = async (_id, data) => {
    let today = moment().format('YYYY-MM-DD')
    let trainDriverId = ''
    if (localStorage?.profile) {
      trainDriverId = JSON.parse(localStorage?.profile)._id
      return updateDataScheduleTrainDriver(_id, data, trainDriverId, today)
    }
  }

  const fetchDataLoop = async (data) => {
    let params = {}
    if (data === 'Masinis') {
      // params = {params:{note:"Bertugas"}}
      getDataLoopTrainMasinis()
    }
    if (data === 'Penyelia') {
      params = { params: { note: 'Penyelia' } }
      getDataLoopTrain(params)
    }

    if (dateDailyWork === '') {
      let dateNow = moment().format('YYYY-MM-DD')
      setDateDailyWork(dateNow)
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow },
      })
      setDataDailySchedule(dataschedule)
    }
  }

  const fetchDataHandOver = async () => {
    if (dateDailyWork === '') {
      let dateNow = moment().format('YYYY-MM-DD')
      setDateDailyWork(dateNow)
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow, note: 'Penyelia' },
      })
      setDataDailySchedule(dataschedule)
    } else {
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: 'Penyelia' },
      })
      setDataDailySchedule(dataschedule)
    }
  }

  const fetchDataHandOverMasinis = async () => {
    if (dateDailyWork === '') {
      let dateNow = moment().format('YYYY-MM-DD')
      setDateDailyWork(dateNow)
      const datascheduleBackUp = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow, note: 'Cadangan' },
      })
      setDataDailyScheduleBackUp(datascheduleBackUp)
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow, note: 'Bertugas' },
      })
      setDataDailySchedule(dataschedule)
    } else {
      const datascheduleBackUp = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: 'Cadangan' },
      })
      setDataDailyScheduleBackUp(datascheduleBackUp)
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: 'Bertugas' },
      })
      setDataDailySchedule(dataschedule)
    }
  }

  return {
    dataLoopTrain,
    fetchDataLoop,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    getDailyWorkById,
    getDailyWorkByTrainDriver,
    submitDataDailyWork,
    updateDataScheduleTrainDriver,

    startTimeTrain,
    stopTimeTrain,

    finishWork,
    giveWork,

    cancelDailyWork,
    dataDailySchedule,
    setDataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    fetchDataHandOver,
    updateDataScheduleTrainDriverStatus,
    dataDailyScheduleBackUp,
    setDataDailyScheduleBackUp,

    fetchDataHandOverMasinis,

    getDataScheduleLastTrainDriver,
    dataScheduleLastTrainDriver,
    putDailyWork,
    updateChangeHandOver,

    dataDetailDaily,
    getDailyWorkByIdLocal,
    dataDetailDailyLocal,

    submitDataMonthlyWork,

    startTimeTrainStation,
    dataScheduleTrainDriverRealisasi,
    getDataScheduleTrainDriverRealisasi,
    submitDataDailyWorkRealisasi,
    submitDataMonthlyWorkImport,
    loadingSubmit,
    cancelDailyWorkRealisasi,
  }
}
