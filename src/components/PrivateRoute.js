import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/providers/userContext";

export const PrivateRoute = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export const PublicRoute = () => {
    const { isLoggedIn } = useUser();
    if (!isLoggedIn) {
      return <Outlet />;
    } else {
      return <Navigate to="/account" />;
    }
  };
  
  export const AdminRoute = () => {
    const { user } = useUser();
    const admin = user?.roles.some((role) => role.name === "admin");
    if (admin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };
  