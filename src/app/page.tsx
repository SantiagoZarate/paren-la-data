import { Container, Section } from "@/components/ui/craft";
import { db } from "@/db";
import { people } from "@/db/schemas";
import { guestService } from "@/service/guest.service";
import { peopleTeamsOccupationsSchemaDTO } from "@/shared/dto/people.dto";
import { eq } from "drizzle-orm";
import { BarChart } from "./BarChart";
import { GenderChart } from "./gender-chart";
import PeopleTable from "./people-table";
import { TotalGuestsChart } from "./TotalGuestsChart";

export default async function RootPage() {
  const guests = await db.query.people.findMany({
    where: eq(people.type, "invitado"),
    with: {
      teams: true,
      occupations: true,
    },
    limit: 50,
    offset: 150,
  });

  const parsedGuests = guests.map((n) =>
    peopleTeamsOccupationsSchemaDTO.parse({
      ...n,
      teams: n.teams.map((t) => t.teamName),
      occupations: n.occupations.map((o) => o.occupationName),
    })
  );

  const calculateChartData = () => {
    const teamMap: { [key: string]: string[] } = {};

    // Iterate through guests
    for (const guest of parsedGuests) {
      for (const team of guest.teams) {
        if (!teamMap[team]) {
          teamMap[team] = []; // Initialize with an empty array if not already initialized
        }
        teamMap[team] = [...teamMap[team], guest.name];
      }
    }

    // Convert teamMap to chartData array
    return Object.entries(teamMap).map(([equipo, guests]) => ({
      field: equipo,
      guests,
      guestsCount: guests.length,
    }));
  };

  const guestsDividedByYears = await guestService.getAllGuestsDividedByYears();

  const guestsDividedByOccupations =
    await guestService.getGuestsDividedByOccupation();

  return (
    <>
      <Section className="border-b bg-foreground-100">
        <Container>
          <h1>Paren la data</h1>
          <p>Siempre desde del respeto</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <PeopleTable guests={parsedGuests} />
        </Container>
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          <TotalGuestsChart
            data={guestsDividedByYears.map((g) => ({
              ...g,
              guestsCount: g.guests.length,
            }))}
          />
          <GenderChart
            data={await guestService.getGuestCountDividedByGender()}
          />
        </Container>
        <Container>
          <BarChart
            title="Cantidad de invitados por equipo | Top 10"
            chartData={calculateChartData()
              .sort((a, b) => b.guestsCount - a.guestsCount)
              .slice(0, 10)}
          />
        </Container>
        <Container>
          <BarChart
            title="Profesiones mas populares | Top 10"
            chartData={guestsDividedByOccupations
              .sort((a, b) => b.guests.length - a.guests.length)
              .slice(0, 10)
              .map((n) => ({
                field: n.occupation,
                guests: n.guests,
                guestsCount: n.guests.length,
              }))}
          />
        </Container>
      </Section>
    </>
  );
}
