import React, { useContext, createContext, useState } from "react"
import _ from "lodash"
import Api from "../Services/ApiOperational"

export const MasterMedicalContext = createContext({})

export default function MasterMedicalProvider(props) {
    const [masterMedical, setMasterMedical] = useState([])
    const [filterMasterMedical, setFilterMasterMedical] = useState([])
    const [detailMasterMedical, setDetailMasterMedical] = useState({})

    const getDataMasterMedical = async () => {
        //if(masterMedical.length === 0){
        return Api.getMasterMedical()
            .then(async (res) => {
                const resMedical = await res.data.map((item) => {
                    item.answer = {}
                    item.note = ""
                    return item
                })

                var groupMasterMedical =
                    resMedical.length > 0
                        ? _.mapValues(
                              _.groupBy(resMedical, "category._id"),
                              (list) =>
                                  list.map((item) =>
                                      _.omit(item, "category._id")
                                  )
                          )
                        : []
                let valuegroup = []
                Object.entries(groupMasterMedical).map((item) => {
                    valuegroup = [
                        ...valuegroup,
                        { category: item[0], dataDetails: item[1] }
                    ]
                })
                setMasterMedical(valuegroup)
                setFilterMasterMedical(valuegroup)

                return valuegroup
            })
            .catch((err) => console.log("error", err))
        //}
    }

    const getDetailMasterMedical = async (id) => {
        if (masterMedical.length === 0) {
            return Api.getMasterMedical({ params: { id } })
                .then((res) => {
                    if (res.data.length > 0) {
                        setDetailMasterMedical(res.data[0])
                        return { ...res.data[0] }
                    }
                    return {}
                })
                .catch((err) => console.log("error", err))
        } else {
            const result = await masterMedical.filter((item) => item._id === id)
            if (result.length > 0) {
                setDetailMasterMedical(result[0])
                return result[0]
            }
        }
    }

    return (
        <MasterMedicalContext.Provider
            value={{
                getDataMasterMedical,
                masterMedical,
                setMasterMedical,
                setFilterMasterMedical,
                filterMasterMedical,
                setDetailMasterMedical,
                detailMasterMedical
            }}
            {...props}
        />
    )
}
