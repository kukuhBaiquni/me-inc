import React, { Component } from "react";
import "../style/index.css";
import { Link, Route } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import { AnimatedSwitch } from "react-router-transition";

import Customer from "./Customer";
import StatisticPage from "./Statistic";
import Dashboard from "./Dashboard";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "/main"
        };
    }

    componentDidMount() {
        const { location } = this.props;
        this.setState({
            active: location.pathname
        });
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (prevProps.location.pathname !== location.pathname) {
            this.setState({
                active: location.pathname
            });
        }
    }

    render() {
        const { location } = this.props;
        const { active } = this.state;
        return (
            <>
                <div className="fixed-header">
                    <ul className="main-menu">
                        <li>
                            <Button type="primary" icon="user"> Akun </Button>
                        </li>
                        <li>
                            <Button type="primary" icon="setting"> Pengaturan </Button>
                        </li>
                        <li>
                            <Button type="primary" icon="logout"> Logout </Button>
                        </li>
                    </ul>
                </div>
                <div className="o-sider">
                    <Menu
                        defaultSelectedKeys={[location.pathname]}
                        selectedKeys={[active]}
                        onClick={this.testMenu}
                        mode="inline"
                        theme="light"
                    >
                        <Menu.Item key="/main">
                            <Link to="/main">
                                <Icon type="dashboard" />
                                <span>Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/main/customer">
                            <Link to="/main/customer">
                                <Icon type="user" />
                                <span>Konsumen</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/main/statistic">
                            <Link to="/main/statistic">
                                <Icon type="line-chart" />
                                <span>Statistik</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="o-content-wrapper">
                    <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper" >
                        <Route path="/main/statistic" component={StatisticPage} />
                        <Route path="/main/customer" component={Customer} />
                        <Route path="/main" component={Dashboard} />
                    </AnimatedSwitch>
                </div>
            </>
        );
    }
}
