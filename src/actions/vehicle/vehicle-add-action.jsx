import { formatDate, formatYom, isEmpty } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const addVehicle = async (vehicle, userId) => {
    const errors = validateFields(vehicle);

    if (errors.length > 0) {
        return errors;
    } else {
        await sendData(vehicle, userId);
        return [];
    }
}

// Function to validate fields
const validateFields = (vehicle) => {
    const errors = {};

    // Check for empty values
    const requiredFields = ['date', 'vehicleNo', 'make', 'yom', 'cr', 'purchasedFrom', 'document', 'pCost'];
    requiredFields.forEach(field => {
        if (isEmpty(vehicle[field])) {
            errors[field] = 'This field is required';
        }
    })

    // Validate dates
    const date = new Date(vehicle.date.year, vehicle.date.month - 1, vehicle.date.day);
    const today = new Date();

    if (!isValidDate(date)) {
        errors.date = 'Invalid date';
    } else if (date > today) {
        errors.date = 'Date cannot be in the future';
    }

    // Validate year of manufacture
    const yom = new Date(vehicle.yom, 0, 1);
    if (!isValidDate(yom)) {
        errors.yom = 'Invalid year of manufacture';
    } else if (yom > date) {
        errors.yom = 'Year of manufacture cannot be after the purchase date';
    }

    return errors;
}

// Function to check if a date is valid
const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
}

// Function to send data to the server
const sendData = async (vehicle, userId) => {
    const formattedVehicleData = formatVehicleData(vehicle);
    console.log('Formatted vehicle data:', formattedVehicleData);

    try {
        const response = await axios.post(`http://localhost:7174/api/Vehicle/AddVehicle?userId=${userId}`, formattedVehicleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
        const errorMsg = error.response?.data?.message || 'Failed to add vehicle. Please try again.';
        toast.error('Failed to add vehicle. Please try again.', { duration: 5000 });
    } finally {
        toast.success(`Vehicle Added: ${vehicle.vehicleNo}`, { duration: 5000 });
        window.location.href = "/dashboard";
    }
};

// Function to format vehicle data before sending
const formatVehicleData = (vehicle) => {
    return {
        "BoughtDate": formatDate(vehicle.date),
        "VehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formatYom(formatDate(vehicle.yom)),
        "AvailabilityStatus": 1,
        "IsCR": vehicle.cr === "true",
        "ModifiedBy": 23,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": parseFloat(vehicle.pCost)
    };
};

export { addVehicle };