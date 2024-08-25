import axios from "axios";
import { getAllPaymentTypes, getEveryPaymentType } from "../payment-types-actions";
import { getAllMaintenanceTypes } from "../maintenance-types-actions";
import { getAllVendors } from "../vendors-actions";

// Get All Vehicles for the Dashboard 
const getAllVehicles = async () => {
    try {
        const response = await getDashboardData();
        const processedData = await processDashboardData(response);
        console.log('Data processed successfully:', processedData);

        const activeVehicles = processedData.filter(vehicle => vehicle.vehicle.AvailabilityStatus === 1 || vehicle.vehicle.AvailabilityStatus === 0);
        const soldVehicles = processedData.filter(vehicle => vehicle.vehicle.AvailabilityStatus === 2);

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
        const { vehicle, purchaseDetails, analytics, salesDetails, listOfPayments, listOfQuotations, listOfSalesPayments } = item;

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
    });
};

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

// Utility functions
const formatDate = (date, charCount) => date.slice(0, charCount);

const calculateRemainingCost = (pCost, payments) => {
    const totalPayments = payments.reduce((total, payment) => total + payment.paymentAmount, 0);
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