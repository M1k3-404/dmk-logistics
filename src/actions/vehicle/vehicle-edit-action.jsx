import axios from "axios";
import toast from "react-hot-toast";

//Edit vehicle
// Main function to handle vehicle editing
const editVehicle = async (vehicle, id) => {
    const errorStatus = validateRequiredFields(vehicle);

    if (errorStatus.some(field => field.isInvalid)) {
        return errorStatus;
    }

    await sendData(vehicle, id);
    return errorStatus;
};

// Function to validate required fields
const validateRequiredFields = (vehicle) => {
    const requiredFields = ['date', 'vehicleNo', 'make', 'yom', 'cr', 'purchasedFrom', 'document', 'pCost'];
    return requiredFields.map(field => ({
        key: field,
        isInvalid: isEmpty(vehicle[field]),
        error: isEmpty(vehicle[field]) ? "This field is required" : ""
    }));
};

// Function to send data to the server
const sendData = async (vehicle, id) => {
    const formattedVehicleData = formatVehicleData(vehicle, id);

    try {
        const response = await axios.put(`http://localhost:7174/api/Vehicle/UpdateVehicle?userId=23`, formattedVehicleData);
        console.log('Data sent successfully:', response.data);
        notifySuccess(vehicle.vehicleNo);
        window.location.href = "/dashboard";
    } catch (error) {
        console.error('Error sending data:', error);
        toast.error('Failed to update vehicle. Please try again.', { duration: 5000 });
    }
};

// Function to format vehicle data before sending
const formatVehicleData = (vehicle, id) => {
    return {
        "Id": id,
        "VehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formatYom(vehicle.yom),
        "AvailabilityStatus": 1,
        "ExpectedSellingPrice": parseFloat(vehicle.sellingPrice),
        "IsCR": vehicle.cr === "true",
        "BoughtDate": formatDate(vehicle.date),
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": parseFloat(vehicle.pCost),
        "ModifiedBy": 23,
    };
};

// Function to format date
const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to format year of manufacture
const formatYom = (yom) => {
    return formatDate(yom).substring(0, 4) + "-01-01";
};

// Utility function to check if a value is empty
const isEmpty = (value) => value === null || value === undefined || value === "";

// Function to notify success
const notifySuccess = (vehicleNo) => {
    toast((t) => (
        <div className="flex items-center">
            <p>Vehicle Updated: <span className="font-medium">{vehicleNo}</span></p>
        </div>
    ), { duration: 5000 });
};

export { editVehicle };