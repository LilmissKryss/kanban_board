import TicketCard from "./TicketCard";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import { DragEvent, useState } from "react";

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
  onTicketMove?: (ticketId: number | null, newStatus: string) => void;
}

const Swimlane = ({
  title,
  tickets,
  deleteTicket,
  onTicketMove,
}: SwimlaneProps) => {
  const [isOver, setIsOver] = useState(false);
  const getStatusClass = (status: string) => {
    switch (status) {
      case "todo":
        return "swim-lane todo";
      case "inprogress":
        return "swim-lane inprogress";
      case "done":
        return "swim-lane done";
      default:
        return "swim-lane";
    }
  };

  // Format the title for display (capitalize first letter)
  const formatTitle = (status: string) => {
    switch (status) {
      case "todo":
        return "Todo";
      case "inprogress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  // Handle drag over event
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow drop
    setIsOver(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsOver(false);
  };

  // Handle drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    try {
      // Get the ticket data from the drag event
      const ticketData = JSON.parse(
        e.dataTransfer.getData("text/plain")
      ) as TicketData;

      // Only process if the status is different (actually moving between swimlanes)
      if (ticketData.status !== title && ticketData.id !== null) {
        console.log(
          `Moving ticket ${ticketData.id} from ${ticketData.status} to ${title}`
        );

        // Call the parent's onTicketMove handler if provided
        if (onTicketMove) {
          onTicketMove(ticketData.id, title);
        }
      }
    } catch (error) {
      console.error("Error processing drop:", error);
    }
  };

  return (
    <div
      className={`swimlane ${getStatusClass(title)} ${
        isOver ? "drag-over" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-status={title}
    >
      <h2>{formatTitle(title)}</h2>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
        />
      ))}
    </div>
  );
};

export default Swimlane;
