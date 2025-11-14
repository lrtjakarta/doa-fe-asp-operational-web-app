import React, { useContext, createContext, useState } from "react"
import Api from "../Services/ApiOperational"
import { toast } from "react-toastify"

export const StationMasterContext = createContext({})

export default function StationMasterProvider(props) {
    const [stationMasters, setStationMaster] = useState([])
    const [filterstation, setFilterstation] = useState([])
    const [kaNumbers, setKANumbers] = useState([])
    const [kaTimeTables, setKATimeTables] = useState([])

    const [masterKANumbers, setMasterKANumbers] = useState([])
    const [loops, setLoops] = useState([])
    const [idKaNumbers, setIdKANumbers] = useState('')
    const [categoryKANumber, setcategoryKANumber] = useState('')
    const [timetables, setTimeTables] = useState([])

    const [routeTrain, setRouteTrain] = useState([])

    const getStationMaster = async (params) => {
        try {
            let getStations = await Api.getStationMaster(params)
            let _value = getStations?.data?.map((x) => {
                return {
                    ...x,
                    value: x._id,
                    label: x.stationName
                }
            })
            setStationMaster(_value)
            setFilterstation(_value)
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const createStationMaster = (sendData) => {
        return Api.postStationMaster(sendData)
            .then((res) => {
                toast.success("Berhasil")
                getStationMaster()
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    const updateStationMaster = (id, sendData) => {
        return Api.updateStationMaster(id, sendData)
            .then((res) => {
                getStationMaster()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                toast.error("Gagal")
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    const deleteStationMaster = (id) => {
        return Api.deleteStationMaster(id)
            .then((res) => {
                getStationMaster()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                toast.error("Gagal!")
                return { status: "Failed", result: [] }
            })
    }

    // Loop

    const getLoops = async (params) => {
        try {
            let res = await Api.getLoops({params})
            setLoops(res.data)
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const updateLoops = (id,sendData) => {
        return Api.putLoops(id,sendData)
          .then((res) => {
            toast.success('Berhasil')
            // getKANumber()
            getLoops()
            return { status: 'OK', result: res.data }
          })
          .catch((err) => {
            console.log('error', err)
            return { status: 'Failed', result: [] }
          })
      }

    const createLoops = (sendData) => {
        return Api.postLoops(sendData)
            .then((res) => {
                toast.success("Berhasil")
                getLoops()
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    // KA NUMBER

    const getMasterKANumber = async (params) => {
        try {
            let res = await Api.getKANumber({params})
            setMasterKANumbers(res.data)
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const getKANumber = async () => {
        try {
            let res = await Api.getKANumber({params:{category:"Mainline"}})
            let _data = (await res.data[0]?.route) ? res.data[0]?.route : []
            setIdKANumbers(res.data[0]._id)
            console.log("context", _data)

            setKANumbers(_data)
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const updateKANumber = (id,sendData) => {
        return Api.putKANumber(id,sendData)
          .then((res) => {
            toast.success('Berhasil')
            // getKANumber()
            getMasterKANumber()
            return { status: 'OK', result: res.data }
          })
          .catch((err) => {
            console.log('error', err)
            return { status: 'Failed', result: [] }
          })
      }

    const createKANumber = (sendData) => {
        return Api.postKANumber(sendData)
            .then((res) => {
                toast.success("Berhasil")
                getKANumber()
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    // time table

    const getKATimeTable = async (params)=>{
        try {
            let res = await Api.getKATimeTable(params)
            let _data = (await res.data[0]?.route) ? res.data[0]?.route : []
            setKATimeTables(_data)
            return { status: "OK", result: _data }
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const getTimeTable = async (params) => {
        try {
            let res = await Api.getTimeTable(params)
            let resdata = await res.data
            setTimeTables(resdata)
            return { status: "OK", result: resdata }
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const creteManyTimeTable = (sendData) => {
        return Api.postManyTimeTable(sendData)
            .then((res) => {
                toast.success("Berhasil")
                getTimeTable()
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    const updateTimeTable = (id, sendData) => {
        return Api.updateTimeTable(id, sendData)
            .then((res) => {
                // getTimeTable()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                toast.error("Gagal")
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    // route Train
    const getRouteTrain = async (params) => {
        try {
            let res = await Api.getMasterRouteTrain(params)
            let resdata = await res.data
            setRouteTrain(resdata)
            return { status: "OK", result: resdata }
        } catch (error) {
            console.log("error", error)
            toast.error("Gagal")
        }
    }

    const updateRouteTrain = (id,sendData) => {
        return Api.updateMasterRouteTrain(id,sendData)
          .then((res) => {
            toast.success('Berhasil')
            getRouteTrain()
            return { status: 'OK', result: res.data }
          })
          .catch((err) => {
            console.log('error', err)
            return { status: 'Failed', result: [] }
          })
    }

    const createRouteTrain = (sendData) => {
        return Api.postMasterRouteTrain(sendData)
            .then((res) => {
                toast.success("Berhasil")
                getRouteTrain()
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                return { status: "Failed", result: [] }
            })
    }

    const deleteRouteTrain = (id) => {
        return Api.deleteMasterRouteTrain(id)
            .then((res) => {
                getRouteTrain()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                toast.error("Gagal!")
                return { status: "Failed", result: [] }
            })
    }

    return (
        <StationMasterContext.Provider
            value={{
                getStationMaster,
                createStationMaster,
                updateStationMaster,
                deleteStationMaster,
                stationMasters,
                filterstation,

                // ka number
                getKANumber,
                getMasterKANumber,
                masterKANumbers,
                createKANumber,
                kaNumbers,
                setKANumbers,
                updateKANumber,
                idKaNumbers,
                setIdKANumbers,
                categoryKANumber, 
                setcategoryKANumber,

                //loops
                getLoops,
                updateLoops,
                createLoops,
                loops,

                getTimeTable,
                getKATimeTable,
                creteManyTimeTable,
                updateTimeTable,
                timetables,
                kaTimeTables,
                setKATimeTables,

                routeTrain,
                getRouteTrain,
                updateRouteTrain,
                createRouteTrain,
                deleteRouteTrain
            }}
            {...props}
        />
    )
}
