export const requiredMsg = (field: string) => `${field} é um campo obrigatório.`;

export const minLengthMsg = (field: string, min: number) =>
  `${field} deve conter no mínimo ${min} caractere(s).`;

export const maxLengthMsg = (field: string, max: number) =>
  `${field} deve conter no máximo ${max} caractere(s).`;

export const lengthMsg = (field: string, length: number) =>
  `${field} deve ter exatamente ${length} caracteres.`;

export const invalidEmailMsg = () =>
  "O formato do e-mail está incorreto. Tente novamente assim: exemplo@dominio.com.";

export const invalidDateMsg = () => "Data inválida.";

export const minSizeMsg = (field: string, min: number) =>
  `${field} deve ser maior ou igual a ${min}.`;

export const maxSizeMsg = (field: string, max: number) =>
  `${field} deve ser menor ou igual a ${max}.`;

export const stringMsg = (field: string) => `${field} deve ser uma string.`;

export const booleanMsg = (field: string) => `${field} deve ser um booleano.`;

export const numberMsg = (field: string) => `${field} Deve ser um número.`;
