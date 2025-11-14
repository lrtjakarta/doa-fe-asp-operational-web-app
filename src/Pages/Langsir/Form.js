import React, { useState, Fragment, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  Alert,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  Button,
  Stack,
  IconButton,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TextField,
  Modal,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select,
  ListItem,
  List,
  ListItemText,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import useStyles from './Styles'
import { LangsirContext, MasterLrvContext, StationMasterContext } from 'Context'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import useQuery from 'Utils/QueryParams';


export default function LangsirForm(props) {
  const classes = useStyles()
  const { getStationMaster, stationMasters } = useContext(StationMasterContext);
  const { getDataNoGoItem, listMasterLrv } = useContext(MasterLrvContext);
  const { getDataLangsir, postDataLangsir, updateDataLangsir } = useContext(LangsirContext);

  const [postData, setPostData] = useState({readyOperationList:[], standByList:[], periodicList:[], noOperationList:[], schemeLangsir:[]})
  const [chooseReadyOperation, setChooseReadyOperation] = useState("0")
  const [chooseStandBy, setChooseStandBy] = useState("0")
  const [choosePeriodic, setChoosePeriodic] = useState("0")
  const [chooseNoOperation, setChooseNoOperation] = useState("0")

  const [addSkemaLangsir, setAddSkemaLangsir] = useState({})

  let query = useQuery()
  const id = props?.id ? props.id : query.get('id')
  const action = props?.action ? props.action : query.get('action')

  const loadData = async()=>{
    //Load master data
    await getStationMaster({params:{stationNote:'Langsir'}})
    await getDataNoGoItem()

    if(action === "edit"){
      const response = await getDataLangsir({_id : id})
      console.log('response', response)
      if(response.length>0){
        setPostData(response[0])
      }
    }
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <>
      <Container maxWidth='xl' sx={{ pt: 13 }}>
        <Paper sx={{ padding: '20px 50px' }}>
          <Typography variant='h4' align='center' sx={{ my: 3 }}>
            Form Langsir
          </Typography>

          <Table style={{ width: '100%' }}>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Tanggal Beroperasi</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                <TextField type='date' value={postData?.operationDate} onChange={e=>setPostData({...postData, operationDate:e.target.value})}/>
              </TableCell>
            </TableRow>
          </Table>
          <Table sx={{mt:2}}>
            <TableRow style={{backgroundColor:"#EFEFEF"}}>
              <TableCell colSpan={6} style={{textAlign:'center'}}>Skema Langsir</TableCell>
            </TableRow>
            <TableRow style={{backgroundColor:"#EFEFEF"}}>
              
              <TableCell>Rangkaian</TableCell>
              <TableCell>Jam Langsir</TableCell>
              <TableCell>Posisi Awal</TableCell>
              <TableCell>Posisi Akhir</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell style={{width:80}}>Aksi</TableCell>
            </TableRow>
            
            {postData.schemeLangsir.map(itemScheme=>{
              return(
                <TableRow>
                  <TableCell>{itemScheme?.lrv?.numberLrv}</TableCell>
                  <TableCell>{itemScheme?.langsirTime}</TableCell>
                  <TableCell>{itemScheme?.startPosition?.stationName}</TableCell>
                  <TableCell>{itemScheme?.endPosition?.stationName}</TableCell>
                  <TableCell>{itemScheme?.note}</TableCell>
                  <TableCell style={{width:80}}>
                    {/* <IconButton edge="end" aria-label="edit" onClick={() => 
                      {}
                    }>
                      <EditIcon />
                    </IconButton> */}
                    <IconButton edge="end" aria-label="delete" onClick={() => 
                      {
                        let schemeLangsir = postData.schemeLangsir.filter(x=>x._id !== itemScheme._id)
                        setPostData({...postData, schemeLangsir})
                      }
                    }>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            

            <TableRow>
              <TableCell>
                <Select value={addSkemaLangsir.lrv} onChange={e=>setAddSkemaLangsir({...addSkemaLangsir, lrv: e.target.value})}>
                {listMasterLrv.map(itemLrv=>{
                  return(<MenuItem value={itemLrv._id}>{itemLrv.numberLrv}</MenuItem>)
                })}
                </Select>
              </TableCell>
              <TableCell>
                <TextField value={addSkemaLangsir.langsirTime} onChange={e=>setAddSkemaLangsir({...addSkemaLangsir, langsirTime: e.target.value})} type="time"/>
              </TableCell>
              <TableCell>
                <Select value={addSkemaLangsir.startPosition} onChange={e=>setAddSkemaLangsir({...addSkemaLangsir, startPosition: e.target.value})} >
                {stationMasters.map(itemStatiun=>{
                  return(<MenuItem value={itemStatiun._id}>{itemStatiun.stationName}</MenuItem>)
                })}
                </Select>
              </TableCell>
              <TableCell>
                <Select value={addSkemaLangsir.endPosition} onChange={e=>setAddSkemaLangsir({...addSkemaLangsir, endPosition: e.target.value})} >
                {stationMasters.map(itemStatiun=>{
                  return(<MenuItem value={itemStatiun._id}>{itemStatiun.stationName}</MenuItem>)
                })}
                </Select>
              </TableCell>
              <TableCell>
              <TextField value={addSkemaLangsir.note} onChange={e=>setAddSkemaLangsir({...addSkemaLangsir, note: e.target.value})}  type="text"/>
              </TableCell>
              <TableCell>
              <Button variant='contained' color='primary' sx={{mt:2, mb:2}} onClick={()=>{
                let _addData = {
                  _id : uuidv4().replace(/-/g, '').substring(0, 24),
                  lrv : {
                    _id : addSkemaLangsir.lrv,
                    numberLrv : listMasterLrv.find(x=>x._id === addSkemaLangsir.lrv)?.numberLrv
                  },
                  langsirTime: addSkemaLangsir.langsirTime,
                  startPosition: {
                    _id : addSkemaLangsir.startPosition,
                    stationName: stationMasters.find(x=>x._id === addSkemaLangsir.startPosition)?.stationName,
                    stationCode : stationMasters.find(x=>x._id === addSkemaLangsir.startPosition)?.stationCode,
                  },
                  endPosition: {
                    _id : addSkemaLangsir.endPosition,
                    stationName: stationMasters.find(x=>x._id === addSkemaLangsir.endPosition)?.stationName,
                    stationCode : stationMasters.find(x=>x._id === addSkemaLangsir.endPosition)?.stationCode,
                  },
                  note : addSkemaLangsir.note
                }
                setPostData({...postData, schemeLangsir:[...postData.schemeLangsir, _addData]})
              }}>Tambah</Button>
              </TableCell>
            </TableRow>
          </Table>
          
        </Paper>
        <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}>
            <Button
              variant='contained'
              onClick={async () => {
                props.history.goBack()
              }}
              sx={{
                color: '#A56C28',
                bgcolor: '#fff',
                border: '2px solid #A56C28',
                width: 300,
                fontSize: 18,
                mr: 3,
                mt: 3,
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  border: 'none',
                },
              }}>
              <ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
            </Button>
            <Button
              onClick={async () => {
                if(action === "edit"){
                  await updateDataLangsir(id, postData)
                }
                else{
                  await postDataLangsir(postData)
                }
                
                props.history.goBack()
              }}
              variant='contained'
              sx={{
                color: '#fff',
                bgcolor: '#BB7E36',
                border: '1px solid #A56C28',
                width: 300,
                fontSize: 18,
                mr: 3,
                mt: 3,
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  border: 'none',
                },
              }}>
              Submit
            </Button>
        </Grid>
      </Container>
    </>
  )
}

{
  /*  */
}
