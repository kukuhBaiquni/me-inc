import React, { Component } from "react";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import "../style/main.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MAIN_COLOR = "#1890ff";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    collapseSideBar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    testMenu = (evt) => {
        console.log(evt)
    };

    render() {
        const { Header, Sider, Content } = Layout;
        const { collapsed } = this.state;
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
            <Router>
                <Layout>
                    <Sider style={{ backgroundColor: MAIN_COLOR }} breakpoint={"sm"} collapsed={collapsed} className="max-height">
                        <div className="logo-main"></div>
                        <Menu onClick={this.testMenu} defaultSelectedKeys={["1"]} mode="inline" theme="light" > <Menu.Item key="1">
                                <Icon type="dashboard" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="user" />
                                <span>Konsumen</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="line-chart" />
                                <span>Statistik</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ backgroundColor: MAIN_COLOR }}>
                            <Button onClick={this.collapseSideBar} style={{ marginBottom: 16 }} >
                                <Icon type={ collapsed ? "menu-unfold" : "menu-fold" } />
                            </Button>
                            <div className="pq">
                                <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight" >
                                    <Button type="primary">
                                        <Icon type="user" />
                                        Akun
                                    </Button>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content>Content</Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
};
