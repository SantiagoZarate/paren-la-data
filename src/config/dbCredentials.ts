import { Config } from "@libsql/client";
import path from "node:path";
import envs from "./envs";

let dbCredentials: Config;

console.log({ __dirname });

if (envs.mode === "production") {
  dbCredentials = {
    url: envs.db.url,
    authToken: envs.db.token,
  };
} else {
  dbCredentials = {
    url: `file:${path.resolve(__dirname + `/../db/local.${envs.mode}.db`)}`,
  };
}

export { dbCredentials };
