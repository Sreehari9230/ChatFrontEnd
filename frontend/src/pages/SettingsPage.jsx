import React from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  CreditCard,
  LogOut,
  Package,
  Shield,
  User,
  Users,
  Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout, CompanyData } = useAuthStore();

  const navigate = useNavigate();
  const userData = CompanyData;

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    navigate("/login"); // Redirect user to login page
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-3xl space-y-6">
      {/* User Info Card */}
      <div className="card bg-base-200 shadow-lg rounded-xl overflow-hidden">
        <div className="bg-primary text-primary-content p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary-focus text-primary-content rounded-full w-12">
                  <span className="text-xl">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {capitalizeFirstLetter(userData.name)}
                </h2>
                <p className="text-sm opacity-80">Account Profile</p>
              </div>
            </div>
            <button
              className="btn btn-error btn-sm flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Details */}
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <User size={18} /> Profile Details
              </h3>
              <div className="bg-base-100 p-6 rounded-lg shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <div className="badge badge-primary">Name</div>
                  <span>{capitalizeFirstLetter(userData.name)}</span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Package size={18} /> Package Details
              </h3>
              <div className="stats shadow bg-base-100 w-full">
                <div className="stat">
                  <div className="stat-title flex items-center gap-2">
                    <Shield size={14} /> Package
                  </div>
                  <div className="stat-value text-lg">
                    {capitalizeFirstLetter(userData.package.name)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title flex items-center gap-2">
                    <CreditCard size={14} /> Price
                  </div>
                  <div className="stat-value text-lg text-accent">
                    ₹{userData.package.price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Limits */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Shield size={18} /> Package Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded w-8 h-8">
                          <span>
                            <Users size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">AI Teams</span>
                    </div>
                    <div className="badge badge-lg">
                      {userData.package.max_ai_teams}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-primary mt-2" 
                    value="70" 
                    max="100"
                  ></progress> */}
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded w-8 h-8">
                          <span>
                            <Bot size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">IVAs</span>
                    </div>
                    <div className="badge badge-lg badge-secondary">
                      {userData.package.max_ivas}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-secondary mt-2" 
                    value="50" 
                    max="100"
                  ></progress> */}
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-accent text-accent-content rounded w-8 h-8">
                          <span>
                            <Shield size={16} />
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">Agents</span>
                    </div>
                    <div className="badge badge-lg badge-accent">
                      {userData.package.max_agents}
                    </div>
                  </div>
                  {/* <progress 
                    className="progress progress-accent mt-2" 
                    value="30" 
                    max="100"
                  ></progress> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your chat interface
        </p>
        <div className="divider"></div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all  
              ${
                theme === t
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-10 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
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
