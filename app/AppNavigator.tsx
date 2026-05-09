import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./login";
import RegisterScreen from "./register";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="registro" component={RegisterScreen} />
    </Stack.Navigator>
  );
}