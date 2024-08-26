import axios from "axios";

// Get All Vendors
const getAllVendors = async () => {
    try {
        const response = await fetchVendors();
        const processedData = processData(response);
        console.log('Processed data:', processedData);
        return processedData;
    } catch (error) {
        console.error('Error receiving vendors:', error);
    }
}

// fetch vendors
const fetchVendors = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/Vendor/GetAllDataForAllVendor');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// process Data
const processData = async (data) => {
    return data.map((vendor) => {
        return {
            vendorInfo: {
                id: vendor.vendorInfo.id,
                vendorName: vendor.vendorInfo.vendorName,
                totalDue: vendor.totalDueAmount,
                entityStatus: vendor.vendorInfo.entityStatus
            },
            listOfQuotations: vendor.listOfQuotations?.map((quotation) => {
                

                return {
                    quotationInformation: {
                        id: quotation.quotationInformation.id,
                        vendorId: quotation.quotationInformation.vendorId,
                        vehicleId: quotation.quotationInformation.vehicleId,
                        quotationDate: quotation.quotationInformation.quotationDate,
                        maintenanceTypeId: quotation.quotationInformation.maintenanceTypeId,
                        quotedAmount: quotation.quotationInformation.quotedAmount,
                        dueAmount: quotation.quotationInformation.dueAmount,
                        isCompleted: quotation.quotationInformation.isCompleted,
                        entityStatus: quotation.quotationInformation.entityStatus
                    },
                    listOfQuotationPayments: quotation.listOfQuotationPayments?.map((payment) => {
                        return {
                            id: payment.id,
                            quotationId: payment.quotationId,
                            paymentTypeId: payment.paymentTypeId,
                            dateOfPayment: payment.dateOfPayment,
                            paymentAmount: payment.paymentAmount,
                            entityStatus: payment.entityStatus
                        }
                    })
                }
            })
        }
    })
}

// Add Vendor
const AddVendor = async (vendorName, reload, setOpenModal, userId) => {
    try {
        const response = await axios.post(`http://localhost:7174/api/Vendor/CreateVendor?userId=${userId}&vendorName=${vendorName}`);
        console.log('Vendor added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding vendor:', error);
    } finally {
        reload((prev) => prev + 1);
        setOpenModal(false);
    }
}

// Get Vendor by ID
const getVendorById = async (id) => {
    try {
        const response = await fetchVendorById(id);
        const processedData = processSingleData(response);
        console.log('Processed data:', processedData);
        return processedData;
    } catch (error) {
        console.error('Error processing data:', error);
        return [];
    }
}

const processSingleData = async (data) => {
    const { vendorInfo, totalDueAmount, listOfQuotations } = data;

    return {
        vendorInfo: {
            id: vendorInfo.id,
            vendorName: vendorInfo.vendorName,
            totalDue: totalDueAmount,
            entityStatus: vendorInfo.entityStatus
        },
        listOfQuotations: listOfQuotations?.map((quotation) => {
            return {
                quotationInformation: {
                    id: quotation.quotationInformation.id,
                    vendorId: quotation.quotationInformation.vendorId,
                    vehicleId: quotation.quotationInformation.vehicleId,
                    quotationDate: quotation.quotationInformation.quotationDate,
                    maintenanceTypeId: quotation.quotationInformation.maintenanceTypeId,
                    quotedAmount: quotation.quotationInformation.quotedAmount,
                    dueAmount: quotation.quotationInformation.dueAmount,
                    isCompleted: quotation.quotationInformation.isCompleted,
                    entityStatus: quotation.quotationInformation.entityStatus
                },
                listOfQuotationPayments: quotation.listOfQuotationPayments?.map((payment) => {
                    return {
                        id: payment.id,
                        quotationId: payment.quotationId,
                        paymentTypeId: payment.paymentTypeId,
                        dateOfPayment: payment.dateOfPayment,
                        paymentAmount: payment.paymentAmount,
                        entityStatus: payment.entityStatus
                    }
                })
            }
        })
    }
}

const fetchVendorById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:7174/api/Vendor/GetAllDataByVendorId?vendorId=${id}`);
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
}

export { getAllVendors, AddVendor, getVendorById };