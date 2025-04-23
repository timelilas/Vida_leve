import { NavigationHeader } from "../../../components/NavigationHeader";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ProfileForm } from "../../../components/ProfileForm";
import { ProfileFormData, ProfileFormSubmitData } from "../../../components/ProfileForm/types";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { useUser } from "../../../hooks/user/useUser";
import { RouteConstants } from "../../../routes/types";
import { dateToPTBR } from "../../../utils/helpers";
import { styles } from "./styles";

const UpdateProfileScreen = () => {
  const navigation = useAppNavigation();
  const { user } = useUser({ refetchOnMount: false });

  const formInitialState: ProfileFormData = {
    name: user.name ?? "",
    phone: user.phone ?? "",
    gender: user.gender ?? null,
    birthDate: user.birthDate ? dateToPTBR(new Date(user.birthDate)) : ""
  };

  function goBack() {
    navigation.goBack();
  }

  async function onSubmit(params: ProfileFormSubmitData) {
    navigation.navigate(RouteConstants.UpdateProgress, {
      profileData: {
        name: params.name,
        phone: params.phone,
        birthDate: params.birthDate.toISOString(),
        gender: params.gender
      }
    });
  }

  return (
    <ScreenWrapper>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Mantenha seu perfil atualizado!" />
      <Paragraph style={styles.text}>
        Aqui você pode alterar seu nome e telefone. Lembre-se, a data de nascimento e o gênero
        são obrigatórios para calcular corretamente as suas calorias.
      </Paragraph>
      <ProfileForm initialData={formInitialState} onSubmit={onSubmit} />
    </ScreenWrapper>
  );
};

export default UpdateProfileScreen;
