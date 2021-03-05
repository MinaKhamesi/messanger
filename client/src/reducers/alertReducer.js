import {SET_ALERT,REMOVE_ALERT} from '../constants/alertConstants';

const initialState = {
  loginErr:[],
  registerErr:[],
  loadUserErr:[],
  otherErr:[]
}

const alertReducer = (state=initialState,action) => {
    const {type,payload} = action;
    switch (type) {
        case SET_ALERT:
            switch (payload.place) {
            case 'login': 
              return {...state, loginErr:[...state.loginErr,payload]}
            case 'register':
              return {...state, registerErr:[...state.registerErr, payload]}
            case 'loadUser':
              return {...state, loadUserErr:[...state.loadUserErr, payload]}
            default:
              return {...state, otherErr:[...state.otherErr, payload]}
            }
        case REMOVE_ALERT:
          switch (payload.place) {
            case 'login':
              const newLonginErr = state.loginErr.filter(alert=>alert.id!==payload.id) 
              return {...state, loginErr:newLonginErr}
            case 'register':
              const newRegisterErr = state.registerErr.filter(alert=>alert.id!==payload.id) 
              return {...state, registerErr:newRegisterErr}
            case 'loadUser':
              const newLoadUserErr = state.loadUserErr.filter(alert=>alert.id!==payload.id) 
              return {...state, loadUserErr:newLoadUserErr}
            default:
              const newOtherErr = state.otherErr.filter(alert=>alert.id!==payload.id) 
              return {...state, otherErr:newOtherErr}
              }
        default:
            return state
    }
}

export default alertReducer;