import axios from "axios";
import { getAllPaymentTypes } from "../payment-types-actions";

// Get All Vehicles for the Dashboard 
const getAllVehicles = async () => {
    try {
        const response = await getDashboardData();
        const processedData = await processDashboardData(response);
        console.log('Filled up data:', processedData);

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

    return data.map(item => {
        const { vehicle, purchaseDetails, analytics, listOfPayments, listOfMaintenance, salesDetails } = item;

        const payments = listOfPayments.map(payment => ({
            id: payment.id,
            date: formatDate(payment.date, 10),
            account: paymentTypeMap[payment.paymentTypeId], // Replace ID with title
            amount: payment.paymentAmount,
            order: payment.paymentOrder
        }));

        const maintenance = listOfMaintenance.map(maintenance => ({
            id: maintenance.id,
            date: formatDate(maintenance.maintenanceDate, 10),
            description: maintenance.maintenanceTypeId,
            account: paymentTypeMap[maintenance.paymentTypeId], // Replace ID with title
            amount: maintenance.maintenanceCost
        }));

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
            maintenance,
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