const { default: axios } = require("axios");

const getAllAuditLogs = () => {
    return fetchAuditLogs();
}

const fetchAuditLogs = async () => {
    try {
        const response = await axios.get('https://backend.dmk-logistics.lk/api/AuditLog/GetAllAuditLogs');
        console.log('Data recieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error recieving data:', error);
    }
}

export { getAllAuditLogs };