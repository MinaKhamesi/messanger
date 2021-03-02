import React from "react";
import axios from "axios";
import {Redirect, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

export default function Dashboard() {
  const history = useHistory();
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const getUser = async () => {
    try {
      const {data} = await axios.get('/users/auth');
      localStorage.setItem("userInfo",JSON.stringify(data.user));
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  

  React.useEffect(() => {
    if(loading){
      getUser();
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo && !loading){
      history.push('/login');
    }else{
      setUser(userInfo);
    }
  }, [history, loading]);

  const logout = async ()=>{
    await axios.get('/users/logout');
    setUser(null);
  }

  return ( !loading && !user ? <Redirect to='/login'>
    </Redirect> : (<>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      {user && <p>User: {user.name}</p>}
      <button
        onClick={() => {
          localStorage.removeItem("userInfo");
          logout();
        }}
      >
        Logout
      </button>
      </>
    )
  );
}
