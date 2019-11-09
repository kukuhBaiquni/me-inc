import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorization from "../helpers/Authorization";
import Application from "./Application";

const PublicRoute = ({ component: Component, path: path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Authorization.isLoggedIn()) {
          Authorization.setAuthUser();
          return <Redirect to={{ pathname: "/dashboard" }} />;
        }

        return (
          <Application
            {...props}
            isLoggedIn={Authorization.isLoggedIn}
            auth={Authorization}
            component={Component}
            path={path}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
