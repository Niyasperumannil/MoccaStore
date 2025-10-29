import React, { useState } from "react";
import axios from "axios";
import "./RegisterHome.css";

const RegisterHome = ({ onRegisterSuccess }) => {
  const [mode, setMode] = useState("login"); // 🔁 "login" or "register"
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const BASE_URL = "https://backendmocca.onrender.com/api/auth"; // ✅ backend hosted link

  // ✅ Send OTP (for login or register)
  const sendOtp = async (e) => {
    e?.preventDefault();
    setMessage("");

    if (!phoneNumber || phoneNumber.length < 6) {
      setMessage("Please enter a valid phone number");
      return;
    }

    const fullPhone = `${countryCode}${phoneNumber}`;
    setLoading(true);

    try {
      if (mode === "register" && (!name || !email)) {
        setMessage("Please enter name and email");
        setLoading(false);
        return;
      }

      // ✅ Send OTP
      const res = await axios.post(`${BASE_URL}/send-otp`, {
        phoneNumber: fullPhone,
        ...(mode === "register" ? { name, email } : {}),
      });

      setMessage(res.data.message || "OTP sent successfully");
      setStep(2);
    } catch (err) {
      console.error("Send OTP Error:", err);

      const msg = err?.response?.data?.message || "Failed to send OTP";
      const link =
        "https://console.twilio.com/us1/develop/phone-numbers/manage/verified";

      // 💡 If Twilio sandbox rejects number, show helpful link
      if (msg.toLowerCase().includes("twilio")) {
        setMessage(`${msg}. Please first verify your number here: ${link}`);
      } else {
        setMessage(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP (login or register)
  const verifyOtp = async (e) => {
    e?.preventDefault();
    setMessage("");

    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    const fullPhone = `${countryCode}${phoneNumber}`;
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`, {
        phoneNumber: fullPhone,
        code: otp,
      });

      if (res.data.token) {
        // ✅ Save token and user details locally
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("phoneNumber", fullPhone);

        setMessage("OTP verified successfully!");
        if (typeof onRegisterSuccess === "function") onRegisterSuccess();
      } else {
        setMessage(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      const msg =
        err?.response?.data?.message ||
        "Verification failed. Please try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Toggle between Register / Login
  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setStep(1);
    setOtp("");
    setMessage("");
    setPhoneNumber("");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>{mode === "login" ? "Login via OTP" : "Register"}</h2>

        {step === 1 && (
          <form onSubmit={sendOtp}>
            {mode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

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

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span className="toggle-link" onClick={toggleMode}>
                Register here
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span className="toggle-link" onClick={toggleMode}>
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RegisterHome;
