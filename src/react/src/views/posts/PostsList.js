import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PostsDetail from "./PostsDetail";

function PostsList() {
  const [postdata, setPosts] = useState(null);

  useEffect(() => {
    getPostsList();
  }, []);

  function getPostsList() {
    fetch("/api/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>포스트 페이지</h1>

      {postdata
        ? postdata.map((postItem, index) => {
            return <PostsDetail item={postItem} key={index} />;
          })
        : ""}
      <Link to="/posts/create">
        <h3>포스트 생성</h3>
      </Link>
    </div>
  );
}

export default PostsList;
