import { Container, Section } from "@/components/ui/craft";
import { db } from "@/db";
import { people } from "@/db/schemas";
import { peopleTeamsOccupationsSchemaDTO } from "@/shared/dto/people.dto";
import { eq } from "drizzle-orm";
import PeopleTable from "./people-table";

export default async function RootPage() {
  const guests = await db.query.people.findMany({
    where: eq(people.type, "invitado"),
    with: {
      teams: true,
      occupations: true,
    },
    limit: 50,
  });

  const parsedGuests = guests.map((n) =>
    peopleTeamsOccupationsSchemaDTO.parse({
      ...n,
      teams: n.teams.map((t) => t.teamName),
    })
  );

  parsedGuests.forEach((n) => console.log(n.teams));

  return (
    <Section>
      <Container>
        <h1>Paren la data</h1>
        <p>Siempre desde del respeto</p>
      </Container>
      <Container>
        <PeopleTable guests={parsedGuests} />
      </Container>
    </Section>
  );
}
