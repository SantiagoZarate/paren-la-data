const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "TEAM", uid: "teams" },
] as const; // Use `as const` to make it readonly and preserve literal types

export { columns };

// Extract the valid column keys
export type ColumnKey = (typeof columns)[number]["uid"];
