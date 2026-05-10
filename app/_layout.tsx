import { Stack } from "expo-router";

/**
 * _layout.tsx — Raíz de Expo Router.
 * Acá se declaran TODAS las pantallas de la app.
 * headerShown: false en todas porque AppHeader maneja el header propio.
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      {/* Patient */}
      <Stack.Screen name="home" />
      <Stack.Screen name="medications" />
      <Stack.Screen name="adherence" />
      <Stack.Screen name="adverse-effects" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />

      {/* Nurse */}
      <Stack.Screen name="nurse-dashboard" />
      <Stack.Screen name="patient-list" />
      <Stack.Screen name="education" />
    </Stack>
  );
}
