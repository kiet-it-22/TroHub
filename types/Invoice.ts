export type Invoice = {
  id: number;
  month: string;
  room: string;
  amount: string;
  status: "unpaid" | "paid";
  statusText: string;
  dueDate: string;
  details: {
    roomFee: string;
    electric: string;
    water: string;
    parking: string;
    internet: string;
  };
};