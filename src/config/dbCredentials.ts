import { Config } from "@libsql/client";
import envs from "./envs";

let dbCredentials: Config;

if (envs.mode === "production") {
  dbCredentials = {
    url: envs.db.url,
    authToken: envs.db.token,
  };
} else {
  dbCredentials = {
    url: `file:../db/local.${envs.mode}.db`,
  };
}

export { dbCredentials };
