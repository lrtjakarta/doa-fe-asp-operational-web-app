import { createContext, useState } from "react";
import Api from "../Services/ApiOperational";

export const AssessmentContext = createContext({});

export default function AssessmentProvider(props) {
  const [assessment, setAssessment] = useState(null);
  const [filterAssessment, setFilterAssessment] = useState([]);
  const [totalAssessment, setTotalAssessment] = useState([]);
  const [detailAssessment, setDetailAssessment] = useState({});
  const [dateAssessment, setDateAssessment] = useState("");

  const getDataAssessment = (nik, monthly) => {
    return Api.getAssessment({ params: { nik, monthly } })
      .then((res) => {
        setAssessment(res.data);
        setFilterAssessment(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  const getTotalAssessment = (trainDriverID, monthly) => {
    if (trainDriverID) {
      return Api.getQueryAssessmentTotal({ params: { trainDriverID, monthly } })
        .then((res) => {
          setTotalAssessment(res.data);
        })
        .catch((err) => console.log("error", err));
    }
  };

  const getDetailAssessment = (id) => {
    return Api.getAssessment({ params: { id } })
      .then((res) => {
        setAssessment(res.data);
        setFilterAssessment(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <AssessmentContext.Provider
      value={{
        dateAssessment,
        setDateAssessment,
        getTotalAssessment,
        getDataAssessment,
        getDetailAssessment,
        assessment,
        setAssessment,
        setFilterAssessment,
        totalAssessment,
        setTotalAssessment,
        filterAssessment,
        setDetailAssessment,
        detailAssessment,
      }}
      {...props}
    />
  );
}
