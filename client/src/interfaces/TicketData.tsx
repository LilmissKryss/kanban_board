// UserData import removed as it's not used

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
