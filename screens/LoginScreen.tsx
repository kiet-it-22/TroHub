import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

type Props = {
  onLogin: (phone: string, password: string) => Promise<void>;
};

export default function LoginScreen({ onLogin }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value);

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (passwordError) {
      setPasswordError("");
    }
  };

  const validateLogin = async () => {
    let isValid = true;

    if (!phone.trim()) {
      setPhoneError("Vui lòng nhập số điện thoại hoặc email");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải từ 6 ký tự trở lên");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await onLogin(phone, password);
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
      Alert.alert("Lỗi", error instanceof Error ? error.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.logoBox}>
              <Text style={styles.logoIcon}>TH</Text>
              <Text style={styles.logoText}>TroHub</Text>
            </View>

            <Text style={styles.title}>Đăng nhập hệ thống TroHub</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Số điện thoại hoặc Email</Text>
              <TextInput
                style={[styles.input, phoneError ? styles.inputError : null]}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Nhập SĐT hoặc email đăng nhập"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
                editable={!isSubmitting}
              />
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}

              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder=""
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
                editable={!isSubmitting}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <Pressable
                style={[
                  styles.primaryButton,
                  isSubmitting && styles.primaryButtonDisabled,
                ]}
                onPress={validateLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryText}>Đăng nhập</Text>
                )}
              </Pressable>

              <Pressable
                disabled={isSubmitting}
                onPress={() => setForgotVisible(true)}
              >
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ForgotPasswordModal
        visible={forgotVisible}
        onClose={() => setForgotVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 70,
    paddingBottom: 40,
    backgroundColor: "#F4F5F7",
  },
  logoBox: {
    alignItems: "center",
    marginBottom: 70,
  },
  logoIcon: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  logoText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 2,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "900",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 42,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E8E9ED",
    fontSize: 15,
    color: COLORS.text,
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF7F7",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 2,
  },
  primaryButton: {
    width: "100%",
    height: 52,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },
  primaryButtonDisabled: {
    opacity: 0.75,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  forgot: {
    color: COLORS.orange,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 22,
  },
});