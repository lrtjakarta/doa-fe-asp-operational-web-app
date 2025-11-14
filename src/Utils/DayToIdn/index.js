import moment from "moment-timezone"

export default (dateSchedule) => {
    const resDay = moment(dateSchedule).tz('Asia/Tokyo').format(
      "dddd, DD MMMM YYYY"
    )
    const date = resDay.slice(resDay.indexOf(","), resDay.length)
    const dayEn = resDay.slice(0, resDay.lastIndexOf(","))
    const dayIdn = [{id : "Minggu" , en : "Sunday"},{id : "Senin", en : "Monday"},{id:"Selasa" , en : "Tuesday"},{id : "Rabu", en : "Wednesday"},{id : "Kamis", en : "Thursday"},{id : "Jumat", en : "Friday"},{id : "Sabtu", en : "Saturday"}]
    const filterDay = dayIdn.filter(item => item.en === dayEn)[0]
    const resultDay = filterDay.id + date
    return resultDay
  }