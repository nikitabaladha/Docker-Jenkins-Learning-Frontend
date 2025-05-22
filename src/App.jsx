// App.js

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import BookForm from "./components/BookForm/BookForm.jsx";
import ViewBook from "./components/ViewBook/ViewBook.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import SearchList from "./components/SearchList/SearchList.jsx";
import Books from "./components/Books/Books.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/view-book" element={<ViewBook />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/search" element={<SearchList />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
