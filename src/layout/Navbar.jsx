import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  console.log("TOKEN VALUE:", token);

  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>QuickTask Fit</p>
      </NavLink>

      <nav>
        {token ? (
          <>
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/workouts/new">Log Workout</NavLink>
            <NavLink to="/goals">Goals</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
