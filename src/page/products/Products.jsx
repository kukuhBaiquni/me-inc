import React, { PureComponent } from "react";
import "./Products.scss";
import { connect } from "react-redux";
import { Row, Button, Input, Radio, Upload, Icon, message, Popconfirm } from "antd";
import * as actionType from "../../constant/actionTypes";
import nanoid from "nanoid";
import { imagePath } from "../../helpers/imagePath";
import { createProductValidation as VALIDATION } from "../../helpers/Validation";

const initialData = {
    productName: "",
    unitType: "kilogram",
    unitSize: "",
    price: "",
    photo: null
};

class Products extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formControl: {
                ...initialData
            },
            fileList: [],
            permissionKey: "",
            errors: []
        };
    };

    componentDidMount() {
        const { products } = this.props;
        if(products.data.length === 0) {
            this._getProducts();
        }
    };
    
    _getProducts = () => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.GET_PRODUCT_REQUEST,
            config: {
                methhod: "get",
                headers: {
                    "Accept": "application/json;utf-8"
                }
            }
        });

    }

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        const { value } = evt.target;
        if(type === "unitSize" || type === "price") {
            if(!isNaN(value)) {
                if(parseInt(value, 10) >= 0 && value[0] !== "0") {
                    this.setState({
                        formControl: Object.assign({}, formControl, {
                            [type]: value
                        })
                    });
                }else{
                    if(value === "") {
                        this.setState({
                            formControl: Object.assign({}, formControl, {
                                [type]: value
                            })
                        });
                    }
                }
            }
        }else{
            this.setState({
                formControl: Object.assign({}, formControl, {
                    [type]: value
                })
            });
        }      
    };

    _uploadPhoto = file => {
        const { formControl, fileList } = this.state;
        this.setState({
            formControl: Object.assign({}, formControl, {
                photo: file.file.originFileObj
            }),
            fileList: [file.file]
        });
    };

    _toFormData = () => {
        const { formControl } = this.state;
        let formData = new FormData();
        for (let i = 0; i < Object.keys(formControl).length; i++) {
            formData.append(
                Object.keys(formControl)[i],
                Object.values(formControl)[i]
            );
        }
        formData.append("productId", nanoid(10));
        return formData;
    };

    _onSubmit = () => {
        const { dispatch } = this.props;
        const { formControl } = this.state;
        this.setState({
            errors: VALIDATION(formControl)
        })
        if(VALIDATION(formControl).length === 0) {
            this.setState({
                formControl: initialData,
                fileList: []
            });
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
        }
    };

    _deleteData = (target) => {
        const { dispatch } = this.props;
        dispatch({
            type: actionType.DELETE_PRODUCT_REQUEST,
            config: {
                method: 'delete',
            },
            params: target.productId
        })
    };

    componentDidUpdate(prevProps) {
        const { products } = this.props;
        if(prevProps.products.success !== products.success) {
            if(products.success) {
                message.success(products.message, 1);
            }
        }
        if(prevProps.products.error !== products.error) {
            if(products.error) {
                message.error(products.message, 1);
            }
        }
    };
    

    render() {
        const { formControl, permissionKey, errors, fileList } = this.state;
        const { products } = this.props;
        return (
            <div className="products-main">
                <div className="list-wrapper">
                    {products.data.length > 0 &&
                        products.data.map((data, i) => (
                            <Renderer 
                                key={i} 
                                data={data}
                                deleteData={this._deleteData}
                            />
                        ))}
                    {products.data.length === 0 && (
                        <div>
                            You don't have any Product now, feel free to create
                            one
                        </div>
                    )}
                </div>
                <div className="new-list-wrapper">
                    <div className="form-wrapper">
                        <h2>New Product</h2>
                        <label>Product Name</label>
                        <Input value={formControl.productName} onChange={x => this._onChange("productName", x)} placeholder="Product Name" allowClear />
                        {errors.map(x => x.type).includes("productName") && <p className="invalid-input">{errors.filter(x => x.type === "productName")[0].message}</p>}
                        <label>Unit Type</label> <br />
                        <Radio.Group value={formControl.unitType} onChange={x => this._onChange("unitType", x)} className="radio" >
                            <Radio value="kilogram">Kg</Radio>
                            <Radio value="gram">Gr</Radio>
                            <Radio value="liter">L</Radio>
                            <Radio value="mililiter">Ml</Radio>
                            <Radio value="piece">Pcs</Radio>
                        </Radio.Group>
                        <label>Unit Size</label> <br />
                        <Input style={{ width: 160 }} value={formControl.unitSize} onChange={x => this._onChange("unitSize", x)} suffix={formControl.unitType} placeholder="Unit Size" />
                        {errors.map(x => x.type).includes("unitSize") && <p className="invalid-input">{errors.filter(x => x.type === "unitSize")[0].message}</p>}
                        <br />
                        <label>Price</label>
                        <Input value={formControl.price} onChange={x => this._onChange("price", x)} placeholder="Price" allowClear />
                        {errors.map(x => x.type).includes("price") && <p className="invalid-input">{errors.filter(x => x.type === "price")[0].message}</p>}
                        <label>Add a Photo</label> <br />
                        <div style={{ height: 10 }} />
                        <Upload
                            accept="image/*"
                            onChange={this._uploadPhoto}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                            fileList={fileList}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                        <div style={{ height: 20 }} />
                        {errors.map(x => x.type).includes("photo") && <p className="invalid-input">{errors.filter(x => x.type === "photo")[0].message}</p>}
                        <label>Administrator Permission Key</label>
                        <Input value={permissionKey} onChange={x => this.setState({ permissionKey: x.target.value }) } allowClear />
                        <Button loading={products.processing} onClick={this._onSubmit} className="button" block type="primary" > Create </Button>
                    </div>
                </div>
            </div>
        );
    }
}

class Renderer extends PureComponent {

    _deleteData = () => this.props.deleteData(this.props.data);

    render() {
        const { data } = this.props;
        return (
            <div className="list-style-wrapper">
                <div className="list-style">
                    <div className="header">{data.productName}</div>
                    <div className="body">
                        <div className="left-side">
                            <div className="image-container">
                                <img src={imagePath + data.photo} alt="galon" />
                            </div>
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
                                        <label>{data.unitType}</label>
                                    </Row>
                                    <Row>
                                        <label>
                                            {data.unitSize}
                                        </label>
                                    </Row>
                                </div>
                            </div>
                            <div className="right-bottom">
                                IDR {data.price.toLocaleString()},-
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <Popconfirm
                            title="Are you sure want to delete this product?"
                            icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
                            onConfirm={this._deleteData}
                            okText="Yes"
                            okType="danger"
                            cancelText="No"
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(Products);