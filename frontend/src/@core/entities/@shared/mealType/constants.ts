const validMealTypes = [
  "cafe-da-manha",
  "lanche",
  "almoco",
  "jantar",
  "outro",
] as const;

interface Meal {
  id: string;
  type: "jantar";
}
