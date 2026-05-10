import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

interface ToggleSetting { key: string; label: string; description: string; icon: string; iconBg: string; }

const TOGGLE_SETTINGS: ToggleSetting[] = [
  { key:"reminders",   label:"Recordatorios de dosis",  description:"Alertas en el horario de cada toma",        icon:"🔔", iconBg:"#E1F5F0" },
  { key:"missedDose",  label:"Dosis no tomada",         description:"Aviso si no confirmás a los 30 min",         icon:"⏰", iconBg:"#FEF3C7" },
  { key:"sound",       label:"Sonido",                  description:"Reproducir sonido con la notificación",      icon:"🔊", iconBg:"#EDE9FE" },
  { key:"vibration",   label:"Vibración",               description:"Vibrar al recibir alertas",                  icon:"📳", iconBg:"#F0F0F0" },
  { key:"nurseAlert",  label:"Alertas al enfermero/a",  description:"Notificar dosis perdida a tu enfermero/a",   icon:"👩‍⚕️", iconBg:"#E1F5F0" },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    reminders: true, missedDose: true, sound: true, vibration: false, nurseAlert: true,
  });

  const toggle = (key: string) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <AppLayout title="Ajustes" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.sectionLabel}>Notificaciones</Text>
        <View style={styles.card}>
          {TOGGLE_SETTINGS.map((s, i) => (
            <View key={s.key} style={[styles.row, i < TOGGLE_SETTINGS.length - 1 && styles.rowBorder]}>
              <View style={[styles.iconBox, { backgroundColor: s.iconBg }]}>
                <Text style={styles.icon}>{s.icon}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={styles.rowLabel}>{s.label}</Text>
                <Text style={styles.rowSub}>{s.description}</Text>
              </View>
              <Switch
                value={toggles[s.key]}
                onValueChange={() => toggle(s.key)}
                trackColor={{ false: "#C4DEDE", true: "#0F766E" }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

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

        <Text style={styles.version}>MedAdhere v1.0.0</Text>

      </ScrollView>
    </AppLayout>
  );
}

const DARK="#134E4A"; const MUTED="#5F7E7E"; const BORDER="#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 12 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.4 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  iconBox: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 16 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 13, fontWeight: "700", color: DARK },
  rowSub: { fontSize: 11, color: MUTED, marginTop: 1 },
  chevron: { fontSize: 20, color: MUTED },
  version: { textAlign: "center", fontSize: 12, color: MUTED, marginTop: 4 },
});