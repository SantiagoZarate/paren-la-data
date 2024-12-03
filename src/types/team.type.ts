import { team } from "@/db/schemas";
import { InferInsertModel } from "drizzle-orm";

export type TeamRAW = Required<InferInsertModel<typeof team>>;
