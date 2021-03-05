import axios from 'axios';
import {setAlert} from './alert';

import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants';

export const login = (email,password, history) => async (dispatch) =>{
  dispatch({type:USER_LOGIN_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        await axios.post('/users/login',{email, password},config);
        dispatch({type:USER_LOGIN_SUCCESS})
        dispatch(loadUser());
        history.push('/dashboard');
    } catch (error) {
      dispatch({type:USER_LOGIN_FAIL})
      const errors = error.response.data.errors;
       if (errors){
           errors.forEach(err=>dispatch(setAlert('login',err.msg)));
         }
    }
}

export const register = (name, email,password, history) => async (dispatch) =>{
  dispatch({type:USER_REGISTER_REQUEST});

  try {
      const config = {
          headers:{
              'Content-Type': 'application/json'
          }
      }
      await axios.post('/users/register',{name, email, password},config);

      dispatch({type:USER_REGISTER_SUCCESS});
      dispatch(setAlert('register','register successful!','success'));
      dispatch(loadUser());
      history.push('/dashboard');
  } catch (error) {
     dispatch({type:USER_REGISTER_FAIL})
     const errors = error.response.data.errors;
      if (errors){
          errors.forEach(err=>dispatch(setAlert('register',err.msg)));
        }
  }
}

export const loadUser = () => async (dispatch) =>{
  dispatch({type:USER_DETAILS_REQUEST});

  try {
      const {data} = await axios.get('/users/auth');
      dispatch({type:USER_DETAILS_SUCCESS, payload:data.user});
      dispatch({type:USER_LOGIN_SUCCESS});
  } catch (error) {
    dispatch({type:USER_DETAILS_FAIL});
    dispatch({type:USER_LOGIN_FAIL});
    const errors = error.response.data.errors;
     if (errors){
         errors.forEach(err=>dispatch(setAlert('loadUser',err.msg)));
       }
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.get('/users/logout');
    dispatch({type:USER_DETAILS_FAIL});
    dispatch({type:USER_LOGIN_FAIL});
  } catch (error) {
    setAlert('other',error.msg)
  }
};