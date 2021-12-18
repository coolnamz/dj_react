import React from "react";

const PostInline = (props) => {
  return (
    <React.Fragment>
      <h2>
        <a href={props.item.url}>{props.item.title}</a>
      </h2>
      <p>{props.item.content}</p>
      <br />
    </React.Fragment>
  );
};

export default PostInline;
