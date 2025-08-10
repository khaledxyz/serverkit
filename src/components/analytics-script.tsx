import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    if (!websiteId) return;

    // Check if already loaded
    if (document.querySelector("[data-website-id]")) return;

    const script = document.createElement("script");
    script.src =
      import.meta.env.VITE_ANALYTICS_SCRIPT_URL ||
      "https://cloud.umami.is/script.js";
    script.setAttribute("data-website-id", websiteId);
    script.defer = true;

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
