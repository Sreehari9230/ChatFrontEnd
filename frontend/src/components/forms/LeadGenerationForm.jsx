import React, { useState } from "react";
import useWebSocketStore from "../../store/useWebSocketStore";

const LeadGenerationForm = () => {
  const { sendMessage } = useWebSocketStore(); // WebSocket send function
  const [topic, setTopic] = useState(""); // State for input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return; // Prevent sending empty topics

    const payload = {
      action: "form",
      form: { topic },
    };
    sendMessage(payload);
    console.log("📤 Topic data sent via WebSocket:", payload);

    setTopic(""); // Clear input after submission
  };

  return (
    <div className="flex justify-center mt-4 pt-10">
      <form
        className="p-4 border-gray-50 rounded-lg shadow max-w-lg w-full bg-base-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Topic Submission in Lead Generation
        </h2>

        {/* Input Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Topic</span>
          </label>
          <input
            type="text"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input input-sm input-bordered w-full"
            placeholder="Enter your topic..."
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-sm w-full">
            Submit Topic
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeadGenerationForm
