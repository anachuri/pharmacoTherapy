import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────
interface AppHeaderProps {
  title: string;
  onOpenDrawer: () => void;
  rightElement?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AppHeader({
  title,
  onOpenDrawer,
  rightElement,
}: AppHeaderProps) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />
      <View style={styles.container}>
        <BurgerButton onPress={onOpenDrawer} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rightSlot}>
          {rightElement ?? <View style={styles.placeholder} />}
        </View>
      </View>
    </>
  );
}

// ─── BurgerButton ─────────────────────────────────────────────────────────────
export function BurgerButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.burgerBtn}
      accessibilityLabel="Abrir menú de navegación"
      accessibilityRole="button"
      accessibilityHint="Abre el menú lateral con las opciones de navegación"
    >
      <View style={styles.burgerLine} />
      <View style={[styles.burgerLine, styles.burgerLineMid]} />
      <View style={styles.burgerLine} />
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const PRIMARY = "#0F766E";

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    gap: 8,
  },

  // Burger Button
  burgerBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
  },
  burgerLine: {
    width: 16,
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 1,
  },
  burgerLineMid: {
    width: 12, // slightly shorter middle line for visual style
  },

  // Title
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // Right slot
  rightSlot: {
    width: 38,
    alignItems: "flex-end",
  },
  placeholder: {
    width: 38,
    height: 38,
  },
});
