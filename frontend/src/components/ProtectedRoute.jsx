import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { userAuth, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return userAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
