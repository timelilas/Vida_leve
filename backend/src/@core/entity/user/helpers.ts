export class UserHelper {
  public static validateAge(birthDate: Date): boolean {
    const age = UserHelper.calculateAge(birthDate);
    return age >= 18 && age <= 90;
  }

  public static calculateAge(birthDate: Date): number {
    const currentLocalDate = new Date().toLocaleDateString("pt-br");

    const [currentDay, currentMonth, currentYear] = currentLocalDate.split("/");
    const [birthDay, birthMonth, birthYear] = birthDate
      .toLocaleDateString("pt-br", { timeZone: "UTC" })
      .split("/");

    const isAfterBirthMonth = parseInt(currentMonth) > parseInt(birthMonth);
    const isEqualBirthMonth = parseInt(currentMonth) === parseInt(birthMonth);
    const isAfterBirthDay = parseInt(currentDay) >= parseInt(birthDay);
    const decrementFactor =
      isAfterBirthMonth || (isEqualBirthMonth && isAfterBirthDay) ? 0 : 1;

    const age = parseInt(currentYear) - parseInt(birthYear) - decrementFactor;
    return age;
  }
}
