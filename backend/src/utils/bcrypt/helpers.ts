import * as bcrypt from "bcrypt"


export const hashString = async (value: string)=>{
  const hashedString = await bcrypt.hash(value, 12)
  return hashedString
}

export const compareHash = async (value: string, hashedValue: string)=>{
  const isValid = await bcrypt.compare(value, hashedValue)
  return isValid
}