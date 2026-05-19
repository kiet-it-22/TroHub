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
} from "react-native";
import { COLORS } from "../constants/theme";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePhoneChange = (value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setPhone(onlyNumber);

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

  const validateLogin = () => {
    let isValid = true;

    if (!phone.trim()) {
      setPhoneError("Vui lòng nhập số điện thoại");
      isValid = false;
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải gồm đúng 10 số");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else if (password.length <= 6) {
      setPasswordError("Mật khẩu phải trên 6 ký tự");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      onLogin();
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

            <Text style={styles.title}>Đăng nhập tài khoản thuê phòng</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                style={[
                  styles.input,
                  phoneError ? styles.inputError : null,
                ]}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder=""
                keyboardType="phone-pad"
                maxLength={10}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
              />
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}

              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={[
                  styles.input,
                  passwordError ? styles.inputError : null,
                ]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder=""
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <Pressable style={styles.primaryButton} onPress={validateLogin}>
                <Text style={styles.primaryText}>Đăng nhập</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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