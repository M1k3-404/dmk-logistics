import { Time } from "@internationalized/date"

const vehicles = [
    {
        id: 1,
        date: "2024-01-21",
        vehicleNo: "123456",
        make: "Toyota",
        yom: "2020",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Ok",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 2,
        date: "2024-01-21",
        vehicleNo: "13456",
        make: "Toyota",
        yom: "2017",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 3,
        date: "2024-01-21",
        vehicleNo: "12356",
        make: "Toyota",
        yom: "2020",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 4,
        date: "2024-01-21",
        vehicleNo: "12356",
        make: "Toyota",
        yom: "2018",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 5,
        date: "2024-01-21",
        vehicleNo: "12456",
        make: "Toyota",
        yom: "2019",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 6,
        date: "2024-01-21",
        vehicleNo: "1456",
        make: "Toyota",
        yom: "2020",
        document: "Lilan",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 7,
        date: "2024-01-21",
        vehicleNo: "1236",
        make: "Toyota",
        yom: "2000",
        document: "Open",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 8,
        date: "2024-01-21",
        vehicleNo: "1238456",
        make: "Toyota",
        yom: "2002",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 9,
        date: "2024-01-21",
        vehicleNo: "12347856",
        make: "Toyota",
        yom: "2020",
        document: "Diluksh",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },
    {
        id: 10,
        date: "2024-01-21",
        vehicleNo: "123556",
        make: "Toyota",
        yom: "2018",
        document: "Open",
        pCost: "1000000",
        pRemaining: "800000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        months: "03",
        cr: "Pending",
        purchasedFrom: "Diluksh",
        coc: "120000",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    }
]

const soldVehicles = [
    {
        id: 10,
        date: "2024-01-21",
        vehicleNo: "123556",
        make: "Toyota",
        yom: "2018",
        document: "Open",
        pCost: "1000000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        buyer: "Nihal",
        months: "03",
        purchasedFrom: "Amal",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },

    {
        id: 7,
        date: "2024-01-21",
        vehicleNo: "64334",
        make: "Toyota",
        yom: "2018",
        document: "Dilruksh",
        pCost: "400000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        buyer: "Saman",
        months: "03",
        purchasedFrom: "People's Leasing",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    },

    {
        id: 12,
        date: "2024-01-21",
        vehicleNo: "64334",
        make: "Tata",
        yom: "2021",
        document: "Dilruksh",
        pCost: "400000",
        totalCost: "1000000",
        sellingPrice: "1200000",
        buyer: "Saman",
        months: "03",
        purchasedFrom: "People's Leasing",
        payments: [
            {
                id: 1,
                date: "2024-01-21",
                account: "Bank",
                amount: "1000000",
                order: "1",
            },
            {
                id: 2,
                date: "2024-01-23",
                account: "Bank",
                amount: "700000",
                order: "2",
            }
        ],
        maintenance: [
            {
                id: 1,
                date: "2024-01-21",
                description: "Engine",
                account: "Cash",
                amount: "100000",
            },
            {
                id: 2,
                date: "2024-01-23",
                description: "Tyres",
                account: "DMK Auto",
                amount: "70000",
            }
        ]
    }
]

const users = [
    {
        id: "1",
        username: "Dilruksh",
        password: "d@123",
        role: "owner",
    },

    {
        id: "2",
        username: "Lilan",
        password: "l@123",
        role: "employee",
    },
]

const paymentTypes = [
    {
        id: "1",
        name: "DDW Online",
    },
    {
        id: "2",
        name: "Cash",
    },
    {
        id: "3",
        name: "DMK Auto",
    }
]

const auditLogs = [
    {
        id: "1",
        description: "Dilruksh has added a new vehicle with the vehicle number 123456 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "2",
        description: "Dilruksh has added a new vehicle with the vehicle number 6534 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "3",
        description: "Lilan has deleted a vehicle record with the vehicle number 123456 from the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "4",
        description: "Dilruksh has added a new vehicle with the vehicle number 123456 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "5",
        description: "Dilruksh has added a new vehicle with the vehicle number 6534 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "6",
        description: "Lilan has deleted a vehicle record with the vehicle number 123456 from the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "7",
        description: "Dilruksh has added a new vehicle with the vehicle number 123456 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "8",
        description: "Dilruksh has added a new vehicle with the vehicle number 6534 to the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },

    {
        id: "9",
        description: "Lilan has deleted a vehicle record with the vehicle number 123456 from the system.",
        date: "2024-01-21",
        time: "10.24 PM",
    },
]

export {vehicles, soldVehicles, users, paymentTypes, auditLogs};