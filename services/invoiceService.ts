import AsyncStorage from "@react-native-async-storage/async-storage";
import { Invoice } from "../types/Invoice";
import { authService } from "./authService";
// import { apiClient } from "./apiClient";

const INVOICE_KEY = "TROHUB_INVOICES";

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

export const invoiceService = {
  async getInvoices(): Promise<Invoice[]> {
    try {
      /**
       * Hiện tại chưa có backend nên lấy từ AsyncStorage.
       * Sau này có API thì đổi thành:
       *
       * const token = await authService.getToken();
       * return await apiClient.get<Invoice[]>("/invoices", token);
       */

      const savedInvoices = await AsyncStorage.getItem(INVOICE_KEY);

      if (savedInvoices) {
        return JSON.parse(savedInvoices);
      }

      await AsyncStorage.setItem(INVOICE_KEY, JSON.stringify(initialInvoices));
      return initialInvoices;
    } catch (error) {
      console.log("Lỗi lấy danh sách hóa đơn:", error);
      return initialInvoices;
    }
  },

  async payInvoice(invoiceId: number): Promise<Invoice[]> {
    try {
      /**
       * Hiện tại chưa có backend nên update local.
       * Sau này có API thì đổi thành:
       *
       * const token = await authService.getToken();
       * await apiClient.post(`/invoices/${invoiceId}/pay`, {}, token);
       * return await this.getInvoices();
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      const invoices = await this.getInvoices();

      const updatedInvoices = invoices.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              status: "paid" as const,
              statusText: "Đã thanh toán",
            }
          : item
      );

      await AsyncStorage.setItem(INVOICE_KEY, JSON.stringify(updatedInvoices));

      return updatedInvoices;
    } catch (error) {
      console.log("Lỗi thanh toán hóa đơn:", error);
      throw error;
    }
  },
};