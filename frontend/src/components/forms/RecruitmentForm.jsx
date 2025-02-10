import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore"; // Assuming you use a store
import WebSocketService from "../../Websocket/websocket";

const RecruitmentForm = () => {
  const { chatId } = useChatStore(); // Get chat ID from store
  const [wsService, setWsService] = useState(null);

  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    company_name: "",
    job_requirement: "",
    expected_reach_out: 0,
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
        action: "form",
        form: formData,
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
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          New Recruitment Request
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="form-control">
            <label className="label-text">Job Title</label>
            <input
              type="text"
              name="job_title"
              placeholder="Enter job title"
              value={formData.job_title}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label-text">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter job location"
              value={formData.location}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Company Name */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Company Name</label>
            <input
              type="text"
              name="company_name"
              placeholder="Enter company name"
              value={formData.company_name}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          {/* Job Requirement */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Job Requirement</label>
            <textarea
              name="job_requirement"
              placeholder="List required skills"
              value={formData.job_requirement}
              onChange={handleChange}
              className="textarea textarea-sm input-bordered w-full"
              rows={2}
              required
            ></textarea>
          </div>

          {/* Expected Reach Out */}
          <div className="form-control md:col-span-2">
            <label className="label-text">Expected Reach Out</label>
            <input
              type="number"
              name="expected_reach_out"
              placeholder="Enter expected reach out count"
              value={formData.expected_reach_out}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              min={1}
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
