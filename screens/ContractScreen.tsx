import React from "react";
import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

const contractInfo = [
  {
    label: "Mã hợp đồng",
    value: "HD-A101-2026",
  },
  {
    label: "Phòng",
    value: "A101",
  },
  {
    label: "Người thuê",
    value: "Nguyễn Văn A",
  },
  {
    label: "Ngày bắt đầu",
    value: "01/01/2026",
  },
  {
    label: "Ngày kết thúc",
    value: "30/12/2026",
  },
  {
    label: "Tiền thuê",
    value: "2.500.000đ / tháng",
  },
  {
    label: "Tiền cọc",
    value: "2.500.000đ",
  },
];

const serviceFees = [
  {
    label: "Giá điện",
    value: "4.000đ / kWh",
  },
  {
    label: "Giá nước",
    value: "15.000đ / m³",
  },
  {
    label: "Phí xe",
    value: "200.000đ / tháng",
  },
  {
    label: "Phí internet",
    value: "100.000đ / tháng",
  },
];

export default function ContractScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Hợp đồng của tôi</Text>
      <Text style={styles.subtitle}>
        Xem thông tin hợp đồng thuê phòng và các khoản phí dịch vụ.
      </Text>

      <Card style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.statusTitle}>Phòng A101</Text>
            <Text style={styles.statusDesc}>Hợp đồng đang còn hiệu lực</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Còn hiệu lực</Text>
          </View>
        </View>

        <View style={styles.progressBox}>
          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressTextRow}>
            <Text style={styles.progressText}>Đã sử dụng 5 tháng</Text>
            <Text style={styles.progressText}>Còn 7 tháng</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>

        {contractInfo.map((item) => (
          <View key={item.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Phí dịch vụ</Text>

        {serviceFees.map((item) => (
          <View key={item.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.noteCard}>
        <Text style={styles.sectionTitle}>Ghi chú</Text>
        <Text style={styles.noteText}>
          Người thuê cần thanh toán tiền phòng trước ngày 05 hằng tháng. Nếu có
          nhu cầu gia hạn hợp đồng, vui lòng liên hệ chủ trọ trước 30 ngày.
        </Text>
      </Card>

      <View style={styles.actionRow}>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryText}>Xem PDF</Text>
        </Pressable>

        <Pressable style={styles.outlineButton}>
          <Text style={styles.outlineText}>Tải xuống</Text>
        </Pressable>
      </View>
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
  statusCard: {
    marginBottom: 14,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  statusDesc: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },
  activeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EAFBEF",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  activeText: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "900",
  },
  progressBox: {
    marginTop: 22,
  },
  progressBg: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#ECEEF2",
    overflow: "hidden",
  },
  progressFill: {
    width: "42%",
    height: "100%",
    backgroundColor: COLORS.orange,
    borderRadius: 999,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },
  progressText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    marginBottom: 14,
  },
  noteCard: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },
  infoRow: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F3",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 13,
    flex: 1,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    flex: 1.2,
    textAlign: "right",
  },
  noteText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.orange,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  outlineButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "900",
  },
});