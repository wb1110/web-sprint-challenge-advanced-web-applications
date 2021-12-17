import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route 
    {...rest} 
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )}/>
)

export default PrivateRoute;

//Task List:
//1. Complete PrivateRoute