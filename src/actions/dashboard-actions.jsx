const { default: axios } = require("axios")

const getALLVehicles = () => {
    return getDashboardData()
        .then(response => {
            const processedData = processDashboardData(response);
            processedData.forEach(data => fillUpData(data));
            console.log('Filled up data:', processedData);
            
            const activeVehicles = processedData.filter(vehicle => vehicle.availabilityStatus === 1);
            const soldVehicles = processedData.filter(vehicle => vehicle.availabilityStatus === 2);

            return { activeVehicles, soldVehicles };
        })
}

const fillUpData = (data) => {
    data.pRemaining = pRemainingCalculation(data.pCost, data.payments);
    data.totalCost = totalCostCalculation(data.pCost, data.maintenance);
    data.sellingPrice = data.totalCost;
    data.months = monthsCalculation(data.date);
    data.cr = data.cr ? "Ok" : "Pending";
    data.coc = 12000;
}

const pRemainingCalculation = (pCost, payments) => {
    const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);
    return pCost - totalPayments;
}

const totalCostCalculation = (pCost, maintenance) => {
    const totalMaintenance = maintenance.reduce((total, maintenance) => total + maintenance.cost, 0);
    return pCost + totalMaintenance;
}

const monthsCalculation = (date) => {
    const currentDate = new Date();
    const purchaseDate = new Date(date);
    const diffTime = Math.abs(currentDate - purchaseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
}

const getDashboardData = async () => {
    try {
        const response = await axios.get('http://localhost:7174/api/Vehicle/PopulateDashboard');
        console.log('Data received successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error receiving data:', error);
    }
}

const processDashboardData = (data) => {
    return data.map(item => {
        const { vehicle, purchaseDetails, listOfPayments, listOfMaintenance } = item;

        const payments = listOfPayments.map(payment => ({
            id: payment.id,
            date: payment.date,
            account: payment.paymentTypeId,
            amount: payment.paymentAmount,
            order: payment.paymentOrder
        }));

        const maintenance = listOfMaintenance.map(maintenance => ({
            id: maintenance.id,
            date: maintenance.maintenanceDate,
            description: maintenance.maintenanceTypeId,
            account: maintenance.paymentTypeId,
            amount: maintenance.maintenanceCost
        }));

        return {
            id: vehicle.id,
            availabilityStatus: vehicle.availabilityStatus,
            date: purchaseDetails.boughtDate,
            vehicleNo: vehicle.vehicleNumber,
            make: vehicle.make,
            yom: vehicle.yearOfManufacture,
            document: purchaseDetails.legalOwnerName,
            pCost: purchaseDetails.agreedAmount,
            pRemaining: "", // Needs calculation
            totalCost: "", // Needs calculation
            sellingPrice: "", // Needs calculation
            months: "", // Needs discussion for calculation
            cr: vehicle.isCR,
            purchasedFrom: purchaseDetails.purchasedFrom,
            coc: "",
            payments: payments,
            maintenance: maintenance
        };
    })
}

export { getALLVehicles }