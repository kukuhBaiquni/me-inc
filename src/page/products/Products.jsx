import React, { Component } from "react";
import "./Products.scss";
import Galon from "../../assets/image/aqua.jpg";
import { Row, Button, Input, Radio, Switch, Upload, Icon } from "antd";

export default class Products extends Component {
    render() {
        return (
            <div className="products-main">
                <div className="list-wrapper">
                    {
                        Array(11).fill("tjimenq").map((x, i) => (
                            <div className="list-style-wrapper">
                                <div className="list-style">
                                    <div className="header">
                                        Galon isi ulang 19 L
                                    </div>
                                    <div className="body">
                                        <div className="left-side">
                                            <img src={Galon} alt="galon"/>
                                        </div>
                                        <div className="right-side">
                                            <div className="right-top">
                                                <div className="right-left">
                                                    <Row>
                                                        <label>Unit Type</label>
                                                    </Row>
                                                    <Row>
                                                        <label>Unit Size</label>
                                                    </Row>
                                                </div>
                                                <div className="right-right">
                                                    <Row>
                                                        <label>Liter</label>
                                                    </Row>
                                                    <Row>
                                                        <label>19 L</label>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="right-bottom">
                                                IDR 19.000,-
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <Button>Edit</Button>
                                        <Button type="danger">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="new-list-wrapper">
                    <div className="form-wrapper">
                        <h2>New Product</h2>
                        <label>Product Name</label>
                        <Input placeholder="Product Name" allowClear />
                        <label>Unit Type</label> <br/>
                        <Radio.Group defaultValue="kg" className="radio">
                            <Radio value="kg">kg</Radio>
                            <Radio value="gr">gr</Radio>
                            <Radio value="l">L</Radio>
                            <Radio value="ml">ml</Radio>
                        </Radio.Group>
                        <label>Unit Size</label>
                        <Input suffix="Kg" placeholder="Unit Size" />
                        <label>Unit Price</label>
                        <Input placeholder="Unit Price" allowClear />
                        <label>Add a Photo</label> <br/>
                        <div style={{height: 10}} />
                        <Upload {...uploadProps}>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                        <div style={{height: 20}} />
                        <label>Administrator Permission Key</label>
                        <Input allowClear />
                        <Button className="button" block type="primary">Save</Button>
                    </div>
                </div>
            </div>
        )
    }
};

const uploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    // defaultFileList: [...fileList],
};

// const fileList = [
//     {
//         uid: '-1',
//         name: 'xxx.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//         uid: '-2',
//         name: 'yyy.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
// ];
