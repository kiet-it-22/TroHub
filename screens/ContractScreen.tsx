import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";
import { Contract } from "../types/Contract";
import { contractService } from "../services/contractService";

export default function ContractScreen() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    try {
      setIsLoading(true);
      const data = await contractService.getContract();
      setContract(data);
    } catch (error) {
      console.log("Lỗi load hợp đồng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  if (!contract) {
    return (
      <View style={styles.loadingBox}>
        <Text style={styles.emptyText}>Không tìm thấy hợp đồng.</Text>
      </View>
    );
  }

  const contractInfo = [
    {
      label: "Mã hợp đồng",
      value: contract.id,
    },
    {
      label: "Phòng",
      value: contract.room,
    },
    {
      label: "Người thuê",
      value: contract.tenantName,
    },
    {
      label: "Ngày bắt đầu",
      value: contract.startDate,
    },
    {
      label: "Ngày kết thúc",
      value: contract.endDate,
    },
    {
      label: "Tiền thuê",
      value: contract.rentFee,
    },
    {
      label: "Tiền cọc",
      value: contract.deposit,
    },
  ];

  const serviceFees = [
    {
      label: "Giá điện",
      value: contract.serviceFees.electric,
    },
    {
      label: "Giá nước",
      value: contract.serviceFees.water,
    },
    {
      label: "Phí xe",
      value: contract.serviceFees.parking,
    },
    {
      label: "Phí internet",
      value: contract.serviceFees.internet,
    },
  ];

  const isActive = contract.status === "active";

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
          <View style={styles.statusLeft}>
            <Text style={styles.statusTitle}>Phòng {contract.room}</Text>
            <Text style={styles.statusDesc}>
              {isActive
                ? "Hợp đồng đang còn hiệu lực"
                : "Hợp đồng đã hết hiệu lực"}
            </Text>
          </View>

          <View style={isActive ? styles.activeBadge : styles.expiredBadge}>
            <Text style={isActive ? styles.activeText : styles.expiredText}>
              {isActive ? "Còn hiệu lực" : "Hết hạn"}
            </Text>
          </View>
        </View>

        <View style={styles.progressBox}>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                { width: contract.progressPercent as `${number}%` },
              ]}
            />
          </View>

          <View style={styles.progressTextRow}>
            <Text style={styles.progressText}>
              Đã sử dụng {contract.usedMonths} tháng
            </Text>
            <Text style={styles.progressText}>
              Còn {contract.remainingMonths} tháng
            </Text>
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
        <Text style={styles.noteText}>{contract.note}</Text>
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
  loadingBox: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
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
  statusLeft: {
    flex: 1,
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
  expiredBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF1F1",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  expiredText: {
    color: COLORS.red,
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