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
import { PPPKAContext, MasterLrvContext, StationMasterContext } from 'Context'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import useQuery from 'Utils/QueryParams';
import ContentEditor from '../../Component/ContentEditor'


export default function PPPKAForm(props) {
  const classes = useStyles()
  const { getDataPPPKA, dataPPPKA, postDataPPPKA, updateDataPPPKA, deleteDataPPPKA } = useContext(PPPKAContext);

  const [postData, setPostData] = useState({})

  let query = useQuery()
  const id = props?.id ? props.id : query.get('id')
  const action = props?.action ? props.action : query.get('action')

  const loadData = async()=>{
    //Load master data

    if(action === "edit"){
      const response = await getDataPPPKA({_id : id})
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
            Form PPPKA
          </Typography>
          <Table style={{ width: '100%' }} size="small">
            <TableRow>
              <TableCell style={{ width: '15%', }}>
                <Typography>Nomor PPPKA</Typography>
              </TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}} value={postData?.PPPKANumber} onChange={e=>setPostData({...postData, PPPKANumber:e.target.value})}/>
              </TableCell>
              <TableCell style={{ width: '15%' }}>Permintaan Divisi/Departemen</TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}}  value={postData?.requestFrom} onChange={e=>setPostData({...postData, requestFrom:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '15%' }}>
                <Typography>Tanggal</Typography>
              </TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}}  type='date' value={postData?.PPPKADate} onChange={e=>setPostData({...postData, PPPKADate:e.target.value})}/>
              </TableCell>
              <TableCell style={{ width: '15%' }}>Perihal</TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}}  value={postData?.regardingNote} onChange={e=>setPostData({...postData, regardingNote:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '15%' }}>
                <Typography>Jabatan yang bertandatangan</Typography>
              </TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}} value={postData?.createBy?.jobRole} onChange={e=>setPostData({...postData, createBy:{...postData.createBy,jobRole: e.target.value}})}/>
              </TableCell>
              <TableCell style={{ width: '15%' }}>Nama Yang bertandatangan</TableCell>
              <TableCell style={{ width: '35%' }}>
                <TextField style={{width:'100%'}} value={postData?.createBy?.name} onChange={e=>setPostData({...postData, createBy:{...postData.createBy,name: e.target.value}})}/>
              </TableCell>
            </TableRow>
          </Table>
          <Typography variant='h5' style={{textAlign:'center', width:'100%',}} sx={{mt:2, mb:2}}>Menetapkan dan mengumumkan perjalanan kereta api dengan rincian sebagai berikut :</Typography>
          <Table style={{ width: '100%' }} size="small">
            <TableRow>
              <TableCell style={{ width: '25%', }}>
                <Typography>Dasar</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKABackground} onChange={e=>setPostData({...postData, PPPKABackground:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Perihal Keperluan</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKAFor} onChange={e=>setPostData({...postData, PPPKAFor:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Tanggal berlaku/Jam Keberangkatan</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKAApplicableDate} onChange={e=>setPostData({...postData, PPPKAApplicableDate:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Lintas yang dilalui</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKARoute} onChange={e=>setPostData({...postData, PPPKARoute:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Batas Kecepatan</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKASpeedLimit} onChange={e=>setPostData({...postData, PPPKASpeedLimit:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Susunan Rangkaian</Typography>
              </TableCell>
              <TableCell>
                <TextField style={{width:'100%'}} value={postData?.PPPKALRV} onChange={e=>setPostData({...postData, PPPKALRV:e.target.value})}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '25%' }}>
                <Typography>Perubahan jadwal perjalanan</Typography>
              </TableCell>
              <TableCell>
                <ContentEditor
                  style={{width:'100%'}}
                    handleChange={(event, editor) =>
                      setPostData({...postData, PPPKANote: editor.getData()})
                    }
                    value={postData?.PPPKANote}
                />
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
                  await updateDataPPPKA(id, postData)
                }
                else{
                  await postDataPPPKA(postData)
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
