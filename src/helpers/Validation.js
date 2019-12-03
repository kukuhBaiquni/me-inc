export const createProductValidation = ({productName, unitSize, price, photo}) => {
    let errors = [];

    if(productName.length < 4) {
        errors.push({
            type: "productName",
            message: "Product name must be at least 4 characters!"
        });
    }

    if(isNaN(parseInt(unitSize))) {
        errors.push({
            type: "unitSize",
            message: "Value cannot empty!"
        });
    }

    if(isNaN(parseInt(price)) || parseInt(price) < 500) {
        errors.push({
            type: "price",
            message: "Value cannot empty & at least worth for a candy!"
        })
    }

    if(photo === null) {
        errors.push({
            type: "photo",
            message: "Image required!"
        })
    }

    return errors;
};

export const createCustomerValidation = ({firstName, lastName, address, phone, group}) => {
    let errors = [];
    let street = address.street.toLowerCase();

    if(firstName.length < 3) {
        errors.push({
            type: "firstName",
            message: "First name must be at least 3 characters!"
        });
    }

    if(lastName.length < 3) {
        errors.push({
            type: "lastName",
            message: "Last name must be at least 3 characters!"
        });
    }

    if(!(!street.includes("jl") || !street.includes("jalan")) || !street.includes("rt") || !street.includes("rw") || !street.includes("no")) {
        errors.push({
            type: "street",
            message: "Please include 'jalan / 'jl' / 'rt' / 'rw' / 'no' to completing this field"
        })
    }

    if(address.district === "") {
        errors.push({
            type: "district",
            message: "District cannot empty!"
        });
    }

    if(address.village === "") {
        errors.push({
            type: "village",
            message: "Village cannot empty!"
        });
    }

    if(address.zone === "") {
        errors.push({
            type: "zone",
            message: "Zone cannot empty!"
        });
    }

    if(address.path === "") {
        errors.push({
            type: "path",
            message: "Path cannot empty!"
        });
    }

    if(phone.length < 10) {
        errors.push({
            type: "phone",
            message: "Phone number invalid!"
        });
    }

    if(group === "") {
        errors.push({
            type: "group",
            message: "Group required!"
        })
    }

    return errors;
};