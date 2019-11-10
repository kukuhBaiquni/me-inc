import React, { PureComponent } from "react";
import "./Pos.scss";
import { Table, Divider, Tag, Button, Select, Col, Row, Input, Modal, InputNumber } from "antd";
import nanoid from "nanoid";
import moment from "moment";

export default class Pos extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            loading: false,
            details: null
        }
    };

    _closeModal = () => this.setState({isModalVisible: false});
    _showModal = () => this.setState({isModalVisible: true});
    _handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, isModalVisible: false });
        }, 3000);
    };

    _tjimenQ = (evt, data, index) => {
        this.setState({details: data});
        this._showModal();
    };
    
    render() {
        const { isModalVisible, loading, details } = this.state;
        return (
            <div className="pos-main">
                <ModalDetail 
                    closeModal={this._closeModal}
                    showModal={this._showModal}
                    onSubmit={this._handleOk}
                    isModalVisible={isModalVisible}
                    loading={loading}
                    data={details}
                />
                <div className="content-wrapper">
                    Transaction List
                    <div className="filter-box">
                        <Col md={24}>
                            <Row type="flex" align="middle" style={{marginBottom: 10}}>
                                Filter by
                            </Row>
                            <Row>
                                <Col md={24}>
                                    <Select defaultValue="lucy" style={{ width: '100%', marginBottom: "10px" }}>
                                        <Select.Option value="name">Name</Select.Option>
                                        <Select.Option value="lucy">TRX</Select.Option>
                                        <Select.Option value="Yiminghe">Sales</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24}>   
                                    <Input style={{marginBottom: "15px"}} placeholder="Search Transaction.." />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Button type="primary">Search</Button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        onRow={(data, index) => {
                            return {
                                onClick: (evt) => this._tjimenQ(evt, data, index)
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
};

class ModalDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false
        };
    };

    componentDidUpdate(prevProps) {
        if(prevProps.isModalVisible !== this.props.isModalVisible) {
            if(this.state.isEditing) {
                this.setState({isEditing: false});
            }
        }
    };

    _editData = () => this.setState({isEditing: true});
    _cancelEdit = () => this.setState({isEditing: false});

    render() {
        const { onSubmit, closeModal, data, isModalVisible, loading } = this.props;
        const { isEditing } = this.state;
        if(isEditing) {
            return(
                <Modal
                    visible={isModalVisible}
                    title="EDIT TRANSACTION"
                    onOk={onSubmit}
                    onCancel={closeModal}
                    width="40%"
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
                            <label>TRX</label>
                            <Input id="trx" defaultValue={data.trx} disabled />
                            <label>Name</label>
                            <Input id="name" defaultValue={data.name} disabled />
                            <label>Detail items</label>
                            {
                                dataTable.map((x, i) => (
                                    <Row className="row-loop">
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
                                        <Col md={5}>
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
                    visible={isModalVisible}
                    title="TRANSACTION DETAILS"
                    onOk={onSubmit}
                    onCancel={closeModal}
                    width="40%"
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
                            <label>Name</label>
                            <p>{data.name}</p>
                            <label>Detail items</label>
                            <Table
                                bordered={true}
                                columns={columnTable}
                                dataSource={dataTable}
                                pagination={false}
                            />
                            <label>Total</label>
                            <p>{data.amount}</p>
                        </>
                    }
                </Modal>
            )
        }
    }
}

const columns = [
    {
        title: "No",
        dataIndex: "key",
        key: "no"
    },
    {
        title: "TRX",
        dataIndex: "trx",
        key: "trx"
    },
    {
        title: "Customer Name",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address"
    },
    // {
    //     title: "List Product",
    //     key: "tags",
    //     dataIndex: "tags",
    //     render: tags => (
    //         <span>
    //             <ul>
    //                 {tags.map((tag, i) => {
    //                     let color = tag.length > 5 ? "geekblue" : "green";
    //                     if (tag === "loser") {
    //                         color = "volcano";
    //                     }
    //                     return (
    //                         <li key={i}>{tag.toUpperCase()}</li>
    //                         // <Tag color={color} key={tag}>
    //                         // {tag.toUpperCase()}
    //                         // </Tag>
    //                     );
    //                 })}
    //             </ul>
    //         </span>
    //     )
    // },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => status ? <p style={{color: "green"}}>Success</p> : <p style={{color: "yellow"}}>Pending</p>
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
    },
    {
        title: "Time",
        dataIndex: "time",
        key: "time"
    }
];

const data = Array(425)
    .fill("tjurut")
    .map((x, i) => {
        return {
            key: i + 1,
            name: "TjimenQ",
            amount: Math.ceil(Math.random() * 76),
            address: "Jl. kaki",
            items: ["SempaQ", "KutanQ"],
            trx: nanoid(10),
            time: moment().format("DD MMM YYYY - HH:mm"),
            status: Math.random() * 100 >= 50 ? true : false
        };
    });

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
