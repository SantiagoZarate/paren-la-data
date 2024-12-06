import { BriefcaseMiniIcon } from "@/components/icon/BriefcaseMiniIcon";
import { ShieldMiniIcon } from "@/components/icon/ShieldMiniIcon";
import LatestGuestsTable from "@/components/tables/latests-guests-table";
import { Container, Section } from "@/components/ui/craft";
import { guestService } from "@/service/guest.service";
import { BarChart } from "../components/charts/BarChart";
import { GenderChart } from "../components/charts/gender-chart";
import { GuestPieChart } from "../components/charts/guest-pie-chart";
import { GuestsPerMonthChart } from "../components/charts/guests-per-month-chart";

export default async function RootPage() {
  const latestsGuests = await guestService.getLatestGuests();

  const guestsDividedByTeams = await guestService.getGuestsDividedByTeams();

  const guestsDividedByYears = await guestService.getAllGuestsDividedByYears();

  const guestsDividedByOccupations =
    await guestService.getGuestsDividedByOccupation();

  const guestsPerMonth = await guestService.getGuestsPerMonth();

  const guestsPerAgeRange = await guestService.getGuestsPerAgeRange();

  const guestsAbroad = await guestService.getInternationalGuests();

  return (
    <>
      <Section className="border-b bg-foreground-100">
        <Container className="sm:pt-20">
          <h1>Paren la data</h1>
          <p>Siempre desde del respeto</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <LatestGuestsTable guests={latestsGuests} />
        </Container>
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          <GuestPieChart
            title="Invitados por año"
            data={guestsDividedByYears.map((g) => ({
              key: g.year,
              guestsCount: g.guests.length,
            }))}
          />
          <GenderChart
            data={await guestService.getGuestCountDividedByGender()}
          />
        </Container>
        <Container>
          <BarChart
            icon={<ShieldMiniIcon />}
            title="Cantidad de invitados por equipo | Top 10"
            chartData={guestsDividedByTeams.map((n) => ({
              field: n.name,
              guestsCount: n.total,
            }))}
          />
        </Container>
        <Container>
          <BarChart
            icon={<BriefcaseMiniIcon />}
            title="Profesiones mas populares | Top 10"
            chartData={guestsDividedByOccupations.map((n) => ({
              field: n.name,
              guestsCount: n.total,
            }))}
          />
        </Container>
        <Container>
          <GuestsPerMonthChart
            footer="* No se transmiten programas en Enero y Febrero"
            description="se tiene en cuenta todas las ediciones de PLM"
            title="Invitados por mes"
            data={guestsPerMonth.map((g) => ({
              guestsCount: g.guestsCount,
              key: g.month,
            }))}
          />
        </Container>
        <Container>
          <GuestsPerMonthChart
            footer="* Se calcula la edad actual, no la que tenian al momento de su primera participación"
            title="Invitados por rango etario"
            description="ej. Mayor de 18 menor de 25"
            shortLabel={false}
            data={guestsPerAgeRange.map((g) => ({
              guestsCount: g.guestsCount,
              key: g.range,
            }))}
          />
        </Container>
        <Container>
          <GuestPieChart
            title="Invitados nacidos afuera de Argentina"
            data={guestsAbroad.map((g) => ({
              key: g.country,
              guestsCount: g.guests_count,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
