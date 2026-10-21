import { useState } from "react";
import { getTokenFromLocalStorage } from "../Helper/LocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useServer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleAPICall = async (API, method = "GET", body = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getTokenFromLocalStorage();
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }

      const response = await fetch(API, {
        method,
        headers,
        body: method === "GET" ? undefined : JSON.stringify(body),
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        const errorMessage =
          responseData?.message ||
          (typeof responseData?.error === "string"
            ? responseData.error
            : responseData?.error?.message || responseData?.error?.code || "Request failed");

        if (response.status === 401) {
          toast.error(errorMessage);
          navigate("/home");
        } else if (response.status === 503) {
          toast.error("Service temporarily unavailable. Please try again later.");
        }

        const err = new Error(errorMessage);
        err.status = response.status;
        err.data = responseData;
        throw err;
      }

      setIsLoading(false);
      const unifiedData = { ...responseData, status: response.status };
      setData(unifiedData);
      return unifiedData;
    } catch (err) {
      console.error("[useServer API Error]:", err);
      const msg = err.message || "An unexpected error occurred";
      setError(msg);
      setIsLoading(false);
      return null;
    }
  };

  function reset() {
    setIsLoading(false);
    setData(null);
    setError(null);
  }

  return {
    isLoading,
    error,
    handleAPICall,
    data,
    reset,
  };
}
