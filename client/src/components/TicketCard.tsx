import { Link } from "react-router-dom";

import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import { MouseEventHandler, DragEvent } from "react";

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
  onDragStart?: (e: DragEvent<HTMLDivElement>, ticket: TicketData) => void;
}

const TicketCard = ({ ticket, deleteTicket, onDragStart }: TicketCardProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const ticketId = Number(event.currentTarget.value);
    console.log(`Delete button clicked for ticket ID: ${ticketId}`);

    if (!isNaN(ticketId)) {
      try {
        console.log(`Calling deleteTicket with ID: ${ticketId}`);
        await deleteTicket(ticketId);
        console.log(`Ticket ${ticketId} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete ticket ${ticketId}:`, error);
      }
    } else {
      console.error(`Invalid ticket ID: ${event.currentTarget.value}`);
    }
  };

  // Handle drag start event
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // Set the drag data - we'll use this when dropping
    e.dataTransfer.setData("text/plain", JSON.stringify(ticket));
    // Add some visual feedback
    e.currentTarget.classList.add("dragging");

    // Call the parent's onDragStart handler if provided
    if (onDragStart) {
      onDragStart(e, ticket);
    }
  };

  // Handle drag end event
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    // Remove visual feedback
    e.currentTarget.classList.remove("dragging");
  };

  return (
    <div
      className="ticket-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-ticket-id={ticket.id}
      data-status={ticket.status}
    >
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <Link
        to="/edit"
        state={{ id: ticket.id }}
        type="button"
        className="editBtn"
      >
        Edit
      </Link>
      <button
        type="button"
        value={String(ticket.id)}
        onClick={handleDelete}
        className="deleteBtn"
      >
        Delete
      </button>
    </div>
  );
};

export default TicketCard;
