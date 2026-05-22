export type Contract = {
  id: string;
  room: string;
  tenantName: string;
  startDate: string;
  endDate: string;
  rentFee: string;
  deposit: string;
  status: "active" | "expired";
  usedMonths: number;
  remainingMonths: number;
  progressPercent: string;
  serviceFees: {
    electric: string;
    water: string;
    parking: string;
    internet: string;
  };
  note: string;
};