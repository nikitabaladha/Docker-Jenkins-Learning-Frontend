import React from "react";
import Navbar from "../Navbar/Navbar";
import BookShelf from "../../images/book-shelf.png";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="notfound-container">
        <img src={BookShelf} alt="Book-shelf" />
        <h5 className="message">Please login to view all your books.</h5>
      </div>
    </>
  );
};

export default NotFound;
