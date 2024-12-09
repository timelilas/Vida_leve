import { ActitivyFrequency } from "../../../@core/progress/progress";

export const missingProfileFormField =
  "Opps! Algo inesperado aconteceu, por favor, verifique se as informações do formulário anterior foram preenchidas.";

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
    description: "Quase sempre em pé. p. ex. professor(a)/ atendente",
  },
  {
    type: "intensa",
    title: "Atividade intensa",
    description: "Fisicamente árduo. p. ex. construção civil",
  },
];
