export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export const teamMap = {
  "Onboarding Team": 1,
  "Recruitment Team": 2,
  "SEO Team": 3,
  "Marketing Research Team": 4,
  "Social Media Team": 7,
  "Content Creation": 6,
  "Customer Relations": 8,
  "Sales Strategy": 9,
  "Lead Generation": 5,
};

export function formatJobPosting(text) {
  const lines = text.split("\n");
  let formattedText = "";
  let inList = false; // Track whether we are in a list

  // Regular expression to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Convert URLs into clickable links
    line = line.replace(urlRegex, (url) => `<a href="${url}" class="text-blue-500 underline" target="_blank">${url}</a>`);

    if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      // Main heading
      const heading = line.replace(/\*\*/g, "");
      formattedText += `<h2 class="text-lg font-semibold mt-4">${heading}</h2>`;
    } else if (line.startsWith("*") && line.endsWith("*")) {
      // Subheading
      const subheading = line.replace(/\*/g, "");
      formattedText += `<h3 class="text-md font-medium mt-3">${subheading}</h3>`;
    } else if (line.startsWith("-")) {
      // Bullet points or key-value pairs
      line = line.substring(1).trim();
      line = line.replace(/\*\*/g, "");

      if (line.includes(":")) {
        const [key, value] = line.split(":").map((s) => s.trim());
        formattedText += `<p><strong>${key}:</strong> ${value}</p>`;
      } else {
        // Treat as a bullet point
        if (!inList) {
          formattedText += "<ul class='list-disc ml-5'>";
          inList = true;
        }
        formattedText += `<li>${line}</li>`;
      }
    } else {
      // Normal paragraph text
      if (inList) {
        formattedText += "</ul>"; // Close list if we were in one
        inList = false;
      }
      formattedText += `<p>${line}</p>`;
    }
  }

  if (inList) {
    formattedText += "</ul>"; // Ensure list is closed
  }

  return formattedText;
}

