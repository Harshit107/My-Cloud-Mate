import {  useState } from "react";
import { getTokenFromLocalStorage } from "../Helper/LocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useServer() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

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
                if(response.status === 401){
                    toast.error(data.error)
                    navigate('/home')
                }
                throw new Error(data.error);
            }
            setIsLoading(false);
            setData(data);
            return data;

        } catch (error) {
            console.log(error);
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
