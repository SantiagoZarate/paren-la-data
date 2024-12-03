const columns = [
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Edad", uid: "birthDate", sortable: true },
  { name: "Hincha de", uid: "teams" },
] as const; // Use `as const` to make it readonly and preserve literal types

export { columns };

// Extract the valid column keys
export type ColumnKey = (typeof columns)[number]["uid"];
