import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Board from "./pages/Board.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import EditTicket from "./pages/EditTicket.tsx";
import CreateTicket from "./pages/CreateTicket.tsx";
import Login from "./pages/Login.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/board",
          element: (
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit",
          element: (
            <ProtectedRoute>
              <EditTicket />
            </ProtectedRoute>
          ),
        },
        {
          path: "/new-ticket",
          element: (
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
