import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ParcelsManagement from "../pages/ParcelsManagement";
import AgentsManagement from "../pages/AgentsManagement";
import VendorsReview from "../pages/VendorsReview";
import Reports from "../pages/Reports";
import ProtectedRoute from "../components/ProtectedRoute";

//Scaffold AppRoutes for all main pages and protected routes.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/parcels" element={<ProtectedRoute><ParcelsManagement /></ProtectedRoute>} />
      <Route path="/agents" element={<ProtectedRoute><AgentsManagement /></ProtectedRoute>} />
      <Route path="/vendors" element={<ProtectedRoute><VendorsReview /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
