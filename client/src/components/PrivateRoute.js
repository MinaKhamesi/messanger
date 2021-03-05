import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({component:Component,...rest}) => {
  const auth = useSelector(state=>state.auth);
  const {authenticated, loading} = auth;
    return (
        <Route {...rest} render={(props)=> !authenticated && !loading ?  <Redirect to='/login'/> : <Component {...props}/>  }/>)
}


export default PrivateRoute;