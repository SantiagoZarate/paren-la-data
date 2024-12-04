import { format, parse } from "date-fns";

export function reestructureDateToISO(inputDate: string) {
  console.log({ inputDate });

  const parsedDate = parse(inputDate, "MM/dd/yyyy", new Date());
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  console.log(formattedDate);

  return formattedDate;
}
