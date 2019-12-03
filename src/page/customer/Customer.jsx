import React, { PureComponent } from "react";
import "./Customer.scss";
import { Table, Select, Col, Row, Input, message } from "antd";
import ModalDetails from "./ModalDetails";
import ModalCustomer from "./ModalCustomer";
import { debounce } from "throttle-debounce";
import * as actionType from "../../constant/actionTypes";
import { connect } from "react-redux";
import { customerColumn } from "../../constant/tableColumn";

class Customer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isModalDetailsVisible: false,
            isModalCreateVisible: false,
            loading: false,
            details: null,
            customData: [],
            formControl: {
                searchBy: "name",
                query: ""
            },
            tempData: [],
            isFilterActive: false
        }
        this._searchCustomer = debounce(500, this._searchCustomer);
    };

    componentDidMount() {
        console.log(process.env)
        const { customers } = this.props;
        if(customers.data.length === 0) {
            this._getCustomer();
        }else{
            let data = [];
            customers.data.map((x, i)=> data.push({...x, key: i + 1}));
            this.setState({customData: data});
        }
    };

    _getCustomer = () => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.GET_CUSTOMER_REQUEST,
            config: {
                method: "get",
                headers: {
                    "Accept": "application/json;utf-8"
                }
            }
        });
    };

    _onChangeQuery = (evt) => {
        const { formControl } = this.state;
        const value = typeof evt === "string" ? evt : evt.target.value;
        const type = typeof evt === "string" ? "searchBy" : "query";
        this.setState({
            formControl: Object.assign({}, formControl, {
                [type]: value.toLowerCase()
            })
        });
        this._searchCustomer();
    };

    _searchCustomer = () => {
        const { searchBy, query } = this.state.formControl;
        const { customData } = this.state;
        this.setState({isFilterActive: true});
        let result = [];
        switch (searchBy) {
            case "name":
            result = customData.filter(x => `${x.firstName.toLowerCase()} ${x.lastName.toLowerCase()}`.includes(query));
            this.setState({tempData: result});
            break;

            case "address.street" :
            result = customData.filter(x => x.address.street.toLowerCase().includes(query));
            this.setState({tempData: result});
            break;

            case "phone":
            result = customData.filter(x => x.phone.includes(query));
            this.setState({tempData: result});
            break;

            default:
            this.setState({
                tempData: []
            });
        }
    };

    _turnOffFilter = () => {
        const { formControl } = this.state;
        this.setState({
            isFilterActive: false,
            formControl: Object.assign({}, formControl, {
                query: ""
            })
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
        const { isModalDetailsVisible, loading, details, isModalCreateVisible, customData, formControl, tempData, isFilterActive } = this.state;
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
                                        <Select onChange={this._onChangeQuery} name="searchBy" value={formControl.searchBy} className="select-search-type">
                                            <Select.Option value="name">Name</Select.Option>
                                            <Select.Option value="address.street">Address</Select.Option>
                                            <Select.Option value="phone">Phone</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col md={7}>
                                        <Input onChange={this._onChangeQuery} value={formControl.query} allowClear={true} placeholder="Search Customer.." />
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
                        columns={customerColumn(formControl.searchBy, formControl.query, isFilterActive)}
                        dataSource={isFilterActive ? tempData : customData}
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
