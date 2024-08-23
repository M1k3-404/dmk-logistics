import axios from "axios";

// Add Sales Payment
const addSalesPayment = (payment, paymentTypes, salesDetailId, setIsNewRecord) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(payment, paymentTypes, salesDetailId, setIsNewRecord);
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

const sendData = async (payment, paymentTypes, salesDetailId) => {
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
        const response = await axios.post('http://localhost:7174/api/SalesPayment/AddSalesPayment?userId=23', paymentData);
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
const editSalesPayment = (payment, paymentTypes, salesDetailId, id, setIsEditable) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        updateData(payment, paymentTypes, salesDetailId, id, setIsEditable);
        return requiredFields;
    }
}

const updateData = async (payment, paymentTypes, salesDetailId, id, setIsEditable) => {
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
        const response = await axios.put(`http://localhost:7174/api/SalesPayment/UpdateSalesPayment?userId=23`, paymentData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        window.location.reload();
    }
}

// Delete Sales Payment
const deleteSalesPayment = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/SalesPayment/DeleteSalesPayment?userId=23&paymentId=${id}`);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        window.location.reload();
    }
}

export { addSalesPayment, editSalesPayment, deleteSalesPayment };