import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ element }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return authUser ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
