import React, { useState, useEffect } from "react";
import getAPI from "../../Api/axiosGet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./AllBooks.css";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await getAPI("/get-all", false);
        setBooks(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div id="all-book-heading">
        <h4>Discover Our Books !</h4>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <Slider {...settings} className="book-slider">
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
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
