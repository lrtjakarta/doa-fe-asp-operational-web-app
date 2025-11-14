import React, { useState , useEffect } from "react";
import {
  Grid, 
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
  Button,
} from "@material-ui/core";

export default function DialogModal(props) {

  return (
    <>
      {/* modal  */}
      <Dialog
        fullWidth={props.fullWidth}
        maxWidth = {props.maxWidth}
        fullScreen={props.fullScreen}
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
              {props.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancel}>
            <Typography style={{textTransform:'none'}}>{props.valueCancel === ""? "Batal" : props.valueCancel}</Typography>
          </Button>
          {
            props.submit ? 
            <Button onClick={props.confirm} variant="contained" style={{backgroundColor:`${props.colorButtonConfirm}`}}>
              <Typography style={{textTransform:'none',color:'#ffffff'}}>{props.valueConfirm}</Typography>
            </Button> : props.submit == false ? null : 
            <Button onClick={props.confirm} variant="contained" style={{backgroundColor:`${props.colorButtonConfirm}`}}>
              <Typography style={{textTransform:'none',color:'#ffffff'}}>{props.valueConfirm}</Typography>
            </Button>
          }
          
        </DialogActions>
      </Dialog>
    </>
  );
}
