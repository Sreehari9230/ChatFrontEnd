import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore"; // Assuming you use a store
import WebSocketService from "../../Websocket/websocket";

const RecruitmentForm = () => {
  const { chatId } = useChatStore(); // Get chat ID from store
  const [wsService, setWsService] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    positions: 1,
    skills: "",
    experienceLevel: "",
    targetDeadline: "",
  });

  useEffect(() => {
    if (chatId) {
      const service = new WebSocketService(
        chatId,
        () => {},
        () => {}
      );
      service.connect();
      setWsService(service);

      return () => service.close();
    }
  }, [chatId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (wsService && wsService.ws.readyState === WebSocket.OPEN) {
      const payload = {
        action: "form_submission",
        data: formData,
      };

      wsService.sendMessage(payload);
      console.log("📤 Form data sent via WebSocket:", payload);
    } else {
      console.error("❌ WebSocket is not connected.");
    }
  };

  return (
<div className="flex justify-center mt-4 pt-10">
    <form
      className="p-4 border rounded-lg shadow max-w-lg w-full bg-base-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">New Recruitment Request</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div className="form-control">
          <label className="label-text">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label-text">Department</label>
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Number of Positions */}
        <div className="form-control">
          <label className="label-text">Positions</label>
          <input
            type="number"
            name="positions"
            placeholder="Count"
            value={formData.positions}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            min={1}
            required
          />
        </div>

        {/* Experience Level */}
        <div className="form-control">
          <label className="label-text">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="select select-sm select-bordered w-full"
            required
          >
            <option value="">Select</option>
            <option value="Entry Level">Entry</option>
            <option value="Mid Level">Mid</option>
            <option value="Senior Level">Senior</option>
          </select>
        </div>

        {/* Required Skills */}
        <div className="form-control md:col-span-2">
          <label className="label-text">Skills</label>
          <textarea
            name="skills"
            placeholder="List required skills"
            value={formData.skills}
            onChange={handleChange}
            className="textarea textarea-sm input-bordered w-full"
            rows={2}
            required
          ></textarea>
        </div>

        {/* Target Deadline */}
        <div className="form-control md:col-span-2">
          <label className="label-text">Target Deadline</label>
          <input
            type="date"
            name="targetDeadline"
            value={formData.targetDeadline}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button type="submit" className="btn btn-primary btn-sm w-full">
          Submit Request
        </button>
      </div>
    </form>
  </div>
  );
};

export default RecruitmentForm;
