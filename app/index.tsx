import { Redirect } from "expo-router";

/**
 * index.tsx — Punto de entrada.
 * Redirige automáticamente a /login.
 * Cuando tengas auth implementado, cambiá esto por:
 *   isLoggedIn ? <Redirect href="/home" /> : <Redirect href="/login" />
 */
export default function Index() {
  return <Redirect href="/login" />;
}