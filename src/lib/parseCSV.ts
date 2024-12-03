import { PeopleCSVScheam, peopleSchema } from "./zod/csv-validation";

const BASE_URL = "http://localhost:3000/csv/";

export async function parseGuest(url: string) {
  const csv = await fetch(BASE_URL + url).then((res) => res.text());

  return csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [
        name,
        birthDate,
        appearanceDate,
        _age,
        occupations,
        location,
        country,
        teams,
      ] = row.split(",");

      const parsedOccupations =
        occupations
          ?.trim()
          .split("/")
          .map((item) => item.trim()) ?? [];

      const parsedTeams =
        teams
          ?.trim()
          .split("/")
          .map((item) => item.trim()) ?? [];

      return peopleSchema.parse({
        occupations: parsedOccupations,
        teams: parsedTeams,
        appearanceDate,
        birthDate,
        location,
        country,
        name,
      } satisfies PeopleCSVScheam);
    });
}
