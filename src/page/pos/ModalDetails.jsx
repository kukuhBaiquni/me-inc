import React, { PureComponent } from "react";
import { Modal, Button, Select, Input, Row, Col, Table, Radio } from "antd";

export default class ModalDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false
        };
    };

    componentDidUpdate(prevProps) {
        if(prevProps.isVisible !== this.props.isVisible) {
            if(this.state.isEditing) {
                this.setState({isEditing: false});
            }
        }
    };

    _editData = () => this.setState({isEditing: true});
    _cancelEdit = () => this.setState({isEditing: false});

    render() {
        const { onSubmit, closeModal, data, isVisible, loading } = this.props;
        const { isEditing } = this.state;
        if(isEditing) {
            return(
                <Modal
                    visible={isVisible}
                    title="EDIT TRANSACTION"
                    onOk={onSubmit}
                    onCancel={closeModal}
                    width="45%"
                    footer={[
                        <Button key="back" onClick={this._cancelEdit}>
                            Cancel
                        </Button>,
                        <Button key="save" style={{backgroundColor: "green", color: "white"}} loading={loading} onClick={onSubmit}>
                            Save
                        </Button>
                    ]}
                    >
                    {
                        data &&
                        <>
                            <Row>
                                <label>TRX</label>
                            </Row>
                            <Row>
                                <Input id="trx" defaultValue={data.trx} disabled />
                            </Row>
                            <Row>
                                <label>Customer Name</label>
                            </Row>
                            <Row>
                                <Input id="name" defaultValue={data.name} disabled />
                            </Row>
                            <Row>
                                <label>Customer Address</label>
                            </Row>
                            <Row>
                                <Input id="address" defaultValue={data.address} disabled />
                            </Row>
                            <Row>
                                <label>Status</label>
                            </Row>
                            <Row style={{margin: "5px 0"}}>
                                <Radio.Group defaultValue={1}>
                                    <Radio value={1}>Success</Radio>
                                    <Radio value={2}>Pending</Radio>
                                    <Radio value={3}>Process</Radio>
                                </Radio.Group>
                            </Row>
                            <Row>
                                <label>Payment Type</label>
                            </Row>
                            <Row style={{margin: "5px 0"}}>
                                <Radio.Group defaultValue={1}>
                                    <Radio value={1}>Cash</Radio>
                                    <Radio value={2}>Debt</Radio>
                                </Radio.Group>
                            </Row>
                            <Row style={{margin: "10px 0"}}>
                                <label>Detail items</label>
                            </Row>
                            {
                                dataTable.map((x, i) => (
                                    <Row key={i} className="row-loop">
                                        <Col md={1}>
                                            <label>{i + 1}</label>
                                        </Col>
                                        <Col md={5}>
                                            <Row>
                                                <label>Product Name</label>
                                            </Row>
                                            <Row>
                                                <Select id="productName" defaultValue="lucy" className="select-product">
                                                    <Select.Option value="name">Air Gabon</Select.Option>
                                                    <Select.Option value="lucy">Air Mesir</Select.Option>
                                                    <Select.Option value="Yiminghe">Air Gunung</Select.Option>
                                                </Select>
                                            </Row>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={2}>
                                            <Row>
                                                <label>Quantity</label>
                                            </Row>
                                            <Row>
                                                <Input defaultValue={x.qty} maxLength={2} className="product-qty" />
                                            </Row>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={5}>
                                            <Row>
                                                <label>Price</label>
                                            </Row>
                                            <Row>
                                                <Input disabled defaultValue={x.price} maxLength={2} className="product-qty" />
                                            </Row>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={5}>
                                            <Row>
                                                <label>Subtotal</label>
                                            </Row>
                                            <Row>
                                                <Input disabled defaultValue={x.subtotal} maxLength={2} className="product-qty" />
                                            </Row>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={2}>
                                            <Row>
                                                <label>Action</label>
                                            </Row>
                                            <Row>
                                                <Button style={{margin: "5px 0"}} type="danger">Delete</Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </>
                    }
                </Modal>
            )
        }else{
            return(
                <Modal
                    visible={isVisible}
                    title="TRANSACTION DETAILS"
                    onOk={onSubmit}
                    onCancel={closeModal}
                    width="45%"
                    footer={[
                        <Button key="back" onClick={this._editData}>
                            Edit
                        </Button>,
                        <Button key="submit" type="danger" loading={loading} onClick={onSubmit}>
                            Delete
                        </Button>,
                    ]}
                    >
                    {
                        data &&
                        <>
                            <label>TRX</label>
                            <p>{data.trx}</p>
                            <label>Customer Name</label>
                            <p>{data.name}</p>
                            <label>Customer Address</label>
                            <p>{data.address}</p>
                            <label>Transaction Status</label>
                            <p style={data.status ? {color: "green"} : {color: "orange"}}>{data.status ? "Success" : "Pending"}</p>
                            <label>Detail items</label>
                            <Table
                                bordered={true}
                                columns={columnTable}
                                dataSource={dataTable}
                                pagination={false}
                            />
                            <Row>
                                <Col md={2}>
                                    <label>Total</label>
                                </Col>
                                <Col>
                                    <p>{data.amount}</p>
                                </Col>
                            </Row>
                        </>
                    }
                </Modal>
            )
        }
    }
};

 const columnTable = [
        {
            title: "No",
            dataIndex: "key",
            key: "key"
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Quantity",
            dataIndex: "qty",
            key: "qty"
        },
        {
            title: "Subtotal",
            dataIndex: "subtotal",
            key: "subtotal"
        }
    ];

    const dataTable = Array(4).fill("TjimenQ").map((x ,i) => {
        return {
            key: i + 1,
            name: "Product isi ulang air" + (i + 1),
            qty: Math.ceil(Math.random() * 5),
            subtotal: "Rp. 25.000,-",
            price: "Rp. 5000,-"
        }
    })