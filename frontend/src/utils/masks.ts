export function maskDatePTBR(value: string) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  return onlyNumbers
    .slice(0, 8)
    .replace(/(\d{2})(\d{1,2})(\d{1,4})/, `$1/$2/$3`);
}

export function maskPhone(value: string) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  return onlyNumbers
    .slice(0, 11)
    .replace(/(\d{2})(\d{4,5})(\d{1,4})/, "($1) $2-$3");
}

export function onlyNumbers(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export function maskName(name: string) {
  return name.slice(0, 40);
}

export function maskEmail(email: string) {
  return email.slice(0, 50);
}
