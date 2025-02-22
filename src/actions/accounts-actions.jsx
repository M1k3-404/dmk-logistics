import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get All Accounts
const getAllAccounts = async () => {
    try {
        const response = await fetchAccounts();
        return response;
    } catch (error) {
        console.error('Error receiving accounts:', error);
    }
}

// fetch accounts
const fetchAccounts = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Account/GetAllAccounts`);
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getAllAccounts };