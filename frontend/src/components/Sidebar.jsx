import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { ChevronDown, ChevronRight, Group, Users } from "lucide-react";
import { teamMap } from "../lib/utils"

const Sidebar = () => {
  const {
    isDeparmentLoading,
    setDepartmentSelected,
    departmentSelected,
    isTeamSelected,
    setTeamSelected,
    teamSelcted,
    getChatHistory,
  } = useChatStore();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleDropdown = (department) => {
    setActiveDropdown(activeDropdown === department ? null : department);
    setDepartmentSelected(department);
    console.log(department);
    // console.log(departmentSelected);
  };

  const handleTeamSelection = (team) => {
    console.log("inside handleTeamSelection");
    setSelectedTeam(team);
    setTeamSelected(team);
    console.log(team);
    console.log(teamSelcted);
    if (teamMap[team]) {
      console.log(`Chat History Loading For ${team}`);
      getChatHistory(teamMap[team]);
    } else {
      console.log("Invalid Team Selected");
    }
  };

  // if (true) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Group className="size-6" />
          <span className="font-medium hidden lg:block">Department</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/* HR Department with Teams */}
        <div>
          <button
            onClick={() => handleDropdown("HR")}
            className="
            w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors
          "
          >
            <span className="font-medium truncate">HR Department</span>
            <span className="ml-auto hidden lg:inline">
              {activeDropdown === "HR" ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
          </button>

          {activeDropdown === "HR" && (
            <div className="pl-6">
              <button
                onClick={() => handleTeamSelection("Recruitment Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Recruitment Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Recruitment Team</span>
              </button>
              <button
                onClick={() => handleTeamSelection("Onboarding Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Onboarding Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Onboarding Team</span>
              </button>
            </div>
          )}
        </div>

        {/* Marketing Department with Teams */}
        <div>
          <button
            onClick={() => handleDropdown("Marketing")}
            className="
        w-full p-3 flex items-center gap-3
        hover:bg-base-300 transition-colors
      "
          >
            <span className="font-medium truncate">Marketing Department</span>
            <span className="ml-auto hidden lg:inline">
              {activeDropdown === "Marketing" ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
          </button>

          {activeDropdown === "Marketing" && (
            <div className="pl-6">
              <button
                onClick={() => handleTeamSelection("SEO Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "SEO Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">SEO Team</span>
              </button>
              <button
                onClick={() => handleTeamSelection("Marketing Research Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Marketing Research Team"
                    ? "bg-base-300"
                    : ""
                }`}
              >
                <span className="text-sm truncate">
                  Marketing Research Team
                </span>
              </button>
              <button
                onClick={() => handleTeamSelection("Social Media Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Social Media Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Social Media Team</span>
              </button>
            </div>
          )}
        </div>

        {/* Sales Department with Teams */}
        <div>
          <button
            onClick={() => handleDropdown("Sales")}
            className="
      w-full p-3 flex items-center gap-3
      hover:bg-base-300 transition-colors
    "
          >
            <span className="font-medium truncate">Sales Department</span>
            <span className="ml-auto hidden lg:inline">
              {activeDropdown === "Sales" ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
          </button>

          {activeDropdown === "Sales" && (
            <div className="pl-6">
              <button
                onClick={() => handleTeamSelection("Content Creation")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Content Creation Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Content Creation</span>
              </button>
              <button
                onClick={() =>
                  handleTeamSelection("Customer Relations")
                }
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Customer Relationship Team"
                    ? "bg-base-300"
                    : ""
                }`}
              >
                <span className="text-sm truncate">
                  Customer Relationship
                </span>
              </button>
              <button
                onClick={() => handleTeamSelection("Sales Strategy")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Sales Strategy Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Sales Strategy</span>
              </button>
              <button
                onClick={() => handleTeamSelection("Lead Generation")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Lead Generation Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Lead Generation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
