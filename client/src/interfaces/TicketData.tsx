import { UserData } from "./UserData";

export interface TicketData {
  id: number | null;
  title: string | null;
  description: string | null;
  status: string | null;
  userId: number | null;
  columnId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
