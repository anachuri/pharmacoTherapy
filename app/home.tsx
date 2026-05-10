import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AppLayout from "./components/AppLayout";


// TODO: reemplazá esto con tu contexto de autenticación real
const MOCK_USER = {
  fullName: "Juan Pérez",
  role: "patient" as const,
  initials: "JP",
};

export default function HomeScreen() {
  return (
    <AppLayout title="Inicio" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Tarjeta de adherencia */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adherencia de hoy</Text>
          <Text style={styles.adherenceNumber}>78%</Text>
          <Text style={styles.cardSub}>3 de 4 medicamentos tomados</Text>
        </View>

        {/* Próximos medicamentos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próxima toma</Text>
          <Text style={styles.cardSub}>Losartán 50mg — 20:00 hs</Text>
        </View>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            ✏️ Acá va el contenido real de HomeScreen
          </Text>
        </View>

      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, gap: 14 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#C4DEDE",
  },
  cardTitle: { fontSize: 13, fontWeight: "700", color: "#134E4A", marginBottom: 6 },
  cardSub: { fontSize: 13, color: "#5F7E7E" },
  adherenceNumber: { fontSize: 40, fontWeight: "800", color: "#0F766E" },
  placeholder: {
    backgroundColor: "#F0FAFA",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4DEDE",
    borderStyle: "dashed",
  },
  placeholderText: { color: "#8AABAB", fontSize: 13 },
});