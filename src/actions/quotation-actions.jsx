const { default: axios } = require("axios");

//Add Quotation
const addQuotation = (quotation, vendors, maintenanceTypes, vehicleId, onAddQuotation, setIsNewRecord) => {
    const requiredFields = checkRequiredFields(quotation);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(quotation, vendors, maintenanceTypes, vehicleId, onAddQuotation, setIsNewRecord);
        return requiredFields;
    }
}

const checkRequiredFields = (quotation) => {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(quotation).forEach(key => {
        const value = quotation[key];
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

const sendData = async (quotation, vendors, maintenanceTypes, vehicleId) => {
    const formattedDate = formatDate(quotation.date);
    const formattedVendor = getVendorId(vendors, quotation.vendor);
    const formattedMaintenanceType = getMaintenanceTypeId(maintenanceTypes, quotation.maintenanceType);
    const formattedQuotedAmount = parseFloat(quotation.quotedAmount);
    const formattedIsCompleted = quotation.isCompleted;

    const quotationData = {
        "VendorId": formattedVendor,
        "VehicleId": vehicleId,
        "QuotationDate": formattedDate,
        "MaintenanceTypeId": formattedMaintenanceType,
        "QuotedAmount": formattedQuotedAmount,
        "DueAmount": formattedQuotedAmount,
        "IsCompleted": formattedIsCompleted
    }
    console.log('Quotation Data:', quotationData);

    try {
        const response = await axios.post('http://localhost:7174/api/Quotation/CreateNewQuotation', quotationData);
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

const getVendorId = (vendors, vendorName) => {
    return vendors.find(vendor => vendor.vendorInfo.vendorName=== vendorName).vendorInfo.id;
}

const getMaintenanceTypeId = (maintenanceTypes, maintenanceType) => {
    return maintenanceTypes.find(type => type.maintenanceTypeName === maintenanceType).id;
}

//Edit Quotation
const editQuotation = (quotation, vendors, maintenanceTypes, vehicleId, id, setIsEditable) => {
    const requiredFields = checkRequiredFields(quotation);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        updateData(quotation, vendors, maintenanceTypes, vehicleId, id, setIsEditable);
        return requiredFields;
    }
}

const updateData = async (quotation, vendors, maintenanceTypes, vehicleId, id, setIsEditable) => {
    const formattedDate = formatDate(quotation.date);
    console.log('1:', quotation.vendor);
    console.log('2:', vendors);
    const formattedVendor = getVendorId(vendors, quotation.vendor);
    const formattedMaintenanceType = getMaintenanceTypeId(maintenanceTypes, quotation.maintenanceType);
    const formattedQuotedAmount = parseFloat(quotation.quotedAmount);
    const formattedIsCompleted = quotation.isCompleted;

    const quotationData = {
        "id": id,
        "VendorId": formattedVendor,
        "VehicleId": vehicleId,
        "QuotationDate": formattedDate,
        "MaintenanceTypeId": formattedMaintenanceType,
        "QuotedAmount": formattedQuotedAmount,
        "DueAmount": formattedQuotedAmount,
        "IsCompleted": formattedIsCompleted
    }
    console.log('Quotation Data:', quotationData);

    try {
        const response = await axios.put('http://localhost:7174/api/Quotation/UpdateQuotation', quotationData);
        console.log('Data updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating data:', error);
    } finally {
        setIsEditable(false);
        window.location.reload();
    }
}

//Delete Quotation
const deleteQuotation = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/Quotation/DeleteQuotation?quotationId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        window.location.reload();
    }
}

export { addQuotation, editQuotation, deleteQuotation };