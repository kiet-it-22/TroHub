import AsyncStorage from "@react-native-async-storage/async-storage";
import { UtilityRecord } from "../types/UtilityRecord";
import { authService } from "./authService";
// import { apiClient } from "./apiClient";

const UTILITY_KEY = "TROHUB_UTILITY_RECORDS";

const initialUtilities: UtilityRecord[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

export const utilityService = {
  async getUtilities(): Promise<UtilityRecord[]> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * return await apiClient.get<UtilityRecord[]>("/utilities", token);
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      const savedUtilities = await AsyncStorage.getItem(UTILITY_KEY);

      if (savedUtilities) {
        return JSON.parse(savedUtilities);
      }

      await AsyncStorage.setItem(UTILITY_KEY, JSON.stringify(initialUtilities));
      return initialUtilities;
    } catch (error) {
      console.log("Lỗi lấy dữ liệu điện nước:", error);
      return initialUtilities;
    }
  },
};