import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import App from "../App";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <Home />},

            // protected route
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>)
            }
        ]
    }
])

export default router;