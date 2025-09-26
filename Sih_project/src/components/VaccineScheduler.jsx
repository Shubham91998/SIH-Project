import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const vaccineTypes = ["Pfizer", "Moderna", "Covaxin"];
const locations = ["Clinic A", "Clinic B", "Clinic C"];

function VaccineForm() {
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    email: "",
    vaccineType: "",
    location: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({ total: 0, byType: [] });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Diseases News & Report");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/book`, form);

      // Show success message
      setMessage(res.data.message || "Appointment booked successfully!");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        contact: "",
        vaccineType: "",
        location: "",
        date: "",
      });

      // Refresh vaccination summary/report
      fetchReport();
    } catch (error) {
      console.error(error);
      setMessage("Error booking appointment.");
    }

    setLoading(false);
  };

  // Fetch vaccination report
  const fetchReport = async () => {
    const res = await axios.get(`${API_URL}/report`);
    setReport(res.data);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="header-container bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-5 shadow-lg overflow-hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo and brand */}
              <a href="#" className="flex items-center space-x-2 group">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold group-hover:text-blue-200 transition-colors">
                  VaccineTracker
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { label: "Diseases News & Report", path: "/diseasereport" },
                  { label: "Your Report", path:"/feedback-reports" },
                  { label: "Available Vaccine and Hospital", path: "/hospitals-and-vaccines" },
                  { label: "User Feedback Report", path: "/reports" },
                ].map((tab) =>
                  tab.path ? (
                    // Use Link for routes
                    <Link
                      key={tab.label}
                      to={tab.path}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.label
                          ? "bg-white text-blue-700 shadow-md"
                          : "text-blue-100 hover:bg-blue-500 hover:text-white"
                      }`}
                      onClick={() => handleTabClick(tab.label)}
                    >
                      {tab.label}
                    </Link>
                  ) : (
                    // Use button for normal tab switching
                    <button
                      key={tab.label}
                      onClick={() => handleTabClick(tab.label)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.label
                          ? "bg-white text-blue-700 shadow-md"
                          : "text-blue-100 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                )}
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/registration"
                  className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Sign in
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg text-white hover:bg-blue-500 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 bg-blue-500 rounded-lg">
                <nav className="flex flex-col space-y-2 p-2">
                  {[
                    "Diseases News & Report",
                    "Your Report",
                    "Available Vaccine and Hospital",
                    "User Feedback Report",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-4 py-3 rounded-lg font-medium text-left transition-all ${
                        activeTab === tab
                          ? "bg-white text-blue-700"
                          : "text-white hover:bg-blue-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                      Sign in
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-colors">
                      Sign up
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>

        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.title}>Vaccine Appointment Form</h2>
            <p style={styles.subtitle}>
              Book your vaccination appointment easily
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter email address"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone (With Country Code)</label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter Phone number"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Vaccine Type</label>
                <select
                  name="vaccineType"
                  value={form.vaccineType}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select vaccine type</option>
                  {vaccineTypes.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Location</label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select clinic location</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={loading ? styles.buttonDisabled : styles.button}
              >
                {loading ? "Booking Appointment..." : "Book Appointment"}
              </button>
            </form>

            {message && (
              <div
                style={{
                  ...styles.message,
                  ...(message.includes("success")
                    ? styles.successMessage
                    : styles.errorMessage),
                }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Disease Tracker & News • Data for demonstration purposes only</p>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} Global Health Monitoring</p>
        </div>
      </footer>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f7ff",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    padding: "32px",
    maxWidth: "1000px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#2c5282",
    marginBottom: "8px",
    fontSize: "28px",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#718096",
    marginBottom: "32px",
    fontSize: "16px",
  },
  form: {
    marginBottom: "24px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#4a5568",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    backgroundColor: "#fafafa",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    backgroundColor: "#fafafa",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    backgroundSize: "16px",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "8px",
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#cbd5e0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    marginTop: "8px",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "24px",
    textAlign: "center",
    fontWeight: "500",
  },
  successMessage: {
    backgroundColor: "#f0fff4",
    color: "#2f855a",
    border: "1px solid #c6f6d5",
  },
  errorMessage: {
    backgroundColor: "#fff5f5",
    color: "#c53030",
    border: "1px solid #fed7d7",
  },
  reportSection: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },
  reportTitle: {
    color: "#2d3748",
    marginBottom: "16px",
    fontSize: "20px",
    fontWeight: "600",
  },
  reportCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "20px",
    border: "1px solid #e2e8f0",
  },
  totalVaccinations: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e2e8f0",
  },
  totalLabel: {
    color: "#4a5568",
    fontWeight: "500",
  },
  totalNumber: {
    color: "#2b6cb0",
    fontSize: "24px",
    fontWeight: "700",
  },
  vaccineBreakdown: {
    marginTop: "16px",
  },
  breakdownTitle: {
    color: "#4a5568",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  breakdownList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  breakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vaccineName: {
    color: "#4a5568",
  },
  vaccineCount: {
    color: "#2c5282",
    fontWeight: "600",
    backgroundColor: "#ebf4ff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "14px",
  },
};

// Add hover effects
styles.input = {
  ...styles.input,
  ":focus": {
    outline: "none",
    borderColor: "#4299e1",
    boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.2)",
    backgroundColor: "white",
  },
};

styles.select = {
  ...styles.select,
  ":focus": {
    outline: "none",
    borderColor: "#4299e1",
    boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.2)",
    backgroundColor: "white",
  },
};

styles.button = {
  ...styles.button,
  ":hover": {
    backgroundColor: "#3182ce",
  },
};

export default VaccineForm;
