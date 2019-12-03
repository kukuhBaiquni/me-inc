import React, { PureComponent } from "react";
import {
    Modal,
    Button,
    Select,
    Input,
    Row,
    Col,
    Radio,
    AutoComplete,
    Icon
} from "antd";
import { debounce } from "throttle-debounce";

export default class ModalTransaction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            formControl: {
                customerName: "",
                searchBy: "name",
                status: "success",
                paymentType: "cash",
                address: "",
                instance: [
                    {
                        productName: "Select a product",
                        qty: 1,
                        price: 0
                    }
                ]
            },
            searchType: "name"
        };
        this._debounce = debounce(500, this._debounce);
    }

    _debounce = query => {
        const { searchType } = this.state;
        const { customers } = this.props;
        if (query !== "") {
            if (searchType === "name") {
                const data = customers.filter(
                    x =>
                        x.firstName
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        x.lastName.toLowerCase().includes(query.toLowerCase())
                );
                this.setState({
                    dataSource: data.map(
                        x =>
                            `${x.firstName} ${x.lastName} - ${x.address.street} ${x.address.district} ${x.address.village}`
                    )
                });
            }
        } else {
            this.setState({ dataSource: [] });
        }
    };

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        if (type === "customerName") {
            this.setState({
                formControl: Object.assign({}, formControl, {
                    [type]: evt
                })
            });
        } else {
            this.setState({
                formControl: Object.assign({}, formControl, {
                    [type]: evt.target.value
                })
            });
        }
    };

    _closeModal = () => this.props.closeModal();

    _onSearch = query => {
        this._debounce(query);
    };

    _onSelect = value => {
        const { formControl } = this.state;
        const parsed = value.split("-")[0].trim();
        let clone = { ...formControl };
        clone.customerName = parsed;
        this.setState({ formControl: clone });
    };

    _onSubmit = () => {};

    _instanceChange = (type, value) => {
        console.log(type, value);
    };

    render() {
        const { onSubmit, closeModal, isVisible, loading, products } = this.props;
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
                    <Button key="save" style={{ backgroundColor: "green", color: "white" }} loading={loading} onClick={this._onSubmit} >
                        Save
                    </Button>
                ]}
            >
                <Row>
                    <label>Customer Name</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group onChange={x => this.setState({ searchType: x })} value={formControl.searchBy} >
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
                        value={formControl.customerName}
                        onChange={x => this._onChange("customerName", x)}
                    />
                </Row>
                <Row>
                    <label>Address</label>
                </Row>
                <Row>
                    <label>-</label>
                </Row>
                <Row>
                    <label>Status</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group value={formControl.status} onChange={x => this._onChange("status", x)} >
                        <Radio value="success">Success</Radio>
                        <Radio value="pending">Pending</Radio>
                        <Radio value="process">Process</Radio>
                    </Radio.Group>
                </Row>
                <Row>
                    <label>Payment Type</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group value={formControl.paymentType} onChange={x => this._onChange("paymentType", x)} >
                        <Radio value="cash">Cash</Radio>
                        <Radio value="debt">Debt</Radio>
                    </Radio.Group>
                </Row>
                <Row style={{ margin: "10px 0" }}>
                    <label>Detail items</label>
                </Row>
                {
                    formControl.instance.map((value, index) => (
                        <ListItem
                            key={index}
                            products={products}
                            instance={value}
                            onChange={this._instanceChange}
                            />
                    ))
                }
                <Row>
                    <Col md={1}></Col>
                    <Col md={23}>
                        <Button type="primary">+Add new product</Button>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

class ListItem extends PureComponent {

    _onChange = (type, value) => {
        this.props.onChange(type, value);
    };

    render() {
        const { products, instance } = this.props;
        return (
            <Row className="row-loop">
                <Col md={1}>
                    <label>1</label>
                </Col>
                <Col md={5}>
                    <Row>
                        <label>Product Name</label>
                    </Row>
                    <Row>
                        <Select id="productName" onChange={(evt) => this._onChange("productName", evt)} value={instance.productName} className="select-product">
                            {
                                products.map((value, index) => (
                                    <Select.Option key={index} value={value.productName}> {value.productName} </Select.Option>
                                ))
                            }
                        </Select>
                    </Row>
                </Col>
                <Col md={1} />
                <Col md={2}>
                    <Row>
                        <label>Qty</label>
                    </Row>
                    <Row>
                        <Input value={instance.qty} onChange={(evt) => this._onChange("qty", evt)} maxLength={2} className="product-qty" />
                    </Row>
                </Col>
                <Col md={1} />
                <Col md={5}>
                    <Row>
                        <label>Price</label>
                    </Row>
                    <Row>
                        <Input disabled defaultValue={`Rp ${instance.price.toLocaleString()}`} maxLength={2} className="product-qty" />
                    </Row>
                </Col>
                <Col md={1} />
                <Col md={5}>
                    <Row>
                        <label>Subtotal</label>
                    </Row>
                    <Row>
                        <Input disabled defaultValue={`Rp ${( instance.price * instance.qty ).toLocaleString()}`} maxLength={2} className="product-qty" />
                    </Row>
                </Col>
                <Col md={1} />
                <Col md={2}>
                    <Row>
                        <label>Action</label>
                    </Row>
                    <Row>
                        <Button style={{ margin: "5px 0" }} type="danger">
                            Delete
                        </Button>
                    </Row>
                </Col>
            </Row>
        );
    }
};
