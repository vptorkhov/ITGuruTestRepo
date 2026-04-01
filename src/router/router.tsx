import { createBrowserRouter } from "react-router";
import IndexPage from "../pages/indexPage";
import LoginPage from "../pages/login";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);
