import { parseGuest } from "@/lib/parseCSV";

async function seed() {
  // await db.delete(people);
  // await db.delete(people);

  const invitados2022 = await parseGuest("invitados-2022.csv");
  const invitados2023 = await parseGuest("invitados-2023.csv");
  const invitados2024 = await parseGuest("invitados-2024.csv");
  // console.log({ invitados2022 });
}

seed();
