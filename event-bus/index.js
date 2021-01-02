const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { request } = require("express");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (request, response) => {
  const event = request.body;

  console.log("Reached Event Bus!!!");

  events.push(event);

  axios.post("http://post-clusterip-service:4000/events", event); // Post Service running
  axios.post("http://comments-service:4001/events", event); // Comment Service
  axios.post("http://query-service:4002/events", event); // Query Service
  axios.post("http://moderation-service:4003/events", event); // Moderation Service

  response.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Using cluster ip");
  console.log("Listening on 4005 (Event-Bus Service)");
});
