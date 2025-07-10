import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// ✅ Set correct base path that matches your Express routes
export const API = "http://localhost:3000";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();

  const request = async (resource, options = {}) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = API + (resource.startsWith("/") ? resource : `/${resource}`);
    const response = await fetch(url, {
      headers,
      ...options,
    });

    const isJson = /json/.test(response.headers.get("Content-Type") || "");
    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) throw Error(result);
    return result;
  };

  // Optional tag system
  const [tags, setTags] = useState({});
  const provideTag = (tag, query) => {
    setTags((prev) => ({ ...prev, [tag]: query }));
  };
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => tags[tag]?.());
  };

  return (
    <ApiContext.Provider value={{ request, provideTag, invalidateTags }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within a ApiProvider");
  return context;
}
