import { differenceInMonths, differenceInYears } from "date-fns";

export function getTimeDifference(newDate: string) {
  const date = new Date(newDate);
  const now = new Date();

  const years = differenceInYears(now, date);
  const months = differenceInMonths(now, date) % 12;

  if (years === 0) {
    if (months === 1) {
      return `hace ${months} mes`;
    }
    return `hace ${months} meses`;
  }
  return `hace ${years} años y ${months} meses`;
}
