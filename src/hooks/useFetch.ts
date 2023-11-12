import { useEffect, useState } from "react";
import axios from "axios";
import { INote } from "../types/NoteTypes";

export default function useFetch(url: string): {
  data: INote[];
  error: boolean;
  loading: boolean;
} {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}
