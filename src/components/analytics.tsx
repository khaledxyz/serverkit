import { useEffect } from "react";

interface AnalyticsConfig {
  provider?: string;
  scriptUrl?: string;
  websiteId?: string;
  attributes?: string;
}

function parseAttributes(attributesString?: string): Record<string, string> {
  if (!attributesString) {
    return {};
  }

  return attributesString.split(",").reduce(
    (acc, pair) => {
      const [key, value] = pair.split("=").map((s) => s.trim());
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}

export function Analytics() {
  useEffect(() => {
    const config: AnalyticsConfig = {
      provider: import.meta.env.VITE_ANALYTICS_PROVIDER,
      scriptUrl: import.meta.env.VITE_ANALYTICS_SCRIPT_URL,
      websiteId: import.meta.env.VITE_ANALYTICS_WEBSITE_ID,
      attributes: import.meta.env.VITE_ANALYTICS_ATTRIBUTES,
    };

    // Skip if no provider configured
    if (!(config.provider && config.scriptUrl)) {
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src="${config.scriptUrl}"]`
    );
    if (existingScript) {
      return;
    }

    // Create and configure script
    const script = document.createElement("script");
    script.src = config.scriptUrl;
    script.defer = true;

    // Add website ID if provided
    if (config.websiteId) {
      script.setAttribute("data-website-id", config.websiteId);
    }

    // Add any additional attributes
    const additionalAttrs = parseAttributes(config.attributes);
    for (const [key, value] of Object.entries(additionalAttrs)) {
      script.setAttribute(key, value);
    }

    // Append to document
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
