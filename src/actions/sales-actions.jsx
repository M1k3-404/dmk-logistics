import { formatDate, isEmpty } from "@/lib/utils";
import axios from "axios";

const AddSale = async (vehicle, saleRecord, setOpenModal, reload) => {
    const errors = ValidateFields(vehicle, saleRecord);

    if (Object.keys(errors).length > 0) {
        console.log('Errors:', errors);
        return errors;
    } else {
        await sendData(saleRecord, reload, setOpenModal);
        return [];
    }
}

const ValidateFields = (vehicle, saleRecord) => {
    const errors = {};

    const requiredFields = ['date', 'buyerName', 'sellingPrice'];
    requiredFields.forEach(field => {
        if (isEmpty(saleRecord[field])) {
            errors[field] = 'This field is required';
        }
    })

    if (new Date(vehicle.date) > new Date(saleRecord.date)) {
        errors.date = 'Selling Date must be later than bought date';
    }

    if (vehicle.pRemaining !== 0) {
        errors.pRemaining = 'Purchase payment is not complete';
    }

    if (vehicle.cr !== 'Ok') {
        errors.cr = 'CR not available';
    }

    return errors;
}

const sendData = async (saleRecord, reload, setOpenModal) => {
    const formattedDate = formatDate(saleRecord.date);
    const formattedSellingPrice = parseFloat(saleRecord.sellingPrice);

    const saleData = {
        "vehicleId": saleRecord.id,
        "salesDate": formattedDate,
        "buyerName": saleRecord.buyerName,
        "saleAmount": formattedSellingPrice
    }
    console.log('Sale Data:', saleData);

    try {
        const response = await axios.post('http://localhost:7174/api/SalesDetails/AddSalesDetails?userId=23', saleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        reload((prev) => prev + 1);
        setOpenModal(false);
    }
}

export { AddSale };