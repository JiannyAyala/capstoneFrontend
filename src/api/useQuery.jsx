import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

export function useQuery(resource, tag) {
  const { request, provideTag } = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      const result = await request(resource);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    if (tag) provideTag(tag, fetchData);
  }, [resource]);

  return { data, loading, error };
}
