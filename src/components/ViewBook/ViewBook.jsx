// ViewBook.js

import React, { useState, useEffect } from "react";
import getAPI from "../../Api/axiosGet";
import deleteAPI from "../../Api/axiosDelete";
import "./ViewBook.css";
import EditModal from "../EditModal/EditModal.jsx";

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await getAPI("/book");
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await deleteAPI(`/book/${bookId}`);

      if (response && !response.hasError) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        console.log("Response:", response.data.message);
      } else {
        console.error("View Book Error:", response.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const updateBookList = (updatedBook) => {
    debugger;
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="heading">All your books are here...</h3>
      <div className="row justify-content-center">
        {books.map((book) => (
          <div key={book._id} className="col-xs-12 col-md-3 col-sm-6">
            <div className="card my-hover-effect">
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="small-text">
                  {" "}
                  <span className="card-text"> Author : </span>
                  <span className="inner-text">{book.author}</span>{" "}
                </p>
                <p className="small-text">
                  {" "}
                  <span className="card-text">Genre : </span>
                  {book.genre}
                </p>
                <p className="small-text">
                  {" "}
                  <span className="card-text"> Year Published : </span>
                  {book.yearPublished}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => handleEdit(book)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EditModal
          book={selectedBook}
          onClose={closeModal}
          updateBookList={updateBookList}
        />
      )}
    </div>
  );
};

export default ViewBook;
