const { default: axios } = require("axios");

const addQuotationPayment = (payment, paymentTypes) => {
    const requiredFields = checkRequiredFields(payment);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(payment, paymentTypes);
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

const sendData = async (payment, paymentTypes) => {
    const paymentData = {
        "QuotationId": payment.quotationId,
        "PaymentTypeId": getPaymentTypeId(paymentTypes, payment.paymentTypeId),
        "DateOfPayment": formatDate(payment.date),
        "PaymentAmount": parseFloat(payment.paymentAmount)
    }
    console.log('Payment Data:', paymentData);

    try {
        const response = await axios.post('http://localhost:7174/api/Quotation/CreateQuotationPayment', paymentData);
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

// Delete Quotation Payment
const deleteQuotationPayment = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/Quotation/DeleteQuotationPayment?quotationPaymentId=${id}`);
        console.log('Data deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

export { addQuotationPayment, deleteQuotationPayment };