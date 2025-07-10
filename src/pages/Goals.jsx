import { useState } from "react";
import { useQuery } from "../api/useQuery";
import { useMutation } from "../api/useMutation";

export default function Goals() {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  // ✅ Corrected endpoint and added tag
  const { data: goals, loading } = useQuery("/api/goals", "goals");
  const { mutate } = useMutation("/api/goals", ["goals"]);

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ description, deadline });
  }

  return (
    <div>
      <h2>Set a Goal</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Goal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <h3>Your Goals</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {goals.map((g) => (
            <li key={g.id}>
              {g.description} - {new Date(g.deadline).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
