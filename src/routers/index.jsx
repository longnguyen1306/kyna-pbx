import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import HomePage from "../pages/HomePage";
import CallHistory from "../pages/CallHistory";
import CdrReports from "../pages/CdrReports";
import CallPage from "../pages/Calls";
import MainLayout from "../layouts/MainLayout";
import InCallPage from "../pages/InCall";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/call-history", element: <CallHistory /> },
            { path: "/cdr-reports", element: <CdrReports /> },
            { path: "/calls", element: <CallPage /> },
            { path: "/in-call", element: <InCallPage /> }
        ]
    }
]);

export default routers;
