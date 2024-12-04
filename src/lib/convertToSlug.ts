export function convertToSlug(text: string) {
  return text
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/'/g, "") // Elimina apóstrofes
    .replace(/[^a-záéíóúüñ0-9\s-]/g, "") // Conserva letras con acentos, la ñ y dígitos
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/-+/g, "-"); // Reemplaza múltiples guiones por uno solo
}

// function convertToSlug(text) {
//   return text
//     .toLowerCase() // Convierte todo a minúsculas
//     .replace(/'/g, "") // Elimina apóstrofes
//     .replace(/[^a-záéíóúüñ0-9\s-]/g, "") // Conserva letras con acentos, la ñ y dígitos
//     .replace(/\s+/g, "-") // Reemplaza espacios con guiones
//     .replace(/-+/g, "-"); // Reemplaza múltiples guiones por uno solo
// }
