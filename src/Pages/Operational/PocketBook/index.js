import React, { Fragment, useEffect, useState, useContext } from 'react'
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  IconButton,
  TextField,
  Stack,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// icon
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

// components
import CustomDialog from '../../../Component/Dialog/CustomDialog'
import Dialog from '../../../Component/CustomDialog/index'

// style
import {
  buttonAddStyle,
  tableLeftIsiStyle,
  tableLeftStyle,
  tableRightIsiStyle,
  tableRightStyle,
  tableTextCellStyle,
  tableTextIsiStyle,
  tableStyle,
  tableHeadStyle,
  judulTextStyle,
  searchBorderStyle,
} from './Styles'

import StaticVar from '../../../Config/StaticVar'

import useUploadImg from 'Hooks/Upload/useUploadImg'
import usePocketBook from '../../../Hooks/PocketBook/usePocketBook'

export default function CabinRide() {
  const {
    getDataPocketBook,
    handleOnDialog,
    onDelete,
    onUpdate,
    handleSubmit,
    openForm,
    setOpenForm,
    title,
    setTitle,
    searchText,
    setIndexOrder,
    indexOrder,
    description,
    setDescription,
    setAction,
    onResetState,
    filterPocketBook,
    opendelete,
    handleChangeSearch,
  } = usePocketBook()
  const theme = useTheme()

  const { uploadedDoc, handleInputDoc, handleUploadDocBase, file, setFile } =
    useUploadImg()
  useEffect(() => {
    getDataPocketBook()
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', pl: 10, mt: 10, mb: 10 }}>
        <Container maxWidth='xl'>
          <Grid
            sx={{ mt: 5 }}
            container
            justifyContent='space-between'
            alignItems={'center'}>
            <Grid item xs={9}>
              <Typography
                component='span'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Typography sx={judulTextStyle}>
                  Management Buku Saku
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  value={searchText}
                  onChange={(e) => handleChangeSearch(e.target.value)}
                  placeholder='Pencarian'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconButton>
                          <SearchIcon
                            sx={{
                              fontSize: 17,
                              color: 'gray',
                              ml: -1,
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      fontSize: 12,
                      height: 35,
                      backgroundColor: '#fff',
                    },
                  }}
                  sx={searchBorderStyle}
                />
                <Button
                  variant='contained'
                  sx={buttonAddStyle}
                  onClick={() => {
                    setAction('add')
                    setOpenForm(true)
                    onResetState()
                  }}>
                  <AddIcon sx={{ mr: 0.5, fontWeight: 'bold' }} /> Tambah
                </Button>
              </div>
            </Grid>
          </Grid>
          <Box>
            <TableContainer sx={{ mt: 2 }}>
              <Table sx={tableStyle} aria-label='simple table'>
                <TableHead>
                  <TableRow
                    sx={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: '#C4C4C4',
                    }}>
                    <TableCell style={tableLeftStyle} width='10%'>
                      <p
                        align='center'
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          [theme.breakpoints.down('sm')]: {
                            fontSize: 14,
                            padding: '10px',
                          },
                        }}>
                        No.
                      </p>
                    </TableCell>
                    <TableCell
                      style={tableHeadStyle}
                      align='center'
                      width='25%'>
                      Judul
                    </TableCell>
                    <TableCell
                      style={tableHeadStyle}
                      width='25%'
                      align='center'>
                      File
                    </TableCell>
                    <TableCell style={tableHeadStyle} align='center' width='5%'>
                      Urutan
                    </TableCell>
                    <TableCell
                      style={tableHeadStyle}
                      align='center'
                      width='25%'>
                      Deskripsi
                    </TableCell>
                    <TableCell
                      style={tableRightStyle}
                      align='center'
                      width='10%'>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterPocketBook?.length > 0 ? (
                    filterPocketBook?.map((x, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          borderRadius: 3,
                        }}
                        style={{
                          backgroundColor: '#Fff',
                        }}>
                        <TableCell
                          style={{
                            textColor: '#000000 !important',
                          }}
                          component='th'
                          scope='row'
                          align='center'
                          sx={tableLeftIsiStyle}>
                          {i + 1}
                        </TableCell>

                        <TableCell align='left' sx={tableTextIsiStyle}>
                          {x?.title}
                        </TableCell>
                        <TableCell
                          align='left'
                          sx={{
                            fontSize: '16px',
                            border: 'none',
                            fontWeight: 400,
                            color: '#000',
                            backgroundColor: '#fff',
                            py: 2,
                          }}>
                          <a
                            href={StaticVar.URL_API + '/upload/' + x?.file}
                            target='_blank'
                            style={{
                              display: 'flex',
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 5,
                              paddingLeft: 10,
                              paddingRight: 10,
                              borderRadius: 5,
                              color: '#fff',
                              backgroundColor: '#d61a1a',
                            }}>
                            <p>{x?.file?.slice(45, x?.file.length)}</p>
                            <DownloadIcon />
                          </a>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            fontSize: '16px',
                            border: 'none',
                            fontWeight: 400,
                            color: '#000',
                            backgroundColor: '#fff',
                            py: 2,
                          }}>
                          {x?.index}
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            fontSize: '16px',
                            border: 'none',
                            fontWeight: 400,
                            color: '#000',
                            backgroundColor: '#fff',
                            py: 2,
                          }}>
                          {x?.description}
                        </TableCell>
                        <TableCell sx={tableRightStyle} align='center'>
                          <IconButton
                            onClick={() => {
                              onUpdate(x)
                              setFile(x?.file)
                            }}>
                            <EditIcon
                              sx={{
                                color: '#BB7E36',
                              }}
                            />
                          </IconButton>
                          <IconButton onClick={() => onDelete(x)}>
                            <DeleteIcon
                              sx={{
                                color: '#BB7E36',
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        borderRadius: 3,
                      }}
                      style={{
                        backgroundColor: '#Fff',
                      }}>
                      <TableCell
                        colSpan={6}
                        sx={tableRightStyle}
                        align='center'>
                        Data Kosong
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>

      <CustomDialog
        open={openForm}
        handleClose={() => setOpenForm(false)}
        title='Form Buku Saku'
        content={
          <>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent='center'
              alignItems={'center'}>
              <Grid container>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='text'
                  autoFocus
                  margin='dense'
                  id='code'
                  label='Judul'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Stack>

            <Stack
              direction={'row'}
              spacing={2}
              justifyContent='center'
              alignItems={'center'}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl
                    sx={{ width: '100%', mt: 0.8 }}
                    variant='outlined'>
                    <input
                      type='file'
                      ref={uploadedDoc}
                      hidden
                      onChange={(e) =>
                        handleUploadDocBase(
                          e,
                          'pocketbook',
                          JSON.parse(localStorage?.profile)._id,
                        )
                      }
                    />
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Upload File
                    </InputLabel>
                    <OutlinedInput
                      value={file.slice(45, file.length)}
                      onClick={handleInputDoc}
                      autoFocus
                      endAdornment={
                        <InputAdornment position='end'>
                          <DownloadIcon />
                        </InputAdornment>
                      }
                      margin='dense'
                      label='Upload File'
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={indexOrder}
                    onChange={(e) => setIndexOrder(e.target.value)}
                    type='number'
                    autoFocus
                    margin='dense'
                    id='code'
                    label='Urutan'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent='center'
              alignItems={'center'}>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                margin='dense'
                label='Deskripsi'
                placeholder='5+600'
                fullWidth
                variant='outlined'
              />
            </Stack>
          </>
        }
        action={
          <>
            <Button
              onClick={() => setOpenForm(false)}
              variant='outlined'
              sx={{
                width: '25%',
                border: '2px solid gray',
                color: 'gray',
                height: 34,
              }}>
              Batal
            </Button>
            <Button
              onClick={() => handleSubmit(file)}
              variant='contained'
              sx={{ width: '25%' }}
              color='primary'>
              Simpan
            </Button>
          </>
        }
      />

      {opendelete && (
        <Dialog
          onDialog={handleOnDialog}
          // onDialog={() => {
          //     handleOnDialog()
          //     // handleDeleteSubmit(selected)
          // }}
        />
      )}
    </>
  )
}
