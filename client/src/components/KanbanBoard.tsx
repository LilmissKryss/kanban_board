import { useState, useEffect } from "react";
import Swimlane from "./Swimlane";
import { useNavigate } from "react-router-dom";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

interface Column {
  id: number;
  title: string;
  order: number;
  boardId: number;
  tickets: TicketData[];
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/columns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Transform the data to match TicketData interface
          const transformedData = data.map((column: any) => ({
            ...column,
            tickets: column.tickets.map((ticket: any) => ({
              id: ticket.id,
              name: ticket.title,
              description: ticket.description,
              status: ticket.status,
              assignedUserId: ticket.userId,
              assignedUser: null, // We'll need to fetch user data separately if needed
            })),
          }));
          setColumns(transformedData);
        } else if (response.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, [navigate]);

  const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return { message: "Not authenticated" };
      }

      const response = await fetch(
        `http://localhost:3001/api/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update the local state by removing the deleted ticket
        setColumns(
          columns.map((column) => ({
            ...column,
            tickets: column.tickets.filter((ticket) => ticket.id !== ticketId),
          }))
        );
        return { message: "Ticket deleted successfully" };
      } else if (response.status === 401) {
        navigate("/login");
        return { message: "Not authenticated" };
      }
      return { message: "Failed to delete ticket" };
    } catch (error) {
      console.error("Error deleting ticket:", error);
      return { message: "Error deleting ticket" };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex overflow-x-auto p-4 space-x-4">
        {columns.map((column) => (
          <Swimlane
            key={column.id}
            title={column.title}
            tickets={column.tickets}
            deleteTicket={deleteTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
