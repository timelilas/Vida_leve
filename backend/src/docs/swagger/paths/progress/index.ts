import { getProgress } from "./getProgress";
import { setDefaultCaloriePlan } from "./setCaloriePlan";
import { upsertProgress } from "./upsertProgress";

export const progressPaths = {
  "/progress": { get: getProgress, post: upsertProgress },
  "/progress/plan": { patch: setDefaultCaloriePlan },
};
