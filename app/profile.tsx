import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

const PROFILE = {
  fullName:    "Juan Pérez",
  email:       "juan.perez@email.com",
  phone:       "+54 388 412-3456",
  birthDate:   "15/04/1978",
  age:         47,
  conditions:  ["Hipertensión", "Diabetes tipo 2"],
  nurse:       "María García",
};

export default function ProfileScreen() {
  return (
    <AppLayout title="Mi perfil" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}><Text style={styles.avatarText}>JP</Text></View>
          <Text style={styles.name}>{PROFILE.fullName}</Text>
          <Text style={styles.role}>Paciente</Text>
        </View>

        {/* Info rows */}
        <View style={styles.card}>
          {[
            { label: "Email",      value: PROFILE.email      },
            { label: "Teléfono",   value: PROFILE.phone      },
            { label: "Nacimiento", value: `${PROFILE.birthDate} · ${PROFILE.age} años` },
            { label: "Enfermero/a",value: PROFILE.nurse       },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.row, i < arr.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue} numberOfLines={1}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Conditions */}
        <Text style={styles.sectionLabel}>Condiciones</Text>
        <View style={styles.chipsWrap}>
          {PROFILE.conditions.map(c => (
            <View key={c} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
          ))}
        </View>

        {/* Edit button */}
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </TouchableOpacity>

      </ScrollView>
    </AppLayout>
  );
}

const PRIMARY="#0F766E"; const DARK="#134E4A"; const MUTED="#5F7E7E"; const BORDER="#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 14 },
  avatarWrap: { alignItems: "center", gap: 6 },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: PRIMARY,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "700" },
  name: { fontSize: 20, fontWeight: "700", color: DARK },
  role: { fontSize: 13, color: MUTED },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  row: { flexDirection: "row", paddingVertical: 11, alignItems: "center" },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  rowLabel: { fontSize: 13, color: MUTED, width: 100 },
  rowValue: { fontSize: 13, color: DARK, fontWeight: "600", flex: 1, textAlign: "right" },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.4 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: "#E1F5F0", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  chipText: { fontSize: 13, fontWeight: "600", color: "#085041" },
  editBtn: {
    backgroundColor: PRIMARY, borderRadius: 14, paddingVertical: 15, alignItems: "center",
    shadowColor: PRIMARY, shadowOffset:{width:0,height:4}, shadowOpacity:0.25, shadowRadius:8, elevation:4,
  },
  editBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});