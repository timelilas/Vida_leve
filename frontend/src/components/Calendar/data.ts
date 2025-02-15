export const mockedYears = new Array(100)
  .fill(null)
  .map((_, index) => ({ id: new Date().getUTCFullYear() - index }));

export const mockedMonths: Array<{ id: number; value: string }> = [
  { id: 1, value: "Janeiro" },
  { id: 2, value: "Fevereiro" },
  { id: 3, value: "Março" },
  { id: 4, value: "Abril" },
  { id: 5, value: "Maio" },
  { id: 6, value: "Junho" },
  { id: 7, value: "Julho" },
  { id: 8, value: "Agosto" },
  { id: 9, value: "Setembro" },
  { id: 10, value: "Outubro" },
  { id: 11, value: "Novembro" },
  { id: 12, value: "Dezembro" },
];
