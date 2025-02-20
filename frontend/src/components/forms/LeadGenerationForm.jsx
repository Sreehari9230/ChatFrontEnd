import React, { useState, useEffect } from "react";
import useWebSocketStore from "../../store/useWebSocketStore";
import { Loader2 } from "lucide-react";

const LeadGenerationForm = () => {
  const { sendMessage, formResponseIsLoading } = useWebSocketStore(); // Extract WebSocket functions
  const [topic, setTopic] = useState(""); // State for input
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false); // Track response status

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return; // Prevent sending empty topics

    const payload = {
      action: "form",
      form: { topic },
    };
    sendMessage(payload);
    setIsWaitingForResponse(true); // Set waiting flag
  };

  useEffect(() => {
    if (isWaitingForResponse && !formResponseIsLoading) {
      setTopic(""); // Clear input after submission
      setIsWaitingForResponse(false); // Reset flag
    }
  }, [formResponseIsLoading, isWaitingForResponse]);

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
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full flex items-center justify-center"
            disabled={formResponseIsLoading}
          >
            {formResponseIsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Topic"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadGenerationForm;
