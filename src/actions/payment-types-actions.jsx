const { default: axios } = require("axios")

// Get All Payment Types
const getAllPaymentTypes = () => {
    return getPaymentTypes()
}

const getPaymentTypes = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/PaymentType/GetAllPaymentTypes');
        console.log('Data recieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error recieving data:', error);
    }
}

// Get Every Payment Type
const getEveryPaymentType = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/PaymentType/GetActiveAndInActivePaymentTypes');
        console.log('Data recieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error recieving data:', error);
    }
}

// Add Payment Type
const addPaymentType = (paymentType, setOpenModal) => {
    const requiredFields = checkRequiredFields(paymentType);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(paymentType);
        window.location.reload();
        setOpenModal(false);
        return requiredFields;
    }
}

const checkRequiredFields = (paymentType) => {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(paymentType).forEach(key => {
        const value = paymentType[key];
        if (isEmpty(value)) {
            errorStatus.push({
                key: key,
                error: "This field is required",
                isInvalid: true
            });
        } else {
            errorStatus.push({
                key: key,
                error: "",
                isInvalid: false
            });
        }
    });

    return errorStatus;
}

const sendData = async (paymentType) => {
    const paymentTypeData = {
        "paymentTitle": paymentType.paymentName,
        "initialBalance": paymentType.initialBalance,
        "isOneTimePayment": false
    };

    console.log('Payment Type Data:', paymentTypeData);

    try {
        const response =  await axios.post('http://localhost:7174/api/PaymentType/AddPaymentType?userId=23', paymentTypeData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

// Delete Payment Type
const deletePaymentType = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/PaymentType/DeletePaymentType?userId=23&paymentTypeId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        window.location.reload();
    }
}

export { getAllPaymentTypes, getEveryPaymentType, deletePaymentType, addPaymentType }