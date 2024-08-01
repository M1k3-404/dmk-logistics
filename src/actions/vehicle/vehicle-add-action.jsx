import axios from "axios";
import toast from "react-hot-toast";

const addVehicle = async (vehicle) => {
    const errorStatus = validateRequiredFields(vehicle);
    const hasError = errorStatus.some(field => field.isInvalid);

    if (hasError) {
        return errorStatus;
    } else {
        await sendData(vehicle);
        return errorStatus;
    }
}

// Function to validate required fields
const validateRequiredFields = (vehicle) => {
    const errorStatus = [];
    const requiredFields = ['date', 'vehicleNo', 'make', 'yom', 'cr', 'purchasedFrom', 'document', 'pCost'];

    requiredFields.forEach(field => {
        const value = vehicle[field];
        if (isEmpty(value)) {
            errorStatus.push({ key: field, isInvalid: true, error: "This field is required" });
        } else {
            errorStatus.push({ key: field, isInvalid: false, error: "" });
        }
    });

    return errorStatus;
};

// Function to send data to the server
const sendData = async (vehicle) => {
    const formattedVehicleData = formatVehicleData(vehicle);

    try {
        const response = await axios.post('http://localhost:7174/api/Vehicle/AddVehicle?userId=23', formattedVehicleData);
        console.log('Data sent successfully:', response.data);
        toast.success(`Vehicle Added: ${vehicle.vehicleNo}`, { duration: 5000 });
        window.location.href = "/dashboard";
    } catch (error) {
        console.error('Error sending data:', error);
        toast.error('Failed to add vehicle. Please try again.', { duration: 5000 });
    }
};

// Function to format vehicle data before sending
const formatVehicleData = (vehicle) => {
    return {
        "BoughtDate": formatDate(vehicle.date),
        "VehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formatYom(vehicle.yom),
        "AvailabilityStatus": 1,
        "IsCR": vehicle.cr === "true",
        "ModifiedBy": 23,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": parseFloat(vehicle.pCost)
    };
};

// Function to format date
const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Function to format year of manufacture
const formatYom = (yom) => {
    return formatDate(yom).substring(0, 4) + "-01-01";
};

// Utility function to check if a value is empty
const isEmpty = (value) => {
    return value === null || value === undefined || value === "";
};

export { addVehicle };