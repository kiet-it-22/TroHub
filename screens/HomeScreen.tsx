import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

type Props = {
  onNavigate: (screen: "invoice" | "repair" | "contract" | "utility") => void;
};

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Xin chào, Nguyễn Văn A</Text>
          <Text style={styles.room}>Phòng A101</Text>
        </View>
      </View>

      <Card style={styles.amountCard}>
        <Text style={styles.smallText}>Tổng tiền</Text>

        <Text style={styles.amount}>3.255.000đ</Text>

        <Text style={styles.unpaid}>Chưa thanh toán</Text>

        <Text style={styles.smallText}>Hạn thanh toán: 05/06/2026</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => onNavigate("invoice")}
        >
          <Text style={styles.primaryText}>Thanh toán ngay</Text>
        </Pressable>
      </Card>

      <View style={styles.quickGrid}>
        <Pressable
          style={styles.quickItem}
          onPress={() => onNavigate("contract")}
        >
          <Card style={styles.quickCard}>
            <Text style={styles.quickText}>Hợp đồng</Text>
          </Card>
        </Pressable>

        <Pressable
          style={styles.quickItem}
          onPress={() => onNavigate("utility")}
        >
          <Card style={styles.quickCard}>
            <Text style={styles.quickText}>Điện nước</Text>
          </Card>
        </Pressable>

        <Pressable
          style={styles.quickItem}
          onPress={() => onNavigate("repair")}
        >
          <Card style={styles.quickCard}>
            <Text style={styles.quickText}>Sửa chữa</Text>
          </Card>
        </Pressable>

        <Pressable
          style={styles.quickItem}
          onPress={() => onNavigate("invoice")}
        >
          <Card style={styles.quickCard}>
            <Text style={styles.quickText}>Hóa đơn</Text>
          </Card>
        </Pressable>
      </View>

      <Pressable onPress={() => onNavigate("contract")}>
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Hợp đồng</Text>
          <Text style={styles.cardDesc}>Ngày hết hạn: 30/12/2026</Text>
        </Card>
      </Pressable>

      <Pressable onPress={() => onNavigate("repair")}>
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Máy lạnh không hoạt động</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Đang xử lý</Text>
          </View>
        </Card>
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
    paddingBottom: 26,
  },
  header: {
    marginBottom: 18,
  },
  hello: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "900",
    color: COLORS.text,
  },
  room: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 4,
  },
  amountCard: {
    marginBottom: 18,
  },
  smallText: {
    fontSize: 13,
    color: COLORS.muted,
  },
  amount: {
    fontSize: 31,
    fontWeight: "900",
    color: COLORS.orange,
    marginTop: 10,
    marginBottom: 4,
  },
  unpaid: {
    color: COLORS.orange,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 12,
  },
  primaryButton: {
    height: 46,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  quickGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  quickItem: {
    flex: 1,
  },
  quickCard: {
    height: 68,
    paddingHorizontal: 6,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  infoCard: {
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 8,
  },
  cardDesc: {
    color: COLORS.muted,
    fontSize: 13,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6FAFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  badgeText: {
    color: "#00A2C7",
    fontSize: 12,
    fontWeight: "800",
  },
});