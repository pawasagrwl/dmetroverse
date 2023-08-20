import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface FetchState<T> {
  response: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string): FetchState<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return; // don't fetch if url is not set
    const fetchData = async () => {
      setIsPending(true);
      try {
        const result: AxiosResponse<T> = await axios.get(url);
        setResponse(result.data);
        setIsPending(false);
      } catch (error) {
        
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { response, isPending, error };
};

export default useFetch;
