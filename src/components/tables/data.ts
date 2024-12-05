const columns = [
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Edad", uid: "birthDate", sortable: true },
  { name: "Hincha de", uid: "teams" },
  { name: "Profesión", uid: "occupations" },
];

export { columns };

// Extract the valid column keys
export type ColumnKey = (typeof columns)[number]["uid"];
