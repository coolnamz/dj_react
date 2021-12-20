import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <p>{post ? post.content : ""}</p>
    </div>
  );
}

export default PostPage;
