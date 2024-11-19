import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)

  if (isAuthenticated) return (<Outlet />)

  return <Navigate to="/login" />
};

export default ProtectedRoute;