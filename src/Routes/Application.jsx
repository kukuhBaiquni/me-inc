import React from "react";
import { Route } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import SideBar from "../Common/SideMenu";
import { NotAuthroized } from "../../components/NotFound";

const Application = ({
  component: Component,
  isLoggedIn,
  auth,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <div className="main-container">
          {auth ? (
            <>
              {isLoggedIn() && (
                <Header isLoggedIn={isLoggedIn} auth={auth} {...props} />
              )}
              {isLoggedIn() && (
                <SideBar isLoggedIn={isLoggedIn} auth={auth} {...props} />
              )}
              <Component isLoggedIn={isLoggedIn} auth={auth} {...props} />
            </>
          ) : (
            <NotAuthroized default />
          )}

        
        </div>
      );
    }}
  />
);

export default Application;
