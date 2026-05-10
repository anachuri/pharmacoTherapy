import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "María García",
  role: "nurse" as const,
  initials: "MG",
};

const PROFILE = {
  fullName:      "María García",
  email:         "m.garcia@hospital.com",
  phone:         "+54 388 421-7890",
  license:       "MP 45231",
  licenseStatus: "Vigente",
  specialty:     "Clínica médica",
  institution:   "Hospital Dr. Guillermo Paterson",
  shift:         "Mañana · 7:00 a 13:00 hs",
  experience:    "5 años",
  totalPatients: 8,
  alertPatients: 3,
};

export default function NurseProfileScreen() {
  return (
    <AppLayout title="Mi perfil" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Avatar + datos principales */}
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{MOCK_USER.initials}</Text>
            </View>
            <Text style={styles.name}>{PROFILE.fullName}</Text>
            <Text style={styles.role}>Enfermero/a · {PROFILE.specialty}</Text>
            <View style={styles.licenseBadge}>
              <Text style={styles.licenseBadgeText}>{PROFILE.license}</Text>
            </View>
          </View>
        </View>

        {/* Stats rápidos */}
        <View style={styles.statsRow}>
          {[
            { value: PROFILE.totalPatients.toString(), label: "Pacientes"  },
            { value: PROFILE.alertPatients.toString(), label: "Alertas", warn: true },
            { value: PROFILE.experience,               label: "Experiencia" },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statValue, s.warn && styles.statValueWarn]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Info detallada */}
        <View style={styles.card}>
          {[
            { label: "Email",       value: PROFILE.email         },
            { label: "Teléfono",    value: PROFILE.phone         },
            { label: "Institución", value: PROFILE.institution   },
            { label: "Turno",       value: PROFILE.shift         },
            { label: "Matrícula",   value: `${PROFILE.license} · ${PROFILE.licenseStatus}` },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.row, i < arr.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue} numberOfLines={1}>{row.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </TouchableOpacity>

      </ScrollView>
    </AppLayout>
  );
}

const PRIMARY = "#0F766E"; const DARK = "#134E4A"; const MUTED = "#5F7E7E"; const BORDER = "#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: BORDER },
  avatarWrap: { alignItems: "center", gap: 6 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 26, fontWeight: "700" },
  name: { fontSize: 18, fontWeight: "700", color: DARK },
  role: { fontSize: 13, color: MUTED },
  licenseBadge: {
    backgroundColor: "#E1F5F0", paddingHorizontal: 14,
    paddingVertical: 4, borderRadius: 20,
  },
  licenseBadgeText: { fontSize: 12, fontWeight: "700", color: "#085041" },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1, backgroundColor: "#fff", borderRadius: 12,
    padding: 12, alignItems: "center", borderWidth: 1, borderColor: BORDER,
  },
  statCardWarn: {
    flex: 1, backgroundColor: "#fff", borderRadius: 12,
    padding: 12, alignItems: "center", borderWidth: 1, borderColor: BORDER,
  },
  statValue: { fontSize: 22, fontWeight: "800", color: PRIMARY },
  statValueWarn: { color: "#D97706" },
  statLabel: { fontSize: 10, color: MUTED, marginTop: 2, textAlign: "center" },
  row: { flexDirection: "row", paddingVertical: 11, alignItems: "center" },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  rowLabel: { fontSize: 13, color: MUTED, width: 100 },
  rowValue: { fontSize: 13, color: DARK, fontWeight: "600", flex: 1, textAlign: "right" },
  editBtn: {
    backgroundColor: PRIMARY, borderRadius: 14, paddingVertical: 15, alignItems: "center",
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  editBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});