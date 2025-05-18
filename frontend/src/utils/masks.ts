export function maskDatePTBR(value: string) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");

  if (onlyNumbers.length < 5) {
    return onlyNumbers.slice(0, 8).replace(/(\d{2})(\d{1,2})/, `$1/$2`);
  }

  return onlyNumbers.slice(0, 8).replace(/(\d{2})(\d{1,2})(\d{1,4})/, `$1/$2/$3`);
}

export function maskPhone(value: string) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  if (onlyNumbers.length < 8) {
    return onlyNumbers.slice(0, 11).replace(/(\d{2})(\d{1,5})/, "($1) $2");
  }
  return onlyNumbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
}

export function onlyNumbers(value: string, length?: number) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  return length ? onlyNumbers.slice(0, length) : onlyNumbers;
}

export function maskName(name: string) {
  return name.slice(0, 30);
}

export function maskEmail(email: string) {
  return email.slice(0, 50);
}

export function maskHeight(value: string) {
  const maskedNumbers = `${onlyNumbers(value)}`.slice(0, 3);
  const maskedHeight = maskedNumbers.replace(/(\d{1})(\d{1,2})/, "$1.$2");
  return maskedHeight;
}
