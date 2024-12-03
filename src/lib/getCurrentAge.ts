import { differenceInYears, parse } from "date-fns";

export function getCurrentAge(dateString: string) {
  const birthDate = parse(dateString, "M/d/yyyy", new Date()); // Convert the string to a Date object
  const currentAge = differenceInYears(new Date(), birthDate);
  return currentAge;
}
