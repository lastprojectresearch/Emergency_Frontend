import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PoliceDashboard from "./components/PoliceDashboard";
import HospitalDashboard from "./components/HospitalDashboard";

function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("anzen_user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.organization_type;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/police-dashboard"
        element={
          <ProtectedRoute allowedRole="Police">
            <PoliceDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hospital-dashboard"
        element={
          <ProtectedRoute allowedRole="Hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}