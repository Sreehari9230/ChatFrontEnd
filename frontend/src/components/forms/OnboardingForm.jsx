import React, { useState } from "react";

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    email: "",
    department: "",
    position: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleChatManually = () => {
    console.log("Chat manually button clicked!");
  };

  return (
    <form
      className="p-6 border rounded-lg shadow-md max-w-md w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-6">New Employee Onboarding</h2>

      {/* Employee ID */}
      <div className="form-control mb-4">
        <label htmlFor="employeeId" className="label">
          <span className="label-text font-medium">Employee ID</span>
        </label>
        <input
          id="employeeId"
          type="text"
          name="employeeId"
          placeholder="Enter Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Employee Name */}
      <div className="form-control mb-4">
        <label htmlFor="employeeName" className="label">
          <span className="label-text font-medium">Employee Name</span>
        </label>
        <input
          id="employeeName"
          type="text"
          name="employeeName"
          placeholder="Enter Employee Name"
          value={formData.employeeName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Email */}
      <div className="form-control mb-4">
        <label htmlFor="email" className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Department */}
      <div className="form-control mb-4">
        <label htmlFor="department" className="label">
          <span className="label-text font-medium">Department</span>
        </label>
        <input
          id="department"
          type="text"
          name="department"
          placeholder="Enter Department"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Position */}
      <div className="form-control mb-4">
        <label htmlFor="position" className="label">
          <span className="label-text font-medium">Position</span>
        </label>
        <input
          id="position"
          type="text"
          name="position"
          placeholder="Enter Position"
          value={formData.position}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Start Date */}
      <div className="form-control mb-6">
        <label htmlFor="startDate" className="label">
          <span className="label-text font-medium">Start Date</span>
        </label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        <button
          type="submit"
          className="btn flex-1"
          aria-label="Submit Recruitment Request"
        >
          Submit Request
        </button>
        <button
          type="button"
          className="btn flex-1"
          onClick={handleChatManually}
          aria-label="Open Manual Chat"
        >
          Chat Manually
        </button>
      </div>
    </form>
  );
};

export default OnboardingForm;
