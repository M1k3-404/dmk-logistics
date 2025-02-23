import { create } from "zustand";

export const useMonthStore = create((set) => ({
    selectedMonth: new Date().toLocaleString('default', { month: 'long' }),
    selectedYear: new Date().getFullYear(),
    setSelectedMonth: (month, year) => set({ selectedMonth: month, selectedYear: year }),
}))