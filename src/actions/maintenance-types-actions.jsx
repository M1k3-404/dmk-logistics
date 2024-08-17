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

export { getAllMaintenanceTypes };