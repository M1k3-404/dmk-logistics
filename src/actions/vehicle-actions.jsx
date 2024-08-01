const { default: axios } = require("axios");
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
const editVehicle = (vehicle, id) => {
    const errorStatus = handleRequiredFields(vehicle);
    console.log('Error status:', errorStatus);

    const hasError = errorStatus.some(field => field.isInvalid);
    console.log('Has error:', hasError);

    if (hasError) {
        return errorStatus;
    } else {
        sendData(vehicle, id);
        return errorStatus;
    }
}

function handleRequiredFields(vehicle) {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(vehicle).forEach(key => {
        const value = vehicle[key];
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

const sendData = async (vehicle, id) => {
    const formattedDate = formatDate(vehicle.date);
    console.log('Sending date:', formattedDate);

    const formattedYom = vehicle.yom + "-01-01";
    console.log('Sending YOM:', formattedYom);

    const formattedCR = vehicle.cr === "true" ? true : false;
    console.log('Sending CR:', formattedCR);

    const formattedPCost = parseFloat(vehicle.pCost);
    console.log('Sending PCost:', formattedPCost);

    const formattedSellingPrice = parseFloat(vehicle.sellingPrice);
    console.log('Sending Selling Price:', formattedSellingPrice);

    const vehicleData = {
        "Id": id,
        "VehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formattedYom,
        "AvailabilityStatus": 1,
        "ExpectedSellingPrice": formattedSellingPrice,
        "IsCR": formattedCR,
        "BoughtDate": formattedDate,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": formattedPCost,
        "ModifiedBy": 23,
    }

    try {
        console.log('Vehicle data:', vehicleData);
        const response = await axios.put(`http://localhost:7174/api/Vehicle/UpdateVehicle?userId=23`, vehicleData);
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

const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { deleteVehicle, editVehicle };