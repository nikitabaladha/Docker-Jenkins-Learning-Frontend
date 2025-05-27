// src/components/BookForm.js

import React, { useState } from "react";
import "./BookForm.css";
import postAPI from "../../Api/axiosPost.jsx";

const BookForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    coverImage: null,
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      coverImage: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("author", formData.author);
      formDataObj.append("genre", formData.genre);
      formDataObj.append("yearPublished", formData.yearPublished);
      formDataObj.append("coverImage", formData.coverImage);

      const response = await postAPI("/book", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.hasError) {
        alert(response.data.message);
        console.log(
          "Book successful submission Message:",
          response.data.message
        );
        onSuccess();
      } else {
        setGeneralError(response.data.message);
        console.error("Submission Error 1:", response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Submission Error 2:", error.response.data.message);

        setGeneralError(error.response.data.message);
      } else {
        console.error("Submission Error 3:", error);

        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="file"
            className="form-control-file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          {formErrors.author && <p className="error">{formErrors.author}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          {formErrors.genre && <p className="error">{formErrors.genre}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="yearPublished">Year Published</label>
          <input
            type="number"
            className="form-control"
            id="yearPublished"
            name="yearPublished"
            value={formData.yearPublished}
            onChange={handleChange}
            required
          />
          {formErrors.yearPublished && (
            <p className="error">{formErrors.yearPublished}</p>
          )}
          {generalError && <p className="error">{generalError}</p>}
        </div>
        <button type="submit" id="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;
