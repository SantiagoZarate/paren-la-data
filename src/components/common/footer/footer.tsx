import { Container, Section } from "@/components/ui/craft";

export function Footer() {
  return (
    <Section>
      <Container className="border-t border-border">
        <footer>
          <section className="flex flex-col gap-4">
            <h3>Paren la data</h3>
            <p>
              Hecho por{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/santiago-zarate-dev/"
              >
                Santiago Zarate
              </a>
            </p>
            <p>
              Dataset de{" "}
              <a target="_blank" href="https://x.com/santipeluzzo">
                @santipeluzzo
              </a>
            </p>
            <p>
              <a
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1EGzRbX4WDjVFJoPk1TMpaysoiza9ikMd/edit?gid=402345902#gid=402345902"
              >
                Hace click aca para ver el dataset original
              </a>
            </p>
          </section>
          <nav></nav>
        </footer>
      </Container>
    </Section>
  );
}
