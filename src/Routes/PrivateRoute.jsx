import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorization from "../helpers/Authorization";
import Application from "./Application";

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (Authorization.isLoggedIn()) {
        Authorization.setAuthUser();
        return (
          <Application
            {...props}
            isLoggedIn={Authorization.isLoggedIn}
            auth={Authorization}
            component={Component}
            path={path}
          />
        );
      } else {
        sessionStorage.setItem("proute", JSON.stringify(props.location));
        return <Redirect to={{ pathname: "/" }} />;
      }
    }}
  />
);
export default PrivateRoute;
