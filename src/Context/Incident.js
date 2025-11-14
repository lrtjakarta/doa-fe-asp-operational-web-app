import React, { useContext, createContext, useState } from "react"
import Api from "../Services/ApiOperational"
import { toast } from "react-toastify"

export const IncidentContext = createContext({})

export default function IncidentProvider(props) {
    const [incident, setIncident] = useState([])
    const [detailIncident, setdetailIncident] = useState({})

    const getDataIncident = async (params) => {
        try {
            let getIncident = await Api.getKAIncident(params)
            let listIncident = getIncident?.data.map(item=>{
                item.value = ""
                delete item._id
                delete item.created
                delete item.updatedAt
                delete item.description
                return item
            })
            setIncident(listIncident)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <IncidentContext.Provider
            value={{
                incident,
                detailIncident,
                getDataIncident,
                setIncident,
            }}
            {...props}
        />
    )
}
