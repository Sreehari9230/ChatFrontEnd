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
  Linkedin,
  Mail,
  BarChart2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout, CompanyData } = useAuthStore();

  const navigate = useNavigate();
  const userData = {
    linkedin_api: {
      id: "90731f13-edc4-4fe1-aed0-667748bec3a3",
      access_token: "new_updated_token",
      created_at: "2025-03-16T06:23:12.399243Z",
      updated_at: "2025-03-16T06:44:28.472764Z",
    },
    smtp_config: {
      id: "27f417e9-bb4e-4afa-abae-e90d49b3d9f4",
      smtp_host: "smtp.mailtrap.io",
      smtp_port: 2525,
      password: null,
      sender_email: "new@example.com",
      created_at: "2025-03-16T06:23:12.407272Z",
      updated_at: "2025-03-16T06:44:28.472764Z",
    },
    eod_config: {
      id: "ad2c18d5-1c07-433c-bdb4-5f6a212c29e3",
      email_address: "new_reports@example.com",
      enable: false,
      created_at: "2025-03-16T06:23:12.415805Z",
      updated_at: "2025-03-16T06:44:28.480776Z",
    },
  };

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
                    {CompanyData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {capitalizeFirstLetter(CompanyData.name)}
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
                  <span>{capitalizeFirstLetter(CompanyData.name)}</span>
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
                    {capitalizeFirstLetter(CompanyData.package.name)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title flex items-center gap-2">
                    <CreditCard size={14} /> Price
                  </div>
                  <div className="stat-value text-lg text-accent">
                    ₹{CompanyData.package.price}
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
                      {CompanyData.package.max_ai_teams}
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
                      {CompanyData.package.max_ivas}
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
                      {CompanyData.package.max_agents}
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

      {/* LinkedIn API Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Linkedin size={20} /> LinkedIn API
        </h2>
        <p className="text-sm text-base-content/70">
          Manage your LinkedIn API integration settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">API ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.linkedin_api?.id || ""}
              disabled
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Access Token</span>
              <span className="label-text-alt text-info">Editable</span>
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                className="input input-bordered w-full"
                defaultValue={userData.linkedin_api?.access_token || ""}
              />
              <button className="btn btn-primary">Update</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(
                    userData.linkedin_api?.created_at
                  ).toLocaleString() || ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(
                    userData.linkedin_api?.updated_at
                  ).toLocaleString() || ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail size={20} /> SMTP Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure your email server settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">SMTP ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.smtp_config?.id || ""}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">SMTP Host</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.smtp_host || ""}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">SMTP Port</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.smtp_port || ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.password || ""}
                placeholder="Enter password"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Sender Email</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.sender_email || ""}
              />
            </div>
          </div>

          <button className="btn btn-primary w-full mt-2">
            Save SMTP Settings
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.smtp_config?.created_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.smtp_config?.updated_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* EOD Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart2 size={20} /> EOD Reports Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure end-of-day reporting settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">EOD Config ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.eod_config?.id || ""}
              disabled
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
              <span className="label-text-alt text-info">Editable</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              defaultValue={userData.eod_config?.email_address || ""}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text font-medium">Enable EOD Reports</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg"
                defaultChecked={userData.eod_config?.enable || false}
              />
            </label>
          </div>

          <button className="btn btn-primary w-full">Save EOD Settings</button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.eod_config?.created_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.eod_config?.updated_at).toLocaleString() ||
                  ""
                }
                disabled
              />
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