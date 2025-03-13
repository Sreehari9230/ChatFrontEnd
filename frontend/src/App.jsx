import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import RaiseATicketModal from "./components/RaiseATicketModal";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // console.log({ authUser });

  // if(isCheckingAuth && !authUser) return (
  //   <div className="flex min-h-screen w-full items-center justify-center">
  //     <Loader className="size-10 animate-spin" />
  //   </div>
  // )

  return (
    <div data-theme={theme}>
      <Navbar onOpenTicket={() => setIsModalOpen(true)} />
      <RaiseATicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Routes>
        {/* <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}

        {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} /> */}
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/settings" element={<SettingsPage />} />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}



        <Route path="*" element={<NotFoundPage />} />
{/* fallback route or just redirecting to home page */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

      </Routes>

      <Toaster />
    </div>
  );
};

export default App;