import React, { PureComponent } from "react";
import { Modal, Button, Select, Input, Row, Col, Radio, AutoComplete, Icon } from "antd";

const initialData = {
    firstName: "",
    lastName: "",
    gender: "MALE",
    address: {
        street: "",
        district: "",
        village: "",
        zone: "",
        path: ""
    },
    phone: "",
    group: ""
};

export default class ModalCustomer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            formControl: {
                ...initialData
            },
            errors: []
        }
    };

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        const value = typeof evt === "string" ? evt : evt.target.value;
        if(type === "phone") {
            if(!isNaN(value)) {
                if(parseInt(value, 10) >= 0 && value[0] === "0") {
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
            if(type.includes("a.")) {
                if(type === "a.district") {
                    this.setState({
                       formControl: Object.assign({}, formControl, {
                            address: {
                                ...formControl.address,
                                [type.replace("a.", "")]: value,
                                village: ""
                            }
                        })
                    });
                }else{
                    this.setState({
                        formControl: Object.assign({}, formControl, {
                            address: {
                                ...formControl.address,
                                [type.replace("a.", "")]: value
                            }
                        })
                    });
                }
            }else{
                if(type === "group") {
                    this.setState({
                        formControl: Object.assign({}, formControl, {
                            [type]: evt
                        })
                    });
                }else{
                    this.setState({
                        formControl: Object.assign({}, formControl, {
                            [type]: value
                        })
                    });
                }
            }
        }      
    };

    _getZone = (type) => {
        const { formControl } = this.state;
        const { zone, getZone } = this.props;
        if(zone[type].length === 0 || formControl.address.village === "") {
            if(type === "village") {
                const id = zone.district.filter(x => x.nama_kecamatan === formControl.address.district)[0].kode_kecamatan;
                getZone(type, id);
            }else{
                getZone(type);
            }
        }
    };

    _onSubmit = () => {
        this.props.onSubmit(this.state.formControl);
    };

    _closeModal = () => this.props.closeModal();

    render() {
        const { onSubmit, closeModal, isVisible, loading, zone } = this.props;
        const { errors, formControl } = this.state;
        return (
            <Modal
                visible={isVisible}
                title="NEW CUSTOMER"
                onOk={onSubmit}
                onCancel={closeModal}
                width="45%"
                footer={[
                    <Button key="back" onClick={this._closeModal}>
                        Cancel
                    </Button>,
                    <Button key="save" style={{ backgroundColor: "green", color: "white" }} loading={loading} onClick={onSubmit} >
                        Create
                    </Button>
                ]}
            >
                <Row>
                    <label>First Name</label>
                </Row>
                <Row>
                    <Input value={formControl.firstName} onChange={(x) => this._onChange("firstName", x)} maxLength={20} className="product-qty" />
                </Row>
                <Row>
                    <label>Last Name</label>
                </Row>
                <Row>
                    <Input value={formControl.lastName} onChange={(x) => this._onChange("lastName", x)} maxLength={20} className="product-qty" />
                </Row>
                <Row>
                    <label>Gender</label>
                </Row>
                <Row style={{ margin: "5px 0" }}>
                    <Radio.Group value={formControl.gender} onChange={(x) => this._onChange("gender", x)}>
                        <Radio value="MALE">Male</Radio>
                        <Radio value="FEMALE">Female</Radio>
                    </Radio.Group>
                </Row>
                <Row style={{marginTop: 15}}>
                    <label>Address - Street</label>
                </Row>
                <Row>
                    <Input 
                        placeholder="Jl. Kaki No.121 Rt.02/Rt.08" 
                        value={formControl.address.street}
                        onChange={(x) => this._onChange("a.street", x)}
                        style={{width: "70%"}} 
                        className="product-qty" 
                    />
                </Row>
                <Row>
                    <Col md={10}>
                        <label>Address - District</label>
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <label>Address - Village</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Select 
                            value={formControl.address.district}
                            className="select-product"
                            showSearch
                            onFocus={() => this._getZone("district")}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(x) => this._onChange("a.district", x)}
                            style={{width: "100%", marginBottom: 10}}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                zone.district.length > 0 &&
                                zone.district.map((x, i) => (
                                    <Select.Option key={i} value={x.nama_kecamatan}>{x.nama_kecamatan}</Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <Select 
                            value={formControl.address.village} 
                            className="select-product"
                            showSearch
                            disabled={formControl.address.district === ""}
                            onFocus={() => this._getZone("village")}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(x) => this._onChange("a.village", x)}
                            style={{width: "100%", marginBottom: 10}}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                zone.village.length > 0 &&
                                zone.village.map((x, i) => (
                                    <Select.Option key={i} value={x.nama_kelurahan}>{x.nama_kelurahan}</Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <label>Address - Zone</label>
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <label>Address - Path</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Input 
                            style={{width: "100%"}} 
                            value={formControl.address.zone}
                            onChange={(x) => this._onChange("a.zone", x)}
                            maxLength={20} 
                            className="product-qty" 
                        />   
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <Input 
                            style={{width: "100%"}} 
                            value={formControl.address.path}
                            onChange={(x) => this._onChange("a.path", x)}
                            maxLength={20} 
                            className="product-qty" 
                        />   
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <label>Phone</label>
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <label>Group</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Input 
                            onChange={(x) => this._onChange("phone", x)} 
                            style={{width: "100%"}} 
                            value={formControl.phone} 
                            maxLength={13} 
                            className="product-qty" 
                        />
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <Select  
                            value={formControl.group}
                            className="select-product"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(x) => this._onChange("group", x)}
                            style={{width: "100%", marginBottom: 10}}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                                <Select.Option value="1">Air Gabon</Select.Option>
                                <Select.Option value="2">Air Mesir</Select.Option>
                                <Select.Option value="3">Air Gunung </Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Modal>
        );
    }
};
