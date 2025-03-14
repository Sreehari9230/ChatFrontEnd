import React from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut } from "lucide-react";

const userData = {
  id: "96733e68-4241-4892-8028-2ccc820d2659",
  name: "nypus",
  package: {
    id: "592e137f-df57-4162-bd0d-29ed63a27579",
    name: "Tier 1",
    description: "Premium package with advanced features",
    price: "500.00",
    max_ai_teams: 1,
    max_ivas: 2,
    max_agents: 5,
  },
};

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-3xl space-y-6">
      {/* User Info Card */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">User Information</h2>
          <button className="btn btn-error btn-sm flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
        <p className="text-sm text-base-content/70">Manage your account details</p>
        <div className="divider"></div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Name:</span> {userData.name}
          </p>
          <h3 className="font-semibold mt-3">Package Details</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="font-medium">Package Name:</span> {userData.package.name}
            </li>
            <li>
              <span className="font-medium">Price:</span> ${userData.package.price}
            </li>
            <li>
              <span className="font-medium">Max AI Teams:</span> {userData.package.max_ai_teams}
            </li>
            <li>
              <span className="font-medium">Max IVAs:</span> {userData.package.max_ivas}
            </li>
            <li>
              <span className="font-medium">Max Agents:</span> {userData.package.max_agents}
            </li>
          </ul>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        <div className="divider"></div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all 
              ${theme === t ? "bg-primary text-white" : "hover:bg-base-300"}`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-10 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[12px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
