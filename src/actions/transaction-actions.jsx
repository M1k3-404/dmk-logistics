import axios from "axios";

const addGeneralTransaction = (transaction, accounts, userId) => {
    const requiredFields = checkRequiredFields(transaction);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        console.log('Error:', requiredFields);
        return requiredFields;
    } else {
        sendData(transaction, accounts, userId);
        return requiredFields;
    }
}

const checkRequiredFields = (transaction) => {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(transaction).forEach(key => {
        const value = transaction[key];
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

const sendData = async (transaction, accounts, userId) => {
    const transactionData = {
        "FromAccountId": getAccountId(accounts, transaction.from),
        "ToAccountId": getAccountId(accounts, transaction.to),
        "Amount": parseFloat(transaction.amount),
        "Date": formatDate(transaction.date),
        "Description": transaction.description
    }
    console.log('Transaction Data:', transactionData);

    try {
        const response = await axios.post(`http://localhost:7174/api/Transaction/AddGeneralTransaction?userId=${userId}`, transactionData);
        console.log('Transaction Data:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        window.location.href = "/accounts";
    }
}

const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const getAccountId = (accounts, accountName) => {
    return accounts.find(account => account.account.accountName === accountName).account.id;
}

export { addGeneralTransaction };