import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function to check if a value is empty
export const isEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

// Utility function to format date
export const formatDate = (date) => {
  const year = date.year.toString().padStart(4, '0');
  const month = (date.month).toString().padStart(2, '0');
  const day = date.day.toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Utility Function to format year of manufacture
export const formatYom = (yom) => {
  return formatDate(yom).substring(0, 4) + "-01-01";
};