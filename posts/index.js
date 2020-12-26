const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { request, response } = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // List of the posts

app.get("/posts/", (request, response) => {
  console.log("Getting posts");
  response.status(200).send(posts);
});

app.post("/posts/", async (request, response) => {
  console.log("Post request");
  const id = randomBytes(4).toString("hex");
  const { title } = request.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-service:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  response.status(201).send(posts[id]);
});

app.post("/events", (request, response) => {
  console.log("Received Event", request.body.type);

  response.send({});
});

app.listen(4000, () => {
  console.log("Version V3");
  console.log("Listening on 4000 (Post Service)");
});
