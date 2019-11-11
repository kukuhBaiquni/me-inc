import React, { PureComponent } from "react";
import "./Customer.scss";
import { Table, Radio, Button, Select, Col, Row, Input, DatePicker } from "antd";
import nanoid from "nanoid";
import moment from "moment";
import ModalDetails from "./ModalDetails";
import ModalTransaction from "./ModalCustomer";

export default class Customer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isModalDetailsVisible: false,
            isModalTransactionVisible: false,
            loading: false,
            details: null
        }
    };

    _closeDetailModal = () => this.setState({isModalDetailsVisible: false});
    _showDetailModal = () => this.setState({isModalDetailsVisible: true});
    _closeTransactionModal = () => this.setState({isModalTransactionVisible: false});
    _showTransactionModal = () => this.setState({isModalTransactionVisible: true});
    _handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, isModalDetailsVisible: false });
        }, 3000);
    };

    _setModalData = (evt, data, index) => {
        this.setState({details: data});
        this._showDetailModal();
    };
    
    render() {
        const { isModalDetailsVisible, loading, details, filterByTime, filterType, isModalTransactionVisible } = this.state;
        const { RangePicker } = DatePicker;
        return (
            <div className="pos-main">
                <ModalDetails
                    closeModal={this._closeDetailModal}
                    onSubmit={this._handleOk}
                    isVisible={isModalDetailsVisible}
                    loading={loading}
                    data={details}
                />
                <ModalTransaction
                    closeModal={this._closeTransactionModal}
                    onSubmit={this._handleOk}
                    isVisible={isModalTransactionVisible}
                    loading={loading}
                    data={details}
                />
                <div className="content-wrapper">
                    Customer List
                    <Row>
                        <Col className="filter-box" md={24}>
                            <Row type="flex" align="middle" className="filter-header">
                                Search Transaction
                            </Row>
                            <Row className="radio-status">
                                <Col md={24}>   
                                    <Radio.Group defaultValue={0}>
                                        <Radio value={0}>All</Radio>
                                        <Radio value={1}>Success</Radio>
                                        <Radio value={2}>Pending</Radio>
                                        <Radio value={3}>Process</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row style={{height: "15px"}} />
                            <Row type="flex" align="middle" className="select-date-title">
                                Set Period
                            </Row>
                            <Row className="datepicker-container">
                                <Col md={14}>
                                    <RangePicker
                                        showTime={{ format: 'HH:mm' }}
                                        format="DD MMM YYYY"
                                        placeholder={['Start Time', 'End Time']}
                                        // onChange={onChange}
                                        // onOk={onOk}
                                        />
                                </Col>
                            </Row>
                            <Row className="filter-row">
                                <Col md={10}>
                                    <Select name="filterType" defaultValue="name" className="select-search-type">
                                        <Select.Option value="name">Name</Select.Option>
                                        <Select.Option value="trx">TRX</Select.Option>
                                        <Select.Option value="Amount">Amount</Select.Option>
                                        <Select.Option value="address">Address</Select.Option>
                                    </Select>
                                </Col>
                                <Col md={10}>   
                                    <Input allowClear={true} placeholder="Search Transaction.." />
                                </Col>
                                <Col md={2}>
                                    <Button type="primary">Search</Button>
                                </Col>
                            </Row>
                            <Row style={{height: "5px"}} />
                        </Col>
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
                            showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} items`
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

const data = Array(120).fill("Q").map((x, i) => {
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