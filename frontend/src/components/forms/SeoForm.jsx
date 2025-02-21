import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SeoForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore(); // Extract WebSocket functions
  const { formIsSubmitted } = useChatStore(); // Extract form submission handler
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false); // Track response status
  const [formData, setFormData] = useState({
    website_name: "",
    competitors: "",
    target_audience: "",
    ad_budget: "",
    primary_goals: "",
  });

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
        website_name: "",
        competitors: "",
        target_audience: "",
        ad_budget: "",
        primary_goals: "",
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
        <h2 className="text-lg font-semibold mb-4 text-center">SEO Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Website Name</label>
            <input
              type="text"
              name="website_name"
              placeholder="Enter Website Name"
              value={formData.website_name}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text">Competitors</label>
            <input
              type="text"
              name="competitors"
              placeholder="Enter Competitors"
              value={formData.competitors}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

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

          <div className="form-control md:col-span-2">
            <label className="label-text">Ad Budget ($)</label>
            <input
              type="number"
              name="ad_budget"
              placeholder="Enter Ad Budget"
              value={formData.ad_budget}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Primary Goals</label>
            <input
              type="text"
              name="primary_goals"
              placeholder="Enter Primary Goals"
              value={formData.primary_goals}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full flex items-center justify-center"
            disabled={formResponseIsLoading}
          >
            {formResponseIsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeoForm;
