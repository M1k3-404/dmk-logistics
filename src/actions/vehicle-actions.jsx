import { formatYom, isEmpty } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

//Delete vehicle
const deleteVehicle = async (id, reload) => {
    try {
        const response = await axios.delete(`http://localhost:7174/api/Vehicle/DeleteVehicle?userId=23&vehicleId=${id}`);
        console.log('Data deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        reload((prev) => prev + 1);
    }
}

//Edit vehicle
const editVehicle = async (vehicle, id) => {
    const errors = validateFields(vehicle);

    if(errors.length > 0) {
        return errors;
    } else {
        await sendData(vehicle, id);
        return [];
    }
}

// Function to validate fields
const validateFields = (vehicle) => {
    const errors = {};

    // Check for empty values
    const requiredFields = ['date', 'vehicleNo', 'make', 'yom', 'cr', 'purchasedFrom', 'document', 'pCost', 'sellingPrice'];
    requiredFields.forEach(field => {
        if (isEmpty(vehicle[field])) {
            errors[field] = 'This field is required';
        }
    })

    return errors;
}

// Function to format vehicle data before sending
const formatVehicleData = (vehicle, id) => {
    console.log('Vehicle data:', vehicle);
    return {
        "Id": id,
        "BoughtDate": vehicle.date,
        "vehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formatYom(vehicle.yom),
        "AvailabilityStatus": 1,
        "ExpectedSellingPrice": parseFloat(vehicle.sellingPrice),
        "IsCR": vehicle.cr === "ok" ? true : false,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": parseFloat(vehicle.pCost),
        "ModifiedBy": 23,
    }
}

const sendData = async (vehicle, id) => {
    const formattedVehicleData = formatVehicleData(vehicle, id);
    console.log('Formatted vehicle data:', formattedVehicleData);

    try {
        const response = await axios.put(`http://localhost:7174/api/Vehicle/UpdateVehicle?userId=23`, formattedVehicleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        location.href = "/dashboard";
        toast((t) => {
            t.duration = 5000;

            return (
                <div className="flex items-center">
                    <p>Vehicle Updated: <span className="font-medium">{vehicle.vehicleNo}</span></p>
                </div>
            )
        });
    }
}

export { deleteVehicle, editVehicle };