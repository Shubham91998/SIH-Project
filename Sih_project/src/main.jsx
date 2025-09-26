import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Import your vaccine form component
import VaccineForm from "./components/VaccineScheduler.jsx";
import App from "./App.jsx"
import RegistrationForm from "./components/RegistrationForm.jsx"
import DiseaseDashboard from "./components/DiseaseDashboard.jsx"
import FeedbacRepo from "./components/FeedbackReportPage.jsx"
import Hospitels from "./components/VaccineHospitalPage.jsx"
import Report from "./components/ReportPage.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* When user opens /vaccine, it loads VaccineForm */}
        <Route path="/" element={<App />} />
        <Route path="/vaccine" element={<VaccineForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/diseasereport" element={<DiseaseDashboard />} />
        <Route path="/feedback-reports" element={<FeedbacRepo />} />
        <Route path="/hospitals-and-vaccines" element={<Hospitels />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </Router>
  </StrictMode>
);
