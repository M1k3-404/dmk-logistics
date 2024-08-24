const { default: axios } = require("axios")

const getAllMaintenanceTypes = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/MaintenanceType/GetAllMaintenanceTypes');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
}

const addMaintenanceType = (maintenanceType, setOpenModal) => {
    const requiredFields = checkRequiredFields(maintenanceType);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(maintenanceType);
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

const sendData = async (maintenanceType) => {
    const maintenanceTypeData = {
        "MaintenanceTitle": maintenanceType.maintenanceTitle,
    };

    console.log('Data to be sent:', maintenanceTypeData);

    try {
        const response = await axios.post('http://localhost:7174/api/MaintenanceType/AddMaintenanceTypes?userId=23', maintenanceTypeData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

const deleteMaintenanceType = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/MaintenanceType/DeleteMaintenanceTypes?userId=23&maintenanceTypeId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

export { getAllMaintenanceTypes, addMaintenanceType, deleteMaintenanceType };