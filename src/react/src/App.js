import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./components/Header";
import HomeUI from "./components/HomeUI";
import PostsList from "./posts/PostsList";
import PostCreate from "./posts/PostCreate";
import PostPage from "./posts/PostPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomeUI />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/posts/create" element={<PostCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
