import React, { useState } from "react";
import { FileText, Link } from "lucide-react";

const Resources = () => {
  const [itSetupLink, setItSetupLink] = useState("");
  const [itSetupInstructions, setItSetupInstructions] = useState("");
  const [policyInstructions, setPolicyInstructions] = useState("");
  const [policyDocument, setPolicyDocument] = useState(null);

  const handleUpdate = (section) => {
    if (section === "it_setup") {
      console.log("Updating IT Setup:", { itSetupLink, itSetupInstructions });
    } else if (section === "policy_setup") {
      console.log("Updating Policy Setup:", { policyInstructions, policyDocument });
    }
    alert(`${section.replace("_", " ")} updated successfully!`);
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-3xl space-y-6">
      {/* IT Setup */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Link size={20} /> IT Setup
        </h2>
        <p className="text-sm text-base-content/70">Provide the IT setup instructions and Google Drive link.</p>
        <div className="divider"></div>
        <div className="bg-base-100 p-6 rounded-lg shadow-inner flex flex-col space-y-4">
          <label className="label">
            <span className="label-text font-medium">Google Drive Link</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Google Drive link"
            value={itSetupLink}
            onChange={(e) => setItSetupLink(e.target.value)}
          />
          <label className="label">
            <span className="label-text font-medium">Instructions</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter IT setup instructions"
            value={itSetupInstructions}
            onChange={(e) => setItSetupInstructions(e.target.value)}
          ></textarea>
          {/* Update Button */}
          <button className="btn btn-primary w-full" onClick={() => handleUpdate("it_setup")}>
            Update
          </button>
        </div>
      </div>

      {/* Policy Setup */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText size={20} /> Policy Setup
        </h2>
        <p className="text-sm text-base-content/70">Upload the policy document and provide necessary instructions.</p>
        <div className="divider"></div>
        <div className="bg-base-100 p-6 rounded-lg shadow-inner flex flex-col space-y-4">
          <label className="label">
            <span className="label-text font-medium">Upload Policy Document</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setPolicyDocument(e.target.files[0])} />
          <label className="label">
            <span className="label-text font-medium">Instructions</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter policy setup instructions"
            value={policyInstructions}
            onChange={(e) => setPolicyInstructions(e.target.value)}
          ></textarea>
          {/* Update Button */}
          <button className="btn btn-primary w-full" onClick={() => handleUpdate("policy_setup")}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
