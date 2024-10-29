import z, { ZodError } from "zod"

const requiredMsg = () => "É um campo obrigatório"
const minLengthMsg = (min: number) => `Deve conter no mínimo ${min} caractere(s)`
const maxLengthMsg = (max: number) => `Deve conter no máximo ${max} caractere(s)`
const lengthMsg = (length: number) => `Deve ter exatamente ${length} caracteres`
const invalidEmailMsg = () => "É um campo de email inválido"
const invalidDateMsg = () => "É uma data inválida"
const minSizeMsg =(min: number)=> `Deve ser maior ou igual a ${min}`
const maxSizeMsg =(max: number)=> `Deve ser menor ou igual a ${max}`
const stringMsg =()=> `Deve ser uma string`
const booleanMsg =()=> `Deve ser um booleano`
const numberMsg =()=> `Deve ser um número`


export class ZodHelper {
    public static boolean() {
        return z.boolean({ required_error: requiredMsg(), invalid_type_error: booleanMsg() })
    }

    public static date(){
      return z.date({required_error: requiredMsg(), message: invalidDateMsg()})
    }

    public static number(min: number, max?: number) {
        const base = z
            .number({ required_error: requiredMsg(), invalid_type_error: numberMsg()})
            .gte(min, minSizeMsg(min))
        return max ? base.lte(max, maxSizeMsg(max)) : base
    }

    public static string(min: number, max?: number) {
        return this.baseString(min, max).refine(
            (input) => input.replace(/[^À-ú\w]|_/g, "").length >= min,
            { message: `Deve conter no mínimo ${min} caracteres sem símbolos` }
        )
    }

    public static email(max?: number) {
        const baseEmail = z
            .string({ required_error: requiredMsg(), invalid_type_error: stringMsg() })
            .email(invalidEmailMsg())
        return max ? baseEmail.max(max, maxLengthMsg(max)) : baseEmail
    }

    public static password(min: number, max: number) {
        return this.baseString(min, max).refine(
            (password) => password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/g),
            { message: "Deve conter ao menos 1 letra maiúscula, 1 número, e 1 caractere especial" }
        )
    }

    public static phone(length: number){
      return z
        .string({required_error:requiredMsg(), invalid_type_error: stringMsg()})
        .length(length, lengthMsg(length))
        .refine(
            (phone)=>phone.match(/^[0-9]+$/g), 
            {message: "Deve conter apenas caracteres numéricos"}
        )
    }

    public static formatZodError(error: ZodError): string[] {
        const errors: string[] = []
        for (const issue of error.issues) {
            if (issue.path.length) {
                const path = issue.path.join(".")
                errors.push(
                    `${path[0].toUpperCase()}${path.slice(1)} ${issue.message.toLowerCase()}`
                )
            } else {
                const key = (issue as {keys: string[]}).keys.join(".")
                errors.push(
                    `${key[0].toUpperCase()}${key.slice(1)} ${issue.message.toLowerCase()}`)
            }
        }

        return errors
    }

    private static baseString(min: number, max?: number) {
        const base = z
            .string({ required_error: requiredMsg(), invalid_type_error: stringMsg() })
            .min(min, minLengthMsg(min))
        return (max ? base.max(max, maxLengthMsg(max)) : base).trim()
    }
}