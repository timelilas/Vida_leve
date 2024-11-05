export interface UserEntity {
  id: number
  userName: string
  email: string
  senha: string
  telefone: string | null
  aniversario: Date | null
  sexo: "masculino" | "feminino" | null
}