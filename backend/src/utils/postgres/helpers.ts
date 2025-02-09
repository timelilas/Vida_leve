export function transformNameIntoSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]|\,/g, "")
    .replace(/\s\-\s/g, "-")
    .replace(/\s/g, "-");
}
