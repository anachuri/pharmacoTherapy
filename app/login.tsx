import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "patient" | "nurse";

interface LoginForm {
  email: string;
  password: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface LoginScreenProps {
  onLogin?: (form: LoginForm, role: Role) => void;
  onNavigateRegister?: () => void;
  onNavigateForgotPassword?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LoginScreen({
  onLogin,
  onNavigateRegister,
  onNavigateForgotPassword,
}: LoginScreenProps) {
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      setLoading(true);
      await onLogin?.({ email: email.trim(), password }, role);
    } catch (e) {
      setError("Credenciales incorrectas. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} bounces={false}>

          {/* ── Hero ── */}
          <View style={styles.hero}>
            <View style={styles.logoBox}>
              <Text style={styles.logoIcon}>💊</Text>
            </View>
            <Text style={styles.appName}>MedAdhere</Text>
            <Text style={styles.appTagline}>YOUR MEDICATION · YOUR COMMITMENT</Text>
          </View>

          {/* ── Body ── */}
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Iniciar sesión</Text>

            {/* Role Selector */}
            <RoleSelector selected={role} onSelect={setRole} />

            {/* Error Banner */}
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="nombre@email.com"
                placeholderTextColor="#A8C5C5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>CONTRASEÑA</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#A8C5C5"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((p) => !p)}
                  style={styles.eyeBtn}
                  accessibilityLabel={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={onNavigateForgotPassword}
              style={styles.forgotRow}
              accessibilityRole="link"
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* CTA */}
            <TouchableOpacity
              style={[styles.cta, loading && styles.ctaDisabled]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ctaText}>Iniciar sesión →</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Link */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>¿No tenés cuenta? </Text>
              <TouchableOpacity
                onPress={onNavigateRegister}
                accessibilityRole="link"
              >
                <Text style={styles.linkAction}>Registrarte</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── RoleSelector ─────────────────────────────────────────────────────────────
function RoleSelector({
  selected,
  onSelect,
}: {
  selected: Role;
  onSelect: (r: Role) => void;
}) {
  return (
    <View style={styles.roleRow}>
      {(["patient", "nurse"] as Role[]).map((r) => (
        <TouchableOpacity
          key={r}
          style={[styles.roleBtn, selected === r && styles.roleBtnActive]}
          onPress={() => onSelect(r)}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === r }}
        >
          <Text
            style={[
              styles.roleBtnText,
              selected === r && styles.roleBtnTextActive,
            ]}
          >
            {r === "patient" ? "🧑 Paciente" : "👩‍⚕️ Enfermero/a"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const PRIMARY = "#0F766E";
const BG = "#F0FAFA";
const TEXT_DARK = "#134E4A";
const TEXT_MUTED = "#5F7E7E";
const BORDER = "#C4DEDE";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: PRIMARY },
  scroll: { flexGrow: 1, backgroundColor: BG },

  // Hero
  hero: {
    backgroundColor: PRIMARY,
    paddingTop: 20,
    paddingBottom: 48,
    alignItems: "center",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logoBox: {
    width: 68,
    height: 68,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logoIcon: { fontSize: 30 },
  appName: {
    fontWeight: "700",
    fontSize: 26,
    color: "#fff",
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1.2,
    marginTop: 4,
  },

  // Body
  body: { padding: 24, paddingTop: 30 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 20,
  },

  // Role
  roleRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  roleBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    alignItems: "center",
  },
  roleBtnActive: { backgroundColor: PRIMARY },
  roleBtnText: { fontSize: 13, fontWeight: "600", color: PRIMARY },
  roleBtnTextActive: { color: "#fff" },

  // Error
  errorBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  errorText: { fontSize: 13, color: "#B91C1C" },

  // Field
  field: { marginBottom: 16 },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: TEXT_MUTED,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: TEXT_DARK,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  eyeBtn: { padding: 8 },
  eyeIcon: { fontSize: 16 },

  // Forgot
  forgotRow: { alignItems: "flex-end", marginBottom: 18 },
  forgotText: { fontSize: 12, color: PRIMARY, fontWeight: "600" },

  // CTA
  cta: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaDisabled: { opacity: 0.6 },
  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: { fontSize: 12, color: "#8AABAB" },

  // Link
  linkRow: { flexDirection: "row", justifyContent: "center" },
  linkText: { fontSize: 13, color: TEXT_MUTED },
  linkAction: { fontSize: 13, color: PRIMARY, fontWeight: "700" },
});