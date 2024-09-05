const { default: axios } = require("axios")

const getAllMaintenanceTypes = async () => {
    try {
        const response = await axios.get('https://backend.dmk-logistics.lk/api/MaintenanceType/GetAllMaintenanceTypes');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
}

const getEveryMaintenanceType = async () => {
    try {
        const response = await axios.get('https://backend.dmk-logistics.lk/api/MaintenanceType/GetActiveAndInactiveMaintenanceTypes');
        console.log('Data recieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error recieving data:', error);
    }
}

const addMaintenanceType = (maintenanceType, setOpenModal, userId) => {
    const requiredFields = checkRequiredFields(maintenanceType);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(maintenanceType, userId);
        window.location.reload();
        setOpenModal(false);
        return requiredFields;
    }
}

const checkRequiredFields = (maintenanceType) => {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(maintenanceType).forEach(key => {
        const value = maintenanceType[key];
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

const sendData = async (maintenanceType, userId) => {
    const maintenanceTypeData = {
        "MaintenanceTitle": maintenanceType.maintenanceTitle,
    };

    console.log('Data to be sent:', maintenanceTypeData);

    try {
        const response = await axios.post(`https://backend.dmk-logistics.lk/api/MaintenanceType/AddMaintenanceTypes?userId=${userId}`, maintenanceTypeData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

const deleteMaintenanceType = async (id, userId) => {
    try {
        const response = await axios.delete(`https://backend.dmk-logistics.lk/api/MaintenanceType/DeleteMaintenanceTypes?userId=${userId}&maintenanceTypeId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        window.location.reload();
    }
}

export { getAllMaintenanceTypes, getEveryMaintenanceType, addMaintenanceType, deleteMaintenanceType };