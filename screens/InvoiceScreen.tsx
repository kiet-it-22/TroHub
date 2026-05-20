import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";
import InvoiceDetailModal, {
  Invoice,
} from "../components/InvoiceDetailModal";
import PaymentModal from "../components/PaymentModal";

type FilterType = "all" | "unpaid" | "paid";

const initialInvoices: Invoice[] = [
  {
    id: 1,
    month: "05/2026",
    room: "A101",
    amount: "3.255.000đ",
    status: "unpaid",
    statusText: "Chưa thanh toán",
    dueDate: "05/06/2026",
    details: {
      roomFee: "2.500.000đ",
      electric: "320.000đ",
      water: "135.000đ",
      parking: "200.000đ",
      internet: "100.000đ",
    },
  },
  {
    id: 2,
    month: "04/2026",
    room: "A101",
    amount: "3.120.000đ",
    status: "paid",
    statusText: "Đã thanh toán",
    dueDate: "05/05/2026",
    details: {
      roomFee: "2.500.000đ",
      electric: "280.000đ",
      water: "120.000đ",
      parking: "200.000đ",
      internet: "20.000đ",
    },
  },
  {
    id: 3,
    month: "03/2026",
    room: "A101",
    amount: "3.080.000đ",
    status: "paid",
    statusText: "Đã thanh toán",
    dueDate: "05/04/2026",
    details: {
      roomFee: "2.500.000đ",
      electric: "260.000đ",
      water: "120.000đ",
      parking: "200.000đ",
      internet: "0đ",
    },
  },
];

export default function InvoiceScreen() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoiceList.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const handlePayment = (invoiceId: number) => {
    setInvoiceList((prevList) =>
      prevList.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              status: "paid",
              statusText: "Đã thanh toán",
            }
          : item
      )
    );

    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: "paid",
        statusText: "Đã thanh toán",
      });
    }

    if (paymentInvoice?.id === invoiceId) {
      setPaymentInvoice({
        ...paymentInvoice,
        status: "paid",
        statusText: "Đã thanh toán",
      });
    }
  };

  const openPaymentModal = (invoice: Invoice) => {
    setPaymentInvoice(invoice);
  };

  const openPaymentFromDetail = (invoiceId: number) => {
    const invoice = invoiceList.find((item) => item.id === invoiceId);

    if (invoice) {
      setSelectedInvoice(null);
      setPaymentInvoice(invoice);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Hóa đơn</Text>

        <View style={styles.filterRow}>
          <Pressable
            style={[
              styles.filterButton,
              filter === "all" && styles.filterActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "all" && styles.filterTextActive,
              ]}
            >
              Tất cả
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              filter === "unpaid" && styles.filterActive,
            ]}
            onPress={() => setFilter("unpaid")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "unpaid" && styles.filterTextActive,
              ]}
            >
              Chưa TT
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              filter === "paid" && styles.filterActive,
            ]}
            onPress={() => setFilter("paid")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "paid" && styles.filterTextActive,
              ]}
            >
              Đã TT
            </Text>
          </Pressable>
        </View>

        {filteredInvoices.map((invoice) => {
          const isPaid = invoice.status === "paid";

          return (
            <Card key={invoice.id} style={styles.invoiceCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardTitle}>
                    Hóa đơn tháng {invoice.month}
                  </Text>
                  <Text style={styles.room}>Phòng {invoice.room}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    isPaid ? styles.paidBadge : styles.unpaidBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      isPaid ? styles.paidText : styles.unpaidText,
                    ]}
                  >
                    {invoice.statusText}
                  </Text>
                </View>
              </View>

              <Text style={styles.amount}>{invoice.amount}</Text>

              <Text style={styles.dueDate}>
                Hạn thanh toán: {invoice.dueDate}
              </Text>

              <View style={styles.actionRow}>
                {!isPaid && (
                  <Pressable
                    style={styles.payButton}
                    onPress={() => openPaymentModal(invoice)}
                  >
                    <Text style={styles.payText}>Thanh toán</Text>
                  </Pressable>
                )}

                <Pressable
                  style={styles.detailButton}
                  onPress={() => setSelectedInvoice(invoice)}
                >
                  <Text style={styles.detailText}>Xem chi tiết</Text>
                </Pressable>
              </View>
            </Card>
          );
        })}
      </ScrollView>

      <InvoiceDetailModal
        visible={selectedInvoice !== null}
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onPay={openPaymentFromDetail}
      />

      <PaymentModal
        visible={paymentInvoice !== null}
        invoice={paymentInvoice}
        onClose={() => setPaymentInvoice(null)}
        onConfirm={handlePayment}
      />
    </>
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
  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 18,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  filterText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  invoiceCard: {
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.text,
  },
  room: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  unpaidBadge: {
    backgroundColor: COLORS.orangeSoft,
  },
  paidBadge: {
    backgroundColor: "#EAFBEF",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "900",
  },
  unpaidText: {
    color: COLORS.orange,
  },
  paidText: {
    color: COLORS.green,
  },
  amount: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 18,
  },
  dueDate: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    flexWrap: "wrap",
  },
  payButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  payText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  detailButton: {
    borderWidth: 1,
    borderColor: COLORS.orange,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  detailText: {
    color: COLORS.orange,
    fontWeight: "800",
  },
});