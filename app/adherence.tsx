import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "./components/AppLayout";

const MOCK_USER = { fullName: "Juan Pérez", role: "patient" as const, initials: "JP" };

type Period = "week" | "month";

const WEEK_DATA = [
  { day: "L", pct: 100 }, { day: "M", pct: 75 },
  { day: "M", pct: 100 }, { day: "J", pct: 50 },
  { day: "V", pct: 100 }, { day: "S", pct: 75 }, { day: "D", pct: 75 },
];

const CALENDAR_DAYS = [
  null,null,null,100,100,0,75,100,100,100,75,100,100,100,
  100,75,100,100,30,100,100,100,100,0,75,100,100,30,100,100,100,
];

const barColor = (pct: number) => pct >= 80 ? "#0F766E" : pct >= 50 ? "#14B8A6" : "#FCA5A5";
const dayColor = (pct: number | null) => {
  if (pct === null) return "#F5F5F5";
  if (pct === 0)    return "#FCA5A5";
  if (pct < 60)     return "#FEF3C7";
  if (pct < 90)     return "#5DCAA5";
  return "#0F766E";
};

export default function AdherenceHistoryScreen() {
  const [period, setPeriod] = useState<Period>("week");

  return (
    <AppLayout title="Historial" user={MOCK_USER}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Stats */}
        <View style={styles.statRow}>
          {[
            { label: "Esta semana", value: "82%" },
            { label: "Este mes",    value: "75%" },
            { label: "Últimos 3M",  value: "68%" },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Period toggle */}
        <View style={styles.toggleRow}>
          {(["week","month"] as Period[]).map(p => (
            <TouchableOpacity key={p} style={[styles.toggleBtn, period === p && styles.toggleBtnOn]} onPress={() => setPeriod(p)}>
              <Text style={[styles.toggleText, period === p && styles.toggleTextOn]}>
                {p === "week" ? "Semanal" : "Mensual"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {period === "week" ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Últimos 7 días</Text>
            <View style={styles.bars}>
              {WEEK_DATA.map((d, i) => (
                <View key={i} style={styles.barWrap}>
                  <Text style={styles.barPct}>{d.pct}%</Text>
                  <View style={[styles.bar, { height: d.pct * 0.6, backgroundColor: barColor(d.pct) }]}>
                  </View>
                  <Text style={styles.barDay}>{d.day}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Mayo 2025</Text>
            <View style={styles.calHeader}>
              {["L","M","M","J","V","S","D"].map((d,i)=>(
                <Text key={i} style={styles.calDayHdr}>{d}</Text>
              ))}
            </View>
            <View style={styles.calendar}>
              {CALENDAR_DAYS.map((v, i) => (
                <View key={i} style={[styles.calDay, { backgroundColor: dayColor(v) }]} />
              ))}
            </View>
            {/* Legend */}
            <View style={styles.legend}>
              {[["#0F766E","100%"],["#5DCAA5","60-99%"],["#FEF3C7","1-59%"],["#FCA5A5","0%"]].map(([c,l])=>(
                <View key={l} style={styles.legendItem}>
                  <View style={[styles.legendDot,{backgroundColor:c}]} />
                  <Text style={styles.legendText}>{l}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </AppLayout>
  );
}

const PRIMARY="#0F766E"; const DARK="#134E4A"; const MUTED="#5F7E7E"; const BORDER="#C4DEDE";

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 10 },
  statRow: { flexDirection: "row", gap: 8 },
  statCard: { flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: BORDER },
  statValue: { fontSize: 22, fontWeight: "800", color: PRIMARY },
  statLabel: { fontSize: 10, color: MUTED, marginTop: 2, textAlign: "center" },
  toggleRow: { flexDirection: "row", backgroundColor: "#F0F0F0", borderRadius: 10, padding: 3 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center" },
  toggleBtnOn: { backgroundColor: "#fff", borderWidth: 1, borderColor: BORDER },
  toggleText: { fontSize: 13, color: MUTED, fontWeight: "600" },
  toggleTextOn: { color: DARK },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER },
  cardTitle: { fontSize: 12, fontWeight: "700", color: DARK, marginBottom: 14 },
  bars: { flexDirection: "row", alignItems: "flex-end", gap: 6, height: 90 },
  barWrap: { flex: 1, alignItems: "center", gap: 3 },
  barPct: { fontSize: 8, color: MUTED },
  bar: { width: "100%", borderRadius: 3 },
  barDay: { fontSize: 10, color: MUTED, fontWeight: "600" },
  calHeader: { flexDirection: "row", marginBottom: 4 },
  calDayHdr: { flex: 1, textAlign: "center", fontSize: 9, color: MUTED, fontWeight: "600" },
  calendar: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  calDay: { width: "12.5%", aspectRatio: 1, borderRadius: 3 },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontSize: 10, color: MUTED },
});