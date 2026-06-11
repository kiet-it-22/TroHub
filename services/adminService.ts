import { authService } from "./authService";
import { apiClient } from "./apiClient";

export type AdminRoom = {
  _id: string;
  roomCode: string;
  area: string;
  defaultRentPrice: number;
  defaultDeposit: number;
  status: number; // 0: Trống, 1: Đang thuê, 2: Đang sửa
  landlordId?: string;
  createdAt?: string;
};

export type AdminTenant = {
  _id: string;
  username: string;
  fullName: string;
  phone: string;
  email?: string;
  idCard?: string;
  role: number;
  status: number;
  createdAt?: string;
};

export type AdminContract = {
  _id: string;
  roomId: string | { _id: string; roomCode: string; defaultRentPrice: number };
  tenantId: string | { _id: string; fullName: string; phone: string };
  startDate: string;
  endDate: string;
  fixedRentPrice: number;
  fixedDeposit: number;
  status: number; // 0: Chờ xác nhận, 1: Hiệu lực, 2: Hết hạn, 3: Hủy
  services?: { serviceId: string; fixedPrice: number }[];
  createdAt?: string;
};

export type AdminInvoice = {
  _id: string;
  contractId: {
    _id: string;
    roomId: { _id: string; roomCode: string };
    tenantId: { _id: string; fullName: string };
  };
  period: string;
  dueDate: string;
  totalAmount: number;
  status: number; // 0: Chưa thanh toán, 1: Đã thanh toán
  details?: {
    serviceId: { _id: string; name: string; unit: string };
    oldIndex?: number;
    newIndex?: number;
    quantity: number;
    appliedPrice: number;
    amount: number;
  }[];
  createdAt?: string;
};

export type AdminRepair = {
  _id: string;
  contractId: {
    _id: string;
    roomId: { _id: string; roomCode: string };
    tenantId: { _id: string; fullName: string };
  };
  title: string;
  description: string;
  priority: number; // 1: Thấp, 2: Vừa, 3: Gấp
  status: number; // 0: Mới, 1: Đang xử lý, 2: Hoàn tất, 3: Hủy
  landlordNote?: string;
  images?: string[];
  createdAt?: string;
};

export type AdminDashboardStats = {
  totalRooms: number;
  occupiedRooms: number;
  totalTenants: number;
  pendingRepairs: number;
  totalRevenue: number;
};

export const adminService = {
  async getRooms(): Promise<AdminRoom[]> {
    const token = await authService.getToken();
    const response = await apiClient.get<{ success: boolean; data: AdminRoom[] }>("/rooms", token);
    return response.success ? response.data : [];
  },

  async createRoom(roomData: { roomCode: string; area: string; defaultRentPrice: number; defaultDeposit: number }): Promise<AdminRoom> {
    const token = await authService.getToken();
    const response = await apiClient.post<{ success: boolean; data: AdminRoom }>("/rooms", roomData, token);
    return response.data;
  },

  async getTenants(): Promise<AdminTenant[]> {
    const token = await authService.getToken();
    const response = await apiClient.get<{ success: boolean; data: AdminTenant[] }>("/tenants", token);
    return response.success ? response.data : [];
  },

  async createTenant(tenantData: { fullName: string; phone: string; roomCode: string; idCard: string; startDate: string; password?: string }): Promise<AdminTenant> {
    const token = await authService.getToken();
    const response = await apiClient.post<{ success: boolean; data: AdminTenant }>("/tenants", tenantData, token);
    return response.data;
  },

  async getInvoices(): Promise<AdminInvoice[]> {
    const token = await authService.getToken();
    const response = await apiClient.get<{ success: boolean; data: AdminInvoice[] }>("/invoices", token);
    return response.success ? response.data : [];
  },

  async createInvoice(invoiceData: { contractId: string; period: string; dueDate: string; services: { serviceId: string; oldIndex: number; newIndex: number }[] }): Promise<AdminInvoice> {
    const token = await authService.getToken();
    const response = await apiClient.post<{ success: boolean; data: AdminInvoice }>("/invoices", invoiceData, token);
    return response.data;
  },

  async getContracts(): Promise<AdminContract[]> {
    const token = await authService.getToken();
    const response = await apiClient.get<{ success: boolean; data: AdminContract[] }>("/contracts", token);
    return response.success ? response.data : [];
  },

  async getRepairs(): Promise<AdminRepair[]> {
    const token = await authService.getToken();
    const response = await apiClient.get<{ success: boolean; data: AdminRepair[] }>("/repairs", token);
    return response.success ? response.data : [];
  },

  async updateRepair(repairId: string, updateData: { status?: number; priority?: number; landlordNote?: string }): Promise<AdminRepair> {
    const token = await authService.getToken();
    const response = await apiClient.put<{ success: boolean; data: AdminRepair }>(`/repairs/${repairId}`, updateData, token);
    return response.data;
  },

  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      const [rooms, tenants, repairs, invoices] = await Promise.all([
        this.getRooms(),
        this.getTenants(),
        this.getRepairs(),
        this.getInvoices(),
      ]);

      const occupiedRooms = rooms.filter(r => r.status === 1).length;
      const pendingRepairs = repairs.filter(r => r.status === 0 || r.status === 1).length;
      const totalRevenue = invoices
        .filter(inv => inv.status === 1)
        .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

      return {
        totalRooms: rooms.length,
        occupiedRooms,
        totalTenants: tenants.length,
        pendingRepairs,
        totalRevenue,
      };
    } catch (error) {
      console.log("Lỗi tính toán thống kê admin:", error);
      return {
        totalRooms: 0,
        occupiedRooms: 0,
        totalTenants: 0,
        pendingRepairs: 0,
        totalRevenue: 0,
      };
    }
  }
};
