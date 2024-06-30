import axios from "axios";
import toast from "react-hot-toast";

const HandleSaveChanges = (vehicle) => {
    const errorStatus = HandleRequiredFields(vehicle);
    console.log('Error status:', errorStatus);

    const hasError = errorStatus.some(field => field.isInvalid);
    console.log('Has error:', hasError);

    if (hasError) {
        return errorStatus;
    } else {
        sendData(vehicle);
        return errorStatus;
    }
}

const sendData = async (vehicle) => {
    const formattedDate = formatDate(vehicle.date);
    console.log('Sending date:', formattedDate);

    const formattedYom = formatDate(vehicle.yom).substring(0, 4) + "-01-01";
    console.log('Sending YOM:', formattedYom);

    const formattedCR = vehicle.cr === "true" ? true : false;
    console.log('Sending CR:', formattedCR);

    const formattedPCost = parseFloat(vehicle.pCost);
    console.log('Sending PCost:', formattedPCost);

    const vehicleData = {
        "BoughtDate": formattedDate,
        "VehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formattedYom,
        "AvailabilityStatus": 1,
        "IsCR": formattedCR,
        "ModifiedBy": 23,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": formattedPCost
    }
    
    try {
        const response = await axios.post('http://localhost:7174/api/Vehicle/AddVehicle?userId=23', vehicleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    } finally {
        location.href = "/dashboard";
        toast((t) => {
            t.duration = 5000;

            return (
                <div className="flex items-center">
                    <p>Vehicle Added: <span className="font-medium">{vehicle.vehicleNo}</span></p>
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

function HandleRequiredFields(vehicle) {
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

export { HandleSaveChanges };