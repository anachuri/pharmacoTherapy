import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import AppHeader from "./AppHeader";
import DrawerMenu, { DrawerUser, RouteKey } from "./DrawerMenu";

interface AppLayoutProps {
  title: string;
  user: DrawerUser;
  onLogout?: () => void;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

/**
 * AppLayout — wrapper que usás dentro de cada pantalla.
 * Detecta automáticamente la ruta actual con usePathname().
 *
 * Ejemplo:
 *   export default function HomeScreen() {
 *     return (
 *       <AppLayout title="Inicio" user={currentUser}>
 *         <Text>Contenido acá</Text>
 *       </AppLayout>
 *     );
 *   }
 */
export default function AppLayout({
  title,
  user,
  onLogout,
  children,
  headerRight,
}: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Expo Router te da el pathname actual: "/home", "/medications", etc.
  // Sacamos el "/" del inicio para matchear con RouteKey
  const pathname = usePathname();
  const currentRoute = pathname.replace("/", "") as RouteKey;

  const handleLogout = () => {
    setDrawerOpen(false);
    onLogout?.();
    // Reemplaza el historial completo y manda al login
    router.replace("/login");
  };

  return (
    <View style={styles.root}>
      <AppHeader
        title={title}
        onOpenDrawer={() => setDrawerOpen(true)}
        rightElement={headerRight}
      />

      <View style={styles.content}>{children}</View>

      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentRoute={currentRoute}
        onLogout={handleLogout}
        user={user}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});