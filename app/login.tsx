import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { router } from "expo-router"; // 👈 única importación necesaria para navegar

type Role = "patient" | "nurse";

export default function LoginScreen() {
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} bounces={false}>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.logoBox}>
              <Text style={styles.logoIcon}>💊</Text>
            </View>
            <Text style={styles.appName}>MedAdhere</Text>
            <Text style={styles.appTagline}>YOUR MEDICATION · YOUR COMMITMENT</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Iniciar sesión</Text>

            {/* Role selector */}
            <View style={styles.roleRow}>
              {(["patient", "nurse"] as Role[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleBtn, role === r && styles.roleBtnActive]}
                  onPress={() => setRole(r)}
                >
                  <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
                    {r === "patient" ? "🧑 Paciente" : "👩‍⚕️ Enfermero/a"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
                />
                <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={styles.eyeBtn}>
                  <Text>{showPassword ? "🙈" : "👁"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* ✅ Botón login — navega a /home */}
            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.replace("/home")}
            >
              <Text style={styles.ctaText}>Iniciar sesión →</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* ✅ Link registro — navega a /register */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>¿No tenés cuenta? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.linkAction}>Registrarte</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PRIMARY = "#0F766E";
const TEXT_DARK = "#134E4A";
const TEXT_MUTED = "#5F7E7E";
const BORDER = "#C4DEDE";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: PRIMARY },
  scroll: { flexGrow: 1, backgroundColor: "#F0FAFA" },
  hero: {
    backgroundColor: PRIMARY,
    paddingTop: 20,
    paddingBottom: 48,
    alignItems: "center",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logoBox: {
    width: 68, height: 68,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 22, alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  logoIcon: { fontSize: 30 },
  appName: { fontWeight: "700", fontSize: 26, color: "#fff", letterSpacing: -0.5 },
  appTagline: { fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 1.2, marginTop: 4 },
  body: { padding: 24, paddingTop: 30 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: TEXT_DARK, marginBottom: 20 },
  roleRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  roleBtn: {
    flex: 1, paddingVertical: 11, borderRadius: 12,
    borderWidth: 1.5, borderColor: PRIMARY, alignItems: "center",
  },
  roleBtnActive: { backgroundColor: PRIMARY },
  roleBtnText: { fontSize: 13, fontWeight: "600", color: PRIMARY },
  roleBtnTextActive: { color: "#fff" },
  field: { marginBottom: 16 },
  label: { fontSize: 10, fontWeight: "600", color: TEXT_MUTED, letterSpacing: 0.8, marginBottom: 6 },
  input: {
    backgroundColor: "#fff", borderWidth: 1, borderColor: BORDER,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 14, color: TEXT_DARK,
  },
  inputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderWidth: 1, borderColor: BORDER,
    borderRadius: 12, paddingHorizontal: 14,
  },
  eyeBtn: { padding: 8 },
  forgotRow: { alignItems: "flex-end", marginBottom: 18 },
  forgotText: { fontSize: 12, color: PRIMARY, fontWeight: "600" },
  cta: {
    backgroundColor: PRIMARY, borderRadius: 14,
    paddingVertical: 16, alignItems: "center",
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  ctaText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: { fontSize: 12, color: "#8AABAB" },
  linkRow: { flexDirection: "row", justifyContent: "center" },
  linkText: { fontSize: 13, color: TEXT_MUTED },
  linkAction: { fontSize: 13, color: PRIMARY, fontWeight: "700" },
});