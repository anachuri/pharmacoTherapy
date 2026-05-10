import React from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "María García",
  role: "nurse" as const,
  initials: "MG",
};

interface PatientSummary {
  id: string;
  initials: string;
  name: string;
  condition: string;
  adherence: number | null;
  hasAlert: boolean;
}

const MOCK_PATIENTS: PatientSummary[] = [
  { id: "1", initials: "JP", name: "Juan Pérez",    condition: "Diabetes",      adherence: 91,   hasAlert: false },
  { id: "2", initials: "LG", name: "Lucía Gómez",   condition: "Polifarmacia",  adherence: 78,   hasAlert: false },
  { id: "3", initials: "CM", name: "Carlos Méndez", condition: "Hipertensión",  adherence: 32,   hasAlert: true  },
  { id: "4", initials: "RV", name: "Rosa Villalba", condition: "Diabetes",      adherence: null, hasAlert: true  },
  { id: "5", initials: "MR", name: "Marta Ruiz",    condition: "Adulto mayor",  adherence: 65,   hasAlert: false },
];

export default function NurseDashboardScreen() {
  const total      = MOCK_PATIENTS.length;
  const adherentes = MOCK_PATIENTS.filter(p => p.adherence !== null && p.adherence >= 60).length;
  const alertas    = MOCK_PATIENTS.filter(p => p.hasAlert).length;
  const alertList  = MOCK_PATIENTS.filter(p => p.hasAlert);
  const recent     = MOCK_PATIENTS.filter(p => !p.hasAlert).slice(0, 3);

  return (
    <AppLayout title="Dashboard" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard label="Pacientes" value={total} color={DARK} />
          <StatCard label="Adherentes" value={adherentes} color={PRIMARY} />
          <StatCard label="Alertas" value={alertas} color={WARN} />
        </View>

        {/* Alerts */}
        <Text style={styles.sectionLabel}>⚠ Requieren atención</Text>
        {alertList.map(p => (
          <TouchableOpacity key={p.id} style={styles.alertCard} activeOpacity={0.7}>
            <Text style={styles.alertName}>{p.name}</Text>
            <Text style={styles.alertSub}>
              {p.adherence !== null
                ? `Adherencia ${p.adherence}% · ${p.condition}`
                : `Sin actividad reciente · ${p.condition}`}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Recent */}
        <Text style={styles.sectionLabel}>Pacientes recientes</Text>
        {recent.map(p => (
          <PatientRow key={p.id} patient={p} />
        ))}

      </ScrollView>
    </AppLayout>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function PatientRow({ patient }: { patient: PatientSummary }) {
  const pct = patient.adherence;
  const pctColor = pct === null ? MUTED : pct >= 60 ? PRIMARY : DANGER;
  return (
    <TouchableOpacity style={styles.patientCard} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{patient.initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.patientCond}>{patient.condition}</Text>
      </View>
      <Text style={[styles.patientPct, { color: pctColor }]}>
        {pct !== null ? `${pct}%` : "—"}
      </Text>
    </TouchableOpacity>
  );
}

const PRIMARY = "#0F766E";
const DARK    = "#134E4A";
const WARN    = "#D97706";
const MUTED   = "#5F7E7E";
const DANGER  = "#EF4444";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 10 },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1, backgroundColor: "#fff", borderRadius: 12,
    padding: 12, alignItems: "center",
    borderWidth: 1, borderColor: "#C4DEDE",
  },
  statValue: { fontSize: 26, fontWeight: "800" },
  statLabel: { fontSize: 10, color: MUTED, marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.5 },
  alertCard: {
    backgroundColor: "#FEF3C7",
    borderLeftWidth: 3, borderLeftColor: WARN,
    borderRadius: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10,
    padding: 10,
  },
  alertName: { fontSize: 13, fontWeight: "700", color: "#92400E" },
  alertSub:  { fontSize: 11, color: "#B45309", marginTop: 2 },
  patientCard: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#fff", borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: "#C4DEDE",
  },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  patientName: { fontSize: 13, fontWeight: "700", color: DARK },
  patientCond: { fontSize: 11, color: MUTED, marginTop: 1 },
  patientPct:  { fontSize: 16, fontWeight: "800" },
});