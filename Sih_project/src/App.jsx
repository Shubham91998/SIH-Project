import React, { useState, useEffect, useRef } from "react";
import { ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {
  Send,
  Heart,
  AlertCircle,
  User,
  Bot,
  Plus,
  X,
  Menu,
  ThumbsUp,
  ThumbsDown,
  Download,
  Moon,
  Sun,
  Mic,
  Square,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";
const vaccineTypes = ["Pfizer", "Moderna", "Covaxin"];
const locations = ["Clinic A", "Clinic B", "Clinic C"];

const App = () => {
  const initialMessage = {
    id: 1,
    text: "Hello! 👋 I'm your AI Health Assistant. How can I help with your health concerns today?",
    sender: "bot",
    timestamp: new Date().toLocaleTimeString(),
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [report, setReport] = useState(null);
  const [sessionId, setSessionId] = useState(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    return storedSessionId || Date.now().toString();
  });
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Save session ID on initial render
  useEffect(() => {
    localStorage.setItem("chatSessionId", sessionId);
  }, [sessionId]);

  const fetchReport = async () => {
    const res = await axios.get(`${API_URL}/report`);
    setReport(res.data);
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/report")
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchReport();
  }, []);

  // Fetch chat history from backend
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chat/history`
        );
        if (response.ok) {
          const data = await response.json();
          setChatHistory(data.sessions || []);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [sessionId]);

  // Fetch messages for current session
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chat/messages/${sessionId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize speech recognition if available
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInputMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      setSelectedImage(file);
    }
  };

  // NEW: Function to simulate streaming response
  const simulateStreamingResponse = (text, callback) => {
    const words = text.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        callback(words.slice(0, currentIndex + 1).join(" "));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust speed as needed
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isSending) return;

    setIsSending(true);

    // User message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Create a placeholder bot message that will be updated as the response streams in
    const botMessageId = Date.now() + 1;
    const botMessagePlaceholder = {
      id: botMessageId,
      text: "", // Start with empty text
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
      isStreaming: true, // Flag to indicate this message is being streamed
    };
    setMessages((prev) => [...prev, botMessagePlaceholder]);

    try {
      // Call backend
      const res = await fetch("http://localhost:8000/nlp/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputMessage }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();

      // NEW: Simulate streaming response instead of showing all at once
      simulateStreamingResponse(data.answer, (partialText) => {
        // Update the bot message with the partial text
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: partialText } : msg
          )
        );
      });

      // After streaming completes, remove the streaming flag
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
          )
        );
      }, data.answer.split(" ").length * 50 + 100);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        id: Date.now() + 2,
        text: "⚠️ Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInputMessage("");
      setSelectedImage(null);
      setIsSending(false);
    }
  };

  // Health topics for quick selection
  const healthTopics = [
    "Headache",
    "Fever",
    "Cough",
    "Stomach pain",
    "Allergies",
    "Sleep issues",
    "Nutrition",
    "Exercise",
  ];

  const startSpeechRecognition = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to start a new chat session
  const startNewChat = () => {
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    localStorage.setItem("chatSessionId", newSessionId);
    setMessages([initialMessage]);
    setIsSidebarOpen(false);
  };
  const handleTopicClick = (topic) => {
    setInputMessage(topic);
  };

  // Function to load a specific chat session
  const loadChatSession = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chat/messages/${sessionId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          setSessionId(sessionId);
          localStorage.setItem("chatSessionId", sessionId);
          setIsSidebarOpen(false);
        }
      }
    } catch (error) {
      console.error("Error loading chat session:", error);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([initialMessage]);
  };

  // Feedback function
  const handleFeedback = (messageId, isPositive) => {
    // In a real app, you would send this feedback to your backend
    console.log(
      `Feedback for message ${messageId}: ${
        isPositive ? "positive" : "negative"
      }`
    );

    // Update UI to show feedback was given
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: isPositive ? "positive" : "negative" }
          : msg
      )
    );
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={startNewChat}
              className="flex items-center w-full p-3 rounded-lg mb-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              <Plus size={16} className="mr-2" /> New Chat
            </button>
          </div>

          {/* Sidebar / Menu */}
          <div className="mb-4">
            <Link
              to="/vaccine"
              className="flex items-center w-full p-3 rounded-lg mb-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              Vaccination Scheduler
            </Link>
          </div>

          <div className="mt-6">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Recent Chats
            </h3>
            <div className="space-y-1">
              {chatHistory.map((session) => (
                <div
                  key={session._id}
                  onClick={() => loadChatSession(session._id)}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm"
                >
                  <div className="font-medium">
                    {session.title || "Health Consultation"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {chatHistory.length === 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 p-2">
                  No chat history yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between border-b ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center">
              <div
                className={`p-2 rounded-full mr-2 ${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <Heart
                  size={20}
                  className={darkMode ? "text-blue-200" : "text-blue-600"}
                />
              </div>
              <div>
                <h1 className="font-bold">AI Health Assistant</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by Team Scriptheist.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={clearChat}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div
          className={`flex-1 overflow-y-auto p-4 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xl ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full flex-shrink-0 ${
                    message.sender === "user"
                      ? "bg-gray-300 dark:bg-gray-600"
                      : "bg-blue-600"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User
                      size={16}
                      className="text-gray-700 dark:text-gray-200"
                    />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>

                <div
                  className={`max-w-md rounded-xl p-4 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : `${darkMode ? "bg-gray-800" : "bg-white"} border ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } rounded-bl-none shadow-sm`
                  }`}
                >
                  {/* Display image if message contains one */}
                  {message.image && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <img
                        src={message.image}
                        alt="Uploaded by user"
                        className="max-w-full max-h-64 object-contain"
                      />
                    </div>
                  )}

                  <div className="text-sm prose prose-blue max-w-none">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                    {/* NEW: Show typing indicator for streaming messages */}
                    {message.isStreaming && (
                      <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`text-xs ${
                        message.sender === "user"
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>

                    {message.sender === "bot" && !message.isStreaming && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className={`p-1 rounded ${
                            message.feedback === "positive"
                              ? "text-green-500 bg-green-100 dark:bg-green-900/30"
                              : "text-gray-400 hover:text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className={`p-1 rounded ${
                            message.feedback === "negative"
                              ? "text-red-500 bg-red-100 dark:bg-red-900/30"
                              : "text-gray-400 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-6 w-full">
              <div className="flex items-start space-x-3 w-full">
                {/* Bot Icon */}
                <div className="bg-blue-600 p-3 rounded-full flex-shrink-0">
                  <Bot size={24} className="text-white" />
                </div>

                {/* Typing Bubble */}
                <div
                  className={`flex items-center p-4 rounded-xl rounded-bl-none shadow-sm w-full 
                    ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                >
                  {/* Bouncing dots */}
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Health Topics Quick Selection */}
        <div
          className={`p-3 border-t ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 ml-1">
            Quick health topics:
          </p>
          <div className="flex flex-wrap gap-2">
            {healthTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="px-3 py-1.5 bg-blue-400 text-black text-sm font-medium rounded-full hover:bg-blue-600 transition flex items-center dark:bg-blue-900/30 dark:text-white dark:hover:bg-blue-900/50"
              >
                <Plus size={14} className="mr-1" /> {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div
          className={`p-4 border-t ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Preview selected image */}
          {selectedImage && (
            <div className="mb-3 flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center">
                <ImageIcon size={16} className="text-gray-500 mr-2" />
                <span className="text-sm truncate max-w-xs">
                  {selectedImage.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {/* Image upload button */}
            <label
              htmlFor="image-upload"
              className="p-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 cursor-pointer"
            >
              <ImageIcon size={20} />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {isRecording ? (
              <button
                onClick={stopSpeechRecognition}
                className="p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
              >
                <Square size={20} />
              </button>
            ) : (
              <button
                onClick={startSpeechRecognition}
                className="p-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                disabled={
                  !(
                    "webkitSpeechRecognition" in window ||
                    "SpeechRecognition" in window
                  )
                }
                title="Voice input"
              >
                <Mic size={20} />
              </button>
            )}

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about any health concern..."
              className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() && !selectedImage}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>

          {isRecording && (
            <div className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Listening... Speak now
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div
          className={`p-3 border-t ${
            darkMode
              ? "bg-amber-900/20 border-amber-800"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-start space-x-3">
              <AlertCircle
                size={18}
                className={`mt-0.5 flex-shrink-0 ${
                  darkMode ? "text-amber-400" : "text-amber-600"
                }`}
              />
              <p
                className={`text-xs ${
                  darkMode ? "text-amber-300" : "text-amber-800"
                }`}
              >
                <strong>Disclaimer:</strong> This is for informational purposes
                only and not medical advice. Always consult a healthcare
                professional for medical concerns.
              </p>
            </div>

            {/* Show vaccination summary inside disclaimer */}
            {report && (
              <div>
                <p>
                  <strong>Total Vaccinations:</strong> {report.total ?? 0}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
