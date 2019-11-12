import React, { PureComponent } from "react";
import "./Customer.scss";
import { Table, Button, Select, Col, Row, Input } from "antd";
import moment from "moment";
import ModalDetails from "./ModalDetails";
import ModalCustomer from "./ModalCustomer";
import { debounce } from "throttle-debounce";
import * as actionType from "../../constant/actionTypes";
import { connect } from "react-redux";

class Customer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isModalDetailsVisible: false,
            isModalCreateVisible: false,
            loading: false,
            details: null,
        }
    };

    _closeDetailModal = () => this.setState({isModalDetailsVisible: false});
    _showDetailModal = () => this.setState({isModalDetailsVisible: true});
    _closeTransactionModal = () => this.setState({isModalCreateVisible: false});
    _showTransactionModal = () => this.setState({isModalCreateVisible: true});
    _onSubmit = (data) => {
        console.log(data)
        this.setState({ isModalDetailsVisible: false });
    };

    _getZone = (type, id) => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType[`GET_${type.toUpperCase()}_REQUEST`],
            config: {
                method: "get",
                headers: {
                    "Accept": "application/json;utf-8"
                },
            },
            params: (
                type === "district" 
                ? "" 
                : id
            )
        });
    };

    _setModalData = (evt, data, index) => {
        this.setState({details: data});
        this._showDetailModal();
    };
    
    render() {
        const { isModalDetailsVisible, loading, details, isModalCreateVisible } = this.state;
        const { zone } = this.props;
        return (
            <div className="pos-main">
                <ModalDetails
                    closeModal={this._closeDetailModal}
                    onSubmit={this._onSubmit}
                    isVisible={isModalDetailsVisible}
                    loading={loading}
                    data={details}
                />
                <ModalCustomer
                    closeModal={this._closeTransactionModal}
                    onSubmit={this._onSubmit}
                    isVisible={isModalCreateVisible}
                    loading={loading}
                    getZone={this._getZone}
                    zone={zone}
                />
                <div className="content-wrapper">
                    Customer List
                    <Row className="header-ancestor">
                        <Row className="header-ancestor-title">
                            Search Customer
                        </Row>
                        <Row>
                            <Col className="filter-box" md={24}>
                                <Row className="filter-row">
                                    <Col md={4}>
                                        <Select name="filterType" defaultValue="name" className="select-search-type">
                                            <Select.Option value="name">Name</Select.Option>
                                            <Select.Option value="trx">Address</Select.Option>
                                            <Select.Option value="Amount">Zone Code</Select.Option>
                                            <Select.Option value="address">Phone</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col md={4}>   
                                        <Input allowClear={true} placeholder="Search Customer.." />
                                    </Col>
                                    <Col md={2}>
                                        <Button type="primary">Search</Button>
                                    </Col>
                                </Row>
                                <Row style={{height: "5px"}} />
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <div onClick={this._showTransactionModal} className="new-transaction">
                                +New Customer
                            </div>
                        </Col>
                    </Row>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30', '40', '50'],
                            showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total.toLocaleString()} items`
                        }}
                        onRow={(data, index) => {
                            return {
                                onClick: (evt) => this._setModalData(evt, data, index)
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default connect(state => state)(Customer);

const columns = [
    {
        title: "No",
        dataIndex: "key",
        key: "no"
    },
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName"
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName"
    },
    {
        title: "Join Date",
        dataIndex: "join",
        key: "join"
    },
    {
        title: "Address",
        dataIndex: "address.street",
        key: "address.street"
    },
    {
        title: "Zone Code",
        dataIndex: "address.zoneCode",
        key: "address.zoneCode"
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Group",
        dataIndex: "group",
        key: "group"
    },
];

const data = Array(1120).fill("Q").map((x, i) => {
    return {
        key: i + 1,
        firstName: "Markonah",
        lastName: "Gabon",
        join: "Yesterday",
        address: {
            street: "Jl. Gabon Master Dewa Tjurut Pertjauan No.990 Rt.01/Rw.03",
            zoneCode: "QWEASD"
        },
        phone: "08123456789",
        group: "CB1"
    }
});