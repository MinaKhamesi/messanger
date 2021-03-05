import React,{Fragment} from 'react';
import spinner from './spinner.gif';
import useStyles from './Loading.style';

function Loading() {
  const classes = useStyles();
    return (
        <>
           <img src={spinner} alt="loading" className={classes.root}/> 
        </>
    )
}

export default Loading;