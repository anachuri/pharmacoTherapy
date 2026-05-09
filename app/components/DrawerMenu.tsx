import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "patient" | "nurse";

export type RouteKey =
  // Patient routes
  | "Home"
  | "MedicationList"
  | "AdherenceHistory"
  | "AdverseEffects"
  | "Profile"
  | "Settings"
  // Nurse routes
  | "NurseDashboard"
  | "PatientList"
  | "EducationContent";

interface NavItem {
  key: RouteKey;
  label: string;
  icon: string;
  roles: Role[];
  section: "main" | "account";
}

interface UserInfo {
  fullName: string;
  role: Role;
  initials: string;
}

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
  onLogout: () => void;
  user: UserInfo;
}

// ─── Navigation Items ─────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  // Patient
  { key: "Home",            label: "Inicio",           icon: "🏠", roles: ["patient"], section: "main" },
  { key: "MedicationList",  label: "Mis medicamentos", icon: "💊", roles: ["patient"], section: "main" },
  { key: "AdherenceHistory",label: "Historial",        icon: "📊", roles: ["patient"], section: "main" },
  { key: "AdverseEffects",  label: "Efectos adversos", icon: "⚠️", roles: ["patient"], section: "main" },
  // Nurse
  { key: "NurseDashboard",  label: "Dashboard",        icon: "📋", roles: ["nurse"],   section: "main" },
  { key: "PatientList",     label: "Mis pacientes",    icon: "👥", roles: ["nurse"],   section: "main" },
  { key: "EducationContent",label: "Educación",        icon: "📚", roles: ["nurse"],   section: "main" },
  // Shared — account section
  { key: "Profile",         label: "Mi perfil",        icon: "👤", roles: ["patient", "nurse"], section: "account" },
  { key: "Settings",        label: "Ajustes",          icon: "⚙️", roles: ["patient", "nurse"], section: "account" },
];

const DRAWER_WIDTH = Dimensions.get("window").width * 0.72;

// ─── Component ────────────────────────────────────────────────────────────────
export default function DrawerMenu({
  isOpen,
  onClose,
  currentRoute,
  onNavigate,
  onLogout,
  user,
}: DrawerMenuProps) {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // ── Animate open / close ───────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const visibleItems = (section: "main" | "account") =>
    NAV_ITEMS.filter(
      (item) => item.section === section && item.roles.includes(user.role)
    );

  const handleNavigate = (route: RouteKey) => {
    onNavigate(route);
    onClose();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!isOpen && translateX._value === -DRAWER_WIDTH) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents={isOpen ? "auto" : "none"}>

      {/* Overlay tap-to-close */}
      <TouchableWithoutFeedback onPress={onClose} accessibilityLabel="Cerrar menú">
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Drawer panel */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <SafeAreaView style={{ flex: 1 }}>

          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>
                {user.fullName}
              </Text>
              <Text style={styles.userRole}>
                {user.role === "patient" ? "Paciente" : "Enfermero/a"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityLabel="Cerrar menú"
              accessibilityRole="button"
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Nav items */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <NavSection
              label="PRINCIPAL"
              items={visibleItems("main")}
              currentRoute={currentRoute}
              onPress={handleNavigate}
            />

            <View style={styles.sectionDivider} />

            <NavSection
              label="CUENTA"
              items={visibleItems("account")}
              currentRoute={currentRoute}
              onPress={handleNavigate}
            />
          </ScrollView>

          {/* Logout */}
          <View style={styles.logoutContainer}>
            <View style={styles.sectionDivider} />
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={onLogout}
              accessibilityRole="button"
              accessibilityLabel="Cerrar sesión"
            >
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

// ─── NavSection ───────────────────────────────────────────────────────────────
function NavSection({
  label,
  items,
  currentRoute,
  onPress,
}: {
  label: string;
  items: NavItem[];
  currentRoute: RouteKey;
  onPress: (key: RouteKey) => void;
}) {
  return (
    <View style={styles.navSection}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {items.map((item) => {
        const isActive = currentRoute === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onPress(item.key)}
            accessibilityRole="menuitem"
            accessibilityState={{ selected: isActive }}
          >
            <View style={[styles.navIcon, isActive && styles.navIconActive]}>
              <Text style={styles.navIconText}>{item.icon}</Text>
            </View>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const PRIMARY = "#0F766E";
const BG_LIGHT = "#E1F5F0";
const TEXT_DARK = "#134E4A";
const TEXT_MUTED = "#5F7E7E";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },

  // Header
  drawerHeader: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  userInfo: { flex: 1 },
  userName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  userRole: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    marginTop: 2,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  // Nav
  navSection: { paddingTop: 8, paddingBottom: 4 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8AABAB",
    letterSpacing: 1,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 11,
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  navItemActive: {
    backgroundColor: BG_LIGHT,
    borderLeftColor: PRIMARY,
  },
  navIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  navIconActive: {
    backgroundColor: "rgba(15,118,110,0.12)",
  },
  navIconText: { fontSize: 15 },
  navLabel: {
    fontSize: 14,
    color: TEXT_MUTED,
    fontWeight: "500",
    flex: 1,
  },
  navLabelActive: {
    color: PRIMARY,
    fontWeight: "700",
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PRIMARY,
  },

  // Divider
  sectionDivider: {
    height: 1,
    backgroundColor: "#C4DEDE",
    marginHorizontal: 18,
    marginVertical: 4,
  },

  // Logout
  logoutContainer: { paddingBottom: 8 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  logoutIcon: { fontSize: 18 },
  logoutText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "700",
  },
});
