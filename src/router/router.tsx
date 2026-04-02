import { createBrowserRouter } from "react-router";
import IndexPage from "../pages/indexPage";
import LoginPage from "../pages/login";
import RequireAuth from "@/components/RequireAuth/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <IndexPage />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
