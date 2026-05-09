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

type Condition =
  | "hypertension"
  | "diabetes"
  | "elderly"
  | "polypharmacy"
  | "asthma"
  | "other";

const CONDITION_LABELS: Record<Condition, string> = {
  hypertension: "Hipertensión",
  diabetes: "Diabetes",
  elderly: "Adulto mayor",
  polypharmacy: "Polifarmacia",
  asthma: "Asma",
  other: "Otra",
};

interface RegisterStep1 {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  conditions: Condition[];   // only for role === "patient"
  licenseNumber: string;     // only for role === "nurse"
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface RegisterScreenProps {
  onRegister?: (data: RegisterStep1) => void;
  onNavigateLogin?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RegisterScreen({
  onRegister,
  onNavigateLogin,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("patient");
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterStep1 | "general", string>>>({});

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = "Ingresá tu nombre completo.";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Email inválido.";
    if (password.length < 8)
      newErrors.password = "Mínimo 8 caracteres.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (role === "nurse" && !licenseNumber.trim())
      newErrors.licenseNumber = "Ingresá tu número de matrícula.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onRegister?.({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        role,
        conditions,
        licenseNumber: licenseNumber.trim(),
      });
    } catch (e) {
      setErrors({ general: "Error al crear la cuenta. Intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  // ── Condition toggle ────────────────────────────────────────────────────────
  const toggleCondition = (c: Condition) => {
    setConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} bounces={false}>

          {/* ── Hero Header ── */}
          <View style={styles.hero}>
            <TouchableOpacity
              onPress={onNavigateLogin}
              style={styles.backBtn}
              accessibilityLabel="Volver al inicio de sesión"
              accessibilityRole="button"
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Crear cuenta</Text>
              <Text style={styles.heroSub}>Completá tus datos para comenzar</Text>
            </View>
            <StepIndicator current={1} total={3} />
          </View>

          {/* ── Body ── */}
          <View style={styles.body}>

            {/* General error */}
            {errors.general && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{errors.general}</Text>
              </View>
            )}

            {/* Full Name */}
            <Field label="NOMBRE COMPLETO" error={errors.fullName}>
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="Juan Pérez"
                placeholderTextColor="#A8C5C5"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </Field>

            {/* Email */}
            <Field label="EMAIL" error={errors.email}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="nombre@email.com"
                placeholderTextColor="#A8C5C5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </Field>

            {/* Password */}
            <Field label="CONTRASEÑA" error={errors.password}>
              <View
                style={[
                  styles.inputRow,
                  errors.password && styles.inputRowError,
                ]}
              >
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0, paddingHorizontal: 0 }]}
                  placeholder="Mín. 8 caracteres"
                  placeholderTextColor="#A8C5C5"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
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
            </Field>

            {/* Confirm Password */}
            <Field label="CONFIRMAR CONTRASEÑA" error={errors.confirmPassword}>
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Repetí tu contraseña"
                placeholderTextColor="#A8C5C5"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                returnKeyType="next"
              />
            </Field>

            {/* Role */}
            <Field label="ROL">
              <View style={styles.roleRow}>
                {(["patient", "nurse"] as Role[]).map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.roleBtn, role === r && styles.roleBtnActive]}
                    onPress={() => setRole(r)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: role === r }}
                  >
                    <Text
                      style={[
                        styles.roleBtnText,
                        role === r && styles.roleBtnTextActive,
                      ]}
                    >
                      {r === "patient" ? "🧑 Paciente" : "👩‍⚕️ Enfermero/a"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>

            {/* Patient-only: Conditions */}
            {role === "patient" && (
              <Field label="CONDICIONES (SELECCIONÁ LAS QUE APLIQUEN)">
                <View style={styles.chipsContainer}>
                  {(Object.keys(CONDITION_LABELS) as Condition[]).map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.chip,
                        conditions.includes(c) && styles.chipSelected,
                      ]}
                      onPress={() => toggleCondition(c)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: conditions.includes(c) }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          conditions.includes(c) && styles.chipTextSelected,
                        ]}
                      >
                        {CONDITION_LABELS[c]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Field>
            )}

            {/* Nurse-only: License */}
            {role === "nurse" && (
              <Field label="NÚMERO DE MATRÍCULA" error={errors.licenseNumber}>
                <TextInput
                  style={[
                    styles.input,
                    errors.licenseNumber && styles.inputError,
                  ]}
                  placeholder="MP / MN 00000"
                  placeholderTextColor="#A8C5C5"
                  value={licenseNumber}
                  onChangeText={setLicenseNumber}
                  autoCapitalize="characters"
                  returnKeyType="done"
                />
              </Field>
            )}

            {/* CTA */}
            <TouchableOpacity
              style={[styles.cta, loading && styles.ctaDisabled]}
              onPress={handleRegister}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ctaText}>Siguiente →</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>¿Ya tenés cuenta? </Text>
              <TouchableOpacity
                onPress={onNavigateLogin}
                accessibilityRole="link"
              >
                <Text style={styles.linkAction}>Iniciá sesión</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error && <Text style={styles.fieldError}>{error}</Text>}
    </View>
  );
}

function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepDots}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[styles.stepDot, i + 1 === current && styles.stepDotActive]}
          />
        ))}
      </View>
      <Text style={styles.stepLabel}>
        Paso {current} de {total}
      </Text>
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
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backIcon: { color: "#fff", fontSize: 18, fontWeight: "700" },
  heroContent: { flex: 1 },
  heroTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
    letterSpacing: -0.3,
  },
  heroSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },

  // Step indicator
  stepContainer: { alignItems: "center" },
  stepDots: { flexDirection: "row", gap: 4, marginBottom: 4 },
  stepDot: {
    width: 18,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  stepDotActive: { backgroundColor: "#fff" },
  stepLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.3,
  },

  // Body
  body: { padding: 24, paddingTop: 28 },

  // Error banner
  errorBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
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
  fieldError: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 2,
  },

  // Inputs
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
  inputError: { borderColor: "#FCA5A5" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputRowError: { borderColor: "#FCA5A5" },
  eyeBtn: { padding: 8 },
  eyeIcon: { fontSize: 16 },

  // Role
  roleRow: { flexDirection: "row", gap: 10 },
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

  // Condition chips
  chipsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A8D8D0",
    backgroundColor: "#E1F5F0",
  },
  chipSelected: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipText: { fontSize: 12, fontWeight: "500", color: PRIMARY },
  chipTextSelected: { color: "#fff" },

  // CTA
  cta: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
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

  // Link
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  linkText: { fontSize: 13, color: TEXT_MUTED },
  linkAction: { fontSize: 13, color: PRIMARY, fontWeight: "700" },
});