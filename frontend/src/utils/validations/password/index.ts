export function validatePasswordLength(password: string): boolean {
  return password.length > 7;
}

export function validateUppercasePassword(password: string): boolean {
  return !!password.match(/[A-ZÀ-Ý]/g);
}

export function validateLowercasePassword(password: string): boolean {
  return !!password.match(/[a-zà-ý]/g);
}

export function validateNumericPassword(password: string): boolean {
  return !!password.match(/[0-9]/g);
}

export function validatePasswordSymbols(password: string): boolean {
  return !!password.match(/[\!|\@|\#|\$|\%|\^|\&|\*|\.|\,]/g);
}
