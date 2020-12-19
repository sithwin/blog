import React from "react";

export default (props) => {
  const { comments } = props;

  const renderedComments = comments.map((comment) => {
    let content;

    console.log("comments ", comments);

    console.log("comment status", comment.status);
    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This comment is pending";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
