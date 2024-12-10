export function toCapitalized(input: string): string {
  return `${input[0].toUpperCase()}${input.slice(1).toLocaleLowerCase()}`;
}

export function numberToMonth(number: number): string {
  return Intl.DateTimeFormat("pt-br", { month: "long" }).format(
    new Date().setMonth(number - 1)
  );
}

export function dateToPTBR(date: Date) {
  const day = `0${date.getUTCDate()}`.slice(-2);
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
