export type Priority = "Cao" | "Trung bình" | "Thấp";

export type RepairStatus = "pending" | "processing" | "done";

export type RepairRequest = {
  id: number;
  room: string;
  type: string;
  priority: Priority;
  description: string;
  status: RepairStatus;
  createdAt: string;
};