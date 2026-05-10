import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

interface Medication {
  id: string; name: string; dose: string; route: string;
  frequency: string; schedule: string; active: boolean;
}

const MEDICATIONS: Medication[] = [
  { id:"1", name:"Enalapril",     dose:"10mg",  route:"Oral", frequency:"1 vez/día",   schedule:"08:00 hs",        active:true  },
  { id:"2", name:"Metformina",    dose:"500mg", route:"Oral", frequency:"2 veces/día", schedule:"08:00 y 20:00 hs", active:true  },
  { id:"3", name:"Losartán",      dose:"50mg",  route:"Oral", frequency:"1 vez/día",   schedule:"20:00 hs",        active:true  },
  { id:"4", name:"Aspirina",      dose:"100mg", route:"Oral", frequency:"1 vez/día",   schedule:"12:00 hs",        active:true  },
  { id:"5", name:"Atorvastatina", dose:"20mg",  route:"Oral", frequency:"1 vez/día",   schedule:"22:00 hs",        active:false },
];

export default function MedicationListScreen() {
  const active   = MEDICATIONS.filter(m => m.active);
  const inactive = MEDICATIONS.filter(m => !m.active);

  return (
    <AppLayout title="Mis medicamentos" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.sectionLabel}>Activos ({active.length})</Text>
        <View style={styles.card}>
          {active.map((m, i) => (
            <MedCard key={m.id} med={m} last={i === active.length - 1} />
          ))}
        </View>

        {inactive.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Inactivos</Text>
            <View style={styles.card}>
              {inactive.map((m, i) => (
                <MedCard key={m.id} med={m} last={i === inactive.length - 1} />
              ))}
            </View>
          </>
        )}

        {/* <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Agregar medicamento</Text>
        </TouchableOpacity> */}

      </ScrollView>
    </AppLayout>
  );
}

function MedCard({ med, last }: { med: Medication; last: boolean }) {
  return (
    <View style={[styles.medItem, !last && styles.medBorder]}>
      <View style={[styles.dot, med.active ? styles.dotActive : styles.dotInactive]} />
      <View style={styles.info}>
        <Text style={[styles.name, !med.active && styles.nameInactive]}>
          {med.name} {med.dose}
        </Text>
        <Text style={styles.sub}>{med.route} · {med.frequency}</Text>
        <Text style={styles.time}>{med.schedule}</Text>
      </View>
      <View style={[styles.badge, med.active ? styles.badgeActive : styles.badgeInactive]}>
        <Text style={[styles.badgeText, med.active ? styles.badgeTextActive : styles.badgeTextInactive]}>
          {med.active ? "Activo" : "Inactivo"}
        </Text>
      </View>
    </View>
  );
}

const PRIMARY="#0F766E"; const DARK="#134E4A"; const MUTED="#5F7E7E"; const BORDER="#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 10 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: MUTED, letterSpacing: 0.4 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  medItem: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 10 },
  medBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  dotActive: { backgroundColor: PRIMARY },
  dotInactive: { backgroundColor: "#C4DEDE" },
  info: { flex: 1 },
  name: { fontSize: 13, fontWeight: "700", color: DARK },
  nameInactive: { color: "#8AABAB" },
  sub: { fontSize: 11, color: MUTED, marginTop: 2 },
  time: { fontSize: 11, color: PRIMARY, fontWeight: "600", marginTop: 1 },
  badge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 },
  badgeActive: { backgroundColor: "#E1F5F0" },
  badgeInactive: { backgroundColor: "#F0F0F0" },
  badgeText: { fontSize: 10, fontWeight: "700" },
  badgeTextActive: { color: "#085041" },
  badgeTextInactive: { color: "#8AABAB" },
  addBtn: {
    borderWidth: 1.5, borderColor: PRIMARY, borderRadius: 12,
    paddingVertical: 14, alignItems: "center", borderStyle: "dashed",
  },
  addBtnText: { color: PRIMARY, fontWeight: "700", fontSize: 14 },
});