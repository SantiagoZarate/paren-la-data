import { Container, Section } from "@/components/ui/craft";
import { guestService } from "@/service/guest.service";
import { BarChart } from "./BarChart";
import { GenderChart } from "./gender-chart";
import PeopleTable from "./people-table";
import { TotalGuestsChart } from "./TotalGuestsChart";

export default async function RootPage() {
  const latestsGuests = await guestService.getLatestGuests();

  const guestsDividedByTeams = await guestService.getGuestsDividedByTeams();

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
          <PeopleTable guests={latestsGuests} />
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
            chartData={guestsDividedByTeams.map((n) => ({
              field: n.name,
              guestsCount: n.total,
            }))}
          />
        </Container>
        <Container>
          <BarChart
            title="Profesiones mas populares | Top 10"
            chartData={guestsDividedByOccupations.map((n) => ({
              field: n.name,
              guestsCount: n.total,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
