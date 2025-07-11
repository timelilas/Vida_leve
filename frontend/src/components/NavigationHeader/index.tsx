import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { HorizontalLogoSVG } from "../Logos/HorizontalLogoSVG";
import { SignoutIcon } from "../Icons/SignoutIcon";

interface CommonProps {
  onBack?: () => void;
  onClose?: () => void;
  onSignOut?: () => void;
}

interface TitledVariant extends CommonProps {
  variant: "titled";
  title: string;
  subtitle: string;
}

interface BrandedVariant extends CommonProps {
  variant: "branded";
}

interface DefaultVariant extends CommonProps {
  variant: "default";
}

type NavigationHeaderProps = TitledVariant | BrandedVariant | DefaultVariant;

export function NavigationHeader(props: NavigationHeaderProps) {
  const { variant, onBack, onClose, onSignOut } = props;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.navigatinContainer,
          variant === "titled" && styles.titleNavigationContainer
        ]}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <ArrowIcon />
          </TouchableOpacity>
        )}
        {variant === "titled" && (
          <View style={styles.titleBox}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
          </View>
        )}
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>
      {variant === "branded" && (
        <View style={[styles.brand, (onBack || onClose) && styles.brandNegativeMargin]}>
          <HorizontalLogoSVG />
        </View>
      )}
      {onSignOut && (
        <View style={styles.signoutButtonContainer}>
          <TouchableOpacity style={styles.signoutButton} onPress={onSignOut}>
            <SignoutIcon />
            <Text style={styles.signoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
