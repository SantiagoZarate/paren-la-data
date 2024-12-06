import PeopleTable from "@/components/tables/people-table";
import { Container, Section } from "@/components/ui/craft";
import { guestService } from "@/service/guest.service";

export default async function InvitadosPage() {
  const guests = await guestService.getAll();

  return (
    <Section>
      <Container>
        <PeopleTable guests={guests} />
      </Container>
    </Section>
  );
}
