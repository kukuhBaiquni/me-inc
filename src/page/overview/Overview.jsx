import React, { Component } from 'react';
// import "../../style/menu.css";
import "./Overview.scss";
import { Row, Col, Icon, Dropdown, Menu, Progress, Select } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const statisticLooper = [
    {icon: "shopping-cart", title: "TRANSAKSI", value: "47", useProgress: false},
    {icon: "dollar", title: "PENJUALAN", value: "IDR 250k", useProgress: false},
    {icon: "user", title: "JUMLAH KONSUMEN", value: "347", useProgress: false},
    {icon: "shop", title: "STOCK PRODUK", value: "150 L", useProgress: true},
    {icon: "shopping-cart", title: "PENJUALAN", value: "900", useProgress: false},
]

export default class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graphicCategory: ""
        }
    };

    graphicCategory = () => {

    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    Lihat Detail
                </Menu.Item>
                <Menu.Item>
                    Kemarin
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="view-container">
                OVERVIEW
                <h2>Statistic Overview</h2>
                <Row type="flex" justify="space-between" style={{marginTop: "10px", marginBottom: "10px"}}>
                    {
                        statisticLooper.map((widget, index) => {
                            return(
                                <Col key={index} md={24} lg={4} sm={24} xs={24}>
                                    <Row className="o-widget-box" type="flex" justify="start" align="top">
                                        <Col span={24}>
                                            <Row type="flex">                                            
                                                <Col span={22}>
                                                    <b>{widget.title}</b>
                                                </Col>
                                                <Col span={2}>
                                                    <Dropdown overlay={menu} trigger={["click"]}>
                                                        <Icon type="setting" style={{cursor: "pointer"}} />
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                            <Row type="flex" align="middle" style={{marginTop: "14px"}}>
                                                <Icon type={widget.icon} className="icon-box" />
                                                <span className="o-statistic-value">{widget.value}</span>
                                            </Row>
                                            <Row style={{marginTop: "18px"}}>
                                                { widget.useProgress ? <ProgressBar /> : <Comparison />}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                    }
                </Row>
                <h2>Graphic Overview</h2>
                <Row className="o-widget-box o-full-width" type="flex" align="middle">
                    <Col md={4}>
                        <Row type="flex" align="middle" style={{marginBottom: 10}}>
                            <b>Jenis Data:</b>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.graphicCategory}>
                                    <Select.Option value="jack">Transaksi</Select.Option>
                                    <Select.Option value="lucy">Penjualan</Select.Option>
                                    <Select.Option value="Yiminghe">Jumlah Konsumen</Select.Option>
                                    <Select.Option value="TjimenQ">Stock</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1} />
                    <Col md={4}>
                        <Row type="flex" align="middle" style={{marginBottom: 10}}>
                            <b>Visualisasi Grafik:</b>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.graphicCategory}>
                                    <Select.Option value="jack">Bar</Select.Option>
                                    <Select.Option value="lucy">Line</Select.Option>
                                    <Select.Option value="Yiminghe">Circle</Select.Option>
                                    <Select.Option value="TjimenQ">Radar</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1} />
                    <Col md={4}>
                        <Row type="flex" align="middle" style={{marginBottom: 10}}>
                            <b>Fungsi:</b>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.graphicCategory}>
                                    <Select.Option value="jack">Perbandingan</Select.Option>
                                    <Select.Option value="lucy">Jumlah</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="o-widget-box" style={{marginTop: "10px", paddingTop: "30px", paddingLeft: "0"}}>
                    <h2 style={{marginLeft: 40}}>Grafik Penjualan</h2>
                    <div className="o-graphic-container">
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
                                <Bar name="Bulan Lalu" dataKey="past" fill="#7c0c10" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Row>
            </div>
        )
    }
};

const Comparison = (props) => {
    return(
        <>
            <Row>
                <p>Comparison vs Yesterday</p>
            </Row>
            <Row>
                <Col className="rrc" span={12} style={{marginTop: "5px"}}>
                    <Icon type="arrow-down" style={{color: "red", marginRight: "3px"}} />
                    -22% (Fall)
                </Col>
                <Col className="rrc" span={12} style={{marginTop: "5px"}}>
                    <Icon type="arrow-up" style={{color: "green", marginRight: "3px"}} />
                    +43% (Raise)
                </Col>
            </Row>
        </>
    )
};

const ProgressBar = (props) => {
    return(
        <Col span={24}>
            <p>Remaining</p>
            <Progress percent={45} />
        </Col>
    )
};

let data = [];
Array(31).fill('Gabon').map((x, i) => data.push({name: `Day ${i+1}`, current: Number(`${Math.ceil(Math.random() * 100)}`), past: Number(`${Math.ceil(Math.random() * 100)}`),  amt: 100}));