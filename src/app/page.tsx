import { Container, Section } from "@/components/ui/craft";
import { db } from "@/db";
import { people } from "@/db/schemas";
import { eq } from "drizzle-orm";

export default async function RootPage() {
  const guests = await db.query.people.findMany({
    where: eq(people.type, "invitado"),
  });

  return (
    <Section>
      <Container>
        <h1>Paren la data</h1>
        <p>Una nueva forma de ver todo</p>
      </Container>
      <Container>
        <ul className="flex flex-col divide-y">
          {guests.map((guest) => (
            <li key={guest.id}>
              <p>{guest.name}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
