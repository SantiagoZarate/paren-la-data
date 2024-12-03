import { Container, Section } from "@/components/ui/craft";

export default async function RootPage() {
  const csv = await fetch(
    "http://localhost:3000/public/invitados-paren-la-mano.csv"
  ).then((res) => res.text());

  console.log(csv);

  return (
    <Section>
      <Container>
        <h1>Paren la data</h1>
        <p>Una nueva forma de ver todo</p>
      </Container>
    </Section>
  );
}
