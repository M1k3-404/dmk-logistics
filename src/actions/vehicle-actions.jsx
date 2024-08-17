import { formatYom, isEmpty } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { getAllPaymentTypes } from "./payment-types-actions";
import { getAllMaintenanceTypes } from "./maintenance-types-actions";
import { getAllVendors } from "./vendors-actions";

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

// Get vehicle by ID
const getVehicleBYId = async (id) => {
    try {
        const response = await getVehicle(id);
        const processData = await processedData(response);
        console.log('Processed data:', processData);
        return processData;
    } catch (error) {
        console.error('Error processing data:', error);
        return [];
    }
}

const getVehicle = async (id) => {
    try {
        const response = await axios.get(`http://localhost:7174/api/Vehicle/GetAllDataForVehicleId?vehicleId=${id}`);
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
};

const processedData = async (data) => {
    const paymentTypeMap = await getPaymentTypeMap();
    const maintenanceTypeMap = await getMaintenanceTypeMap();
    const vendorMap = await getVendorMap();

    const { vehicle, purchaseDetails, analytics, listOfPayments, listOfQuotations, salesDetails } = data;

    const payments = listOfPayments.map(payment => ({
        id: payment.id,
        date: formatDate(payment.date),
        account: paymentTypeMap[payment.paymentTypeId], // Replace ID with title
        amount: payment.paymentAmount,
        order: payment.paymentOrder
    }));

    const quotations = listOfQuotations.map((quotation) => {
        return {
            id: quotation.quotationInformation.id,
            vendorId: vendorMap[quotation.quotationInformation.vendorId],
            vehicleId: quotation.quotationInformation.vehicleId,
            quotationDate: formatDate(quotation.quotationInformation.quotationDate, 10),
            maintenanceTypeId: maintenanceTypeMap[quotation.quotationInformation.maintenanceTypeId],
            quotedAmount: quotation.quotationInformation.quotedAmount,
            dueAmount: quotation.quotationInformation.dueAmount,
            isCompleted: quotation.quotationInformation.isCompleted,
            entityStatus: quotation.quotationInformation.entityStatus,
            quotationPayments: quotation.listOfQuotationPayments?.map((payment) => {
                return {
                    id: payment.id,
                    quotationId: payment.quotationId,
                    paymentTypeId: paymentTypeMap[payment.paymentTypeId],
                    dateOfPayment: formatDate(payment.dateOfPayment, 10),
                    paymentAmount: payment.paymentAmount,
                    entityStatus: payment.entityStatus
                }
            })
        }
    });

    const processedItem = {
        id: vehicle.id,
        availabilityStatus: vehicle.availabilityStatus,
        date: formatDate(purchaseDetails.boughtDate, 10),
        vehicleNo: vehicle.vehicleNumber,
        make: vehicle.make,
        yom: formatDate(vehicle.yearOfManufacture, 4),
        document: purchaseDetails.legalOwnerName,
        pCost: purchaseDetails.agreedAmount,
        pRemaining: calculateRemainingCost(purchaseDetails.agreedAmount, payments),
        totalCost: analytics.totalCost,
        sellingPrice: vehicle.availabilityStatus === 2 ? salesDetails.saleAmount : vehicle.expectedSellingPrice,
        months: calculateMonths(vehicle.availabilityStatus, purchaseDetails.boughtDate, salesDetails?.dateOfSale || ""),
        cr: vehicle.isCR ? "Ok" : "Pending",
        purchasedFrom: purchaseDetails.purchasedFrom,
        coc: analytics.cocAmount,
        payments,
        quotations,
        buyer: salesDetails?.buyerName || "",
        dateSold: formatDate(salesDetails?.dateOfSale || "", 10)
    };

    console.log('Processed item:', processedItem);
    return processedItem;
}

// Fetch payment types once and cache the result
let paymentTypeMapPromise = null;
const getPaymentTypeMap = async () => {
    if (!paymentTypeMapPromise) {
        paymentTypeMapPromise = getAllPaymentTypes().then(paymentTypes => {
            const paymentTypeMap = {};
            paymentTypes.forEach(paymentType => {
                paymentTypeMap[paymentType.id] = paymentType.paymentTitle;
            });
            return paymentTypeMap;
        });
    }
    return paymentTypeMapPromise;
};

// Fetch maintenance types once and cache the result
let MaintenanceTypeMapPromise = null;
const getMaintenanceTypeMap = async () => {
    if (!MaintenanceTypeMapPromise) {
        MaintenanceTypeMapPromise = getAllMaintenanceTypes().then(maintenanceTypes => {
            const maintenanceTypeMap = {};
            maintenanceTypes.forEach(maintenanceType => {
                maintenanceTypeMap[maintenanceType.id] = maintenanceType.maintenanceTypeName;
            });
            return maintenanceTypeMap;
        });
    }
    return MaintenanceTypeMapPromise;
};

// Fetch vendors once and cache the result
let vendorMapPromise = null;
const getVendorMap = async () => {
    if (!vendorMapPromise) {
        vendorMapPromise = getAllVendors().then(vendors => {
            const vendorMap = {};
            vendors.forEach(vendor => {
                vendorMap[vendor.vendorInfo.id] = vendor.vendorInfo.vendorName;
            });
            return vendorMap;
        });
    }
    return vendorMapPromise;
};

// Function to format date
const formatDate = (date, charCount) => date.slice(0, charCount);

// Function to calculate remaining cost
const calculateRemainingCost = (pCost, payments) => {
    const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);
    return pCost - totalPayments;
};

// Function to calculate months
const calculateMonths = (availabilityStatus, startDate, endDate) => {
    const start = new Date(startDate);
    const end = availabilityStatus === 1 ? new Date() : new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
};

export { deleteVehicle, editVehicle, getVehicleBYId };