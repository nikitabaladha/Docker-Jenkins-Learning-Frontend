import React, { useState, useEffect } from "react";
import getAPI from "../../Api/axiosGet.jsx";
import "./Books.css";

import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await getAPI("/get-all", false);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <div className="heading">
        <h4>Find you interest from our shelf !</h4>
      </div>
      <div className="container mt-4">
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
                <div className="about-card-body">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
