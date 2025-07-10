import { useState } from "react";
import { useMutation } from "../api/useMutation";

export default function WorkoutForm() {
  const [type, setType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [duration, setDuration] = useState("");

  // ✅ Corrected endpoint and added tag
  const { mutate, isLoading, error } = useMutation("/api/workouts", [
    "workouts",
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ type, intensity, duration: parseInt(duration) });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log a Workout</h2>
      <input
        placeholder="Type (e.g. Cardio)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        placeholder="Intensity (Low, Med, High)"
        value={intensity}
        onChange={(e) => setIntensity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (min)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
}
