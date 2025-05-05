
/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format a number as percentage
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

/**
 * Format a range as a string (e.g. "$10,000 - $20,000")
 */
export const formatCurrencyRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

/**
 * Format a number of weeks in different time scales
 */
export const formatWeeks = (weeks: number): { months: string, weeks: string } => {
  const weeksPerMonth = 4.33; // Standard approximation
  const months = weeks / weeksPerMonth;
  
  return {
    months: months.toFixed(2),
    weeks: weeks.toString()
  };
};

/**
 * Ensure a number is always positive
 */
export const ensurePositive = (value: number): number => {
  return Math.max(0, value);
};

/**
 * Format a date in a readable format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
