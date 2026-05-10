import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "Juan Pérez",
  role: "patient" as const,
  initials: "JP",
};

export default function Screen() {
  return (
    <AppLayout title="Mi perfil" user={MOCK_USER}>
      <View style={styles.center}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.sub}>Acá va el contenido de esta pantalla</Text>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  icon: { fontSize: 48 },
  title: { fontSize: 20, fontWeight: "700", color: "#134E4A" },
  sub: { fontSize: 14, color: "#5F7E7E" },
});