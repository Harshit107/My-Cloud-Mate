import {  useState } from "react";
import { getTokenFromLocalStorage } from "../Helper/LocalStorage";

export default function useServer() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const handleAPICall = async (API, method = "GET", body = undefined) => {
        console.log("Calling API");
        setIsLoading(true);
        try {
            const response = await fetch(API, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getTokenFromLocalStorage()
                },
                body : JSON.stringify(body),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setIsLoading(false);
            setData(data);

        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsLoading(false);
        }
    }

    function reset() {
        console.log("Reset done");
        setIsLoading(false)
        setData(null)
        setError(null);
    }

    return {
        isLoading,
        error,
        handleAPICall,
        data,
        reset
    };
}