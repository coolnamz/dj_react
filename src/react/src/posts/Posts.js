import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

import PostInline from "./PostInline";

export const Posts = () => {
  const [postdata, setPost] = useState(null);

  const loadPosts = () => {
    const endpoint = "http://localhost:8000/api/posts/";
    let lookupOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    fetch(endpoint, lookupOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setPost(responseData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const createPosts = () => {
    const endpoint = "http://localhost:8000/api/posts/";
    const csrfToken = cookie.load("csrftoken");
    let data = {
      slug: "",
      title: "",
      content: "",
      draft: false,
      publish: null,
    };
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
        credentials: "include",
      };
    }
    fetch(endpoint, lookupOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setPost({
          posts: responseData,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <React.Fragment>
      <h1>포스트 페이지</h1>
      {postdata ? (
        postdata.map((postItem, i) => {
          return <PostInline item={postItem} key={i} />;
        })
      ) : (
        <p>No post found</p>
      )}
    </React.Fragment>
  );
};
