import { getFoods } from "./getFoods";

export const foodPaths = {
  "/foods": { get: getFoods },
};
