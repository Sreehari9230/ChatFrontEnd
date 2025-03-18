import React, { useState } from "react";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Need Help?</h2>
        <p className="text-base-content/60 mb-4">
          We're here to assist you. Reach out to our support team anytime.
        </p>
        <button className="btn btn-primary w-full">Contact Support</button>
      </div>
    </div>
  );
};

export default HelpPage;
