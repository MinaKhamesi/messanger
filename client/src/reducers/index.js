import {combineReducers} from 'redux';
import {userReducer, authReducer} from './userReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  user:userReducer,
  auth:authReducer,
  alert: alertReducer,
});

export default rootReducer;