import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface FetchState<T> {
  response: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string): FetchState<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true); // Initially, the request is pending.
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return; // don't fetch if the URL is not set

    const fetchData = async () => {
      setIsPending(true); // Ensure loading state is true at the start of the fetch.
      try {
        const result: AxiosResponse<T> = await axios.get(url);
        setResponse(result.data);
        setIsPending(false); // Request succeeded; set loading to false.
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Check if the error is an Axios error.
          const message = error.response?.data?.message || error.message;
          console.error("Axios error:", message); // Log the error message for debugging.
          setError(`Axios error: ${message}`);
        } else {
          console.error("An unexpected error occurred:", error);
          setError(`An unexpected error occurred: ${error}`);
        }
        setIsPending(false); // Request failed; set loading to false.
      }
    };

    fetchData();
  }, [url]); // Dependency array to re-run the effect if the URL changes.

  return { response, isPending, error };
};

export default useFetch;
