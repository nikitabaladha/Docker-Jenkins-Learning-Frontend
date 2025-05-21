// src/components/Signup.js
import React, { useState } from "react";
import "./Signup.css";
import postAPI from "../../Api/axiosPost.jsx";

const Signup = ({ onLoginClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    console.log(formData);
    try {
      const response = await postAPI("/signup", formData, {}, false);

      if (!response.hasError) {
        alert(response.data.message);
        console.log("Signup successful Message:", response.data.message);
        onSuccess();
      } else {
        setGeneralError(response.data.message);
        console.error("Signup Error 1:", response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Signup Error 2:", error.response.data.message);

        setGeneralError(error.response.data.message);
      } else {
        console.error("Signup Error 3:", error);

        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {formErrors.firstName && (
            <p className="error">{formErrors.firstName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {formErrors.lastName && (
            <p className="error">{formErrors.lastName}</p>
          )}
        </div>

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
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={onLoginClick}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
