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
import HomePage from "./components/HomePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* When user opens /vaccine, it loads VaccineForm */}

        <Route path="/chatbot" element={<App />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/vaccine-scheduler" element={<VaccineForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/diseasereport" element={<DiseaseDashboard />} />
        <Route path="/feedback-reports" element={<FeedbacRepo />} />
        <Route path="/hospitals-and-vaccines" element={<Hospitels />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </Router>
  </StrictMode>
);
