export type addVehicle = {
    date: Date;
    vehicleNo: string;
    make: string;
    yom: string;
    cr: boolean;
    purchasedFrom: string;
    document: string;
    pCost: number;
}

export type activeVehicle = {
    id: string;
    date: Date;
    vehicleNo: string;
    make: string;
    yom: Date;
    document: string;
    pCost: number;
    pRemaining: number;
    totalCost: number;
    sellingPrice: number;
    months: number;
    cr: boolean;
    purchasedFrom: string;
    coc: number;
    payments: payment[];
    maintenance: maintenance[];
}

export type soldVehicle = {
    id: string;
    date: Date;
    vehicleNo: string;
    make: string;
    yom: Date;
    document: string;
    pCost: number;
    totalCost: number;
    sellingPrice: number;
    buyer: string;
    months: number;
    purchasedFrom: string;
    payments: payment[];
    maintenance: maintenance[];
}

export type payment = {
    id: string;
    date: Date;
    account: account | string;
    amount: number;
    order: number;
}

export type maintenance = {
    id: string;
    date: Date;
    description: maintenanceType | string;
    account: account | string;
    cost: number;
}

export type account = {
    id: string;
    name: string;
}

export type maintenanceType = {
    id: string;
    name: string;
}

export type auditLog = {
    id: string;
    action: string;
    date: Date;
    time: Date;
}