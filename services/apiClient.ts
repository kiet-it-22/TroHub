const API_BASE_URL = "http://localhost:3000/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiOptions = {
  method?: RequestMethod;
  body?: unknown;
  token?: string | null;
};

export const apiClient = {
  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, token } = options;

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
      }

      return data;
    } catch (error) {
      console.log("API error:", error);
      throw error;
    }
  },

  get<T>(endpoint: string, token?: string | null) {
    return this.request<T>(endpoint, {
      method: "GET",
      token,
    });
  },

  post<T>(endpoint: string, body?: unknown, token?: string | null) {
    return this.request<T>(endpoint, {
      method: "POST",
      body,
      token,
    });
  },

  put<T>(endpoint: string, body?: unknown, token?: string | null) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body,
      token,
    });
  },

  delete<T>(endpoint: string, token?: string | null) {
    return this.request<T>(endpoint, {
      method: "DELETE",
      token,
    });
  },
};