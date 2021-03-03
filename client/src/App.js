import React from "react";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("user"));
  const getUser = async () => {
    try {
      const {data} = await axios.get('/users/auth');
      localStorage.setItem("userInfo",JSON.stringify(data.user));
    } catch (error) {
      const errors = error.response.data.errors || [{msg:'server error'}];
      errors.forEach(err=> console.log(err.msg));
    }
  };
  React.useEffect(() => {
    getUser()
  },[])
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
