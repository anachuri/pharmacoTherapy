import { useNavigation } from "expo-router";
import AppLayout from "./components/AppLayout";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <AppLayout title="Inicio" currentRoute="Home" onNavigate={navigation.navigate} >
      <Text>Contenido del home acá</Text>
    </AppLayout>
  );
}