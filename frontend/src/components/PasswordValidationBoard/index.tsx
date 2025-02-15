import { View } from "react-native";
import { styles } from "./styles";
import { BoardItem } from "./BoardItem";
import {
  validateLowercasePassword,
  validateNumericPassword,
  validatePasswordLength,
  validatePasswordSymbols,
  validateUppercasePassword,
} from "../../utils/validations/password";

interface ValidationBoardProps {
  password: string;
  enabled: boolean;
}

export function PasswordValidationBoard(props: ValidationBoardProps) {
  const { enabled, password } = props;

  const withValidLength = validatePasswordLength(password);
  const withUppercase = validateUppercasePassword(password);
  const withLowercase = validateLowercasePassword(password);
  const withNumbers = validateNumericPassword(password);
  const withSymbols = validatePasswordSymbols(password);

  const semiValid = withUppercase && withLowercase && withNumbers;
  const fullValid = withValidLength && semiValid && withSymbols;

  return (
    <View style={styles.container}>
      <BoardItem
        state={enabled ? (fullValid ? "valid" : "invalid") : undefined}
        message="Sua senha deve conter:"
      />
      <View style={styles.nestedContainer}>
        <BoardItem
          state={enabled ? (withValidLength ? "valid" : "invalid") : undefined}
          message={`\u2022 Pelo menos 8 caracteres de extensão`}
        />
        <BoardItem
          state={enabled ? (semiValid ? "valid" : "invalid") : undefined}
          message={`\u2022 Pelo menos 3 dos seguintes:`}
        />
        <View style={styles.deepNestedContainer}>
          <BoardItem
            state={enabled ? (withLowercase ? "valid" : "invalid") : undefined}
            message="Letras minúsculas (a-z)"
          />
          <BoardItem
            state={enabled ? (withUppercase ? "valid" : "invalid") : undefined}
            message="Letras maiúsculas (A-Z)"
          />
          <BoardItem
            state={enabled ? (withNumbers ? "valid" : "invalid") : undefined}
            message="Números (0-9)"
          />
        </View>
        <BoardItem
          state={enabled ? (withSymbols ? "valid" : "invalid") : undefined}
          message={`\u2022 Caracteres especiais (ex: !@#$%^&*.,)`}
        />
      </View>
    </View>
  );
}
