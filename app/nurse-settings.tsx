import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "María García",
  role: "nurse" as const,
  initials: "MG",
};

interface AlertToggle {
  key: string; label: string; description: string; icon: string; iconBg: string;
}

const ALERT_TOGGLES: AlertToggle[] = [
  { key: "lowAdherence",   label: "Baja adherencia",        description: "Notificar si un paciente cae debajo del umbral", icon: "⚠️", iconBg: "#FEF3C7" },
  { key: "inactivity",     label: "Inactividad del paciente",description: "Sin actividad registrada por más de N días",      icon: "📵", iconBg: "#F0F0F0" },
  { key: "newPatient",     label: "Nuevo paciente asignado", description: "Notificar al recibir un nuevo paciente",           icon: "👤", iconBg: "#E1F5F0" },
  { key: "dailySummary",   label: "Resumen diario",          description: "Informe de adherencia enviado cada mañana",       icon: "📋", iconBg: "#EDE9FE" },
];

export default function NurseSettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    lowAdherence: true, inactivity: true, newPatient: true, dailySummary: true,
  });
  const [adherenceThreshold, setAdherenceThreshold] = useState(60);
  const [inactivityDays, setInactivityDays] = useState(2);

  const toggle = (key: string) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <AppLayout title="Ajustes" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Badge identificador de rol */}
        <View style={styles.nurseBadge}>
          <Text style={styles.nurseBadgeText}>Vista exclusiva enfermero/a</Text>
        </View>

        {/* Alertas de pacientes */}
        <Text style={styles.sectionLabel}>Alertas de pacientes</Text>
        <View style={styles.card}>
          {ALERT_TOGGLES.map((s, i) => (
            <View key={s.key} style={[styles.row, i < ALERT_TOGGLES.length - 1 && styles.rowBorder]}>
              <View style={[styles.iconBox, { backgroundColor: s.iconBg }]}>
                <Text style={styles.icon}>{s.icon}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={styles.rowLabel}>{s.label}</Text>
                <Text style={styles.rowSub}>{s.description}</Text>
              </View>
              <Switch value={toggles[s.key]} onValueChange={() => toggle(s.key)}
                trackColor={{ false: "#C4DEDE", true: "#0F766E" }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Umbrales configurables */}
        <Text style={styles.sectionLabel}>Umbrales</Text>
        <View style={styles.card}>

          {/* Umbral de adherencia */}
          <View style={styles.thresholdRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Umbral de adherencia</Text>
              <Text style={styles.rowSub}>Alertar si un paciente cae debajo de este %</Text>
            </View>
            <View style={styles.counterWrap}>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setAdherenceThreshold(v => Math.max(10, v - 10))}>
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{adherenceThreshold}%</Text>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setAdherenceThreshold(v => Math.min(90, v + 10))}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Días de inactividad */}
          <View style={styles.thresholdRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Días sin actividad</Text>
              <Text style={styles.rowSub}>Alertar si el paciente no registra por N días</Text>
            </View>
            <View style={styles.counterWrap}>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setInactivityDays(v => Math.max(1, v - 1))}>
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{inactivityDays}d</Text>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setInactivityDays(v => Math.min(14, v + 1))}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Preferencias generales */}
        <Text style={styles.sectionLabel}>Preferencias</Text>
        <View style={styles.card}>
          {[
            { icon: "🌐", bg: "#E1F5F0", label: "Idioma", value: "Español" },
            { icon: "🌙", bg: "#F0F0F0", label: "Tema oscuro", value: "Seguir sistema" },
          ].map((r, i, arr) => (
            <TouchableOpacity key={r.label} style={[styles.row, i < arr.length - 1 && styles.rowBorder]}>
              <View style={[styles.iconBox, { backgroundColor: r.bg }]}>
                <Text style={styles.icon}>{r.icon}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={styles.rowLabel}>{r.label}</Text>
                <Text style={styles.rowSub}>{r.value}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>MedAdhere v1.0.0 · Modo enfermero/a</Text>

      </ScrollView>
    </AppLayout>
  );
}

const PRIMARY = "#0F766E"; const DARK = "#134E4A"; const MUTED = "#5F7E7E"; const BORDER = "#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 12 },
  nurseBadge: {
    alignSelf: "flex-start", backgroundColor: "#E1F5F0",
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20,
  },
  nurseBadgeText: { fontSize: 12, fontWeight: "700", color: "#085041" },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.4 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 4 },
  iconBox: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 16 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 13, fontWeight: "700", color: DARK },
  rowSub: { fontSize: 11, color: MUTED, marginTop: 1 },
  chevron: { fontSize: 20, color: MUTED },
  thresholdRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 },
  counterWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  counterBtn: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: "#E1F5F0", alignItems: "center", justifyContent: "center",
  },
  counterBtnText: { fontSize: 18, fontWeight: "700", color: PRIMARY },
  counterValue: { fontSize: 16, fontWeight: "800", color: PRIMARY, minWidth: 40, textAlign: "center" },
  version: { textAlign: "center", fontSize: 12, color: MUTED },
});