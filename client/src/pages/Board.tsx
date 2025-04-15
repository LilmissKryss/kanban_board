import { useEffect, useState, useLayoutEffect } from "react";

import { retrieveTickets, deleteTicket, updateTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

import { authService } from "../services/authService";

const boardStates = ["todo", "inprogress", "done"];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (authService.isAuthenticated()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      console.log(`Attempting to delete ticket with ID: ${ticketId}`);
      const data = await deleteTicket(ticketId);
      console.log("Delete successful, updating local state");

      // Update the local state by removing the deleted ticket
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );

      return data;
    } catch (err) {
      console.error(`Error deleting ticket with ID ${ticketId}:`, err);
      return Promise.reject(err);
    }
  };

  // Handle ticket movement between swimlanes
  const handleTicketMove = async (
    ticketId: number | null,
    newStatus: string
  ) => {
    if (ticketId === null) return;

    try {
      console.log(`Moving ticket ${ticketId} to ${newStatus}`);

      // Find the ticket in our local state
      const ticketToUpdate = tickets.find((t) => t.id === ticketId);

      if (!ticketToUpdate) {
        console.error(`Ticket with ID ${ticketId} not found`);
        return;
      }

      // Create an updated version of the ticket
      const updatedTicket = {
        ...ticketToUpdate,
        status: newStatus,
      };

      // Update the ticket on the server
      await updateTicket(ticketId, updatedTicket);

      // Update the local state
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      console.log(`Ticket ${ticketId} successfully moved to ${newStatus}`);
    } catch (error) {
      console.error(`Error moving ticket ${ticketId} to ${newStatus}:`, error);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  // Handle ticket updates and creations
  const handleTicketChanges = () => {
    // Check for updated tickets
    const lastUpdatedTicketJSON = localStorage.getItem("lastUpdatedTicket");
    // Check for newly created tickets
    const lastCreatedTicketJSON = localStorage.getItem("lastCreatedTicket");

    if (lastUpdatedTicketJSON || lastCreatedTicketJSON) {
      try {
        if (lastUpdatedTicketJSON) {
          const lastUpdatedTicket = JSON.parse(lastUpdatedTicketJSON);
          console.log("Processing updated ticket:", lastUpdatedTicket);
        }

        if (lastCreatedTicketJSON) {
          const lastCreatedTicket = JSON.parse(lastCreatedTicketJSON);
          console.log("Processing created ticket:", lastCreatedTicket);
        }

        // Force a complete refresh of tickets
        fetchTickets().then(() => {
          console.log("Tickets refreshed after changes");
          // Clear the localStorage entries after processing
          localStorage.removeItem("lastUpdatedTicket");
          localStorage.removeItem("lastCreatedTicket");
        });
      } catch (error) {
        console.error("Error processing ticket changes:", error);
      }
    }
  };

  // Check for ticket changes when the component mounts
  useEffect(() => {
    handleTicketChanges();
  }, []);

  // Also check for changes when the component is navigated to
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focused, checking for ticket changes");
      handleTicketChanges();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <div className="board-display">
            {boardStates.map((status) => {
              const filteredTickets = tickets.filter(
                (ticket) => ticket.status === status
              );
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                  onTicketMove={handleTicketMove}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
