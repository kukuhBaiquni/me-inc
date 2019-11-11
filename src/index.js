import React from "react";
import ReactDOM from "react-dom";
import "./assets/global.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { ROUTE } from "./config";

import { NotFound } from "./components/NotFound";

const setRoutes = () => {
    const route = ROUTE;
    return route.map((route, index) => {
        if (route.private === true) {
            return (
                <PrivateRoute
                    private={route.private}
                    key={index}
                    path={route.path}
                    meta={route.meta}
                    exact={route.exact}
                    component={route.component}
                    sideBar={route.sideBar}
                    sideBarMenu={route.sideBarMenu}
                />
            );
        } else {
            return (
                <PublicRoute
                    key={index}
                    path={route.path}
                    meta={route.meta}
                    exact={route.exact}
                    section={route.component}
                    component={route.component}
                />
            );
        }
    });
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={"/"}>
            <Switch>
                {setRoutes()}
                <PublicRoute exact={true} path="/" component={PublicRoute} />
                <NotFound default />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
