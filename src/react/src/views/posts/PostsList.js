import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PostsDetail from "./PostsDetail";

function PostsList() {
  const PostsAPIAddress = `/api/posts`;
  const [postdata, setPosts] = useState(null);

  useEffect(() => {
    getPostsList();
  }, []);

  async function getPostsList() {
    try {
      const response = await axios.get(PostsAPIAddress);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
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
