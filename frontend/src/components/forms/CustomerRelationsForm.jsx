import React, { useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const SalesStrategyForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore();
  const { formIsSubmitted } = useChatStore();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    customer_segment: "",
    interaction_history: "",
    preferred_communication_channel: "",
    business_goal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val.trim())) return;

    const payload = {
      action: "form",
      form: formData,
    };
    sendMessage(payload);
    setIsWaitingForResponse(true);
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      formIsSubmitted();
      setFormData({
        topic: "",
        customer_segment: "",
        interaction_history: "",
        preferred_communication_channel: "",
        business_goal: "",
      });
      setIsWaitingForResponse(false);
    }
  }, [formResponseIsLoading, isWaitingForResponse, formIsSubmitted]);

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Customer Relations Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label-text">Topic</label>
            <input
              type="text"
              name="topic"
              placeholder="Enter Topic"
              value={formData.topic}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text">Customer Segment</label>
            <input
              type="text"
              name="customer_segment"
              placeholder="Enter Customer Segment"
              value={formData.customer_segment}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text">Interaction History</label>
            <input
              type="text"
              name="interaction_history"
              placeholder="Enter Interaction History"
              value={formData.interaction_history}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">
              Preferred Communication Channel
            </label>
            <input
              type="text"
              name="preferred_communication_channel"
              placeholder="Enter Communication Channel"
              value={formData.preferred_communication_channel}
              onChange={handleChange}
              className="input input-sm input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text">Business Goal</label>
            <input
              type="text"
              name="business_goal"
              placeholder="Enter Business Goal"
              value={formData.business_goal}
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

export default SalesStrategyForm;
