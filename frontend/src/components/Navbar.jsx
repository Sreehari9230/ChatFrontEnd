import React from "react";
import { LogIn, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = ({ onOpenTicket }) => {
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
                {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
                <img src="/nypusAi.jpg" alt="ChatApp Logo" className="w-15 h-15" />
              </div>
              <h1 className="text-lg font-bold">ChatApp</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            <Link to="/login" className="btn btn-sm gap-2 transition-colors">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login Page</span>
            </Link>

            <button
              className="btn btn-sm gap-2 transition-colors"
              onClick={onOpenTicket}
            >
              <span className="hidden sm:inline">Raise A Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
