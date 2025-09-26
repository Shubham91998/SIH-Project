import React, { useState , useEffect} from "react";
import Header from "./Header.jsx";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  

  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [users, setUsers] = useState([]); // store user list
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch all users on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      console.log("Login data:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      try {
        await axios.post("http://localhost:5000/api/users", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Refresh users list
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };


  
  return (
    <>
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Toggle */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 font-semibold transition-colors ${
                  isLogin
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 font-semibold transition-colors ${
                  !isLogin
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Form content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-500 mb-6">
                {isLogin ? "Sign in to continue" : "Sign up to get started"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-indigo-500" />
                      Remember me
                    </label>
                    <a
                      href="#forgot"
                      className="text-indigo-600 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}

                <Link
                  to="/"
                  className="block w-full text-center py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-transform"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Link>
              </form>

              {/* Social login */}
              <div className="mt-6 text-center">
                <p className="relative text-gray-500 text-sm mb-4">
                  <span className="bg-white px-2">Or continue with</span>
                </p>
                <div className="flex justify-center gap-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:scale-110 transition">
                    <FaGoogle />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:scale-110 transition">
                    <FaFacebookF />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:scale-110 transition">
                    <FaTwitter />
                </button>
                </div>
              </div>
            </div>
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
};

export default AuthForm;
