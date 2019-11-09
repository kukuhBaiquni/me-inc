import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import toastr from "toastr";
import Authorization from "../../Helpers/Authorization";
import Application from "./Application";
import Env from "../../Helpers/env";

/**
 * If we have a logged-in user, display the component, otherwise redirect to login page.
 */

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
        toastr.error("Please login to continue.");
        return <Redirect to={{ pathname: Env.getEnv("REACT_APP_HOMEPAGE") }} />;
      }
    }}
  />
);
export default connect()(PrivateRoute);
