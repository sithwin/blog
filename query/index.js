const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (request, response) => {
  console.log("Getting Query Service !!!", request);
  response.send(posts);
});

app.post("/events", (request, response) => {
  console.log("Reached Query Service !!!", request);
  const { type, data } = request.body;

  handleEvent(type, data);

  response.send({});
});

app.listen(4002, async () => {
  console.log("Listening port 4002 (Query Service)");

  const res = await axios.get("http://event-bus-service:4005/events");

  for (let event of res.data) {
    console.log("Processing events:", event.type);
    handleEvent(event.type, event.data);
  }
});

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((c) => {
      return c.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};
