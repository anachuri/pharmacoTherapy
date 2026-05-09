/**
 * AppLayout.tsx
 *
 * Wrapper de layout que combina AppHeader + DrawerMenu.
 * Usalo en cada pantalla que necesite navegación:
 *
 *   <AppLayout title="Inicio" currentRoute="Home" onNavigate={navigate} user={user}>
 *     <HomeContent />
 *   </AppLayout>
 */

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "./AppHeader";
import DrawerMenu, { RouteKey } from "./DrawerMenu";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "patient" | "nurse";

interface User {
  fullName: string;
  role: Role;
  initials: string;
}

interface AppLayoutProps {
  title: string;
  currentRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
  onLogout: () => void;
  user: User;
  children: React.ReactNode;
  /** Optional element placed on the right side of the header (e.g. a bell icon) */
  headerRight?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AppLayout({
  title,
  currentRoute,
  onNavigate,
  onLogout,
  user,
  children,
  headerRight,
}: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View style={styles.root}>
      {/* Header with burger button */}
      <AppHeader
        title={title}
        onOpenDrawer={() => setDrawerOpen(true)}
        rightElement={headerRight}
      />

      {/* Screen content */}
      <View style={styles.content}>{children}</View>

      {/* Drawer overlay — rendered on top of content */}
      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onLogout={onLogout}
        user={user}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE in a screen with React Navigation:
// ─────────────────────────────────────────────────────────────────────────────
//
// import { useNavigation } from "@react-navigation/native";
// import AppLayout from "../components/AppLayout";
//
// export default function HomeScreen() {
//   const navigation = useNavigation<any>();
//
//   const user = {
//     fullName: "Juan Pérez",
//     role: "patient" as const,
//     initials: "JP",
//   };
//
//   const handleNavigate = (route: RouteKey) => {
//     navigation.navigate(route);
//   };
//
//   const handleLogout = () => {
//     // clear auth state, navigate to Login
//     navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//   };
//
//   return (
//     <AppLayout
//       title="Inicio"
//       currentRoute="Home"
//       onNavigate={handleNavigate}
//       onLogout={handleLogout}
//       user={user}
//     >
//       {/* Your screen content here */}
//       <View style={{ flex: 1, padding: 20 }}>
//         <Text>Contenido de la pantalla</Text>
//       </View>
//     </AppLayout>
//   );
// }
