import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./firebaseConfig";

/**
 * Firebase Storage Uploader Strategy
 */
export default function useFirebaseUploader() {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isUploadingCompleted, setIsUploadingCompleted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadComplete = (url) => {
    setIsFileUploading(false);
    setIsUploadingCompleted(true);
    setDownloadURL(url);
  };

  const handleUploadFailed = (err) => {
    setIsFileUploading(false);
    setDownloadURL(null);
    setError(err?.message || "Firebase upload failed");
  };

  const handleUploadFile = (file) => {
    setIsUploadingCompleted(false);
    setIsFileUploading(true);
    setUploadProgress(0);
    setError(null);

    const storageRef = ref(storage, `users/files/${uuidv4()}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(1));
      },
      (err) => {
        console.error("[Firebase Upload Error]:", err);
        handleUploadFailed(err);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          handleUploadComplete(url);
        } catch (err) {
          handleUploadFailed(err);
        }
      }
    );
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
