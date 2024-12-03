import { Container, Section } from "@/components/ui/craft";

export default async function RootPage() {
  const csv = await fetch("http://localhost:3000/csv/banca-fija.csv").then(
    (res) => res.text()
  );

  const miembros = csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [name, birthDate, age, profession, location, team] = row.split(",");

      return {
        name,
        birthDate,
        age,
        profession,
        location,
        team,
      };
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
