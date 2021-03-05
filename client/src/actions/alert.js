import {SET_ALERT,REMOVE_ALERT} from '../constants/alertConstants';
import { v4 as uuidv4 } from 'uuid';

export const  setAlert = (place, msg,timeout=6000) => dispatch=>{
    const id = uuidv4();
        const newAlert = {id,place,msg}
        dispatch({type:SET_ALERT,payload: newAlert})
        setTimeout(()=>{
            dispatch({type:REMOVE_ALERT,payload:{id,place}})
        },timeout);
}