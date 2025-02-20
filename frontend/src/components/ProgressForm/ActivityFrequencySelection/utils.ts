import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency/type";

export const activityFrequencies: {
  type: ActitivyFrequency;
  title: string;
  description: string;
}[] = [
  {
    type: "pouca",
    title: "Pouca atividade",
    description: "Pouco tempo em pé. p. ex. home office/escritório",
  },
  {
    type: "leve",
    title: "Atividade leve",
    description: "Quase sempre em pé. p. ex. professor(a)",
  },
  {
    type: "moderada",
    title: "Atividade moderada",
    description:
      "Frequentemente em movimento, p. ex. garçom/garçonete ou estoquista",
  },
  {
    type: "intensa",
    title: "Atividade intensa",
    description: "Fisicamente árduo. p. ex. construção civil",
  },
];
