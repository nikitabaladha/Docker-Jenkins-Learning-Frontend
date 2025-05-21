import React, { useState } from "react";
import postAPI from "../../Api/axiosPost.jsx";
import "./Login.css";

const Login = ({ onSignupClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });

    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/login", formData, null, false);

      if (!response.hasError) {
        alert(response.data.message);

        console.log("Login successful Message:", response.data.message);

        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.token)
        );
        onSuccess();
      } else {
        console.error("Login Error:", response.data.message);
        setGeneralError(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Login Error:", error.response.data.message);
        setGeneralError(error.response.data.message);
      } else {
        console.error("Login Error:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>
        {generalError && <p className="error">{generalError}</p>}
        <button type="submit" id="submit" className="btn btn-primary mt-2">
          Submit
        </button>
        <div className="mt-2 asking-text">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={onSignupClick}
          >
            Signup
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
