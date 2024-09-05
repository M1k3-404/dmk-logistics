import axios from "axios";

// Add Sales Payment
const addSalesPayment = (payment, paymentTypes, salesDetailId, userId) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(payment, paymentTypes, salesDetailId, userId);
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

const sendData = async (payment, paymentTypes, salesDetailId, userId) => {
    const formattedDate = formatDate(payment.date);
    const formattedAccount = getPaymentTypeId(paymentTypes, payment.account);
    const formattedAmount = parseFloat(payment.amount);
    
    const paymentData = {
        "SalesDetailsId":salesDetailId,
        "SalesPaymentTypeId":formattedAccount,
        "Date":formattedDate,
        "SalesAmount":formattedAmount
    }
    console.log('Sales Payment Data:', paymentData);

    try {
        const response = await axios.post(`https://backend.dmk-logistics.lk/api/SalesPayment/AddSalesPayment?userId=${userId}`, paymentData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('Error:', error);
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

// Edit Sales Payment
const editSalesPayment = (payment, paymentTypes, salesDetailId, id, userId) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        updateData(payment, paymentTypes, salesDetailId, id, userId);
        return requiredFields;
    }
}

const updateData = async (payment, paymentTypes, salesDetailId, id, userId) => {
    const formattedDate = formatDate(payment.date);
    const formattedAccount = getPaymentTypeId(paymentTypes, payment.account);
    const formattedAmount = parseFloat(payment.amount);
    
    const paymentData = {
        "id": id,
        "SalesDetailsId":salesDetailId,
        "SalesPaymentTypeId":formattedAccount,
        "Date":formattedDate,
        "SalesAmount":formattedAmount
    }
    console.log('Sales Payment Data:', paymentData);

    try {
        const response = await axios.put(`https://backend.dmk-logistics.lk/api/SalesPayment/UpdateSalesPayment?userId=${userId}`, paymentData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        window.location.reload();
    }
}

// Delete Sales Payment
const deleteSalesPayment = async (id, userId) => {
    try {
        const response = await axios.delete(`https://backend.dmk-logistics.lk/api/SalesPayment/DeleteSalesPayment?userId=${userId}&paymentId=${id}`);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        window.location.reload();
    }
}

export { addSalesPayment, editSalesPayment, deleteSalesPayment };