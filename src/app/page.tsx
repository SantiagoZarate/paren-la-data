import { Container, Section } from "@/components/ui/craft";
import { db } from "@/db";
import { people } from "@/db/schemas";
import { peopleTeamsOccupationsSchemaDTO } from "@/shared/dto/people.dto";
import { eq } from "drizzle-orm";
import { BarChart } from "./BarChart";
import PeopleTable from "./people-table";

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
    return Object.entries(teamMap).map(([equipo, invitados]) => ({
      equipo,
      invitados,
      cantidad: invitados.length,
    }));
  };

  console.log({ parsedGuests });

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
        {/* <Container>
          <TotalGuestsChart data={} />
        </Container> */}
        <Container>
          <BarChart
            chartData={calculateChartData()
              .sort((a, b) => b.invitados.length - a.invitados.length)
              .slice(0, 10)}
          />
        </Container>
      </Section>
    </>
  );
}
