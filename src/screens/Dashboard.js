import React, { Component } from 'react';
import "../style/menu.css";
import { Row, Col, Icon, Dropdown, Typography, Menu } from 'antd';

const statisticLooper = [
    {icon: "shopping-cart", title: "TRANSAKSI", value: "47"},
    {icon: "dollar", title: "PENJUALAN", value: "IDR 250k"},
    {icon: "user", title: "JUMLAH KONSUMEN", value: "347"},
    {icon: "shop", title: "STOCK PRODUK", value: "150 L"},
    {icon: "shopping-cart", title: "PENJUALAN", value: "900"},
]

export default class Dashboard extends Component {
    render() {
        const { Title, Text } = Typography;
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
                <Title level={3}>Statistic Overview</Title>
                <Row type="flex" justify="space-between" style={{marginTop: "10px"}}>
                    {
                        statisticLooper.map((widget, index) => {
                            return(
                                <Col key={index} md={4}>
                                    <Row className="o-widget-box mv-bg" type="flex" justify="start" align="top">
                                        <Col span={24}>
                                            <Row type="flex">                                            
                                                <Col span={22}>
                                                    <Text>{widget.title}</Text>
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
            </div>
        )
    }
};
