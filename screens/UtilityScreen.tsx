import React from "react";
import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

const utilityHistory = [
  {
    month: "05/2026",
    electricOld: 1200,
    electricNew: 1280,
    electricUsed: 80,
    waterOld: 45,
    waterNew: 54,
    waterUsed: 9,
    electricMoney: "320.000đ",
    waterMoney: "135.000đ",
  },
  {
    month: "04/2026",
    electricOld: 1130,
    electricNew: 1200,
    electricUsed: 70,
    waterOld: 37,
    waterNew: 45,
    waterUsed: 8,
    electricMoney: "280.000đ",
    waterMoney: "120.000đ",
  },
  {
    month: "03/2026",
    electricOld: 1065,
    electricNew: 1130,
    electricUsed: 65,
    waterOld: 29,
    waterNew: 37,
    waterUsed: 8,
    electricMoney: "260.000đ",
    waterMoney: "120.000đ",
  },
];

type Props = {
  onBack: () => void;
};

export default function UtilityScreen({ onBack }: Props) {
  const current = utilityHistory[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>‹ Quay lại</Text>
      </Pressable>

      <Text style={styles.title}>Điện nước</Text>
      <Text style={styles.subtitle}>
        Theo dõi chỉ số điện nước và chi phí sử dụng hằng tháng.
      </Text>

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Điện đã dùng</Text>
          <Text style={styles.summaryNumber}>{current.electricUsed} kWh</Text>
          <Text style={styles.summaryMoney}>{current.electricMoney}</Text>
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Nước đã dùng</Text>
          <Text style={styles.summaryNumber}>{current.waterUsed} m³</Text>
          <Text style={styles.summaryMoney}>{current.waterMoney}</Text>
        </Card>
      </View>

      <Card style={styles.currentCard}>
        <Text style={styles.sectionTitle}>Tháng {current.month}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chỉ số điện cũ</Text>
          <Text style={styles.infoValue}>{current.electricOld}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chỉ số điện mới</Text>
          <Text style={styles.infoValue}>{current.electricNew}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Đơn giá điện</Text>
          <Text style={styles.infoValue}>4.000đ / kWh</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chỉ số nước cũ</Text>
          <Text style={styles.infoValue}>{current.waterOld}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chỉ số nước mới</Text>
          <Text style={styles.infoValue}>{current.waterNew}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Đơn giá nước</Text>
          <Text style={styles.infoValue}>15.000đ / m³</Text>
        </View>
      </Card>

      <Text style={styles.historyTitle}>Lịch sử điện nước</Text>

      {utilityHistory.map((item) => (
        <Card key={item.month} style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyMonth}>Tháng {item.month}</Text>
            <Text style={styles.historyTotal}>
              {item.electricMoney} + {item.waterMoney}
            </Text>
          </View>

          <View style={styles.historyRow}>
            <Text style={styles.historyText}>Điện: {item.electricUsed} kWh</Text>
            <Text style={styles.historyText}>Nước: {item.waterUsed} m³</Text>
          </View>
        </Card>
      ))}
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
    paddingTop: 28,
    paddingBottom: 30,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  backText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "900",
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
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryNumber: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8,
  },
  summaryMoney: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
  },
  currentCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 12,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 13,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F1F3",
    marginVertical: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },
  historyCard: {
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  historyMonth: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  historyTotal: {
    color: COLORS.orange,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "right",
    flex: 1,
  },
  historyRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
  },
  historyText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },
});