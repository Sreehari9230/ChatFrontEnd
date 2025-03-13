import React from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Moon, Sun, Palette, User } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-base-content/70 mt-2">Customize your experience</p>
        </div>
        
        {/* User Info Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span className="text-lg">{user?.username?.charAt(0) || "U"}</span>
                  </div>
                </div>
                <div>
                  <h2 className="card-title">{user?.username || "User"}</h2>
                  <p className="text-sm text-base-content/70">{user?.email || "email@example.com"}</p>
                </div>
              </div>
              <button
                className="btn btn-error btn-sm gap-2"
                onClick={logout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Theme Selection Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Palette size={20} className="text-primary" />
              <h2 className="card-title m-0">Theme</h2>
            </div>
            <p className="text-base-content/70 mb-6">
              Choose a theme for your chat interface
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`card border hover:shadow-md transition-all ${
                    theme === t ? "ring-2 ring-primary shadow-md" : "border-base-300"
                  }`}
                  onClick={() => setTheme(t)}
                >
                  <div className="card-body p-3 items-center text-center">
                    <div
                      className="w-full h-10 rounded-box overflow-hidden"
                      data-theme={t}
                    >
                      <div className="flex h-full">
                        <div className="w-1/4 bg-primary"></div>
                        <div className="w-1/4 bg-secondary"></div>
                        <div className="w-1/4 bg-accent"></div>
                        <div className="w-1/4 bg-neutral"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium mt-2 capitalize">
                      {t.replace(/-/g, " ")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Theme Toggle */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun size={20} className="text-warning" />
                <span className="font-medium">Light / Dark</span>
                <Moon size={20} className="text-info" />
              </div>
              <input 
                type="checkbox" 
                className="toggle toggle-primary"
                checked={theme.includes("dark")}
                onChange={() => {
                  const baseTheme = theme.replace("-dark", "");
                  setTheme(theme.includes("dark") ? baseTheme : `${baseTheme}-dark`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;