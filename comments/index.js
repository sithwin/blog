const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { request } = require("express");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (request, response) => {
  response.status(200).send(commentsByPostId[request.params.id] || []);
});

app.post("/posts/:id/comments", async (request, response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content, title } = request.body;

  const comments = commentsByPostId[request.params.id] || [];

  comments.push({
    id: commentId,
    content,
    satus: "pending",
  });

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: request.params.id,
      status: "pending",
    },
  });

  commentsByPostId[request.params.id] = comments;
  response.status(201).send(comments);
});

app.post("/events", async (request, response) => {
  console.log("Received Event", request.body.type);

  const { type, data } = request.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((c) => {
      return c.id === id;
    });
    comment.status = status;

    // Event Bus
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  response.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001 (Comment Service)");
});
