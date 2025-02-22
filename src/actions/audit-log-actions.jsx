const { default: axios } = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllAuditLogs = () => {
    return fetchAuditLogs();
}

const fetchAuditLogs = async () => {
    try {
        const response = await axios.get(`${apiUrl}/AuditLog/GetAllAuditLogs`);
        console.log('Data recieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error recieving data:', error);
    }
}

export { getAllAuditLogs };