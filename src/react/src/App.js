import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useIdleTimer } from "react-idle-timer";

import "./App.css";
import Navbar from "./components/Navbar";

import HomeUI from "./components/HomeUI";
import AuthBase from "./views/auth/AuthBase";
import PostsList from "./views/posts/PostsList";
import PostCreate from "./views/posts/PostCreate";
import PostPage from "./views/posts/PostPage";
import Logout from "./views/auth/Logout";
import Dashboard from "./views/app/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  // 특정시간동안 활동이 없으면 logout 시행
  const handleOnIdle = (event) => {
    if (isAuth) {
      fetch("/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();
          window.location.replace("/");
        });
      const logoutTime = new Date(getLastActiveTime());
      console.log("Last active time:", logoutTime);
    }
  };
  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 20,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    <div>
      {isAuth ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<HomeUI />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="posts/:slug" element={<PostPage />} />
              <Route path="posts/create" element={<PostCreate />} />
              <Route path="logout" element={<Logout setIsAuth={setIsAuth} />} />
            </Route>
          </Routes>
        </div>
      ) : (
        <div>
          <AuthBase setIsAuth={setIsAuth} />
        </div>
      )}
    </div>
  );
}

export default App;
