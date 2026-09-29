import { Navigate } from "react-router-dom";
import { useAdminSession } from "../../services/adminAuth";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAdminSession();
  if (!loggedIn) return <Navigate to="/admin/login" replace />;
  return children;
}
