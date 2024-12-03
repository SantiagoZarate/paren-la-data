import { people } from "@/db/schemas";
import { InferInsertModel } from "drizzle-orm";

export type PeopleRAW = Required<InferInsertModel<typeof people>>;

export type PeopleDTO = PeopleRAW;
