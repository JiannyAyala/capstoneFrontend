import { useQuery } from "../api/useQuery";

export default function WorkoutList() {
  // ✅ Corrected endpoint
  const {
    data: workouts,
    loading,
    error,
  } = useQuery("/api/workouts", "workouts");

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p>Error loading workouts</p>;

  return (
    <div>
      <h2>Your Workouts</h2>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            <strong>{w.type}</strong> | {w.intensity} | {w.duration} mins
          </li>
        ))}
      </ul>
    </div>
  );
}
