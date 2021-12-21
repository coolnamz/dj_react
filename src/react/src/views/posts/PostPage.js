import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PostPage(match) {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const PostAPIAddress = `/api/posts/${slug}`;

  useEffect(() => {
    getPost();
  }, [slug]);

  async function getPost() {
    try {
      const response = await axios.get(PostAPIAddress);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{post ? post.title : ""}</h1>
      <p>작성일: {post ? post.publish : ""}</p>
      <p>{post ? post.content : ""}</p>
      <Link to="/posts">목록으로 이동</Link>
    </div>
  );
}

export default PostPage;
