const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { request } = require("express");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (request, response) => {
  const event = request.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event); // Post Service
  axios.post("http://localhost:4001/events", event); // Comment Service
  axios.post("http://localhost:4002/events", event); // Query Service
  axios.post("http://localhost:4003/events", event); // Moderation Service

  response.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005 (Event-Bus Service)");
});
