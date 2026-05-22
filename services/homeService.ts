import { HomeData } from "../types/HomeData";
import { userService } from "./userService";
import { invoiceService } from "./invoiceService";
import { repairService } from "./repairService";
import { contractService } from "./contractService";
// import { apiClient } from "./apiClient";
// import { authService } from "./authService";

export const homeService = {
  async getHomeData(): Promise<HomeData> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * return await apiClient.get<HomeData>("/home", token);
       */

      const profile = await userService.getProfile();
      const invoices = await invoiceService.getInvoices();
      const repairs = await repairService.getRequests();
      const contract = await contractService.getContract();

      const unpaidInvoice = invoices.find((item) => item.status === "unpaid");
      const latestRepair = repairs[0];

      return {
        tenantName: profile.fullName,
        room: profile.room,
        totalAmount: unpaidInvoice?.amount || "0đ",
        paymentStatus: unpaidInvoice ? "unpaid" : "paid",
        paymentStatusText: unpaidInvoice ? "Chưa thanh toán" : "Đã thanh toán",
        dueDate: unpaidInvoice?.dueDate || "Không có",
        contractEndDate: contract.endDate,
        recentRepair: {
          title: latestRepair?.description || "Không có yêu cầu sửa chữa",
          status:
            latestRepair?.status === "pending"
              ? "Chờ tiếp nhận"
              : latestRepair?.status === "processing"
              ? "Đang xử lý"
              : latestRepair?.status === "done"
              ? "Đã hoàn thành"
              : "Không có",
        },
      };
    } catch (error) {
      console.log("Lỗi lấy dữ liệu trang chủ:", error);

      return {
        tenantName: "Nguyễn Văn A",
        room: "A101",
        totalAmount: "3.255.000đ",
        paymentStatus: "unpaid",
        paymentStatusText: "Chưa thanh toán",
        dueDate: "05/06/2026",
        contractEndDate: "30/12/2026",
        recentRepair: {
          title: "Máy lạnh không hoạt động",
          status: "Đang xử lý",
        },
      };
    }
  },
};