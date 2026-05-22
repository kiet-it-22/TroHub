import AsyncStorage from "@react-native-async-storage/async-storage";
// import { apiClient } from "./apiClient";

const LOGIN_KEY = "TROHUB_IS_LOGGED_IN";
const TOKEN_KEY = "TROHUB_ACCESS_TOKEN";

type LoginResponse = {
  accessToken: string;
};

export const authService = {
  async checkLogin(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(LOGIN_KEY);
      return value === "true";
    } catch (error) {
      console.log("Lỗi kiểm tra đăng nhập:", error);
      return false;
    }
  },

  async login(phone: string, password: string): Promise<boolean> {
    try {
      /**
       * Hiện tại chưa có backend nên giả lập đăng nhập thành công.
       *
       * Sau này có API thì đổi thành:
       *
       * const response = await apiClient.post<LoginResponse>("/auth/login", {
       *   phone,
       *   password,
       * });
       *
       * await AsyncStorage.setItem(TOKEN_KEY, response.accessToken);
       */

      const fakeResponse: LoginResponse = {
        accessToken: "fake_access_token",
      };

      console.log("Đăng nhập giả lập:", {
        phone,
        password,
      });

      await AsyncStorage.setItem(TOKEN_KEY, fakeResponse.accessToken);
      await AsyncStorage.setItem(LOGIN_KEY, "true");

      return true;
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LOGIN_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.log("Lỗi đăng xuất:", error);
      throw error;
    }
  },

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      /**
       * Hiện tại chưa có backend nên giả lập đổi mật khẩu thành công.
       *
       * Sau này có API thì đổi thành:
       *
       * const token = await this.getToken();
       *
       * await apiClient.put(
       *   "/auth/change-password",
       *   {
       *     oldPassword,
       *     newPassword,
       *   },
       *   token
       * );
       */

      const token = await this.getToken();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      console.log("Đổi mật khẩu giả lập:", {
        oldPassword,
        newPassword,
      });

      return true;
    } catch (error) {
      console.log("Lỗi đổi mật khẩu:", error);
      throw error;
    }
  },

  async forgotPassword(phone: string): Promise<boolean> {
    try {
      /**
       * Hiện tại chưa có backend nên giả lập gửi yêu cầu quên mật khẩu.
       *
       * Sau này có API thì đổi thành:
       *
       * await apiClient.post("/auth/forgot-password", {
       *   phone,
       * });
       */

      console.log("Quên mật khẩu giả lập:", {
        phone,
      });

      return true;
    } catch (error) {
      console.log("Lỗi quên mật khẩu:", error);
      throw error;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.log("Lỗi lấy token:", error);
      return null;
    }
  },
};