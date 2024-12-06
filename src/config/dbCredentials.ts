import { Config } from "@libsql/client";
import path from "node:path";
import envs from "./envs";

let dbCredentials: Config;

if (envs.mode === "production") {
  dbCredentials = {
    url: envs.db.url,
    authToken: envs.db.token,
  };
} else {
  dbCredentials = {
    url: `file:${path.resolve(
      process.cwd(),
      // `../../../../src/db/local.${envs.mode}.db`
      `src/db/local.${envs.mode}.db`
    )}`,
  };
}

export { dbCredentials };
