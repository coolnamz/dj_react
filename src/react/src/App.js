import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import PostsList from "./posts/PostsList";
import PostPage from "./posts/PostPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:slug" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
