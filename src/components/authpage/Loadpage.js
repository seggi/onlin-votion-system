
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";


import "../style/loadingpage.css";

const useStyles =  makeStyles((theme) => ({
  background: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));


const LoadPage1 = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

const LoadPage = () => {
  return (
    <>
        <div className="container_loader">
            <div className="container_loader-anim">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
            </div>
        </div>
    </>
  )
}

export default LoadPage