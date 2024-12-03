export const PEOPLE_TYPE = ["invitado", "staff", "frecuente"] as const;

export type PeopleType = (typeof PEOPLE_TYPE)[number];
