import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";

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

      {postdata ? (
        postdata.map((postItem, index) => {
          return <PostsDetail item={postItem} key={index} />;
        })
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
}

export default PostsList;
