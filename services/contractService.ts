import { Contract } from "../types/Contract";
import { apiClient } from "./apiClient";
import { authService } from "./authService";

type ApiRoom = {
  _id: string;
  roomCode?: string;
  area?: string;
};

type ApiTenant = {
  _id: string;
  fullName?: string;
  phone?: string;
};

type ApiServiceItem = {
  serviceId?: {
    _id: string;
    name?: string;
    unit?: string;
    type?: number;
    defaultPrice?: number;
  };
  fixedPrice?: number;
};

type ApiContract = {
  _id: string;
  roomId?: ApiRoom;
  tenantId?: ApiTenant;
  startDate: string;
  endDate: string;
  fixedRentPrice: number;
  fixedDeposit: number;
  status: number;
  services?: ApiServiceItem[];
};

type ContractListResponse = {
  success: boolean;
  data: ApiContract[];
  message?: string;
};

const formatMoney = (value?: number) => {
  const amount = value || 0;
  return `${amount.toLocaleString("vi-VN")}đ`;
};

const formatDate = (value?: string) => {
  if (!value) return "Không có";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Không có";
  }

  return date.toLocaleDateString("vi-VN");
};

const getMonthsDiff = (start: Date, end: Date) => {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
};

const getServicePrice = (services: ApiServiceItem[], keywords: string[]) => {
  const found = services.find((item) => {
    const name = item.serviceId?.name?.toLowerCase() || "";
    return keywords.some((keyword) => name.includes(keyword));
  });

  return found?.fixedPrice || 0;
};

const mapApiContractToContract = (apiContract: ApiContract): Contract => {
  const services = apiContract.services || [];

  const startDate = new Date(apiContract.startDate);
  const endDate = new Date(apiContract.endDate);
  const now = new Date();

  const totalMonths = Math.max(getMonthsDiff(startDate, endDate), 1);
  const usedMonths = Math.max(getMonthsDiff(startDate, now), 0);
  const remainingMonths = Math.max(totalMonths - usedMonths, 0);

  const progressNumber = Math.min(
    Math.round((usedMonths / totalMonths) * 100),
    100
  );

  const electricPrice = getServicePrice(services, ["điện", "dien"]);
  const waterPrice = getServicePrice(services, ["nước", "nuoc"]);
  const parkingPrice = getServicePrice(services, ["xe", "parking"]);
  const internetPrice = getServicePrice(services, [
    "internet",
    "wifi",
    "mạng",
    "mang",
  ]);

  return {
    id: apiContract._id,
    room: apiContract.roomId?.roomCode || "A101",
    tenantName: apiContract.tenantId?.fullName || "Người thuê",
    startDate: formatDate(apiContract.startDate),
    endDate: formatDate(apiContract.endDate),
    rentFee: `${formatMoney(apiContract.fixedRentPrice)} / tháng`,
    deposit: formatMoney(apiContract.fixedDeposit),
    status: apiContract.status === 1 ? "active" : "expired",
    usedMonths,
    remainingMonths,
    progressPercent: `${progressNumber}%`,
    serviceFees: {
      electric: `${formatMoney(electricPrice)} / kWh`,
      water: `${formatMoney(waterPrice)} / m³`,
      parking: `${formatMoney(parkingPrice)} / tháng`,
      internet: `${formatMoney(internetPrice)} / tháng`,
    },
    note:
      "Người thuê cần thanh toán tiền phòng trước ngày 05 hằng tháng. Nếu có nhu cầu gia hạn hợp đồng, vui lòng liên hệ chủ trọ trước 30 ngày.",
  };
};

const fallbackContract: Contract = {
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
      const token = await authService.getToken();
      const authUser = await authService.getAuthUser();

      if (!token) {
        throw new Error("Không tìm thấy token đăng nhập");
      }

      if (!authUser) {
        throw new Error("Không tìm thấy thông tin user đăng nhập");
      }

      const response = await apiClient.get<ContractListResponse>(
        "/contracts",
        token
      );

      if (!response.success) {
        throw new Error(response.message || "Không lấy được danh sách hợp đồng");
      }

      const contracts = response.data || [];

      const myContracts = contracts.filter((item) => {
        return item.tenantId?._id === authUser.id;
      });

      const activeContract =
        myContracts.find((item) => item.status === 1) || myContracts[0];

      if (!activeContract) {
        return fallbackContract;
      }

      return mapApiContractToContract(activeContract);
    } catch (error) {
      console.log("Lỗi lấy hợp đồng từ API:", error);
      return fallbackContract;
    }
  },
};