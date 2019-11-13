import React, { PureComponent } from "react";
import "./Customer.scss";
import { Table, Button, Select, Col, Row, Input, message } from "antd";
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
            customData: []
        }
    };

    componentDidMount() {
        const { customers } = this.props;
        if(customers.data.length === 0) {
            this._getCustomer();
        }
    };

    _getCustomer = () => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.GET_CUSTOMER_REQUEST,
            config: {
                method: "get",
                headers: {
                    "Accepth": "application/json;utf-8"
                }
            }
        });
    };

    _closeDetailModal = () => this.setState({isModalDetailsVisible: false});
    _showDetailModal = () => this.setState({isModalDetailsVisible: true});
    _closeTransactionModal = () => this.setState({isModalCreateVisible: false});
    _showTransactionModal = () => this.setState({isModalCreateVisible: true});

    _onSubmit = (data) => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.NEW_CUSTOMER_REQUEST,
            config: {
                method: "post",
                data
            }
        });
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

    componentDidUpdate(prevProps) {
        const { customers } = this.props;
        if(prevProps.customers.success !== customers.success) {
            if(customers.success) {
                let data = [];
                customers.data.map((x, i)=> data.push({...x, key: i + 1}));
                this.setState({customData: data});
                message.success(customers.message, 1);
            }
        }
        if(prevProps.customers.error !== customers.error) {
            if(customers.error) {
                message.error(customers.message, 1);
            }
        }
    };

    _setModalData = (evt, data, index) => {
        this.setState({details: data});
        this._showDetailModal();
    };
    
    render() {
        const { isModalDetailsVisible, loading, details, isModalCreateVisible, customData } = this.state;
        const { zone, customers } = this.props;
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
                    trill={customers.data.length}
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
                                    <Col md={7}>   
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
                        dataSource={customData}
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
        key: "join",
        render: date => moment(date).format("DD MMM YYYY")
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