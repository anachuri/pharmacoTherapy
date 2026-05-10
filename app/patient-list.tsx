import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput,
} from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "María García",
  role: "nurse" as const,
  initials: "MG",
};

type FilterKey = "all" | "alert" | "ok";

interface Patient {
  id: string;
  initials: string;
  name: string;
  condition: string;
  age: number;
  adherence: number | null;
  hasAlert: boolean;
}

const PATIENTS: Patient[] = [
  { id: "1", initials: "JP", name: "Juan Pérez",    condition: "Diabetes",     age: 45, adherence: 91,   hasAlert: false },
  { id: "2", initials: "LG", name: "Lucía Gómez",   condition: "Polifarmacia", age: 72, adherence: 78,   hasAlert: false },
  { id: "3", initials: "CM", name: "Carlos Méndez", condition: "Hipertensión", age: 61, adherence: 32,   hasAlert: true  },
  { id: "4", initials: "RV", name: "Rosa Villalba", condition: "Diabetes",     age: 68, adherence: null, hasAlert: true  },
  { id: "5", initials: "MR", name: "Marta Ruiz",    condition: "Adulto mayor", age: 80, adherence: 65,   hasAlert: false },
  { id: "6", initials: "FB", name: "Felipe Bravo",  condition: "Hipertensión", age: 55, adherence: 88,   hasAlert: false },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",   label: "Todos"    },
  { key: "alert", label: "⚠ Alerta" },
  { key: "ok",    label: "✓ OK"     },
];

export default function PatientListScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const visible = PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true :
      filter === "alert" ? p.hasAlert :
      !p.hasAlert;
    return matchSearch && matchFilter;
  });

  return (
    <AppLayout title="Mis pacientes" user={MOCK_USER}>
      <View style={styles.container}>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente..."
            placeholderTextColor="#A8C5C5"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="words"
          />
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
              onPress={() => setFilter(f.key)}
            >
              <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {visible.length === 0 && (
            <Text style={styles.emptyText}>No se encontraron pacientes.</Text>
          )}
          {visible.map(p => (
            <TouchableOpacity key={p.id} style={styles.card} activeOpacity={0.7}>
              <View style={[styles.avatar, p.hasAlert && styles.avatarAlert]}>
                <Text style={styles.avatarText}>{p.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.sub}>{p.condition} · {p.age} años</Text>
              </View>
              <Text style={[styles.pct, { color: adherenceColor(p.adherence) }]}>
                {p.adherence !== null ? `${p.adherence}%` : "—"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </AppLayout>
  );
}

const adherenceColor = (n: number | null) =>
  n === null ? "#A8C5C5" : n >= 70 ? "#0F766E" : n >= 50 ? "#D97706" : "#EF4444";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  searchBox: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#fff", borderRadius: 12,
    borderWidth: 1, borderColor: "#C4DEDE",
    paddingHorizontal: 12, paddingVertical: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: "#134E4A" },
  filterRow: { flexDirection: "row", gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1, borderColor: "#C4DEDE", backgroundColor: "#fff",
  },
  filterChipActive: { backgroundColor: "#0F766E", borderColor: "#0F766E" },
  filterText: { fontSize: 12, fontWeight: "600", color: "#5F7E7E" },
  filterTextActive: { color: "#fff" },
  list: { gap: 8, paddingBottom: 16 },
  card: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#fff", borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: "#C4DEDE",
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#0F766E", alignItems: "center", justifyContent: "center",
  },
  avatarAlert: { backgroundColor: "#D97706" },
  avatarText: { color: "#fff", fontSize: 13, fontWeight: "700" },
  name: { fontSize: 14, fontWeight: "700", color: "#134E4A" },
  sub:  { fontSize: 12, color: "#5F7E7E", marginTop: 2 },
  pct:  { fontSize: 18, fontWeight: "800" },
  emptyText: { textAlign: "center", color: "#8AABAB", fontSize: 14, marginTop: 32 },
});