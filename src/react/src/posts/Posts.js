import React, { useEffect } from "react";
import "whatwg-fetch";
import cookie from "react-cookies";

export const Posts = () => {
  const loadPosts = () => {
    const endpoint = "/api/posts/";
    let lookupOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(endpoint, lookupOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    loadPosts();
  });

  return (
    <React.Fragment>
      <h1>포스트 페이지</h1>
    </React.Fragment>
  );
};
