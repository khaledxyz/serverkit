import { useCallback, useState } from "react";

interface UsePasteUploadResult {
  isUploading: boolean;
  uploadedUrl: string | null;
  uploadScript: (scriptContent: string) => Promise<void>;
  reset: () => void;
}

export function usePasteUpload(): UsePasteUploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadScript = useCallback(async (scriptContent: string) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("content", scriptContent);
      formData.append("syntax", "bash");

      const response = await fetch("https://dpaste.com/api/v2/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const url = (await response.text()).trim();
      const rawUrl = url.endsWith("/") ? `${url}txt` : `${url}.txt`;
      setUploadedUrl(rawUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploadedUrl(null);
  }, []);

  return { isUploading, uploadedUrl, uploadScript, reset };
}
