import React, { Component } from "react";
import "./Header.scss";
import { Menu, Button, Icon, Drawer } from "antd";
import { menu } from "../../constant/enums";
import { Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDrawerVisible: false
        }
    };

    _showDrawer = () => this.setState({isDrawerVisible: true});
    _closeDrawer = () => this.setState({isDrawerVisible: false});

    render() {
        const { isDrawerVisible } = this.state;
        return (
            <div className="header-main">
                <Drawer
                    title="Menu List"
                    placement="left"
                    closable={false}
                    onClose={this._closeDrawer}
                    visible={isDrawerVisible}
                >
                    {
                        menu.map((x, i) => (
                            <Link to={x.path} key={i}>
                                <div className="menu-list">
                                    {x.title}
                                </div>
                            </Link>
                        ))
                    }       
                </Drawer>
                <div className="left-menu">
                    <Icon onClick={this._showDrawer} type="menu" style={{color: "white", fontSize: "24px"}} />
                </div>
                <div className="user-info">
                    <div className="prop">
                        Username <br/>
                        Access Level
                    </div>
                    <div style={{width: "10px"}} />
                    <div className="val">
                        Me - Inc <br/>
                        Owner
                    </div>
                </div>
                <div className="separator" />
                <div className="right-menu">
                    <Button type="primary" className="logout-button">
                        Logout
                    </Button>
                </div>
            </div>
        );
    }
};
