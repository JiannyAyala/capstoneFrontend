import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";

import WorkoutForm from "./pages/WorkoutForm";
import WorkoutList from "./pages/WorkoutList";
import Goals from "./pages/Goals";

export default function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<h1>Welcome to QuickTask Fit</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/workouts/new" element={<WorkoutForm />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
