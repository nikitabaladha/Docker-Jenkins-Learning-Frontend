import React from "react";
import "./Home.css";

import Navbar from "../Navbar/Navbar.jsx";
import Genre from "../Genre/Genre.jsx";
import Footer from "../Footer/Footer.jsx";
import About from "../About/About.jsx";
import AllBooks from "../AllBooks/AllBooks.jsx";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid background-image" id="mainDiv">
        <div>
          <h1 className="welcome">Welcome to Word World</h1>
          <div className="quotes">
            <h2>A writer only begins a book.</h2>
            <h2>A reader finishes it.</h2>
          </div>
        </div>
      </div>

      <Genre />
      <AllBooks />
      <About />

      <Footer />
    </div>
  );
};

export default Home;
