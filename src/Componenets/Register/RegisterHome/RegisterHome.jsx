// RegisterHome.jsx
import React, { useState } from "react";
import axios from "axios";
import "./RegisterHome.css";

const RegisterHome = ({ onRegisterSuccess }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // send OTP
  const sendOtp = async (e) => {
    e?.preventDefault();
    setMessage("");
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number");
      return;
    }
    const fullPhone = `${countryCode}${phoneNumber}`;
    setLoading(true);
    try {
      const res = await axios.post("https://backendmocca.onrender.com/api/auth/send-otp", {
        phoneNumber: fullPhone,
      });
      setMessage(res.data.message || "OTP sent");
      setStep(2);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // verify OTP (no navigate here)
  const verifyOtp = async (e) => {
    e?.preventDefault();
    setMessage("");
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }
    const fullPhone = `${countryCode}${phoneNumber}`;
    setLoading(true);
    try {
      const res = await axios.post("https://backendmocca.onrender.com/api/auth/verify-otp", {
        phoneNumber: fullPhone,
        code: otp,
      });

      if (res.data.token) {
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("phoneNumber", fullPhone);

        // IMPORTANT: do NOT call navigate() here. Call parent callback once.
        if (typeof onRegisterSuccess === "function") {
          onRegisterSuccess();
        }
      } else {
        setMessage(res.data.message || "Verification failed");
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Phone Verification</h2>

        {step === 1 && (
          <>
            <div className="phone-input-container">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="country-select"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="phone-input"
              />
            </div>
            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterHome;
