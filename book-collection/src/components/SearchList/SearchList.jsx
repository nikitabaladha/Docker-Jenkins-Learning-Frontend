import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import getAPI from "../../Api/axiosGet";
import noBookFound from "../../images/bookNotFound.png";
import "./SearchList.css";

const SearchList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [books, setBooks] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAPI(`/search?q=${searchTerm}`);
        console.log(response.data.data);
        const { data } = response;
        console.log("data", data);
        if (data.hasError) {
          setHasError(true);
        } else {
          setBooks(data.data);
        }
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      {books.length > 0 && (
        <h3 id="search-heading">Your search result is here...</h3>
      )}
      {hasError ? (
        <div className="no-book-found notfound-container">
          <img
            src={noBookFound}
            className="no-book-found-image"
            alt="No book found"
          />
          <p className="message">
            Sorry, the book which you are searching is not found.
          </p>
        </div>
      ) : (
        <div className="row justify-content-center">
          {books.map((book) => (
            <div className="col-xs-12 col-md-3 col-sm-6" key={book._id}>
              <div className="card my-hover-effect">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="card-img-top"
                />

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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchList;
