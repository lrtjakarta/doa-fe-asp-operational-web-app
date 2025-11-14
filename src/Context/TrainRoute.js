import React, { useContext, createContext, useState } from "react"
import Api from "../Services/ApiOperational"
import { toast } from "react-toastify"
import _ from "lodash"

export const TrainRouteContext = createContext({})

export default function TrainRouteProvider(props) {
    const [trainRoute, setTrainRoute] = useState([])
    const [trainCadangan, setTrainCadangan] = useState([])
    const [trainBertugas, setTrainBertugas] = useState([])
    const [trainPenyelia, setTrainPenyelia] = useState([])
    const [filterTrainRoute, setFilterTrainRoute] = useState([])
    const [detailTrainRoute, setDetailTrainRoute] = useState({})
    const [routelist, setRoutelist] = useState([])

    const [routeId, setRouteId] = useState("")

    const getDataTrainRoute = async () => {
        if (trainRoute.length === 0) {
            Api.getTrainRoute()
                .then((res) => {
                    // let cadangan = res.data?.filter((x) => x.note == "Cadangan")
                    let bertugas = res.data?.filter((x) => x.note == "Bertugas")
                    // let penyelia = res.data?.filter((x) => x.note == "Penyelia")
                    setTrainBertugas(bertugas)
                    // setTrainCadangan(cadangan)
                    // setTrainPenyelia(penyelia)
                    setFilterTrainRoute(res.data)
                })
                .catch((err) => console.log("error", err))
        }
    }

    const getRouteList = async () => {
        Api.getRouteList()
            .then((res) => {
                setRoutelist(res.data[0]?.route)
            })
            .catch((err) => console.log("error", err))
    }

    const getDetailTrainRoute = async (id) => {
        console.log("id", id)
        if (trainRoute.length === 0) {
            console.log("defined")
            return Api.getTrainRoute({ params: { id } })
                .then((res) => {
                    console.log("res", res)
                    if (res.data.length > 0) {
                        setDetailTrainRoute(res.data[0])
                        return { ...res.data[0] }
                    }
                    return {}
                })
                .catch((err) => console.log("error", err))
        } else {
            console.log("undefined")
            const result = await trainRoute.filter((item) => item._id === id)
            if (result.length > 0) {
                setDetailTrainRoute(result[0])
                return result[0]
            }
        }
    }

    const postDataTrainRoute = (sendData) => {
        return Api.postTrainRoute(sendData)
            .then((res) => {
                getDataTrainRoute()
                // setTrainRoute([...trainRoute, res.data])
                // setFilterTrainRoute([...filterTrainRoute, res.data])
                // getDataTrainRoute();
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                toast.error("Gagal")
                return { status: "Failed", result: [] }
            })
    }

    const putDataTrainRoute = (id, sendData) => {
        return Api.putTrainRoute(id, sendData)
            .then(async (res) => {
                // const result = trainRoute.map((x) => {
                //     if (x._id === res.data._id) {
                //         return res.data
                //     } else {
                //         return x
                //     }
                // })
                // setTrainRoute(result)
                // setFilterTrainRoute(result)
                getDataTrainRoute()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                toast.error("Gagal")

                return { status: "Failed", result: [] }
            })
    }

    const deleteDataTrainRoute = async (id) => {
        return Api.deleteTrainRoute(id)
            .then((res) => {
                getDataTrainRoute()
                toast.success("Berhasil")
                return { status: "OK", result: res.data }
            })
            .catch((err) => {
                console.log("error", err)
                toast.error("Gagal")
                return { status: "Failed", result: [] }
            })
    }

    return (
        <TrainRouteContext.Provider
            value={{
                getDataTrainRoute,
                getDetailTrainRoute,
                postDataTrainRoute,
                putDataTrainRoute,
                deleteDataTrainRoute,
                trainRoute,
                setTrainRoute,
                setFilterTrainRoute,
                filterTrainRoute,
                setDetailTrainRoute,
                detailTrainRoute,
                trainCadangan,
                trainBertugas,
                trainPenyelia,
                getRouteList,
                routelist,

                routeId, setRouteId
            }}
            {...props}
        />
    )
}
