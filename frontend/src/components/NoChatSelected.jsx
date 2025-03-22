import React from "react";
import { MessageSquare } from "lucide-react";
import SmartTeams from '../assets/SmartTeams.jpg'

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="relative">
            <div
              className="w-50 h-50 rounded-2xl  flex items-center
         justify-center animate-bounce"
            >
              <img
                src={SmartTeams}
                alt="Logo"
                className="w-40 h-40 text-primary"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-4xl font-bold">Welcome to Smart Teams!</h2>
        <p className="text-lg text-base-content/60">Select a Team</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
