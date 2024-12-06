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
      if (days === 1) {
        return `hace ${days} día`;
      }
      return `hace ${days} días`;
    }
    if (months === 1) {
      return `hace ${months} mes y ${days} días`;
    }
    return `hace ${months} meses`;
  }
  return `hace ${years} años y ${months} meses`;
}
