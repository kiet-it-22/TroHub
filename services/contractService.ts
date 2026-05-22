import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contract } from "../types/Contract";
import { authService } from "./authService";
// import { apiClient } from "./apiClient";

const CONTRACT_KEY = "TROHUB_CONTRACT";

const defaultContract: Contract = {
  id: "HD-A101-2026",
  room: "A101",
  tenantName: "Nguyễn Văn A",
  startDate: "01/01/2026",
  endDate: "30/12/2026",
  rentFee: "2.500.000đ / tháng",
  deposit: "2.500.000đ",
  status: "active",
  usedMonths: 5,
  remainingMonths: 7,
  progressPercent: "42%",
  serviceFees: {
    electric: "4.000đ / kWh",
    water: "15.000đ / m³",
    parking: "200.000đ / tháng",
    internet: "100.000đ / tháng",
  },
  note:
    "Người thuê cần thanh toán tiền phòng trước ngày 05 hằng tháng. Nếu có nhu cầu gia hạn hợp đồng, vui lòng liên hệ chủ trọ trước 30 ngày.",
};

export const contractService = {
  async getContract(): Promise<Contract> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * return await apiClient.get<Contract>("/contract/current", token);
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      const savedContract = await AsyncStorage.getItem(CONTRACT_KEY);

      if (savedContract) {
        return JSON.parse(savedContract);
      }

      await AsyncStorage.setItem(CONTRACT_KEY, JSON.stringify(defaultContract));
      return defaultContract;
    } catch (error) {
      console.log("Lỗi lấy hợp đồng:", error);
      return defaultContract;
    }
  },
};