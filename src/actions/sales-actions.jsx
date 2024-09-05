import { formatDate, isEmpty } from "@/lib/utils";
import axios from "axios";

const AddSale = async (vehicle, saleRecord, setOpenModal, reload, userId) => {
    const errors = ValidateFields(vehicle, saleRecord);

    if (Object.keys(errors).length > 0) {
        console.log('Errors:', errors);
        return errors;
    } else {
        await sendData(saleRecord, reload, setOpenModal, userId);
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

    if (new Date(vehicle.purchaseDetails.boughtDate) > new Date(saleRecord.date)) {
        errors.date = 'Selling Date must be later than bought date';
    }

    if (vehicle.additionalData.remainingCost !== 0) {
        errors.pRemaining = 'Purchase payment is not complete';
    }

    if (vehicle.vehicle.isCR !== 'Ok') {
        errors.cr = 'CR not available';
    }

    return errors;
}

const sendData = async (saleRecord, reload, setOpenModal, userId) => {
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
        const response = await axios.post(`https://backend.dmk-logistics.lk/api/SalesDetails/AddSalesDetails?userId=${userId}`, saleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        reload((prev) => prev + 1);
        setOpenModal(false);
    }
}

//Edit Sale
const EditSale = async (vehicle, saleRecord, setOpenModal, reload, userId) => {
    const errors = ValidateFields(vehicle, saleRecord);

    if (Object.keys(errors).length > 0) {
        console.log('Errors:', errors);
        return errors;
    } else {
        await sendEditData(saleRecord, reload, setOpenModal, userId);
        return [];
    }
}

const sendEditData = async (saleRecord, reload, setOpenModal, userId) => {
    const formattedDate = formatDate(saleRecord.date);
    const formattedSellingPrice = parseFloat(saleRecord.sellingPrice);

    const saleData = {
        "id": saleRecord.id,
        "salesDate": formattedDate,
        "buyerName": saleRecord.buyerName,
        "saleAmount": formattedSellingPrice
    }
    console.log('Sale Data:', saleData);

    try {
        const response = await axios.put(`https://backend.dmk-logistics.lk/api/SalesDetails/UpdateSalesDetails?userId=${userId}`, saleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        // reload((prev) => prev + 1);
        window.location.reload();
        setOpenModal(false);
    }
}

// Delete Sale
const DeleteSale = async (saleId, reload, userId) => {
    try {
        const response = await axios.delete(`https://backend.dmk-logistics.lk/api/SalesDetails/DeleteSalesDetails?userId=${userId}&salesDetailsId=${saleId}`);
        console.log('Data deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        // reload((prev) => prev + 1);
        window.location.reload();
    }
}

export { AddSale, EditSale, DeleteSale };