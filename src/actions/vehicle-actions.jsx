import { formatYom, isEmpty } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { getAllPaymentTypes, getEveryPaymentType } from "./payment-types-actions";
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
        "BoughtDate": formatDates(vehicle.date),
        "vehicleNumber": vehicle.vehicleNo,
        "make": vehicle.make,
        "YearOfManufacture": formatDates(vehicle.yom),
        "AvailabilityStatus": 1,
        "ExpectedSellingPrice": parseFloat(vehicle.sellingPrice),
        "IsCR": vehicle.cr === "ok" ? true : false,
        "PurchasedFrom": vehicle.purchasedFrom,
        "LegalOwnerName": vehicle.document,
        "AgreedAmount": parseFloat(vehicle.pCost),
        "ModifiedBy": 23,
    }
}

const formatDates = (date) => {
    const year = date.year.toString().padStart(4, '0');
    const month = (date.month).toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        const response = await fetchVehicle(id);
        const processedData = await processedSingleData(response);
        console.log('Processed data:', processedData);
        return processedData;
    } catch (error) {
        console.error('Error processing data:', error);
        return [];
    }
}

const fetchVehicle = async (id) => {
    try {
        const response = await axios.get(`http://localhost:7174/api/Vehicle/GetAllDataForVehicleId?vehicleId=${id}`);
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
};

const processedSingleData = async (data) => {
    const paymentTypeMap = await getPaymentTypeMap();
    const maintenanceTypeMap = await getMaintenanceTypeMap();
    const vendorMap = await getVendorMap();

    const { vehicle, purchaseDetails, analytics, salesDetails, listOfPayments, listOfQuotations, listOfSalesPayments } = data;

    return {
        vehicle: {
            id: vehicle.id,
            vehicleNumber: vehicle.vehicleNumber,
            make: vehicle.make,
            isCR: vehicle.isCR ? "Ok" : "Pending",
            YearOfManufacture: vehicle.yearOfManufacture.slice(0, 10),
            ExpectedSellingPrice: vehicle.expectedSellingPrice,
            AvailabilityStatus: vehicle.availabilityStatus,
        },
        purchaseDetails: {
            id: purchaseDetails.id,
            vehicleId: purchaseDetails.vehicleId,
            boughtDate: purchaseDetails.boughtDate.slice(0, 10),
            agreedAmount: purchaseDetails.agreedAmount,
            purchasedFrom: purchaseDetails.purchasedFrom,
            legalOwnerName: purchaseDetails.legalOwnerName,
        },
        analytics: {
            id: analytics.id,
            vehicleId: analytics.vehicleId,
            cocAmount: analytics.cocAmount,
            totalCost: analytics.totalCost,
        },
        salesDetails: {
            id: salesDetails?.id,
            vehicleId: salesDetails?.vehicleId,
            saleAmount: salesDetails?.saleAmount,
            buyerName: salesDetails?.buyerName,
            dateOfSale: salesDetails?.dateOfSale.slice(0, 10),
        },
        listOfPayments: listOfPayments.map(payment => ({
            id: payment.id,
            date: payment.date.slice(0, 10),
            paymentTypeId: paymentTypeMap[payment.paymentTypeId],
            paymentAmount: payment.paymentAmount,
            paymentOrder: payment.paymentOrder,
        })),
        listOfQuotations: listOfQuotations.map((quotation) => {
            return {
                quotationInformation: {
                    id: quotation.quotationInformation.id,
                    vendorId: vendorMap[quotation.quotationInformation.vendorId],
                    vehicleId: quotation.quotationInformation.vehicleId,
                    quotationDate: quotation.quotationInformation.quotationDate.slice(0, 10),
                    maintenanceTypeId: maintenanceTypeMap[quotation.quotationInformation.maintenanceTypeId],
                    quotedAmount: quotation.quotationInformation.quotedAmount,
                    dueAmount: quotation.quotationInformation.dueAmount,
                    isCompleted: quotation.quotationInformation.isCompleted,
                    entityStatus: quotation.quotationInformation.entityStatus,
                },
                listOfQuotationPayments: quotation.listOfQuotationPayments?.map((payment) => {
                    return {
                        id: payment.id,
                        quotationId: payment.quotationId,
                        paymentTypeId: paymentTypeMap[payment.paymentTypeId],
                        dateOfPayment: payment.dateOfPayment.slice(0, 10),
                        paymentAmount: payment.paymentAmount,
                        entityStatus: payment.entityStatus,
                    }
                })
            }
        }),
        listOfSalesPayments: listOfSalesPayments.map((payment) => {
            return {
                id: payment.id,
                salesDetailsId: payment.salesDetailsId,
                transactionId: payment.transactionId,
                date: payment.date.slice(0, 10),
                salesPaymentTypeId: paymentTypeMap[payment.salesPaymentTypeId],
                salesAmount: payment.salesAmount
            }
        }),
        additionalData: {
            remainingCost: calculateRemainingCost(purchaseDetails.agreedAmount, listOfPayments),
            months: calculateMonths(vehicle.availabilityStatus, purchaseDetails.boughtDate, salesDetails?.dateOfSale),
            remainingSAmount: salesDetails ? salesDetails.saleAmount - listOfSalesPayments.reduce((total, payment) => total + payment.salesAmount, 0) : 0,
        }
    }
}

// Fetch payment types once and cache the result
let paymentTypeMapPromise = null;
const getPaymentTypeMap = async () => {
    if (!paymentTypeMapPromise) {
        paymentTypeMapPromise = getEveryPaymentType().then(paymentTypes => {
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

// Function to calculate remaining cost
const calculateRemainingCost = (pCost, payments) => {
    const totalPayments = payments.reduce((total, payment) => total + payment.paymentAmount, 0);
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