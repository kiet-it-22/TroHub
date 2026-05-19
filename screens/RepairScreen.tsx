import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";

type Priority = "Cao" | "Trung bình" | "Thấp";

export default function RepairScreen() {
  const [room] = useState("A101");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState<Priority>("Trung bình");
  const [description, setDescription] = useState("");

  const [typeError, setTypeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = () => {
    let isValid = true;

    if (!type.trim()) {
      setTypeError("Vui lòng nhập loại sự cố");
      isValid = false;
    } else {
      setTypeError("");
    }

    if (!description.trim()) {
      setDescriptionError("Vui lòng nhập mô tả sự cố");
      isValid = false;
    } else if (description.trim().length < 10) {
      setDescriptionError("Mô tả phải có ít nhất 10 ký tự");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!isValid) return;

    Alert.alert("Thành công", "Yêu cầu sửa chữa đã được gửi");
    setType("");
    setPriority("Trung bình");
    setDescription("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Yêu cầu sửa chữa</Text>
      <Text style={styles.subtitle}>
        Gửi thông tin sự cố để chủ trọ xử lý nhanh hơn.
      </Text>

      <Text style={styles.label}>Phòng</Text>
      <TextInput style={styles.inputDisabled} value={room} editable={false} />

      <Text style={styles.label}>Loại sự cố</Text>
      <TextInput
        style={[styles.input, typeError ? styles.inputError : null]}
        value={type}
        onChangeText={(value) => {
          setType(value);
          if (typeError) setTypeError("");
        }}
        placeholder="Điện, nước, internet, máy lạnh..."
        placeholderTextColor={COLORS.muted}
      />
      {typeError ? <Text style={styles.errorText}>{typeError}</Text> : null}

      <Text style={styles.label}>Mức độ ưu tiên</Text>
      <View style={styles.priorityRow}>
        {(["Cao", "Trung bình", "Thấp"] as Priority[]).map((item) => {
          const active = priority === item;

          return (
            <Pressable
              key={item}
              style={[styles.priorityButton, active && styles.priorityActive]}
              onPress={() => setPriority(item)}
            >
              <Text
                style={[
                  styles.priorityText,
                  active && styles.priorityTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, styles.textArea, descriptionError ? styles.inputError : null]}
        value={description}
        onChangeText={(value) => {
          setDescription(value);
          if (descriptionError) setDescriptionError("");
        }}
        placeholder="Ví dụ: Máy lạnh không hoạt động, nước chảy yếu..."
        placeholderTextColor={COLORS.muted}
        multiline
      />
      {descriptionError ? (
        <Text style={styles.errorText}>{descriptionError}</Text>
      ) : null}

      <Pressable style={styles.uploadBox}>
        <Text style={styles.uploadIcon}>＋</Text>
        <Text style={styles.uploadText}>Upload ảnh sự cố</Text>
        <Text style={styles.uploadHint}>PNG, JPG hoặc JPEG</Text>
      </Pressable>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Gửi yêu cầu</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E8E9ED",
    fontSize: 14,
    color: COLORS.text,
  },
  inputDisabled: {
    width: "100%",
    height: 48,
    backgroundColor: "#ECEEF2",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E1E3E8",
    fontSize: 14,
    color: COLORS.muted,
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
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 2,
  },
  priorityButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.muted,
  },
  priorityTextActive: {
    color: "#FFFFFF",
  },
  textArea: {
    height: 105,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  uploadBox: {
    height: 116,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFD8C2",
    borderStyle: "dashed",
    backgroundColor: "#FFF7F2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  uploadIcon: {
    color: COLORS.orange,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 4,
  },
  uploadText: {
    color: COLORS.orange,
    fontWeight: "800",
    fontSize: 14,
  },
  uploadHint: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    height: 52,
    backgroundColor: COLORS.orange,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});