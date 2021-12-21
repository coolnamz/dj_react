import React from "react";
import { Link } from "react-router-dom";

function PostsDetail({ item }) {
  return (
    <div className="posts-list">
      <h2>
        <Link to={`/posts/${item.slug}`}>{item.title}</Link>
      </h2>
    </div>
  );
}

export default PostsDetail;
