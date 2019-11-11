import React, { Component } from "react";
import "./Products.scss";
import { connect } from "react-redux";
import Galon from "../../assets/image/aqua.jpg";
import { Row, Button, Input, Radio, Upload, Icon } from "antd";
import * as actionType from "../../constant/actionTypes";

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formControl: {
                productName: "",
                unitType: "kg",
                unitSize: "19",
                price: "",
                photo: null
            },
            addType: "upload",
            permissionKey: "",
            url: ""
        }
    };

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        const { value } = evt.target;
        this.setState({
            formControl: Object.assign({}, formControl, {
                [type]: value
            })
        });
    };

    _uploadPhoto = file => {
        const { formControl } = this.state;
        this.setState({
            formControl: Object.assign({}, formControl, {
                photo: file.file.originFileObj
            })
        });
    };

    _toFormData = () => {
        const { formControl } = this.state;
        let formData = new FormData();
        for(let i = 0; i < Object.keys(formControl).length; i++) {
            formData.append(Object.keys(formControl)[i], Object.values(formControl)[i])
        }
        return formData;
    };

    _onSubmit = () => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.NEW_PRODUCT_REQUEST,
            config: {
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: this._toFormData()
            }
        });
    };

    render() {
        const { formControl, addType, permissionKey, url } = this.state;
        return (
            <div className="products-main">
                <div className="list-wrapper">
                    {
                        Array(11).fill("tjimenq").map((x, i) => (
                            <div key={i} className="list-style-wrapper">
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
                        <Input value={formControl.productName} onChange={(x) => this._onChange("productName", x)} placeholder="Product Name" allowClear />
                        <label>Unit Type</label> <br/>
                        <Radio.Group value={formControl.unitType} onChange={(x) => this._onChange("unitType", x)} className="radio">
                            <Radio value="kg">kg</Radio>
                            <Radio value="gr">gr</Radio>
                            <Radio value="l">L</Radio>
                            <Radio value="ml">ml</Radio>
                        </Radio.Group>
                        <label>Unit Size</label> <br/>
                        <Input style={{width: 70}} value={formControl.unitSize} onChange={(x) => this._onChange("unitSize", x)} suffix={formControl.unitType} placeholder="Unit Size" /> <br/>
                        <label>Price</label>
                        <Input value={formControl.price} onChange={(x) => this._onChange("price", x)} placeholder="Price" allowClear />
                        <label>Add a Photo</label> <br/>
                        <Radio.Group value={addType} onChange={(x) => this.setState({addType: x.target.value})} className="radio">
                            <Radio value="upload">Upload</Radio>
                            <Radio value="paste">Paste from url</Radio>
                        </Radio.Group>
                        {
                            addType === "upload" &&
                            <>
                                <div style={{height: 10}} />
                                <Upload accept="image/*" onChange={this._uploadPhoto} {...uploadProps}>
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Upload>
                            </>
                        }
                        {
                            addType === "paste" &&
                            <Input placeholder="Paste here" value={url} onChange={(x) => this.setState({url: x.target.value})} allowClear />
                        }
                        <div style={{height: 20}} />
                        <label>Administrator Permission Key</label>
                        <Input value={permissionKey} onChange={(x) => this.setState({permissionKey: x.target.value})} allowClear />
                        <Button onClick={this._onSubmit} className="button" block type="primary">Save</Button>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(state => state)(Products);

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
