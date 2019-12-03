import React, { PureComponent } from "react";
import { Modal, Button, Select, Input, Row, Col, Radio, Switch, Icon } from "antd";
import { createCustomerValidation as VALIDATION } from "../../helpers/Validation";

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
            errors: [],
            closeModalWhenSuccess: true,
            clearForm: true
        }
    };

    _onChange = (type, evt) => {
        const { formControl } = this.state;
        const value = typeof evt === "string" ? evt : evt.target.value;
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
            this.setState({
                formControl: Object.assign({}, formControl, {
                    [type]: value
                })
            });
        }
    };

    _phoneChange = (evt) => {
        const { value } = evt.target;
        const { formControl } = this.state;
        if(!isNaN(value)) {
            if(parseInt(value, 10) >= 0 && value[0] === "0") {
                this.setState({
                    formControl: Object.assign({}, formControl, {
                        phone: value
                    })
                });
            }else{
                if(value === "") {
                    this.setState({
                        formControl: Object.assign({}, formControl, {
                            phone: value
                        })
                    });
                }
            }
        }
    };

    _nameChange = (type, evt) => {
        const { value } = evt.target;
        const { formControl } = this.state;
        const rule = /^$|^[a-zA-Z ]+$/;
        if(rule.test(value)) {
            this.setState({
                formControl: Object.assign({}, formControl, {
                    [type]: value
                })
            });
        }
    };

    _zonePathChange = (type, evt) => {
        const { value } = evt.target;
        const { formControl } = this.state;
        const rule = /^$|^[a-zA-Z0-9 ]+$/;
        if(rule.test(value)) {
            this.setState({
                formControl: Object.assign({}, formControl, {
                    address: {
                        ...formControl.address,
                        [type]: value
                    }
                })
            });
        }
    };

    _streetChange = (evt) => {
        const { value } = evt.target;
        const { formControl } = this.state;
        const rule = /^$|^[a-zA-Z0-9. /]+$/;
        if(rule.test(value)) {
            this.setState({
                formControl: Object.assign({}, formControl, {
                    address: {
                        ...formControl.address,
                        street: value
                    }
                })
            });
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

    componentDidUpdate(prevProps) {
        const { trill, isVisible } = this.props;
        const { closeModalWhenSuccess, clearForm } = this.state
        if(prevProps.trill !== trill) {
            if(prevProps.trill !== 0) {
                if(closeModalWhenSuccess && isVisible) {
                    this._closeModal();
                }
                if(clearForm && isVisible) {
                    this._clearForm();
                }
            }
        }
    }

    _toggleRadio = (type, value) => this.setState({[type]: value});

    _onSubmit = () => {
        const { formControl } = this.state;
        this.setState({
            errors: VALIDATION(formControl)
        });
        if(VALIDATION(formControl).length === 0) {
            this.props.onSubmit(formControl);   
        }
    };

    _closeModal = () => {
        this.setState({errors: []});
        this.props.closeModal();
    }
    _clearForm = () => this.setState({formControl: initialData});

    render() {
        const { closeModal, isVisible, loading, zone } = this.props;
        const { errors, formControl, closeModalWhenSuccess, clearForm } = this.state;
        return (
            <Modal
                visible={isVisible}
                title="NEW CUSTOMER"
                onCancel={closeModal}
                width="45%"
                footer={[
                    <Button key="back" onClick={this._closeModal}>
                        Cancel
                    </Button>,
                    <Button key="save" style={{ backgroundColor: "green", color: "white" }} onClick={this._onSubmit} >
                        Create
                    </Button>
                ]}
            >
                <Row>
                    <label>First Name</label>
                </Row>
                <Row>
                    <Input value={formControl.firstName} onChange={(x) => this._nameChange("firstName", x)} maxLength={20} className="product-qty" />
                    {errors.map(x => x.type).includes("firstName") && <p className="invalid-input">{errors.filter(x => x.type === "firstName")[0].message}</p>}
                </Row>
                <Row>
                    <label>Last Name</label>
                </Row>
                <Row>
                    <Input value={formControl.lastName} onChange={(x) => this._nameChange("lastName", x)} maxLength={20} className="product-qty" />
                    {errors.map(x => x.type).includes("lastName") && <p className="invalid-input">{errors.filter(x => x.type === "lastName")[0].message}</p>}
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
                        onChange={(x) => this._streetChange(x)}
                        style={{width: "70%"}} 
                        className="product-qty" 
                    />
                    {errors.map(x => x.type).includes("street") && <p className="invalid-input">{errors.filter(x => x.type === "street")[0].message}</p>}
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
                        {errors.map(x => x.type).includes("district") && <p className="invalid-input">{errors.filter(x => x.type === "district")[0].message}</p>}
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
                        {errors.map(x => x.type).includes("village") && <p className="invalid-input">{errors.filter(x => x.type === "village")[0].message}</p>}
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
                            onChange={(x) => this._zonePathChange("zone", x)}
                            className="product-qty" 
                            maxLength={10}
                        />   
                        {errors.map(x => x.type).includes("zone") && <p className="invalid-input">{errors.filter(x => x.type === "zone")[0].message}</p>}
                    </Col>
                    <Col md={1} />
                    <Col md={10}>
                        <Input 
                            style={{width: "100%"}} 
                            value={formControl.address.path}
                            onChange={(x) => this._zonePathChange("path", x)}
                            className="product-qty"
                            maxLength={10}
                        />
                        {errors.map(x => x.type).includes("path") && <p className="invalid-input">{errors.filter(x => x.type === "path")[0].message}</p>}
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
                            onChange={(x) => this._phoneChange(x)} 
                            style={{width: "100%"}} 
                            value={formControl.phone} 
                            maxLength={13} 
                            className="product-qty" 
                        />
                        {errors.map(x => x.type).includes("phone") && <p className="invalid-input">{errors.filter(x => x.type === "phone")[0].message}</p>}
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
                        {errors.map(x => x.type).includes("group") && <p className="invalid-input">{errors.filter(x => x.type === "group")[0].message}</p>}
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <label>Close Form when saving success?</label>
                    </Col>
                    <Col md={10}>
                        <label>Clear Form when saving success?</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            checked={closeModalWhenSuccess}
                            onChange={(x) => this._toggleRadio("closeModalWhenSuccess", x)}
                        />
                    </Col>
                    <Col md={10}>
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            checked={clearForm}
                            onChange={(x) => this._toggleRadio("clearForm", x)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop: 15}}>
                    <Col>
                        <label>Clear Form Manually</label>
                    </Col>
                </Row>
                <Row style={{marginTop: 5}}>
                    <Col>
                        <Button onClick={this._clearForm} type="danger">Clear Form</Button>
                    </Col>
                </Row>
            </Modal>
        );
    }
};
