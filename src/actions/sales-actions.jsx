const HandleSaveChanges = (saleRecord) => {
    const requiredFields = HandleRequiredFields(saleRecord);
    console.log(requiredFields);

    const hasError = requiredFields.some(field => field.isInvalid);
    console.log(hasError);

    return requiredFields;
}

function HandleRequiredFields(saleRecord) {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(saleRecord).forEach(key => {
        const value = saleRecord[key];
        if (isEmpty(value)) {
            errorStatus.push({
                key: key,
                isInvalid: true,
                error: "This field is required"
            });
        } else {
            errorStatus.push({
                key: key,
                isInvalid: false,
                error: ""
            });
        }
    })

    return errorStatus;
}

export { HandleSaveChanges };