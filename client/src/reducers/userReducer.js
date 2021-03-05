import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants';


export const userReducer = (state={userInfo:null, loading:false}, action) => {
  const {type, payload} = action;
  switch(type){
    case USER_DETAILS_REQUEST:
      return {...state, loading:true}
    case USER_DETAILS_SUCCESS:
      return {...state, loading:false, userInfo:payload}
    case USER_DETAILS_FAIL:
      return {...state, loading:false, userInfo:null}
    default:
      return state
  }
}

export const authReducer = (state={loading:false, authenticated:true}, action) => {
  const {type} = action;
  switch(type){
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {...state,loading:true}
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {...state, loading:false, authenticated:true}
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {...state, loading:false, authenticated:false}
    default:
      return state
  }
}