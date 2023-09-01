
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useFileUploader() {
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [isUploadingCompleted, setIsUploadingCompleted] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const [error, setError] = useState(null);

    const handleUploadComplete = (downloadURL) => {
        setIsFileUploading(false);
        setIsUploadingCompleted(true);
        setDownloadURL(downloadURL);
    };

    const handleUploadFailed = (error) => {
        setIsFileUploading(false);
        setDownloadURL(null);
        setError(error);
    };

    const handleUploadFile = (file) => {
        setIsUploadingCompleted(false)
        setIsFileUploading(true);
        const storageRef = ref(storage, `users/files/${uuidv4()}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress.toFixed(1));
            },
            (error) => {
                console.error("Upload error:", error);
                handleUploadFailed(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                handleUploadComplete(downloadURL);
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
