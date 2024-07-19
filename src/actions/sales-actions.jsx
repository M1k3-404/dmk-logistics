import axios from "axios";
import toast from "react-hot-toast";

const HandleSaveChanges = (saleRecord, setOpenModal, reload) => {
    const requiredFields = HandleRequiredFields(saleRecord);

    const hasError = requiredFields.some(field => field.isInvalid);

    if (hasError) {
        return requiredFields;
    } else {
        sendData(saleRecord);
        reload((prev) => prev + 1);
        setOpenModal(false);
        return requiredFields;
    }
}

const sendData = async (saleRecord) => {
    const formattedDate = formatDate(saleRecord.date);

    const formattedSellingPrice = parseFloat(saleRecord.sellingPrice);

    const saleData = {
        "vehicleId": saleRecord.id,
        "salesDate": formattedDate,
        "buyerName": saleRecord.buyerName,
        "saleAmount": formattedSellingPrice
    }
    console.log('Sale Data:', saleData);

    try {
        console.log('try...');
        const response = await axios.post('http://localhost:7174/api/SalesDetails/AddSalesDetails?userId=23', saleData);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.log('catch...');
        console.error('Error sending data:', error);
    } finally {
        console.log('finally...');
        toast((t) => {
            t.duration = 5000;

            return (
                <div className="flex items-center">
                    <p>Vehicle Sold: <span className="font-medium">{saleRecord.vehicleNo}</span></p>
                </div>
            )
        });
    }
}

function HandleRequiredFields(saleRecord) {
    var errorStatus = [];

    const isEmpty = (value) => {
        return value === null || value === undefined || value === "";
    }

    Object.keys(saleRecord).forEach(key => {
        const value = saleRecord[key];
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

const formatDate = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { HandleSaveChanges };