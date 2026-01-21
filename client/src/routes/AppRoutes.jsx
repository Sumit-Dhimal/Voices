import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import App from "../App";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/blog/CreateBlog";

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
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            }, {
                path: "createBlog", 
                element: (
                    <ProtectedRoute>
                        <CreateBlog />
                    </ProtectedRoute>
                )
            }
        ]
    }
])

export default router;