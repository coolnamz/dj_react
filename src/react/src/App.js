import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomeUI from "./components/HomeUI";
import PostsList from "./views/posts/PostsList";
import PostCreate from "./views/posts/PostCreate";
import PostPage from "./views/posts/PostPage";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Signup from "./views/auth/Signup";
import PassReset from "./views/auth/PassReset";
import PassResetConfirm from "./views/auth/PassResetConfirm";
import Dashboard from "./views/app/Dashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeUI />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/auth/password-reset" element={<PassReset />} />
        <Route
          path="/auth/password-reset/:uid/:token/confirm"
          element={<PassResetConfirm />}
        />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/posts/create" element={<PostCreate />} />
      </Routes>

      {/* <Routes>
        <Route path="/" element={<HomeUI />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/posts/create" element={<PostCreate />} />
      </Routes> */}
    </div>
  );
}

export default App;
