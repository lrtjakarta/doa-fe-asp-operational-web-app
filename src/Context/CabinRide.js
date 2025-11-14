import React, { useContext, createContext, useState } from 'react'
import ApiOperational from '../Services/ApiOperational'
import { toast } from 'react-toastify'
import moment from 'moment'

export const CabinRideContext = createContext({})

export default function CabinRideProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [ cabinrides, setCabinRides] = useState([])
  const [ cabinRideResult, setCabinRideResult] = useState([])

  const [ masterCabinRide, setMasterCabinRide] = useState([])
  const [ filterMasterCabinRide, setFilterMasterCabinRide] = useState([])
  const [ detailMasterCabinRide, setDetailMasterCabinRide] = useState({})

  const postDataCabinRide = async (sendData, params) => {
    try {
      const res = await ApiOperational.postCabinRide(sendData)

      return { status: 'OK', result: res.data }
    } catch (err) {
      // console.log("error", err)
      return { status: 400, result: err }
    }
  }

  const getCabinRide = async (params) => {
    try {
      const res = await ApiOperational.getCabinRide(params)
      // console.log("getCabinRide", res.data)
      setCabinRides(res.data)
      return { status: 'OK', result: res.data }
    } catch (err) {
      return { status: 'Failed', result: [] }
    }
  }
  const getCabinRideResult = async (params) => {
    try {
      const res = await ApiOperational.getCabinRideResult(params)
      setCabinRideResult(res.data)
      return { status: 'OK', result: res.data }
    } catch (err) {
      return { status: 'Failed', result: [] }
    }
  }

  const updateCabinRide = async (id, data) => {
    try {
      const res = await ApiOperational.updateCabinRide(id, data)
      // console.log("response", res)
      return { status: 'OK', result: res.data }
    } catch (err) {
      console.log('error', err)
      return { status: 'Failed', result: [] }
    }
  }

  const deleteCabinRide = (id) => {
    let month = moment(new Date()).format('YYYY-MM')
    return ApiOperational.deleteCabinRide(id)
      .then((res) => {
        getCabinRide({ params: { month } })
        toast.success('Berhasil')
        return { status: 'OK', result: res.data }
      })
      .catch((err) => {
        console.log('error', err)
        toast.error('Gagal!')
        return { status: 'Failed', result: [] }
      })
  }

  /* Master Data */
  const getDataMasterCabinRide = async () => {
    ApiOperational.getMasterCabinRide()
        .then((res) => {
            // console.log("res.data", res.data)
            setMasterCabinRide(res.data)
            setFilterMasterCabinRide(res.data)
        })
        .catch((err) => console.log("error", err))
}

  const getDetailMasterCabinRide = async (id) => {
    // console.log("id", id)
    if (masterCabinRide.length === 0) {
        // console.log("defined")
        return ApiOperational.getMasterCabinRide({ params: { id } })
            .then((res) => {
                // console.log("res", res)
                if (res.data.length > 0) {
                    setDetailMasterCabinRide(res.data[0])
                    return { ...res.data[0] }
                }
                return {}
            })
            .catch((err) => console.log("error", err))
    } else {
        console.log("undefined")
        const result = await masterCabinRide.filter((item) => item._id === id)
        if (result.length > 0) {
            setDetailMasterCabinRide(result[0])
            return result[0]
        }
    }
}

const postDataMasterCabinRide = (sendData) => {
    return ApiOperational.postMasterCabinRide(sendData)
        .then((res) => {
            setMasterCabinRide([...masterCabinRide, res.data])
            setFilterMasterCabinRide([...filterMasterCabinRide, res.data])
            // getDataCabinRide();
            return { status: "OK", result: res.data }
        })
        .catch((err) => {
            // console.log("error", err)
            return { status: "Failed", result: [] }
        })
}

const putDataMasterCabinRide = (id, sendData) => {
    return ApiOperational.putMasterCabinRide(id, sendData)
        .then(async (res) => {
            const result = masterCabinRide.map((x) => {
                if (x._id === res.data._id) {
                    return res.data
                } else {
                    return x
                }
            })
            setMasterCabinRide(result)
            setFilterMasterCabinRide(result)
            return { status: "OK", result: res.data }
        })
        .catch((err) => {
            console.log("error", err)
            return { status: "Failed", result: [] }
        })
}

const deleteDataMasterCabinRide = async (id) => {
    return ApiOperational.deleteMasterCabinRide(id)
        .then((res) => {
            // getDataCabinRide();
            return { status: "OK", result: res.data }
        })
        .catch((err) => {
            console.log("error", err)
            return { status: "Failed", result: [] }
        })
}

  return (
    <CabinRideContext.Provider
      value={{
        postDataCabinRide,
        openSnackbar,
        setOpenSnackbar,
        getCabinRide,
        cabinrides,
        updateCabinRide,
        setCabinRides,
        deleteCabinRide,
        getCabinRideResult,
        cabinRideResult,

        getDataMasterCabinRide,
        getDetailMasterCabinRide,
        postDataMasterCabinRide,
        putDataMasterCabinRide,
        deleteDataMasterCabinRide,

        masterCabinRide,
        filterMasterCabinRide,
        detailMasterCabinRide,
      }}
      {...props}
    />
  )
}
