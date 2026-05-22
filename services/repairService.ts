import AsyncStorage from "@react-native-async-storage/async-storage";
import { RepairRequest } from "../types/RepairRequest";
import { authService } from "./authService";
// import { apiClient } from "./apiClient";

const REPAIR_KEY = "TROHUB_REPAIR_REQUESTS";

const initialRequests: RepairRequest[] = [
  {
    id: 1,
    room: "A101",
    type: "Máy lạnh",
    priority: "Cao",
    description: "Máy lạnh không hoạt động, bật lên nhưng không mát.",
    status: "processing",
    createdAt: "20/05/2026",
  },
];

export const repairService = {
  async getRequests(): Promise<RepairRequest[]> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * return await apiClient.get<RepairRequest[]>("/repairs", token);
       */

      const savedRequests = await AsyncStorage.getItem(REPAIR_KEY);

      if (savedRequests) {
        return JSON.parse(savedRequests);
      }

      await AsyncStorage.setItem(REPAIR_KEY, JSON.stringify(initialRequests));
      return initialRequests;
    } catch (error) {
      console.log("Lỗi lấy danh sách sửa chữa:", error);
      return initialRequests;
    }
  },

  async createRequest(
    request: Omit<RepairRequest, "id" | "status" | "createdAt">
  ): Promise<RepairRequest[]> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * await apiClient.post("/repairs", request, token);
       * return await this.getRequests();
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      const currentRequests = await this.getRequests();

      const newRequest: RepairRequest = {
        ...request,
        id: Date.now(),
        status: "pending",
        createdAt: "21/05/2026",
      };

      const updatedRequests = [newRequest, ...currentRequests];

      await AsyncStorage.setItem(REPAIR_KEY, JSON.stringify(updatedRequests));

      return updatedRequests;
    } catch (error) {
      console.log("Lỗi tạo yêu cầu sửa chữa:", error);
      throw error;
    }
  },

  async deleteRequest(id: number): Promise<RepairRequest[]> {
    try {
      /**
       * Sau này có API:
       * const token = await authService.getToken();
       * await apiClient.delete(`/repairs/${id}`, token);
       * return await this.getRequests();
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      const currentRequests = await this.getRequests();

      const updatedRequests = currentRequests.filter((item) => item.id !== id);

      await AsyncStorage.setItem(REPAIR_KEY, JSON.stringify(updatedRequests));

      return updatedRequests;
    } catch (error) {
      console.log("Lỗi xóa yêu cầu sửa chữa:", error);
      throw error;
    }
  },
};