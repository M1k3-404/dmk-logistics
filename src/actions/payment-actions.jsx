import axios from "axios";

//Add Payment
const addPayment = (payment, paymentTypes, vehicleId, onAddPayment, setIsNewRecord, userId) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(payment, paymentTypes, vehicleId, userId);
        return requiredFields;
    }
}

const checkRequiredFields = (payment) => {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(payment).forEach(key => {
        const value = payment[key];
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

const sendData = async (payment, paymentTypes, vehicleId, userId) => {
    const formattedDate = formatDate(payment.date);
    const formattedAccount = getPaymentTypeId(paymentTypes, payment.account);
    const formattedAmount = parseFloat(payment.amount);
    
    const paymentData = {
        "PurchaseDetailsId":vehicleId,
        "PaymentTypeId":formattedAccount,
        "Date":formattedDate,
        "PaymentOrder":1,
        "PaymentAmount":formattedAmount
    }
    console.log('Payment Data:', paymentData);

    try {
        const response = await axios.post(`http://localhost:7174/api/Payment/AddPayment?userId=${userId}`, paymentData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        window.location.reload();
    }
}

const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const getPaymentTypeId = (paymentTypes, paymentTitle) => {
    const paymentType = paymentTypes.find(type => type.paymentTitle === paymentTitle);
    return paymentType.id;
}

//Edit Payment
const editPayment = (payment, paymentTypes, vehicleId, id, setIsEditable, userId) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        SendEditData(payment, paymentTypes, vehicleId, id, setIsEditable, userId);
        return requiredFields;
    }
}

const SendEditData = async (payment, paymentTypes, vehicleId, id, setIsEditable, userId) => {
    const formattedDate = formatDate(payment.date);
    const formattedAccount = getPaymentTypeId(paymentTypes, payment.account);
    const formattedAmount = parseFloat(payment.amount);
    
    const paymentData = {
        "id": id,
        "PurchaseDetailsId":vehicleId,
        "PaymentTypeId":formattedAccount,
        "Date":formattedDate,
        "PaymentOrder":1,
        "PaymentAmount":formattedAmount
    }
    console.log('Payment Data:', paymentData);

    try {
        const response = await axios.put(`http://localhost:7174/api/Payment/UpdatePayment?userId=${userId}`, paymentData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        setIsEditable(false);
        window.location.reload();
    }
}

// Delete Payment
const deletePayment = async (id, userId) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/Payment/DeletePayment?userId=${userId}&paymentId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        window.location.reload();
    }
}

export { addPayment, editPayment, deletePayment };