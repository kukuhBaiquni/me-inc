import React, { Component } from 'react';
import "../style/menu.css";
import { Row, Col, Icon, Dropdown, Menu } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const statisticLooper = [
    {icon: "shopping-cart", title: "TRANSAKSI", value: "47"},
    {icon: "dollar", title: "PENJUALAN", value: "IDR 250k"},
    {icon: "user", title: "JUMLAH KONSUMEN", value: "347"},
    {icon: "shop", title: "STOCK PRODUK", value: "150 L"},
    {icon: "shopping-cart", title: "PENJUALAN", value: "900"},
]

export default class Dashboard extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    Lihat Detail
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="view-container">
                DASHBOARD
                <h2>Statistic Overview</h2>
                <Row type="flex" justify="space-between" style={{marginTop: "10px", marginBottom: "10px"}}>
                    {
                        statisticLooper.map((widget, index) => {
                            return(
                                <Col key={index} md={4}>
                                    <Row className="o-widget-box" type="flex" justify="start" align="top">
                                        <Col span={24}>
                                            <Row type="flex">                                            
                                                <Col span={22}>
                                                    <span>{widget.title}</span>
                                                </Col>
                                                <Col span={2}>
                                                    <Dropdown overlay={menu} trigger={["click"]}>
                                                        <Icon type="setting" style={{cursor: "pointer"}} />
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                            <Row type="flex" align="middle" style={{marginTop: "14px"}}>
                                                <Icon type={widget.icon} style={{fontSize: "38px", color: "#1890ff"}} />
                                                <span className="o-statistic-value">{widget.value}</span>
                                            </Row>
                                            <Row style={{marginTop: "8px"}}>
                                                <Col span={12} style={{marginTop: "5px"}}>
                                                    <Icon type="arrow-down" style={{color: "red", marginRight: "3px"}} />
                                                    -22% (Fall)
                                                </Col>
                                                <Col span={12} style={{marginTop: "5px"}}>
                                                    <Icon type="arrow-up" style={{color: "green", marginRight: "3px"}} />
                                                    +43% (Raise)
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                    }
                </Row>
                <h2>Graphic Overview</h2>
                <Row className="o-widget-box" style={{marginTop: "10px", paddingTop: "30px", paddingLeft: "0"}}>
                    <div style={{width: "100%", height: 400}}>
                        <ResponsiveContainer>
                            <BarChart
                                data={data}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar name="Hari Ini" dataKey="current" fill="#1890ff" />
                                <Bar name="Bulan Lalu" dataKey="past" fill="#4d2e9b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Row>
            </div>
        )
    }
};

let data = [];
Array(31).fill('Gabon').map((x, i) => data.push({name: `Day ${i+1}`, current: Number(`${Math.ceil(Math.random() * 100)}`), past: Number(`${Math.ceil(Math.random() * 100)}`),  amt: 100}));

