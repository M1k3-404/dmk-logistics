const { default: axios } = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getReportsData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Analytics/GetReportDetails`);
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getReportsData };