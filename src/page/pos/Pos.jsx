import React, { Component } from "react";
import "./Pos.scss";
import { Table, Divider, Tag, Button, Select, Col, Row, Input, Modal } from "antd";
import nanoid from "nanoid";

export default class Pos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            loading: false,
            currentTarget: null
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
        this.setState({currentTarget: index});
        this._showModal();
    };

    render() {
        const { isModalVisible, loading, currentTarget } = this.state;
        return (
            <div className="pos-main">
                <ModalDetail 
                    closeModal={this._closeModal}
                    showModal={this._showModal}
                    onSubmit={this._handleOk}
                    isModalVisible={isModalVisible}
                    loading={loading}
                    data={data[currentTarget]}
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

const ModalDetail = (props) => (
    <Modal
        visible={props.isModalVisible}
        title="Title"
        onOk={props.onSubmit}
        onCancel={props.closeModal}
        footer={[
            <Button key="back" onClick={props.closeModal}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={props.loading} onClick={props.onSubmit}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
    </Modal>
)

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
        title: "Sales",
        dataIndex: "age",
        key: "age"
    }
];

const data = Array(425)
    .fill("tjurut")
    .map((x, i) => {
        return {
            key: i + 1,
            name: "TjimenQ",
            age: Math.ceil(Math.random() * 76),
            address: "Jl. kaki",
            tags: ["SempaQ", "KutanQ"],
            trx: nanoid(10)
        };
    });
