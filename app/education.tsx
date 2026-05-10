import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = {
  fullName: "María García",
  role: "nurse" as const,
  initials: "MG",
};

type Category = "all" | "hypertension" | "diabetes" | "medication";

interface EduContent {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  summary: string;
}

const CONTENT: EduContent[] = [
  {
    id: "1", category: "hypertension",
    title: "Importancia de la toma diaria de antihipertensivos",
    summary: "Conocé por qué no saltear dosis mejora los resultados clínicos en pacientes con HTA.",
  },
  {
    id: "2", category: "diabetes",
    title: "Control glucémico y adherencia al tratamiento",
    summary: "Guía para pacientes con DM2 sobre el cumplimiento del esquema terapéutico.",
  },
  {
    id: "3", category: "medication",
    title: "¿Qué hacer si olvidé tomar una pastilla?",
    summary: "Recomendaciones generales según tipo de fármaco y tiempo transcurrido.",
  },
  {
    id: "4", category: "hypertension",
    title: "Hábitos que complementan la medicación antihipertensiva",
    summary: "Dieta, ejercicio y control del estrés como parte del tratamiento integral.",
  },
  {
    id: "5", category: "diabetes",
    title: "Insulina: técnica de aplicación correcta",
    summary: "Paso a paso para que el paciente realice la autoaplicación de forma segura.",
  },
  {
    id: "6", category: "medication",
    title: "Efectos adversos frecuentes y cuándo consultar",
    summary: "Listado de señales de alarma que el paciente debe reportar al profesional.",
  },
];

const CATEGORY_LABELS: Record<Category, string> = {
  all: "Todos", hypertension: "Hipertensión", diabetes: "Diabetes", medication: "Medicación",
};

const CATEGORY_STYLE: Record<Exclude<Category, "all">, { bg: string; text: string }> = {
  hypertension: { bg: "#FEF3C7", text: "#92400E" },
  diabetes:     { bg: "#E1F5F0", text: "#0F4C4C" },
  medication:   { bg: "#EDE9FE", text: "#4C1D95" },
};

export default function EducationScreen() {
  const [active, setActive] = useState<Category>("all");

  const visible = active === "all"
    ? CONTENT
    : CONTENT.filter(c => c.category === active);

  const handleShare = (item: EduContent) => {
    Alert.alert(
      "Compartir contenido",
      `¿Compartir "${item.title}" con tu paciente?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Compartir", onPress: () => console.log("Shared:", item.id) },
      ]
    );
  };

  return (
    <AppLayout title="Educación" user={MOCK_USER}>
      <View style={styles.container}>

        {/* Category filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterRow}>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
              <TouchableOpacity key={cat} style={[styles.chip, active === cat && styles.chipActive]} onPress={() => setActive(cat)}>
                <Text style={[styles.chipText, active === cat && styles.chipTextActive]}>
                  {CATEGORY_LABELS[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Content list */}
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {visible.map(item => {
            const catStyle = CATEGORY_STYLE[item.category];
            return (
              <View key={item.id} style={styles.card}>
                <View style={[styles.badge, { backgroundColor: catStyle.bg }]}>
                  <Text style={[styles.badgeText, { color: catStyle.text }]}>
                    {CATEGORY_LABELS[item.category]}
                  </Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.summary}>{item.summary}</Text>
                <TouchableOpacity style={styles.shareBtn} onPress={() => handleShare(item)} activeOpacity={0.7}>
                  <Text style={styles.shareText}>Compartir con paciente</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterScroll: { maxHeight: 48, paddingHorizontal: 16, paddingTop: 12 },
  filterRow: { flexDirection: "row", gap: 8, paddingBottom: 4 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: "#C4DEDE", backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#0F766E", borderColor: "#0F766E" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#5F7E7E" },
  chipTextActive: { color: "#fff" },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#fff", borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: "#C4DEDE", gap: 6,
  },
  badge: {
    alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: "700" },
  title:   { fontSize: 14, fontWeight: "700", color: "#134E4A", lineHeight: 20 },
  summary: { fontSize: 12, color: "#5F7E7E", lineHeight: 17 },
  shareBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#E1F5F0", paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, marginTop: 4,
  },
  shareText: { fontSize: 12, fontWeight: "700", color: "#0F766E" },
});