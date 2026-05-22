import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "../types/UserProfile";
import { authService } from "./authService";
// import { apiClient } from "./apiClient";

const PROFILE_KEY = "TROHUB_USER_PROFILE";

const defaultProfile: UserProfile = {
  id: "user_001",
  fullName: "Nguyễn Văn A",
  phone: "0901234567",
  email: "nguyenvana@gmail.com",
  cccd: "012345678901",
  room: "A101",
  startDate: "01/01/2026",
};

export const userService = {
  async getProfile(): Promise<UserProfile> {
    try {
      /**
       * Hiện tại chưa có backend nên lấy từ AsyncStorage.
       * Sau này có API thì đổi thành:
       *
       * const token = await authService.getToken();
       * const profile = await apiClient.get<UserProfile>("/user/profile", token);
       * await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
       * return profile;
       */

      const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

      if (savedProfile) {
        return JSON.parse(savedProfile);
      }

      return defaultProfile;
    } catch (error) {
      console.log("Lỗi lấy thông tin cá nhân:", error);
      return defaultProfile;
    }
  },

  async updateProfile(profile: UserProfile): Promise<UserProfile> {
    try {
      /**
       * Hiện tại chưa có backend nên lưu local.
       * Sau này có API thì đổi thành:
       *
       * const token = await authService.getToken();
       * const updatedProfile = await apiClient.put<UserProfile>(
       *   "/user/profile",
       *   profile,
       *   token
       * );
       *
       * await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
       * return updatedProfile;
       */

      const token = await authService.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      return profile;
    } catch (error) {
      console.log("Lỗi cập nhật thông tin cá nhân:", error);
      throw error;
    }
  },
};