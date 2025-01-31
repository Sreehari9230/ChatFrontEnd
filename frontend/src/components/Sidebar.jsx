import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { ChevronDown, ChevronRight, Group, Users } from "lucide-react";

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
    console.log(departmentSelected);
  };

  const handleTeamSelection = (team) => {
    console.log("inside handleTeamSelection");
    setSelectedTeam(team);
    setTeamSelected(team);
    console.log(team);
    console.log(teamSelcted);
    if (team == "Onboarding Team") {
      console.log("Chat History Of", team);
      getChatHistory(1);
    } else if(team == "Recruit Team") {
      console.log("Chat History Of", team);
      getChatHistory(2);
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
      </div>
    </aside>
  );
};

export default Sidebar;
