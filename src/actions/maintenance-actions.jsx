import axios from "axios";
import toast from "react-hot-toast";

const HandleSaveChanges = (record) => {
    console.log('Record:', record);
    const status = HandleRequiredFields(record);
    console.log('Error status:', status);

    const hasError = status.some(field => field.isInvalid);

    if (hasError) {
        return hasError;
    } else {
        sendData(record);
        return hasError;
    }
}

const sendData = async (record) => {
    const formattedDate = formatDate(record.date);
    console.log('Sending date:', formattedDate);

    const formattedAmount = parseFloat(record.amount);
    console.log('Sending amount:', formattedAmount);

    const recordData = {
        "VehicleId": record.vehicleId,
        "Date": formattedDate,
        "Description": record.description,
        "Account": record.account,
        "Amount": formattedAmount
    }

    try {
        const response = await axios.post('https://backend.dmk-logistics.lk/api/MaintenanceDetails/AddMaintenanceDetails?userId=23', recordData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        toast((t) => {
            t.duration = 5000;

            return (
                <div className="flex items-center">
                    <p>Record Added: <span className="font-medium">{record.description}</span></p>
                </div>
            )
        });
    }}

const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function HandleRequiredFields(record) {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(record).forEach(key => {
        const value = record[key];
        if (isEmpty(value)) {
            errorStatus.push({
                key: key,
                isInvalid: true,
                error: "This field is required"
            });
        } else {
            errorStatus.push({
                key: key,
                isInvalid: false,
                error: ""
            });
        }
    })

    return errorStatus;
}

export { HandleSaveChanges };