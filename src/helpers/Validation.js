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