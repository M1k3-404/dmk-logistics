import axios from "axios";
import { getAllPaymentTypes } from "../payment-types-actions";
import { getAllMaintenanceTypes } from "../maintenance-types-actions";
import { getAllVendors } from "../vendors-actions";

// Get All Vehicles for the Dashboard 
const getAllVehicles = async () => {
    try {
        const response = await getDashboardData();
        const processedData = await processDashboardData(response);

        const activeVehicles = processedData.filter(vehicle => vehicle.availabilityStatus === 1);
        const soldVehicles = processedData.filter(vehicle => vehicle.availabilityStatus === 2);

        return { activeVehicles, soldVehicles };
    } catch (error) {
        console.error('Error processing vehicles:', error);
    }
}

// Fetch dashboard data
const getDashboardData = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/Vehicle/PopulateDashboard');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
};

// Process and fill up dashboard data
const processDashboardData = async (data) => {
    const paymentTypeMap = await getPaymentTypeMap();
    const maintenanceTypeMap = await getMaintenanceTypeMap();
    const vendorMap = await getVendorMap();

    return data.map(item => {
        const { vehicle, purchaseDetails, analytics, listOfPayments, listOfQuotations, salesDetails } = item;

        const payments = listOfPayments.map(payment => ({
            id: payment.id,
            date: formatDate(payment.date, 10),
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

        return processedItem;
    });
};

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

// Utility functions
const formatDate = (date, charCount) => date.slice(0, charCount);

const calculateRemainingCost = (pCost, payments) => {
    const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);
    return pCost - totalPayments;
};

const calculateMonths = (availabilityStatus, startDate, endDate) => {
    const start = new Date(startDate);
    const end = availabilityStatus === 1 ? new Date() : new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
};

export { getAllVehicles };