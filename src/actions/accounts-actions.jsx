import axios from "axios";

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
        const response = await axios.get('http://localhost:7174/api/Account/GetAllAccounts');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getAllAccounts };