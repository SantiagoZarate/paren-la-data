import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  subMonths,
  subYears,
} from "date-fns";

export function getTimeDifference(newDate: string) {
  const date = new Date(newDate);
  const now = new Date();

  const years = differenceInYears(now, date);
  const dateAfterYears = subYears(now, years);
  const months = differenceInMonths(dateAfterYears, date);

  // Subtract the months to find remaining days
  const dateAfterMonths = subMonths(dateAfterYears, months);
  const days = differenceInDays(dateAfterMonths, date);

  if (years === 0) {
    if (months === 0) {
      return `hace ${days} dias`;
    }
    if (months === 1) {
      return `hace ${months} mes y ${days} dias`;
    }
    return `hace ${months} meses`;
  }
  return `hace ${years} años y ${months} meses`;
}
