// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import MyComplaints from "./pages/MyComplaints.jsx";
import CreateComplaint from "./pages/CreateComplaint.jsx";
import AdminComplaints from "./pages/AdminComplaints.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import News from "./pages/News.jsx"
import NewsMange from "./pages/NewsMange.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/create-complaint" element={<CreateComplaint />} />
          <Route path="/admin" element={<AdminComplaints />} />
          <Route path="/about" element={<About />} />
                    <Route path="/news" element={<News />} />
                                        <Route path="/news-mange" element={<NewsMange />} />



        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
