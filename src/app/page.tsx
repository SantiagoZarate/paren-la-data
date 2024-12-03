import { Container, Section } from "@/components/ui/craft";
import { BancaFijaSchema, bancaFijaSchema } from "@/lib/zod/csv-validation";

export default async function RootPage() {
  const csv = await fetch("http://localhost:3000/csv/banca-fija.csv").then(
    (res) => res.text()
  );

  const miembros = csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [name, birthDate, age, job, location, team] = row.split(",");

      return bancaFijaSchema.parse({
        age: Number(age),
        birthDate,
        job,
        name,
        location,
        team,
      } satisfies BancaFijaSchema);
    });

  console.log({ miembros });

  return (
    <Section>
      <Container>
        <h1>Paren la data</h1>
        <p>Una nueva forma de ver todo</p>
      </Container>
    </Section>
  );
}
