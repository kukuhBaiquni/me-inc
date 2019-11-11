import React, { PureComponent } from "react";
import { Modal, Button, Select, Input, Row, Col, Radio, AutoComplete, Icon } from "antd";
import { debounce } from "throttle-debounce";

export default class ModalCustomer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            formControl: {
                customerName: "",
                searchBy: "name",
                status: "success",
                paymentType: "cash",
                address: "",
                items: [{

                }]
            }
        }
    };

    componentWillMount() {
        this._debounce = debounce(500, this._debounce);
    };

    _debounce = () => {
        console.log("Galat")
    };

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        this.setState({
            formControl: Object.assign({}, formControl, {
                [type]: evt.target.value
            })
        });
    };

    _closeModal = () => this.props.closeModal();

    _onSearch = query => {
        this._debounce(query);
    };

    _onSelect = (value, opt) => {
        console.log(value, opt)
    };

    render() {
        const { onSubmit, closeModal, isVisible, loading } = this.props;
        const { dataSource, formControl } = this.state;
        return (
            <Modal
                visible={isVisible}
                title="NEW TRANSACTION"
                onOk={onSubmit}
                onCancel={closeModal}
                width="45%"
                footer={[
                    <Button key="back" onClick={this._closeModal}>
                        Cancel
                    </Button>,
                    <Button key="save" style={{ backgroundColor: "green", color: "white" }} loading={loading} onClick={onSubmit} >
                        Save
                    </Button>
                ]}
            >
                <Row>
                    <label>Customer Name</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group onChange={(x) => this._onChange("searchBy", x)} value={formControl.searchBy}>
                        <Radio value="name">Search by Name</Radio>
                        <Radio value="address">Search by Address</Radio>
                    </Radio.Group>
                </Row>
                <Row>
                    <AutoComplete
                        dataSource={dataSource}
                        style={{ width: "100%" }}
                        className="autocomplete-customer"
                        onSelect={this._onSelect}
                        onSearch={this._onSearch}
                    >
                        <Input value={formControl.customerName} onChange={(x) => this._onChange("customerName", x)} prefix={<Icon type="search" />} />
                    </AutoComplete>
                </Row>
                <Row>
                    <label>Status</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group value={formControl.status} onChange={(x) => this._onChange("status", x)}>
                        <Radio value="success">Success</Radio>
                        <Radio value="pending">Pending</Radio>
                        <Radio value="process">Process</Radio>
                    </Radio.Group>
                </Row>
                <Row>
                    <label>Payment Type</label>
                </Row>
                <Row style={{margin: "5px 0"}}>
                    <Radio.Group value={formControl.paymentType} onChange={(x) => this._onChange("paymentType", x)}>
                        <Radio value="cash">Cash</Radio>
                        <Radio value="debt">Debt</Radio>
                    </Radio.Group>
                </Row>
                <Row style={{ margin: "10px 0" }}>
                    <label>Detail items</label>
                </Row>
                <Row className="row-loop">
                    <Col md={1}>
                        <label>1</label>
                    </Col>
                    <Col md={5}>
                        <Row>
                            <label>Product Name</label>
                        </Row>
                        <Row>
                            <Select id="productName" defaultValue="lucy" className="select-product" >
                                <Select.Option value="name">Air Gabon</Select.Option>
                                <Select.Option value="lucy">Air Mesir</Select.Option>
                                <Select.Option value="Yiminghe">Air Gunung </Select.Option>
                            </Select>
                        </Row>
                    </Col>
                    <Col md={1} />
                    <Col md={2}>
                        <Row>
                            <label>Quantity</label>
                        </Row>
                        <Row>
                            <Input defaultValue="" maxLength={2} className="product-qty" />
                        </Row>
                    </Col>
                    <Col md={1} />
                    <Col md={5}>
                        <Row>
                            <label>Price</label>
                        </Row>
                        <Row>
                            <Input disabled defaultValue="" maxLength={2} className="product-qty" />
                        </Row>
                    </Col>
                    <Col md={1} />
                    <Col md={5}>
                        <Row>
                            <label>Subtotal</label>
                        </Row>
                        <Row>
                            <Input disabled defaultValue="" maxLength={2} className="product-qty" />
                        </Row>
                    </Col>
                    <Col md={1} />
                    <Col md={2}>
                        <Row>
                            <label>Action</label>
                        </Row>
                        <Row>
                            <Button style={{ margin: "5px 0" }} type="danger">Delete</Button>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        );
    }
}
