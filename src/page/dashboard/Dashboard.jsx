import React, { Component } from "react";
import "./Dashboard.scss";
import { Icon, Collapse } from "antd";
import { menu } from "../../constant/enums";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const Nodez = ({title}) => <h4>{title}</h4>

export default class Dashboard extends Component {
    render() {
        return (
            <div className="scope-container">
                <div className="menu-wrapper">
                    {menu.map((x, i) => (
                        <div key={i} className="menu-list">
                            <Link to={x.path}>
                                <div className="menu-display">
                                    <div className="menu-inside">
                                        <Icon type={x.icon} className="dashboard-icon" />
                                        <p className="title-transition">{x.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="info-app">
                    <h3>Menu Description</h3>
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
