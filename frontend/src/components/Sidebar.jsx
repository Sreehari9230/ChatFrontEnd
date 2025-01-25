import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { ChevronDown, ChevronRight, Users } from "lucide-react";

const Sidebar = () => {
  // const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
  //   useChatStore();

  const {
    isDeparmentLoading,
    setDepartmentSelected,
    departmentSelected,
    isTeamSelected,
    setTeamSelected,
    teamSelcted,
  } = useChatStore();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleDropdown = (department) => {
    setActiveDropdown(activeDropdown === department ? null : department);
    setDepartmentSelected(department);
    console.log(department);
  };

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
    setTeamSelected(team);
    console.log(team);
  };

  // const onlineUsers = [];

  // useEffect(() => {
  //   getUsers();
  // }, [getUsers]);

  // if (true) return <SidebarSkeleton />;
  // if (true) return <SidebarSkeleton />;

  return (
    // <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    //   <div className="border-b border-base-300 w-full p-5">
    //     <div className="flex items-center gap-2">
    //       <Users className="size-6" />
    //       <span className="font-medium hidden lg:block">Department</span>
    //     </div>
    //     {/* todo online filter toggle */}
    //   </div>

    //   <div className="overflow-y-auto w-full py-3">
    //     {users.map((user) => (
    //       <button
    //         // key={user._id}
    //         // onClick={() => setSelectedUser(user)}
    //         className={`
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //           ${
    //             selectedUser?._id === user._id
    //               ? "bg-base-300 ring-1 ring-base-300"
    //               : ""
    //           }
    //         `}
    //       >
    //         <div className="relative mx-auto lg:mx-0">
    //           <img
    //             src={"/avatar.png"}
    //             // alt={user.name}
    //             className="size-12 object-cover rounded-full"
    //           />
    //           {/* {onlineUsers.includes(user._id) && (
    //             <span
    //               className="absolute bottom-0 right-0 size-3 bg-green-500
    //               rounded-full ring-2 ring-zinc-900"
    //             />
    //           )} */}
    //         </div>

    //         {/* User info - only visible on larger screens */}
    //         <div className="hidden lg:block text-left min-w-0">
    //           <div className="font-medium truncate">Recrutmw</div>
    //           <div className="text-sm text-zinc-400">
    //             {onlineUsers.includes(user._id) ? "Online" : "Offline"}
    //           </div>
    //         </div>
    //       </button>
    //     ))}

    //     {/* {filteredUsers.length === 0 && (
    //       <div className="text-center text-zinc-500 py-4">No online users</div>
    //     )} */}
    //   </div>
    // </aside>

    //     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    //   <div className="border-b border-base-300 w-full p-5">
    //     <div className="flex items-center gap-2">
    //       <Users className="size-6" />
    //       <span className="font-medium hidden lg:block">Department</span>
    //     </div>
    //   </div>

    //   <div className="overflow-y-auto w-full py-3">
    //     {/* Static department list without avatars */}
    //     <button
    //       className="
    //         w-full p-3 flex items-center gap-3
    //         hover:bg-base-300 transition-colors
    //       "
    //     >
    //       <span className="font-medium truncate">HR Department</span>
    //     </button>

    //     <button
    //       className="
    //         w-full p-3 flex items-center gap-3
    //         hover:bg-base-300 transition-colors
    //       "
    //     >
    //       <span className="font-medium truncate">Marketing Department</span>
    //     </button>

    //     <button
    //       className="
    //         w-full p-3 flex items-center gap-3
    //         hover:bg-base-300 transition-colors
    //       "
    //     >
    //       <span className="font-medium truncate">Sales Department</span>
    //     </button>
    //   </div>
    // </aside>

    // <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    //     <div className="border-b border-base-300 w-full p-5">
    //       <div className="flex items-center gap-2">
    //         <Users className="size-6" />
    //         <span className="font-medium hidden lg:block">Department</span>
    //       </div>
    //     </div>

    //     <div className="overflow-y-auto w-full py-3">

    //       <div>
    //         <button
    //           onClick={() => setHRDropdownOpen(!isHRDropdownOpen)}
    //           className="
    //             w-full p-3 flex items-center gap-3
    //             hover:bg-base-300 transition-colors
    //           "
    //         >
    //           <span className="font-medium truncate">HR Department</span>
    //           <span className="ml-auto hidden lg:inline">
    //             {isHRDropdownOpen ? (
    //               <ChevronDown className="size-4" />
    //             ) : (
    //               <ChevronRight className="size-4" />
    //             )}
    //           </span>
    //         </button>

    //         {isHRDropdownOpen && (
    //           <div className="pl-6">
    //             <button
    //               className="
    //                 w-full p-2 flex items-center gap-3
    //                 hover:bg-base-300 transition-colors
    //               "
    //             >
    //               <span className="text-sm truncate">Recruitment Team</span>
    //             </button>
    //             <button
    //               className="
    //                 w-full p-2 flex items-center gap-3
    //                 hover:bg-base-300 transition-colors
    //               "
    //             >
    //               <span className="text-sm truncate">Onboarding Team</span>
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //       <button
    //         className="
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //         "
    //       >
    //         <span className="font-medium truncate">Marketing Department</span>
    //       </button>

    //       <button
    //         className="
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //         "
    //       >
    //         <span className="font-medium truncate">Sales Department</span>
    //       </button>
    //     </div>
    //   </aside>

    // <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    //   <div className="border-b border-base-300 w-full p-5">
    //     <div className="flex items-center gap-2">
    //       <Users className="size-6" />
    //       <span className="font-medium hidden lg:block">Department</span>
    //     </div>
    //   </div>

    //   <div className="overflow-y-auto w-full py-3">
    //     {/* HR Department with Teams */}
    //     <div>
    //       <button
    //         onClick={() => handleDropdown("HR")}
    //         className="
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //         "
    //       >
    //         <span className="font-medium truncate">HR Department</span>
    //         <span className="ml-auto hidden lg:inline">
    //           {activeDropdown === "HR" ? (
    //             <ChevronDown className="size-4" />
    //           ) : (
    //             <ChevronRight className="size-4" />
    //           )}
    //         </span>
    //       </button>

    //       {activeDropdown === "HR" && (
    //         <div className="pl-6">
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Recruitment Team</span>
    //           </button>
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Onboarding Team</span>
    //           </button>
    //         </div>
    //       )}
    //     </div>

    //     {/* Marketing Department with Teams */}
    //     <div>
    //       <button
    //         onClick={() => handleDropdown("Marketing")}
    //         className="
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //         "
    //       >
    //         <span className="font-medium truncate">Marketing Department</span>
    //         <span className="ml-auto hidden lg:inline">
    //           {activeDropdown === "Marketing" ? (
    //             <ChevronDown className="size-4" />
    //           ) : (
    //             <ChevronRight className="size-4" />
    //           )}
    //         </span>
    //       </button>

    //       {activeDropdown === "Marketing" && (
    //         <div className="pl-6">
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Advertising Team</span>
    //           </button>
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Branding Team</span>
    //           </button>
    //         </div>
    //       )}
    //     </div>

    //     {/* Sales Department with Teams */}
    //     <div>
    //       <button
    //         onClick={() => handleDropdown("Sales")}
    //         className="
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //         "
    //       >
    //         <span className="font-medium truncate">Sales Department</span>
    //         <span className="ml-auto hidden lg:inline">
    //           {activeDropdown === "Sales" ? (
    //             <ChevronDown className="size-4" />
    //           ) : (
    //             <ChevronRight className="size-4" />
    //           )}
    //         </span>
    //       </button>

    //       {activeDropdown === "Sales" && (
    //         <div className="pl-6">
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Retail Team</span>
    //           </button>
    //           <button
    //             className="
    //               w-full p-2 flex items-center gap-3
    //               hover:bg-base-300 transition-colors
    //             "
    //           >
    //             <span className="text-sm truncate">Corporate Team</span>
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </aside>

    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
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
        {/* <div>
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
                onClick={() => handleTeamSelection("Advertising Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Advertising Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Advertising Team</span>
              </button>
              <button
                onClick={() => handleTeamSelection("Branding Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Branding Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Branding Team</span>
              </button>
            </div>
          )}
        </div> */}

        {/* Sales Department with Teams */}
        {/* <div>
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
                onClick={() => handleTeamSelection("Retail Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Retail Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Retail Team</span>
              </button>
              <button
                onClick={() => handleTeamSelection("Corporate Team")}
                className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedTeam === "Corporate Team" ? "bg-base-300" : ""
                }`}
              >
                <span className="text-sm truncate">Corporate Team</span>
              </button>
            </div>
          )}
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
