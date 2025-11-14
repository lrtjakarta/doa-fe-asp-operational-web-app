import React, { useContext, createContext, useState, useEffect } from "react";
import ApiOperational from "../Services/ApiOperational"
import moment from 'moment'
import _ from 'lodash'

export const DailyWorkPlanningContext = createContext({});

export default function DailyWorkPlanningProvider(props) {

    const [dataLoopTrain, setDataLoopTrain] = useState([])
    const [dataScheduleTrainDriver, setDataScheduleTrainDriver] = useState([])
    const [dataScheduleTrainDriverRealisasi, setDataScheduleTrainDriverRealisasi] = useState([])
    const [dataDetailDaily, setDataDetailDaily] = useState({})
    const [dataScheduleLastTrainDriver, setDataScheduleLastTrainDriver] = useState({})

    const getDataLoopTrain = async (data) => {
        
        ApiOperational.getDailyWork(data).then(res=>{
            setDataLoopTrain(res.data)
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const getDataLoopTrainMasinis = async () => {
        const dataMasinis = await ApiOperational.getDailyWork({params:{note:"Bertugas"}})
        const dataCadangan = await ApiOperational.getDailyWork({params:{note:"Cadangan"}})
        const dataLangsir = await ApiOperational.getDailyWork({params:{note:"Langsir"}})
        setDataLoopTrain([...dataMasinis.data, ...dataCadangan.data, ...dataLangsir.data])

    }

    const getDataScheduleTrainDriver = async (data) => {
        return ApiOperational.getScheduleTrainDriverPlanning(data).then(res=>{
            if(!data?.local)
            {
                setDataScheduleTrainDriver(res.data)
            }
            return res.data
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const getDataScheduleTrainDriverRealisasi = async (data) => {
        return ApiOperational.getScheduleTrainDriver(data).then(res=>{
            if(!data?.local)
            {
                setDataScheduleTrainDriverRealisasi(res.data)
            }
            
            return res.data
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    // useEffect(()=>{
    //     socket.on('led', async (data)=>{
    //         console.log('data led', data)
    //     })
    // },[socket])

    const getDetailDaily = async (id, global) => {
        
        return ApiOperational.getScheduleTrainDriverPlanning({params:{id}}).then(res=>{
            if(global){
                setDataDetailDaily(res.data[0])
            }
            return {status : true, data: res.data}
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const postDataScheduleTrainDriver = async (data, date) => {
        ApiOperational.postScheduleTrainDriverPlanning(data).then(res=>{
            getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const postDataScheduleTrainDriverMonthlyImport = async (data) => {
        return ApiOperational.postScheduleTrainDriverMonthlyPlanningImport(data).then(async res=>{
            return {status : true, result : res.data}
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const postDataScheduleTrainDriverRealisasi = async (data, date) => {
        return ApiOperational.postScheduleTrainDriver(data).then(async res=>{
            await getDataScheduleTrainDriverRealisasi({params:{monthlyWorkDate:date}})
            return {status: true, result: res.data}
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const postDataScheduleTrainDriverMonthly = async (data, monthly) => {
        return ApiOperational.postScheduleTrainDriverMonthlyPlanning(data).then(res=>{
            getDataScheduleTrainDriver({params:{monthlyWorkDate:monthly}})
            return {status : true, result : res.data}
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const updateRouteDataScheduleTrainDriver = async (data, date) => {
        ApiOperational.updateRouteScheduleTrainDriverPlanning(data).then(res=>{
            // socket.emit('led', 'led', res.data)
            getDetailDaily(data?._id, true)
            //getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const updateRouteDataScheduleTrainDriverStation = async (data) => {
        ApiOperational.updateRouteScheduleTrainDriverStation(data).then(res=>{
            // socket.emit('led', "led", res.data)
            getDetailDaily(data?._id, true)
            //getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const updateDataScheduleTrainDriver = async (id, data, date) => {
        return ApiOperational.updateScheduleTrainDriverPlanning(id, data).then(res=>{
            getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
            return {status :true, result:res.data}
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const updateDataScheduleTrainDriverStatus = async (id, data, date) => {
        return ApiOperational.updateScheduleTrainDriverPlanning(id, data).then(res=>{
            return {status :true, result:res.data}
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const getDataScheduleLastTrainDriver = async (code, loop, date) => {
        let query = {}
        if(code === "A" || code === "B" || code === "C" || code === "D")
        {
            query = {...query, note : "Bertugas", loop, dailyWorkDate: moment(date).add(-1, "days").format("YYYY-MM-DD"), status:'Finish To Work'}
           
        }
        else{
            query = {...query, note : "Bertugas", loop, dailyWorkDate: date, status:'Finish To Work'}
        }
        return ApiOperational.getScheduleTrainDriverPlanning({params:query}).then(res=>{
            if(res.data.length>0){
                setDataScheduleLastTrainDriver(_.orderBy(res.data, ["loopRouteTrain.start"], ["desc"])[0])
                return {status : true,  data : _.orderBy(res.data, ["loopRouteTrain.start"], ["desc"])[0]}
            }
            else {
                return {status : false, data :{}}
            }
        }).catch(err=>{
            return { status: false, result: err }
        })
    }

    const deleteDataScheduleTrainDriver = async (id, date, monthly, local) => {
        ApiOperational.deleteScheduleTrainDriverPlanning(id).then(res=>{
            if(!local){
                if(monthly){
                    getDataScheduleTrainDriver({params:{monthlyWorkDate:monthly}})
                }
                else{
                    getDataScheduleTrainDriver({params:{dailyWorkDate:date}})
                }
            }
            
            
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }

    const deleteDataScheduleTrainDriverRealisasi = async (id, date, monthly, local) => {
        ApiOperational.deleteScheduleTrainDriver(id).then(res=>{
            if(!local)
            {
                if(monthly){
                    getDataScheduleTrainDriverRealisasi({params:{monthlyWorkDate:monthly}})
                }
                else{
                    getDataScheduleTrainDriverRealisasi({params:{dailyWorkDate:date}})
                }
            }
            
            return {status: true, result: res.data}
        }).catch(err=>{
            return { status: 400, result: err }
        })
    }


    return (
        <DailyWorkPlanningContext.Provider value={{ getDataLoopTrain, dataLoopTrain, dataScheduleTrainDriver, 
            getDataScheduleTrainDriver, postDataScheduleTrainDriver, 
            updateDataScheduleTrainDriver,updateRouteDataScheduleTrainDriver, 
            updateDataScheduleTrainDriverStatus,
            updateRouteDataScheduleTrainDriverStation,
            getDataScheduleLastTrainDriver,
            dataScheduleLastTrainDriver,
            deleteDataScheduleTrainDriver,
            dataDetailDaily,
            getDetailDaily,
            postDataScheduleTrainDriverMonthly,
            getDataScheduleTrainDriverRealisasi,
            dataScheduleTrainDriverRealisasi,
            getDataLoopTrainMasinis,
            postDataScheduleTrainDriverRealisasi,
            deleteDataScheduleTrainDriverRealisasi,
            postDataScheduleTrainDriverMonthlyImport
        }} {...props}/>
    );
}