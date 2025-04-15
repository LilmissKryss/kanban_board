import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticketAPI";
import { UserData } from "../interfaces/UserData";
import { retrieveUsers } from "../api/userAPI";

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    status: "todo",
    userId: 10, // Updated to match the testuser ID in the database
    columnId: 1, // Default column ID
  });

  const navigate = useNavigate();

  const [users, setUsers] = useState<UserData[] | undefined>([]);

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve user info", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket) {
      try {
        const createdTicket = await createTicket(newTicket);
        console.log("Ticket created successfully:", createdTicket);

        // Store the created ticket in localStorage to be picked up by the Board component
        localStorage.setItem(
          "lastCreatedTicket",
          JSON.stringify({
            ...createdTicket,
            timestamp: Date.now(), // Add timestamp to ensure Board component detects the change
          })
        );

        // Redirect to the board page to see the new ticket
        navigate("/board");
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          <label htmlFor="tName">Ticket Title</label>
          <textarea
            id="tName"
            name="title"
            value={newTicket?.title || ""}
            onChange={handleTextAreaChange}
          />
          <label htmlFor="tStatus">Ticket Status</label>
          <select
            name="status"
            id="tStatus"
            value={newTicket?.status || ""}
            onChange={handleTextChange}
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <label htmlFor="tDescription">Ticket Description</label>
          <textarea
            id="tDescription"
            name="description"
            value={newTicket?.description || ""}
            onChange={handleTextAreaChange}
          />
          <label htmlFor="tUserId">User's ID</label>
          <select
            name="userId"
            value={newTicket?.userId || ""}
            onChange={handleUserChange}
          >
            {users ? (
              users.map((user) => {
                return (
                  <option key={user.id} value={String(user.id)}>
                    {user.username}
                  </option>
                );
              })
            ) : (
              <textarea
                id="tUserId"
                name="userId"
                value={newTicket?.userId || 10}
                onChange={handleTextAreaChange}
              />
            )}
          </select>
          <button type="submit" onSubmit={handleSubmit}>
            Submit Form
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;
