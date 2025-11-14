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
import { StamformasiContext, MasterLrvContext, StationMasterContext } from 'Context'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import useQuery from 'Utils/QueryParams';


export default function LangsirForm(props) {
  const classes = useStyles()
  const { getDataNoGoItem, listMasterLrv } = useContext(MasterLrvContext);
  const { getDataStamformasi, postDataStamformasi, updateDataStamformasi } = useContext(StamformasiContext);

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
    await getDataNoGoItem()

    if(action === "edit"){
      const response = await getDataStamformasi({_id : id})
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
            Form Stamformasi KA
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
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>LRV Siap Operasi</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
              <Typography>Tambah Data : <Select value={chooseReadyOperation} onChange={e=>setChooseReadyOperation(e.target.value)}>
                {listMasterLrv.map(itemLrv=>{
                  return(<MenuItem value={itemLrv._id}>{itemLrv.numberLrv}</MenuItem>)
                })}
              </Select><Button variant='contained' color='primary' onClick={()=>{
                let readyOperationList = [...postData.readyOperationList, {
                  _id: chooseReadyOperation,
                  numberLrv : listMasterLrv.filter(x=>x._id === chooseReadyOperation)[0].numberLrv
                }]
                setPostData({...postData, readyOperationList})
              }}>Simpan</Button></Typography>
              <List>
                  {postData && postData?.readyOperationList.map((item) => (
                    <ListItem key={item.id} className={`${classes.listItem} ${classes.zebra}`} secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => 
                          {
                            let readyOperationList = postData.readyOperationList.filter(x=>x._id !== item._id)
                            setPostData({...postData, readyOperationList})
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText primary={item.numberLrv} />
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Lokasi LRV Cadangan (testrack/stabling/jalur 2 PGD)</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
              <Typography>Tambah Data : <Select value={chooseStandBy} onChange={e=>setChooseStandBy(e.target.value)}>
                {listMasterLrv.map(itemLrv=>{
                  return(<MenuItem value={itemLrv._id}>{itemLrv.numberLrv}</MenuItem>)
                })}
              </Select><Button variant='contained' color='primary' onClick={()=>{
                let standByList = [...postData.standByList, {
                  _id: chooseStandBy,
                  numberLrv : listMasterLrv.filter(x=>x._id === chooseStandBy)[0].numberLrv
                }]
                setPostData({...postData, standByList})
              }}>Simpan</Button></Typography>
              <List>
                  {postData?.standByList.map((item) => (
                    <ListItem key={item.id} className={`${classes.listItem} ${classes.zebra}`} secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => 
                          {
                            let standByList = postData.standByList.filter(x=>x._id !== item._id)
                            setPostData({...postData, standByList})
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText primary={item.numberLrv} />
                    </ListItem>
                  ))}
                </List>
                
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Lokasi LRV Periodik (LM 5/6/7/8 )</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
              <Typography>Tambah Data : 
              <Select value={choosePeriodic} onChange={e=>setChoosePeriodic(e.target.value)}>
                {listMasterLrv.map(itemLrv=>{
                  return(<MenuItem value={itemLrv._id}>{itemLrv.numberLrv}</MenuItem>)
                })}
              </Select><Button variant='contained' color='primary' onClick={()=>{
                let periodicList = [...postData.periodicList, {
                  _id: choosePeriodic,
                  numberLrv : listMasterLrv.filter(x=>x._id === choosePeriodic)[0].numberLrv
                }]
                setPostData({...postData, periodicList})
              }}>Simpan</Button></Typography>
              <List>
              {postData && postData?.periodicList.map((item) => (
                    <ListItem key={item.id} className={`${classes.listItem} ${classes.zebra}`} secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => 
                          {
                            let periodicList = postData.periodicList.filter(x=>x._id !== item._id)
                            setPostData({...postData, periodicList})
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText primary={item.numberLrv} />
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Lokasi LRV Tidak Siap Operasi (HM 1/2/3/4 )</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
              <Typography>Tambah Data : 
              <Select value={chooseNoOperation} onChange={e=>setChooseNoOperation(e.target.value)}>
                {listMasterLrv.map(itemLrv=>{
                  return(<MenuItem value={itemLrv._id}>{itemLrv.numberLrv}</MenuItem>)
                })}
              </Select><Button variant='contained' color='primary' onClick={()=>{
                let noOperationList = [...postData.noOperationList, {
                  _id: chooseNoOperation,
                  numberLrv : listMasterLrv.filter(x=>x._id === chooseNoOperation)[0].numberLrv
                }]
                setPostData({...postData, noOperationList})
              }}>Simpan</Button></Typography>
              <List>
              {postData && postData?.noOperationList.map((item) => (
                    <ListItem key={item.id} className={`${classes.listItem} ${classes.zebra}`} secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => 
                          {
                            let noOperationList = postData.noOperationList.filter(x=>x._id !== item._id)
                            setPostData({...postData, noOperationList})
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText primary={item.numberLrv} />
                    </ListItem>
                  ))}
                </List>
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
                  await updateDataStamformasi(id, postData)
                }
                else{
                  await postDataStamformasi(postData)
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
