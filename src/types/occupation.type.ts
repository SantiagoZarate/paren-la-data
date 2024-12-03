import { occupation } from "@/db/schemas";
import { InferInsertModel } from "drizzle-orm";

export type OccupationRAW = InferInsertModel<typeof occupation>;
