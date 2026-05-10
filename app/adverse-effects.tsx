import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

type Frequency = "Frecuente" | "Poco frecuente" | "Consultar médico";

interface Effect { name: string; description: string; frequency: Frequency; }
interface MedEffects { medication: string; dose: string; effects: Effect[]; }

const DATA: MedEffects[] = [
  {
    medication: "Enalapril", dose: "10mg",
    effects: [
      { name: "Tos seca",            frequency: "Frecuente",        description: "Puede aparecer semanas después de iniciar el tratamiento." },
      { name: "Mareos al incorporarse", frequency: "Poco frecuente", description: "Levantarse lentamente reduce el riesgo." },
      { name: "Angioedema",          frequency: "Consultar médico", description: "Hinchazón de cara/garganta → ir a guardia." },
    ],
  },
  {
    medication: "Metformina", dose: "500mg",
    effects: [
      { name: "Náuseas",  frequency: "Frecuente", description: "Tomarla con alimentos reduce el efecto." },
      { name: "Diarrea",  frequency: "Frecuente", description: "Suele ceder en las primeras semanas." },
    ],
  },
  {
    medication: "Aspirina", dose: "100mg",
    effects: [
      { name: "Acidez estomacal",   frequency: "Frecuente",        description: "Tomarla con comida o con un vaso de leche." },
      { name: "Sangrado digestivo", frequency: "Consultar médico", description: "Heces oscuras o vómitos con sangre → consultar." },
    ],
  },
  {
    medication: "Losartán", dose: "50mg",
    effects: [
      { name: "Mareos",     frequency: "Poco frecuente", description: "Especialmente al inicio del tratamiento." },
      { name: "Hiperpotasemia", frequency: "Poco frecuente", description: "Evitar suplementos de potasio sin indicación." },
    ],
  },
];

const FREQ_STYLE: Record<Frequency, { bg: string; color: string }> = {
  "Frecuente":        { bg: "#FEF3C7", color: "#92400E" },
  "Poco frecuente":   { bg: "#E1F5F0", color: "#085041" },
  "Consultar médico": { bg: "#FCEBEB", color: "#7F1D1D" },
};

export default function AdverseEffectsScreen() {
  return (
    <AppLayout title="Efectos adversos" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.intro}>
          Efectos adversos conocidos de tus medicamentos actuales.
          Consultá a tu médico o enfermero/a ante cualquier duda.
        </Text>
        {DATA.map(med => (
          <View key={med.medication} style={styles.card}>
            <Text style={styles.medName}>{med.medication} {med.dose}</Text>
            {med.effects.map((e, i) => {
              const fs = FREQ_STYLE[e.frequency];
              return (
                <View key={e.name} style={[styles.effectItem, i < med.effects.length - 1 && styles.effectBorder]}>
                  <View style={styles.effectHeader}>
                    <Text style={styles.effectName}>{e.name}</Text>
                    <View style={[styles.freqBadge, { backgroundColor: fs.bg }]}>
                      <Text style={[styles.freqText, { color: fs.color }]}>{e.frequency}</Text>
                    </View>
                  </View>
                  <Text style={styles.effectDesc}>{e.description}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </AppLayout>
  );
}

const DARK="#134E4A"; const MUTED="#5F7E7E"; const BORDER="#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 12 },
  intro: { fontSize: 13, color: MUTED, lineHeight: 19 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  medName: { fontSize: 13, fontWeight: "700", color: DARK, marginBottom: 10 },
  effectItem: { paddingVertical: 10 },
  effectBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  effectHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  effectName: { fontSize: 13, fontWeight: "700", color: DARK, flex: 1 },
  freqBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
  freqText: { fontSize: 10, fontWeight: "700" },
  effectDesc: { fontSize: 12, color: MUTED, lineHeight: 17 },
});