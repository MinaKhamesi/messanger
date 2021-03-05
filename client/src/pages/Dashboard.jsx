import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {logout} from '../actions/userActions';
import Loading from '../components/Loading/Loading';


export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)
  const {userInfo, loading} = user;

  return (  loading ? <Loading/> : <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      {userInfo && <p>User: {userInfo.name}</p>}
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
      </>
    )
      };

