import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.js";

export const getTickets = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    // For testing purposes, return mock tickets
    const mockTickets = getMockTickets();

    console.log("Returning mock tickets:", mockTickets);
    return res.json(mockTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ message: "Error fetching tickets" });
  }
};

export const createTicket = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log("Creating ticket with data:", req.body);

    // Create a new mock ticket
    const mockTicket = {
      id: Math.floor(Math.random() * 1000) + 100, // Start from 100 to avoid conflicts with hardcoded tickets
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || "todo",
      userId: 10, // Hardcoded to match testuser
      columnId: req.body.columnId || 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the new ticket to our mock data array
    mockTickets.push(mockTicket);

    console.log("Mock ticket created successfully:", mockTicket);
    return res.status(201).json(mockTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Error creating ticket" });
  }
};

// Define the ticket type
interface MockTicket {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Store tickets in memory so they persist between requests
// Starting with an empty array - no mock tickets
let mockTickets: MockTicket[] = [];

// Helper function to get mock tickets
const getMockTickets = () => mockTickets;

// Get a single ticket by ID
export const getTicketById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const ticketId = parseInt(req.params.id);
    console.log(`Getting ticket with ID: ${ticketId}`);

    // Find the ticket in our mock data
    const mockTickets = getMockTickets();
    const ticket = mockTickets.find((t) => t.id === ticketId);

    if (!ticket) {
      console.log(`Ticket with ID ${ticketId} not found`);
      return res.status(404).json({ message: "Ticket not found" });
    }

    console.log(`Found ticket:`, ticket);
    return res.json(ticket);
  } catch (error) {
    console.error("Error getting ticket:", error);
    return res.status(500).json({ message: "Error getting ticket" });
  }
};

export const updateTicket = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const ticketId = parseInt(req.params.id);
    console.log(`Updating ticket with ID: ${ticketId}`);

    // Find the ticket in our mock data
    const ticketIndex = mockTickets.findIndex((t) => t.id === ticketId);

    if (ticketIndex === -1) {
      console.log(`Ticket with ID ${ticketId} not found`);
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update the ticket with the request body
    const updatedTicket = {
      ...mockTickets[ticketIndex],
      ...req.body,
      updatedAt: new Date(),
    };

    // Replace the ticket in our mock data array
    mockTickets[ticketIndex] = updatedTicket;

    console.log(`Updated ticket:`, updatedTicket);
    return res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    return res.status(500).json({ message: "Error updating ticket" });
  }
};

export const deleteTicket = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const ticketId = parseInt(req.params.id);
    console.log(`Deleting ticket with ID: ${ticketId}`);

    // Find the ticket in our mock data
    const ticketIndex = mockTickets.findIndex((t) => t.id === ticketId);

    if (ticketIndex === -1) {
      console.log(`Ticket with ID ${ticketId} not found`);
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Remove the ticket from our mock data array
    mockTickets = mockTickets.filter((t) => t.id !== ticketId);

    console.log(`Deleted ticket with ID: ${ticketId}`);
    return res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return res.status(500).json({ message: "Error deleting ticket" });
  }
};
