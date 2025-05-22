import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import putAPI from "../../Api/axiosPut.jsx";
import "./EditModal.css";

const EditModal = ({ book, onClose, updateBookList: onUpdate }) => {
  const [editedDetails, setEditedDetails] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    yearPublished: book.yearPublished,
    _id: book._id,
  });

  const [generalError, setGeneralError] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setGeneralError("");
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleEditSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { _id, ...editedBook } = editedDetails;
        const formData = new FormData();
        formData.append("title", editedBook.title);
        formData.append("author", editedBook.author);
        formData.append("genre", editedBook.genre);
        formData.append("yearPublished", editedBook.yearPublished);

        if (coverImage) {
          formData.append("coverImage", coverImage);
        }

        const response = await putAPI(`/book/${book._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.hasError) {
          setGeneralError(response.data.message);

          console.error("Book Edition Error:", response.data.message);
        } else {
          console.log("Book Edited Successful Message:", response.data.message);
          const newImageUrl = response.data.data.coverImage;

          const updatedData = {
            ...editedDetails,
            coverImage: newImageUrl,
          };
          onUpdate(updatedData);
          onClose();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Book Edition Error:", error.response.data.message);

          setGeneralError(error.response.data.message);
        } else {
          console.error("Book Edition Error:", error);
          setGeneralError("An unexpected error occurred. Please try again.");
        }
      }
    },
    [editedDetails, coverImage]
  );

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <label>
            Cover Image:
            <input
              className="form-control"
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
          </label>

          <label>
            Title:
            <input
              className="form-control"
              type="text"
              name="title"
              value={editedDetails.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              className="form-control"
              value={editedDetails.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              className="form-control"
              value={editedDetails.genre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Year Published:
            <input
              type="text"
              name="yearPublished"
              className="form-control"
              value={editedDetails.yearPublished}
              onChange={handleChange}
              required
            />
          </label>
          {generalError && <p className="error">{generalError}</p>}
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
