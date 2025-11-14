import {
  CheckupContext,
  MasterMedicalContext,
  CabinRideContext,
  DailyWorkContext,
} from 'Context'
import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'

export default function UseCheckup() {
  const { dataCheckup, filterCheckup, getDataCheckup } =
    useContext(CheckupContext)
  const { getCabinRide, getMasterCabinRide, postDataCabinRide } =
    useContext(CabinRideContext)
  const { getDataScheduleTrainDriver } = useContext(DailyWorkContext)

  const handleCheckup = async (detTrainDriver) => {
    let params = {
      createdAt: moment(new Date()).format('YYYY-MM-DD'),
      nik: detTrainDriver?.nik,
    }
    const profile = await JSON.parse(localStorage.getItem('profile'))
    let _checkup = await getDataCheckup(params)
    const masterCabinRide = await getMasterCabinRide()
    const _dailywork = await getDataScheduleTrainDriver({
      params: {
        dailyWorkDate: moment(new Date()).format('YYYY-MM-DD'),
        trainDriverId: detTrainDriver?._id,
      },
    })

    if (_checkup?.result[0]?.status == 1 || _checkup?.result[0]?.status == 2) {
      let sendData = {
        trainDriver: detTrainDriver,
        dailyWorkTrainDriver: _dailywork[0],
        createBy: {
          _id: profile._id,
          name: profile.name,
          phone: profile.phone,
          qrcode: profile.qrcode,
          photo: profile.photo,
          nik: profile.nik,
          user: profile.user,
        },
        // createdAt: moment(new Date()).format("YYYY-MM-DD"),
        cabinRide: masterCabinRide?.result,
        month: moment(new Date()).format('YYYY-MM'),
        startTime: new Date(),
      }
      // console.log("senddata", sendData)
      return postDataCabinRide(sendData)
    } else {
      toast.error('Maaf hasil pemeriksaan anda tidak memenuhi.')
    }
  }

  return {
    dataCheckup,
    filterCheckup,
    handleCheckup,
  }
}
