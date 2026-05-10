import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

interface DoseItem {
  id: string; name: string; dose: string;
  route: string; time: string; taken: boolean;
}

const TODAY_MEDS: DoseItem[] = [
  { id: "1", name: "Enalapril",   dose: "10mg",  route: "Oral", time: "08:00", taken: true  },
  { id: "2", name: "Metformina",  dose: "500mg", route: "Oral", time: "08:00", taken: true  },
  { id: "3", name: "Aspirina",    dose: "100mg", route: "Oral", time: "12:00", taken: true  },
  { id: "4", name: "Losartán",    dose: "50mg",  route: "Oral", time: "20:00", taken: false },
];

export default function HomeScreen() {
  const [meds, setMeds] = useState(TODAY_MEDS);

  const taken = meds.filter((m) => m.taken).length;
  const total = meds.length;
  const pct = Math.round((taken / total) * 100);
  const next = meds.find((m) => !m.taken);

  const markTaken = (id: string) =>
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, taken: true } : m)));

  return (
    <AppLayout title="Inicio" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.greeting}>Buenos días, Juan 👋</Text>

        {/* Adherence ring */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adherencia de hoy</Text>
          <View style={styles.ringRow}>
            <View style={styles.ringWrap}>
              <Text style={styles.ringPct}>{pct}%</Text>
            </View>
            <View>
              <Text style={styles.ringBig}>
                {taken}/{total}
              </Text>
              <Text style={styles.ringSub}>tomados hoy</Text>
            </View>
          </View>
        </View>

        {/* Next dose banner */}
        {next && (
          <View style={styles.warnBanner}>
            <Text style={styles.warnTitle}>Próxima toma — {next.time} hs</Text>
            <Text style={styles.warnSub}>
              {next.name} {next.dose}
            </Text>
          </View>
        )}

        {/* Today's meds */}
        <Text style={styles.sectionLabel}>Medicamentos de hoy</Text>
        <View style={styles.card}>
          {meds.map((m, i) => (
            <View
              key={m.id}
              style={[styles.medItem, i < meds.length - 1 && styles.medBorder]}
            >
              <View
                style={[styles.dot, m.taken ? styles.dotOk : styles.dotPend]}
              />
              <View style={styles.medInfo}>
                <Text style={styles.medName}>
                  {m.name} {m.dose}
                </Text>
                <Text style={styles.medSub}>
                  {m.route} · {m.time} hs
                </Text>
              </View>
              {m.taken ? (
                <View style={styles.tagOk}>
                  <Text style={styles.tagOkText}>Tomado</Text>
                </View>
              ) : 
              (
                <TouchableOpacity
                  style={styles.markBtn}
                  onPress={() => markTaken(m.id)}>
                  <Text style={styles.markBtnText}>Marcar tomado</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const PRIMARY = "#0F766E"; const DARK = "#134E4A"; const MUTED = "#5F7E7E"; const BORDER = "#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 10 },
  greeting: { fontSize: 16, fontWeight: "700", color: DARK },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  cardTitle: { fontSize: 12, fontWeight: "700", color: DARK, marginBottom: 10 },
  ringRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  ringWrap: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 6, borderColor: "#E1F5F0",
    borderTopColor: PRIMARY, alignItems: "center", justifyContent: "center",
  },
  ringPct: { fontSize: 14, fontWeight: "800", color: PRIMARY },
  ringBig: { fontSize: 28, fontWeight: "800", color: PRIMARY },
  ringSub: { fontSize: 11, color: MUTED },
  warnBanner: {
    backgroundColor: "#FEF3C7", borderLeftWidth: 3, borderLeftColor: "#D97706",
    borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 10,
  },
  warnTitle: { fontSize: 12, fontWeight: "700", color: "#92400E" },
  warnSub: { fontSize: 11, color: "#B45309", marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.4 },
  medItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 },
  medBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOk: { backgroundColor: PRIMARY },
  dotPend: { backgroundColor: "#D97706" },
  medInfo: { flex: 1 },
  medName: { fontSize: 12, fontWeight: "700", color: DARK },
  medSub: { fontSize: 10, color: MUTED },
  tagOk: { backgroundColor: "#E1F5F0", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tagOkText: { fontSize: 10, fontWeight: "700", color: "#085041" },
  markBtn: { backgroundColor: PRIMARY, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  markBtnText: { fontSize: 10, fontWeight: "700", color: "#fff" },
});