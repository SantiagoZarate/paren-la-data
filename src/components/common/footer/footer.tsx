import { DownloadIcon } from "@/components/icon/DownloadIcon";
import { GithubIcon } from "@/components/icon/GithubIcon";
import { Chip } from "@/components/ui/chip";
import { Container, Section } from "@/components/ui/craft";

export function Footer() {
  return (
    <Section>
      <Container className="border-t border-border">
        <footer className="flex justify-between flex-wrap gap-6">
          <section className="flex flex-col gap-4">
            <h3>Paren la data</h3>
            <p className="text-sm">
              Hecho por{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/santiago-zarate-dev/"
                className="underline"
              >
                Santiago Zarate
              </a>
            </p>
            <p className="text-sm">
              Dataset de{" "}
              <a
                target="_blank"
                href="https://x.com/santipeluzzo"
                className="underline"
              >
                @santipeluzzo
              </a>
            </p>
            <p className="text-sm">
              <a
                className="underline"
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1EGzRbX4WDjVFJoPk1TMpaysoiza9ikMd/edit?gid=402345902#gid=402345902"
              >
                Hace click aca para ver el dataset original
              </a>
            </p>
          </section>
          <nav className="flex flex-col gap-2">
            <a
              target="_blank"
              href="https://github.com/SantiagoZarate/paren-la-data"
            >
              <Chip className="font-bold gap-1 w-full hover:bg-muted transition">
                <GithubIcon />
                Github
              </Chip>
            </a>
            <a
              download="personas-paren-la-mano.csv"
              href="/csv/personas-paren-la-mano.csv"
            >
              <Chip className="font-bold gap-1 hover:bg-muted transition">
                <DownloadIcon />
                Descargar csv
              </Chip>
            </a>
          </nav>
        </footer>
      </Container>
    </Section>
  );
}
