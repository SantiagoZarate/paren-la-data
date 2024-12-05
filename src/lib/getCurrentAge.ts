import { differenceInYears } from "date-fns";

export function getCurrentAge(dateString: string) {
  const currentAge = differenceInYears(new Date(), dateString);
  return currentAge;
}
