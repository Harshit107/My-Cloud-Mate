import { useState } from "react";
import { GET_PRESIGNED_URL_API } from "../../config";
import useServer from "../../db/useServer";

/**
 * Cloudflare R2 Direct Uploader Strategy (Presigned URL + XHR Progress)
 */
export default function useCloudflareUploader() {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isUploadingCompleted, setIsUploadingCompleted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);

  const { handleAPICall } = useServer();

  const handleUploadFile = async (file) => {
    setIsUploadingCompleted(false);
    setIsFileUploading(true);
    setUploadProgress(0);
    setError(null);
    setDownloadURL(null);

    try {
      const contentType = file.type || "application/octet-stream";

      // 1. Obtain presigned URL from backend
      const presignedResult = await handleAPICall(GET_PRESIGNED_URL_API, "POST", {
        fileName: file.name,
        fileType: contentType,
      });

      if (!presignedResult || (!presignedResult.data && !presignedResult.uploadUrl)) {
        throw new Error(
          presignedResult?.message || "Failed to generate Cloudflare upload URL"
        );
      }

      const r2Payload = presignedResult.data || presignedResult;
      const { uploadUrl, publicDownloadUrl } = r2Payload;

      // 2. Direct streaming PUT upload to Cloudflare R2
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      xhr.setRequestHeader("Content-Type", contentType);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress.toFixed(1));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress("100");
          setIsFileUploading(false);
          setIsUploadingCompleted(true);
          setDownloadURL(publicDownloadUrl);
        } else {
          setIsFileUploading(false);
          setError(`Cloudflare upload failed (Status ${xhr.status})`);
        }
      };

      xhr.onerror = () => {
        setIsFileUploading(false);
        setError("Network error connecting to Cloudflare R2 storage");
      };

      xhr.send(file);
    } catch (err) {
      console.error("[Cloudflare Uploader Error]:", err);
      setIsFileUploading(false);
      setError(err.message || "Failed to upload file to Cloudflare");
    }
  };

  return {
    isFileUploading,
    downloadURL,
    isUploadingCompleted,
    uploadProgress,
    handleUploadFile,
    error,
  };
}
