import { CheckupContext, MasterMedicalContext, MedicalRecordContext, TrainDriverContext } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import useQuery from 'Utils/QueryParams';
import _ from "lodash"
import moment from 'moment';

export default function UseCounting(props) {

  let query = useQuery();
  const id = query.get('id');

  const calculateTimeLeft = (createdAt) => {
    let difference = +new Date() - +new Date(createdAt);
    let timectx = {};

    if (difference > 0) {
      timectx = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24) < 10 ? "0" + Math.floor((difference / (1000 * 60 * 60)) % 24) : Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60) < 10 ? "0" + Math.floor((difference / 1000 / 60) % 60) : Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60) < 10 ? "0" + Math.floor((difference / 1000) % 60) : Math.floor((difference / 1000) % 60)
      };
    }
    return timectx;
  }
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      // Clear timeout if the component is unmounted
      return () => clearInterval(timer);
  });

  return {
    timeLeft,
    calculateTimeLeft
  }
}