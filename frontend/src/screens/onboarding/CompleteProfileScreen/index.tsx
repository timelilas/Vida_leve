import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { dateToPTBR } from "../../../utils/helpers";
import { HttpError } from "../../../@core/errors/httpError";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { SecureStorage } from "../../../services/secureStorage/SecureStorage";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { CommonActions } from "@react-navigation/native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useUser } from "../../../hooks/user/useUser";
import { ProfileForm } from "../../../components/ProfileForm";
import {
  ProfileFormData,
  ProfileFormSubmitData,
} from "../../../components/ProfileForm/types";
import { ScreenWrapper } from "../../../components/ScreenWrapper";

const CompleteProfileScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { user, isUpdatingProfile, updateUserProfile } = useUser({
    refetchOnMount: false,
  });

  const formInitialState: ProfileFormData = {
    name: user.name ?? "",
    phone: user.phone ?? "",
    gender: user.gender ?? null,
    birthDate: user.birthDate ? dateToPTBR(new Date(user.birthDate)) : "",
  };

  const navigation = useAppNavigation({ preventGoBack: isUpdatingProfile });

  function goBack() {
    SecureStorage.removeItem(STORAGE_ACCESS_TOKEN);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: RouteConstants.Welcome },
          { name: RouteConstants.Login },
        ],
      })
    );
  }

  function navigateToProgressForm() {
    navigation.navigate(RouteConstants.CreateProgress);
  }

  async function onSubmit(params: ProfileFormSubmitData) {
    if (isUpdatingProfile) return;

    const { name, phone, gender, birthDate } = params;
    await updateUserProfile({ name, phone, gender, birthDate });

    navigateToProgressForm();
  }

  async function handleApiError(error: Error) {
    if (!(error as HttpError).field) {
      showSnackbar({
        duration: 5000,
        message: error.message,
        variant: "error",
      });
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Queremos ter conhecer melhor" />
      <Paragraph style={styles.text}>
        Complete seu cadastro para tornarmos sua experiência mais personalizada.
      </Paragraph>
      <ProfileForm
        initialData={formInitialState}
        onSubmit={onSubmit}
        onError={handleApiError}
      />
    </ScreenWrapper>
  );
};

export default CompleteProfileScreen;
