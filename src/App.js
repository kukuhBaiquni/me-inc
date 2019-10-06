import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./screens";
import Login from "./screens/Login";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/main" component={Main} />
                </Switch>
            </Router>
        );
    }
}
export default App;
