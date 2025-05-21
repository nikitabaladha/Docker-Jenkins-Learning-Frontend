import React from "react";
import AboutUsImage from "../../images/about.png";
import "./About.css";

function About() {
  return (
    <div id="aboutUs" className="about-container-fluid">
      <div className="row container-fluid m-0 p-0">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={AboutUsImage} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-6 text-center">
          <div id="aboutUs-title">
            <h4> Welcome to Word World</h4>
          </div>
          <div className="about-text">
            <p>
              Word World is your ultimate destination for discovering new books
              and authors. Our mission is to connect readers with the perfect
              book, and to provide a platform for authors to showcase their
              work.
            </p>
            <p>
              With a vast collection of books across various genres, our
              application is designed to make book discovery easy and fun.
              Whether you're a fan of fiction, non-fiction, romance, thriller,
              or any other genre, we've got you covered.
            </p>
            <p>
              Our team of book lovers is dedicated to curating a personalized
              reading experience for each user. We believe that every book has a
              story to tell, and we're committed to helping you find your next
              great read.
            </p>
            <p>
              At Word World, we're passionate about promoting literacy and a
              love for reading. We believe that books have the power to
              transform lives, and we're dedicated to making reading accessible
              to everyone.
            </p>
            <p>
              Explore our collection, discover new authors, and get lost in the
              world of books. Happy reading!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
