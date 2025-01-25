import React, { useState } from "react";

const RecruitmentForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    positions: 1,
    skills: "",
    experienceLevel: "",
    targetDeadline: "",
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
    // <div>
    // <form
    //   className="p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto"
    //   onSubmit={handleSubmit}
    //   aria-labelledby="recruitment-form-title"
    // >
    //   <h2 id="recruitment-form-title" className="text-xl font-bold mb-6">New Recruitment Request</h2>

    //   {/* Job Title */}
    //   <div className="form-control mb-4">
    //     <label htmlFor="jobTitle" className="label">
    //       <span className="label-text font-medium">Job Title</span>
    //     </label>
    //     <input
    //       id="jobTitle"
    //       type="text"
    //       name="jobTitle"
    //       placeholder="Enter job title"
    //       value={formData.jobTitle}
    //       onChange={handleChange}
    //       className="input input-bordered w-full"
    //       required
    //       aria-required="true"
    //     />
    //   </div>

    //   {/* Department */}
    //   <div className="form-control mb-4">
    //     <label htmlFor="department" className="label">
    //       <span className="label-text font-medium">Department</span>
    //     </label>
    //     <input
    //       id="department"
    //       type="text"
    //       name="department"
    //       placeholder="Enter department name"
    //       value={formData.department}
    //       onChange={handleChange}
    //       className="input input-bordered w-full"
    //       required
    //       aria-required="true"
    //     />
    //   </div>

    //   {/* Number of Positions */}
    //   <div className="form-control mb-4">
    //     <label htmlFor="positions" className="label">
    //       <span className="label-text font-medium">Number of Positions</span>
    //     </label>
    //     <input
    //       id="positions"
    //       type="number"
    //       name="positions"
    //       placeholder="Enter number of positions"
    //       value={formData.positions}
    //       onChange={handleChange}
    //       className="input input-bordered w-full"
    //       min={1}
    //       required
    //       aria-required="true"
    //     />
    //   </div>

    //   {/* Required Skills */}
    //   <div className="form-control mb-4">
    //     <label htmlFor="skills" className="label">
    //       <span className="label-text font-medium">Required Skills</span>
    //     </label>
    //     <textarea
    //       id="skills"
    //       name="skills"
    //       placeholder="List required skills"
    //       value={formData.skills}
    //       onChange={handleChange}
    //       className="textarea textarea-bordered w-full"
    //       required
    //       aria-required="true"
    //       rows={4}
    //     ></textarea>
    //   </div>

    //   {/* Experience Level */}
    //   <div className="form-control mb-4">
    //     <label htmlFor="experienceLevel" className="label">
    //       <span className="label-text font-medium">Experience Level</span>
    //     </label>
    //     <select
    //       id="experienceLevel"
    //       name="experienceLevel"
    //       value={formData.experienceLevel}
    //       onChange={handleChange}
    //       className="select select-bordered w-full"
    //       required
    //       aria-required="true"
    //     >
    //       <option value="">Select experience level</option>
    //       <option value="Entry Level">Entry Level</option>
    //       <option value="Mid Level">Mid Level</option>
    //       <option value="Senior Level">Senior Level</option>
    //     </select>
    //   </div>

    //   {/* Target Deadline */}
    //   <div className="form-control mb-6">
    //     <label htmlFor="targetDeadline" className="label">
    //       <span className="label-text font-medium">Target Deadline</span>
    //     </label>
    //     <input
    //       id="targetDeadline"
    //       type="date"
    //       name="targetDeadline"
    //       value={formData.targetDeadline}
    //       onChange={handleChange}
    //       className="input input-bordered w-full"
    //       required
    //       aria-required="true"
    //     />
    //   </div>

    //   {/* Buttons */}
    //   <div className="flex gap-4">
    //     <button
    //       type="submit"
    //       className="btn btn-primary w-full"
    //       aria-label="Submit Recruitment Request"
    //     >
    //       Submit Request
    //     </button>
    //     <button
    //       type="button"
    //       className="btn btn-secondary w-full"
    //       onClick={handleChatManually}
    //       aria-label="Open Manual Chat"
    //     >
    //       Chat Manually
    //     </button>
    //   </div>
    // </form>
    // </div>

    <form
      className="p-6 border rounded-lg shadow-md max-w-md w-full mx-auto"
      onSubmit={handleSubmit}
      aria-labelledby="recruitment-form-title"
    >
      <h2 id="recruitment-form-title" className="text-xl font-bold mb-6">
        New Recruitment Request
      </h2>

      {/* Job Title */}
      <div className="form-control mb-4">
        <label htmlFor="jobTitle" className="label">
          <span className="label-text font-medium">Job Title</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          name="jobTitle"
          placeholder="Enter job title"
          value={formData.jobTitle}
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
          placeholder="Enter department name"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
          aria-required="true"
        />
      </div>

      {/* Number of Positions */}
      <div className="form-control mb-4">
        <label htmlFor="positions" className="label">
          <span className="label-text font-medium">Number of Positions</span>
        </label>
        <input
          id="positions"
          type="number"
          name="positions"
          placeholder="Enter number of positions"
          value={formData.positions}
          onChange={handleChange}
          className="input input-bordered w-full"
          min={1}
          required
          aria-required="true"
        />
      </div>

      {/* Required Skills */}
      <div className="form-control mb-4">
        <label htmlFor="skills" className="label">
          <span className="label-text font-medium">Required Skills</span>
        </label>
        <textarea
          id="skills"
          name="skills"
          placeholder="List required skills"
          value={formData.skills}
          onChange={handleChange}
          className="textarea input-bordered w-full"
          required
          aria-required="true"
          rows={4}
        ></textarea>
      </div>

      {/* Experience Level */}
      <div className="form-control mb-4">
        <label htmlFor="experienceLevel" className="label">
          <span className="label-text font-medium">Experience Level</span>
        </label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="select input-bordered w-full"
          required
          aria-required="true"
        >
          <option value="">Select experience level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

      {/* Target Deadline */}
      <div className="form-control mb-6">
        <label htmlFor="targetDeadline" className="label">
          <span className="label-text font-medium">Target Deadline</span>
        </label>
        <input
          id="targetDeadline"
          type="date"
          name="targetDeadline"
          value={formData.targetDeadline}
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

export default RecruitmentForm;
