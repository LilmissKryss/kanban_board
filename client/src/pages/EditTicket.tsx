import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { retrieveTicket, updateTicket } from "../api/ticketAPI";
import { TicketData } from "../interfaces/TicketData";

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchTicket = async (ticketId: TicketData) => {
    try {
      const data = await retrieveTicket(ticketId.id);
      setTicket(data);
    } catch (err) {
      console.error("Failed to retrieve ticket:", err);
    }
  };

  useEffect(() => {
    fetchTicket(state);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null) {
      try {
        const updatedTicket = await updateTicket(ticket.id, ticket);
        console.log("Ticket updated successfully", updatedTicket);

        // Store the updated ticket in localStorage to be picked up by the Board component
        localStorage.setItem(
          "lastUpdatedTicket",
          JSON.stringify({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            userId: ticket.userId,
            columnId: ticket.columnId,
            timestamp: Date.now(), // Add timestamp to ensure Board component detects the change
          })
        );

        // Redirect to the board page to see the updated ticket
        navigate("/board");
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    } else {
      console.error("Ticket data is undefined.");
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className="container">
        {ticket ? (
          <form className="form" onSubmit={handleSubmit}>
            <h1>Edit Ticket</h1>
            <label htmlFor="tName">Ticket Title</label>
            <textarea
              id="tName"
              name="title"
              value={ticket.title || ""}
              onChange={handleTextAreaChange}
            />
            <label htmlFor="tStatus">Ticket Status</label>
            <select
              name="status"
              id="tStatus"
              value={ticket.status || ""}
              onChange={handleChange}
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <label htmlFor="tDescription">Ticket Description</label>
            <textarea
              id="tDescription"
              name="description"
              value={ticket.description || ""}
              onChange={handleTextAreaChange}
            />
            <button type="submit">Submit Form</button>
          </form>
        ) : (
          <div>Issues fetching ticket</div>
        )}
      </div>
    </>
  );
};

export default EditTicket;
