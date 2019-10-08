import React, { Component } from "react";
import {
    Layout,
    Menu,
    Icon,
    Button
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
            active: "/main"
        };
    };

    testMenu = evt => {
        // console.log(evt);
    };

    componentDidMount() {
        const { location } = this.props;
        this.setState({
            active: location.pathname
        });
    };

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (location.pathname !== prevProps.location.pathname) {
            this.setState({
                active: location.pathname
            });
        }
    };

    render() {
        const { Header, Sider, Content } = Layout;
        const { active } = this.state;
        const { location } = this.props;
        return (
            <Layout>
                <Header style={{ backgroundColor: MAIN_COLOR, position: 'fixed', width: '100%' }}>
                    <div className="float-right-group">
                        <Button type="primary" icon="user"> Akun </Button>
                        <Button type="primary" icon="setting"> Pengaturan </Button>
                        <Button type="primary" icon="logout"> Logout </Button>
                    </div>
                </Header>
                <Layout>
                    <Sider style={{ backgroundColor: MAIN_COLOR, position: 'fixed' }} breakpoint={"sm"} className="max-height" >
                        <div className="logo-main"></div>
                        <Menu defaultSelectedKeys={[location.pathname]} selectedKeys={[active]} onClick={this.testMenu} mode="inline" theme="light" >
                            <Menu.Item key="/main">
                                <Link to="/main">
                                    <Icon type="dashboard"/>
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
                    </Sider>
                    <Content>
                        AFK
                        <div className="content-fill">
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