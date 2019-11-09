import React, { Component } from "react";
import "./Dashboard.scss";
import { Icon, Collapse } from "antd";
import { menu } from "../../constant/enums";

const { Panel } = Collapse;

const iconStyle = {
    color: "white",
    fontSize: "50px"
};

const Nodez = ({title}) => <h4>{title}</h4>

export default class Dashboard extends Component {
    render() {
        return (
            <div className="scope-container">
                <div className="menu-wrapper">
                    {menu.map((x, i) => (
                        <div key={i} className="menu-list">
                            <div className="menu-display">
                                <div className="menu-inside">
                                    <Icon type={x.icon} style={iconStyle} />
                                    {x.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="info-app">
                    <h3>Syifa Digital Service | version 1.0.0-beta~</h3>
                    <p>Menu Description</p>
                    <Collapse accordion={true} style={{backgroundColor: "transparent"}} bordered={false}>
                        {
                            menu.map((x, i) => (
                                <Panel showArrow={false} className="panel" key={i} header={<Nodez title={x.title} />}>
                                    <p>{x.description}</p>
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            </div>
        );
    }
}
