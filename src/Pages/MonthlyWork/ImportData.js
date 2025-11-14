import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { Alert, AlertTitle, Divider, Table, TableCell, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import { StationMasterContext } from 'Context';
import UseDailyWork from 'Hooks/DailyWorkPlanning/useDailyWork';
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver';
import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

export default function ImportData(props) {

    const [columns, setColumns] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);
    const [dataPostDinasan, setDataPostDinasan] = useState([])
    const [publishState, setPublishState] = useState([])
  
    const funcLoopFormat= (dataloopTrain)=>{
      let loopRouteFormat = {}
      if(dataloopTrain?.route.length>0)
      {
        loopRouteFormat = {
          ...dataloopTrain,
              route : dataloopTrain?.route.map(itemloop=>{     
            
              let station  = []
              if(Number(itemloop)%2 > 0){
                station =  dataloopTrain?.station.filter(x=>x.flag === "Ganjil")[0].stationList.map(item=>{
                  let datadistance = timetables.filter(x=>x.flag ==="Ganjil" && x.stationCode === item.stationCode)[0]
                  let datatimetable = datadistance?.route.filter(x=>x.route === itemloop)[0]
                  return(
                    {
                      ...item,
                      start: "",
                      end : "",
                      status : "",
                      duration :0,
                      dweelingTime : 0,
                      startPlan : datatimetable?.start,
                      endPlan : datatimetable?.end,
                      distance : datadistance?.distance,
                      vOps:datadistance?.vOps,
                      vMax:datadistance?.vMax,
                    }
                  )
                })
              }
              else{
                station =  dataloopTrain?.station.filter(x=>x.flag === "Genap")[0].stationList.map(item=>{
                  let datadistance = timetables.filter(x=>x.flag ==="Genap" && x.stationCode === item.stationCode)[0]
                  let datatimetable = datadistance?.route.filter(x=>x.route === itemloop)[0]
                  return(
                    {
                      ...item,
                      start: "",
                      end : "",
                      status : "",
                      duration :0,
                      dweelingTime : 0,
                      startPlan : datatimetable?.start,
                      endPlan : datatimetable?.end,
                      distance : datadistance?.distance,
                      vOps:datadistance?.vOps,
                      vMax:datadistance?.vMax,
                      
                    }
                  )
                })
              }
              return {
                trainNumber: itemloop,
                startTime: "",
                endTime: "",
                duration: 0,
                dweelingTime:0,
                status: "",
                note: itemloop.note,
                station
              };
            })
        }
      }
      else{
        loopRouteFormat = {
          ...dataloopTrain,
          route : dataloopTrain?.route
        }
      }
      return loopRouteFormat
    }
  
    function formatPostData(dailyWork, trainDriver, looproutetrain){
      let loopRouteFormat = funcLoopFormat(looproutetrain)
      return {
        dailyWorkDate: dailyWork,
        loopRouteTrain: loopRouteFormat, 
        trainDriver
      }
    }
  
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
   
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
   
      setDataExcel(list);
      setColumns(columns);
      console.log('list', list)
      postData(list)
    }

    const postData = (data)=>{
        let _data = []
        data.forEach(itemList=>{
          let _trainDriver = trainDriver.filter(x=>x.nik === itemList.NIK.replace(".", ""))
          let _loopRouteTrain1 = dataLoopTrain.filter(x=>x.code === itemList._d1)
          let _loopRouteTrain2 = dataLoopTrain.filter(x=>x.code === itemList._d2)
          let _loopRouteTrain3 = dataLoopTrain.filter(x=>x.code === itemList._d3)
          let _loopRouteTrain4 = dataLoopTrain.filter(x=>x.code === itemList._d4)
          let _loopRouteTrain5 = dataLoopTrain.filter(x=>x.code === itemList._d5)
          let _loopRouteTrain6 = dataLoopTrain.filter(x=>x.code === itemList._d6)
          let _loopRouteTrain7 = dataLoopTrain.filter(x=>x.code === itemList._d7)
          let _loopRouteTrain8 = dataLoopTrain.filter(x=>x.code === itemList._d8)
          let _loopRouteTrain9 = dataLoopTrain.filter(x=>x.code === itemList._d9)
          let _loopRouteTrain10 = dataLoopTrain.filter(x=>x.code === itemList._d10)
          let _loopRouteTrain11 = dataLoopTrain.filter(x=>x.code === itemList._d11)
          let _loopRouteTrain12 = dataLoopTrain.filter(x=>x.code === itemList._d12)
          let _loopRouteTrain13 = dataLoopTrain.filter(x=>x.code === itemList._d13)
          let _loopRouteTrain14 = dataLoopTrain.filter(x=>x.code === itemList._d14)
          let _loopRouteTrain15 = dataLoopTrain.filter(x=>x.code === itemList._d15)
          let _loopRouteTrain16 = dataLoopTrain.filter(x=>x.code === itemList._d16)
          let _loopRouteTrain17 = dataLoopTrain.filter(x=>x.code === itemList._d17)
          let _loopRouteTrain18 = dataLoopTrain.filter(x=>x.code === itemList._d18)
          let _loopRouteTrain19 = dataLoopTrain.filter(x=>x.code === itemList._d19)
          let _loopRouteTrain20 = dataLoopTrain.filter(x=>x.code === itemList._d20)
          let _loopRouteTrain21 = dataLoopTrain.filter(x=>x.code === itemList._d21)
          let _loopRouteTrain22 = dataLoopTrain.filter(x=>x.code === itemList._d22)
          let _loopRouteTrain23 = dataLoopTrain.filter(x=>x.code === itemList._d23)
          let _loopRouteTrain24 = dataLoopTrain.filter(x=>x.code === itemList._d24)
          let _loopRouteTrain25 = dataLoopTrain.filter(x=>x.code === itemList._d25)
          let _loopRouteTrain26 = dataLoopTrain.filter(x=>x.code === itemList._d26)
          let _loopRouteTrain27 = dataLoopTrain.filter(x=>x.code === itemList._d27)
          let _loopRouteTrain28 = dataLoopTrain.filter(x=>x.code === itemList._d28)
          let _loopRouteTrain29 = dataLoopTrain.filter(x=>x.code === itemList._d29)
          let _loopRouteTrain30 = dataLoopTrain.filter(x=>x.code === itemList._d30)
          let _loopRouteTrain31 = dataLoopTrain.filter(x=>x.code === itemList._d31)
    
          if(_trainDriver.length>0)
          {
            if(_loopRouteTrain1.length>0){
              _data.push(formatPostData(monthlyWork+'-01'+ " 07:00:00", _trainDriver[0], _loopRouteTrain1[0]))
            }
            if(_loopRouteTrain2.length>0){
              _data.push(formatPostData(monthlyWork+'-02'+ " 07:00:00", _trainDriver[0], _loopRouteTrain2[0]))
            }
            if(_loopRouteTrain3.length>0){
              _data.push(formatPostData(monthlyWork+'-03'+ " 07:00:00", _trainDriver[0], _loopRouteTrain3[0]))
            }
            if(_loopRouteTrain4.length>0){
              _data.push(formatPostData(monthlyWork+'-04'+ " 07:00:00", _trainDriver[0], _loopRouteTrain4[0]))
            }
            if(_loopRouteTrain5.length>0){
              _data.push(formatPostData(monthlyWork+'-05'+ " 07:00:00", _trainDriver[0], _loopRouteTrain5[0]))
            }
            if(_loopRouteTrain6.length>0){
              _data.push(formatPostData(monthlyWork+'-06'+ " 07:00:00", _trainDriver[0], _loopRouteTrain6[0]))
            }
            if(_loopRouteTrain7.length>0){
              _data.push(formatPostData(monthlyWork+'-07'+ " 07:00:00", _trainDriver[0], _loopRouteTrain7[0]))
            }
            if(_loopRouteTrain8.length>0){
              _data.push(formatPostData(monthlyWork+'-08'+ " 07:00:00", _trainDriver[0], _loopRouteTrain8[0]))
            }
            if(_loopRouteTrain9.length>0){
              _data.push(formatPostData(monthlyWork+'-09'+ " 07:00:00", _trainDriver[0], _loopRouteTrain9[0]))
            }
            if(_loopRouteTrain10.length>0){
              _data.push(formatPostData(monthlyWork+'-10'+ " 07:00:00", _trainDriver[0], _loopRouteTrain10[0]))
            }
    
            if(_loopRouteTrain11.length>0){
              _data.push(formatPostData(monthlyWork+'-11'+ " 07:00:00", _trainDriver[0], _loopRouteTrain11[0]))
            }
            if(_loopRouteTrain12.length>0){
              _data.push(formatPostData(monthlyWork+'-12'+ " 07:00:00", _trainDriver[0], _loopRouteTrain12[0]))
            }
            if(_loopRouteTrain13.length>0){
              _data.push(formatPostData(monthlyWork+'-13'+ " 07:00:00", _trainDriver[0], _loopRouteTrain13[0]))
            }
            if(_loopRouteTrain14.length>0){
              _data.push(formatPostData(monthlyWork+'-14'+ " 07:00:00", _trainDriver[0], _loopRouteTrain14[0]))
            }
            if(_loopRouteTrain15.length>0){
              _data.push(formatPostData(monthlyWork+'-15'+ " 07:00:00", _trainDriver[0], _loopRouteTrain15[0]))
            }
            if(_loopRouteTrain16.length>0){
              _data.push(formatPostData(monthlyWork+'-16'+ " 07:00:00", _trainDriver[0], _loopRouteTrain16[0]))
            }
            if(_loopRouteTrain17.length>0){
              _data.push(formatPostData(monthlyWork+'-17'+ " 07:00:00", _trainDriver[0], _loopRouteTrain17[0]))
            }
            if(_loopRouteTrain18.length>0){
              _data.push(formatPostData(monthlyWork+'-18'+ " 07:00:00", _trainDriver[0], _loopRouteTrain18[0]))
            }
            if(_loopRouteTrain19.length>0){
              _data.push(formatPostData(monthlyWork+'-19'+ " 07:00:00", _trainDriver[0], _loopRouteTrain19[0]))
            }
            if(_loopRouteTrain20.length>0){
              _data.push(formatPostData(monthlyWork+'-20'+ " 07:00:00", _trainDriver[0], _loopRouteTrain20[0]))
            }
    
            if(_loopRouteTrain21.length>0){
              _data.push(formatPostData(monthlyWork+'-21'+ " 07:00:00", _trainDriver[0], _loopRouteTrain21[0]))
            }
            if(_loopRouteTrain22.length>0){
              _data.push(formatPostData(monthlyWork+'-22'+ " 07:00:00", _trainDriver[0], _loopRouteTrain22[0]))
            }
            if(_loopRouteTrain23.length>0){
              _data.push(formatPostData(monthlyWork+'-23'+ " 07:00:00", _trainDriver[0], _loopRouteTrain23[0]))
            }
            if(_loopRouteTrain24.length>0){
              _data.push(formatPostData(monthlyWork+'-24'+ " 07:00:00", _trainDriver[0], _loopRouteTrain24[0]))
            }
            if(_loopRouteTrain25.length>0){
              _data.push(formatPostData(monthlyWork+'-25'+ " 07:00:00", _trainDriver[0], _loopRouteTrain25[0]))
            }
            if(_loopRouteTrain26.length>0){
              _data.push(formatPostData(monthlyWork+'-26'+ " 07:00:00", _trainDriver[0], _loopRouteTrain26[0]))
            }
            if(_loopRouteTrain27.length>0){
              _data.push(formatPostData(monthlyWork+'-27'+ " 07:00:00", _trainDriver[0], _loopRouteTrain27[0]))
            }
            if(_loopRouteTrain28.length>0){
              _data.push(formatPostData(monthlyWork+'-28'+ " 07:00:00", _trainDriver[0], _loopRouteTrain28[0]))
            }
            if(_loopRouteTrain29.length>0){
              _data.push(formatPostData(monthlyWork+'-29'+ " 07:00:00", _trainDriver[0], _loopRouteTrain29[0]))
            }
            if(_loopRouteTrain30.length>0){
              _data.push(formatPostData(monthlyWork+'-30'+ " 07:00:00", _trainDriver[0], _loopRouteTrain30[0]))
            }
            if(_loopRouteTrain31.length>0){
              _data.push(formatPostData(monthlyWork+'-31'+ " 07:00:00", _trainDriver[0], _loopRouteTrain31[0]))
            }
          }
        })
        console.log('dataPost', _data)
        console.log('data', data)
        console.log('trainDriver', trainDriver)
        console.log('loopRouteTrain', dataLoopTrain)
        console.log('timetables', timetables)
        setDataPostDinasan(_data)

        // submitDataMonthlyWorkImport(_data)
    }

    const submitData = async() =>{
        setLoadingImport(true)
        const res = await submitDataMonthlyWorkImport(dataExcel, trainDriver, dataLoopTrain, monthlyWork, timetables)
        console.log('res', res)
        if(res.status){
          setLoadingImport(false)
          props.history.push('/app/operational/monthlywork')
        }
    }
   
    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        console.log('data', data)
        processData(data);
        
      };
      reader.readAsBinaryString(file);
    }

    const { trainDriver, getDataTrainDriver } = useTrainDriver();
    const {
        getTimeTable,
        timetables
    } = useContext(StationMasterContext)

    const [loadingImport, setLoadingImport] = useState(false)

    const { fetchDataLoop, dataLoopTrain, submitDataMonthlyWork, submitDataMonthlyWorkImport } = UseDailyWork();

    useEffect(()=>{
        getDataTrainDriver()
        getTimeTable()
        fetchDataLoop("Masinis")
    },[])

    const [monthlyWork, setMonthlyWork] = useState("")
    
  return (
    <Box sx={{ display: "flex", pl: 8,  pt: 13 }}>
      <Container maxWidth="xl">
        <Alert severity="warning">
            <AlertTitle>
              Perhatian sebelum melanjutkan proses import.
            </AlertTitle>
            <p>Proses import data bulanan akan berlangsung beberapa menit. Pastikan koneksi internet anda dalam kondisi stabil saat mengeksekusi data. </p>
            <p>Data Dinas Bulanan (Perencanaan) dan Dinas Harian (Realisasi) akan dihapus terlebih dahulu. Pastikan anda tidak melakukan pada bulan berjalan, karena akan mengakibatkan kehilangan data pada bulan yang dipilih.</p>
        </Alert>
        <Typography>1. Upload File Data Dinasan Bulanan</Typography>
        <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
        />

        {
            dataPostDinasan.length>0 ?
            <div>
                <Alert>
                    <AlertTitle><i>Jumlah Dinasan terbaca sebanyak {dataPostDinasan.length} records.</i></AlertTitle>
                </Alert>
                <Typography>2. Pilih Bulan :</Typography>
                <TextField type="month" value={monthlyWork} onChange={e=>setMonthlyWork(e.target.value)} />
                {
                    monthlyWork!==""? 
                    loadingImport ?
                    <Button variant="contained" color="default">Loading...</Button>: 
                    <Button variant="contained" color="primary" onClick={()=>{
                      submitData()
                    }}>Submit</Button>
                    
                    : null
                }
                
            </div>
            :null
        }

        {/* <DataTable
            pagination
            highlightOnHover
            columns={columns}
            data={dataExcel}
        /> */}
        <Paper>
        <Table size="small">
          <TableHead>
            <TableRow style={{padding:0}}>
              {columns.map((key) => (
                  <TableCell style={{padding:0, margin:0}} key={key.name}>{key.name}</TableCell> // Menampilkan header kolom berdasarkan keys dari objek pertama
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataExcel.map((item) => (
              <TableRow style={{padding:0}}>
                  {Object.values(item).map((value, index) => (
                  <TableCell style={{padding:0, margin:0}} key={index}>{value}</TableCell> // Menampilkan nilai dari setiap objek sebagai kolom dalam tabel
                  ))}
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </Paper>
        
        
        
      </Container>
    </Box>
    
  )
}
