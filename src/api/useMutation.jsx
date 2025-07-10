import { useState } from "react";
import { useApi } from "./ApiContext";

export function useMutation(resource, tagsToInvalidate = []) {
  const { request, invalidateTags } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutate(body) {
    try {
      setIsLoading(true);
      await request(resource, {
        method: "POST",
        body: JSON.stringify(body),
      });
      invalidateTags(tagsToInvalidate);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { mutate, isLoading, error };
}
