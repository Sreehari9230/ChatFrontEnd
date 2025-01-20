import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updatingProfile } = useAuthStore();

  const handleImageUpload = async (e) => {};


  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>

        {/* avatar upload section */}
      </div>
    </div>
  )
};

export default ProfilePage;
