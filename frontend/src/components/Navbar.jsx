import React from "react";
import { Settings, Stamp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = ({ onOpenTicket }) => {
  const { userAuth } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src="/SmartTeams.jpg" alt="Logo" className="w-15 h-15" />
              </div>
              <h1 className="text-lg font-bold">Smart Teams</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {userAuth && (
              <>
                <Link
                  to="/graphs"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <Stamp className="w-4 h-4" />
                  <span className="hidden sm:inline">Usage</span>
                </Link>

                <Link
                  to="/settings"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <button
                  className="btn btn-sm gap-2 transition-colors"
                  onClick={onOpenTicket}
                >
                  <span className="hidden sm:inline">Raise A Ticket</span>
                </button>
              </>
            )}

            {/* <Link to="/login" className="btn btn-sm gap-2 transition-colors">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login Page</span>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
