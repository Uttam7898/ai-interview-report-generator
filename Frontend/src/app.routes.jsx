import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/interview";
import { InterviewProvider } from "./features/auth/interview/interview.context";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <InterviewProvider>
        <Home />
      </InterviewProvider>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/interview/:interviewId",
    element: (
      <InterviewProvider>
        <Home />
      </InterviewProvider>
    ),
  },
]);
