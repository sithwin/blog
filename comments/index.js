const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const comments = {};

app.get('/posts/:id/comments', (request, response) => {
    
    response.status(200).send(comments);
});

app.post('/posts/:id/comments', (request, response) => {
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});