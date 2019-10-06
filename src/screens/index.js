import React, { Component } from "react";
import {
    Layout,
    Menu,
    Icon,
    Button,
    Dropdown
} from "antd";
import "../style/main.css";
import { Route, Link } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import Customer from "./Customer";
import StatisticPage from "./Statistic";
import Dashboard from "./Dashboard";

const MAIN_COLOR = "#1890ff";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            active: 0
        };
    };

    componentDidMount() {
        console.log('mounted')
    }

    collapseSideBar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    testMenu = evt => {
        // console.log(evt);
    };

    render() {
        const { Header, Sider, Content } = Layout;
        const { collapsed } = this.state;
        console.log('re re re')
        const menu = (
            <Menu onClick={this.testMenu}>
                <Menu.Item key="1">
                    <Icon type="setting" />
                    Pengaturan
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    Profil
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <Icon type="logout" />
                    Logout
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Sider
                    style={{ backgroundColor: MAIN_COLOR }}
                    breakpoint={"sm"}
                    collapsed={collapsed}
                    className="max-height"
                >
                    <div className="logo-main"></div>
                    <Menu defaultSelectedKeys={["1"]} onClick={this.testMenu} mode="inline" theme="light" >
                        <Menu.Item key="1">
                            <Link to="/main">
                                <Icon type="dashboard"/>
                                <span>Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/main/customer">
                                <Icon type="user" />
                                <span>Konsumen</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/main/statistic">
                                <Icon type="line-chart" />
                                <span>Statistik</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: MAIN_COLOR }}>
                        <Button onClick={this.collapseSideBar} style={{ marginBottom: 16 }} >
                            <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
                        </Button>
                        <div className="pq">
                            <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight" >
                                <Button type="primary" icon="user">
                                    Akun
                                </Button>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <div className="main-wrap">
                            <AnimatedSwitch
                                atEnter={{ opacity: 0 }}
                                atLeave={{ opacity: 0 }}
                                atActive={{ opacity: 1 }}
                                className="switch-wrapper"
                            >
                                <Route path="/main/statistic" component={StatisticPage} />
                                <Route path="/main/customer" component={Customer} />
                                <Route path="/main" component={Dashboard} />
                            </AnimatedSwitch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
};
