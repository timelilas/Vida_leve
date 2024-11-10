export function toCapitalized(input: string): string {
  return `${input[0].toUpperCase()}${input.slice(1).toLocaleLowerCase()}`;
}

export function numberToMonth(number: number): string {
  return Intl.DateTimeFormat("pt-br", { month: "long" }).format(
    new Date().setMonth(number - 1)
  );
}

export function dateToPTBR(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
