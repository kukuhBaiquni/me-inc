import React, { Component } from "react";
import "./Header.scss";
import { Menu, Button, Icon } from "antd";
const { SubMenu } = Menu;
export default class Header extends Component {
    state = {
        current: "mail"
    };

    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };
    render() {
        return (
            <div className="header-main">
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
}
