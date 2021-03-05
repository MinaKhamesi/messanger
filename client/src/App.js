import React, {useEffect} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './components/PrivateRoute';

import {useDispatch} from 'react-redux';
import { loadUser } from './actions/userActions';

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch]);
  
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
