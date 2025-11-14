import React, { useState, useEffect } from 'react'
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
  Button,
} from '@material-ui/core'

export default function DialogFull(props) {
  return (
    <>
      {/* modal  */}
      <Dialog
        fullScreen
        //fullWidth={true}
        //maxWidth = {'lg'}
        open={props.open}
        onClose={props.close}
        // sx={{
        //   pt: 0,
        // }}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        // PaperProps={{
        //   style: {
        //     backgroundColor: "#b3b3b3",
        //     boxShadow: "none",
        //   },
        // }}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.content}</DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          <Button
            onClick={props.cancel}
            style={{
              width: 200,
              backgroundColor: '#b3b3b3',
              textTransform: 'none',
              color: '#ffffff',
              marginRight: 15,
            }}>
            <Typography style={{ textTransform: 'none' }}>
              {props.valueCancel === '' ? 'Batal' : props.valueCancel}
            </Typography>
          </Button>
          {props.valueConfirm ? (
            <Button
              onClick={props.confirm}
              style={{
                width: 200,
                backgroundColor: '#F58634',
                textTransform: 'none',
                color: '#ffffff',
              }}>
              <Typography style={{ textTransform: 'none' }}>
                {props.valueConfirm}
              </Typography>
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  )
}
