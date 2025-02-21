import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SocialMediaForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore(); // Extract WebSocket functions
  const { formIsSubmitted } = useChatStore(); // Extract form submission handler

  const [formData, setFormData] = useState({
    competitors: "",
    campaign_theme: "",
    target_audience: "",
    platform: "",
    goal: "",
  });

  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false); // Track response status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val.trim())) return; // Prevent sending empty fields

    const payload = {
      action: "form",
      form: formData,
    };

    sendMessage(payload);
    setIsWaitingForResponse(true); // Set waiting flag
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      formIsSubmitted(); // Mark form as submitted when response is received
      setFormData({
        competitors: "",
        campaign_theme: "",
        target_audience: "",
        platform: "",
        goal: "",
      }); // Clear input after submission
      setIsWaitingForResponse(false); // Reset flag
    }
  }, [formResponseIsLoading, isWaitingForResponse, formIsSubmitted]);

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Social Media Campaign Setup
        </h2>

        {/* Competitors Field */}
        <div className="form-control">
          <label className="label-text">Competitors</label>
          <input
            type="text"
            name="competitors"
            placeholder="Enter Competitor Name"
            value={formData.competitors}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Campaign Theme Field */}
        <div className="form-control">
          <label className="label-text">Campaign Theme</label>
          <input
            type="text"
            name="campaign_theme"
            placeholder="Enter Campaign Theme"
            value={formData.campaign_theme}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Target Audience Field */}
        <div className="form-control">
          <label className="label-text">Target Audience</label>
          <input
            type="text"
            name="target_audience"
            placeholder="Enter Target Audience"
            value={formData.target_audience}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Platform Field */}
        <div className="form-control">
          <label className="label-text">Platform</label>
          <input
            type="text"
            name="platform"
            placeholder="Enter Platform"
            value={formData.platform}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Goal Field */}
        <div className="form-control">
          <label className="label-text">Goal</label>
          <input
            type="text"
            name="goal"
            placeholder="Enter Goal"
            value={formData.goal}
            onChange={handleChange}
            className="input input-sm input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full flex items-center justify-center"
            disabled={formResponseIsLoading}
          >
            {formResponseIsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Campaign"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaForm;
