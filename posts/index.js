const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

// Object
const posts = {}; // List of the posts
/*
client 
 {
     title = "abc"
 }
*/

app.get('/posts/', (request, response) => {
    console.log('Getting posts');
    response.status(200).send(posts);
});

app.post('/posts/', (request, response) => {
    console.log('Post request');
    const id = randomBytes(4).toString('hex');
    const { title } = request.body;

    posts[id] = {
        id,
        title
      };
    
    response.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
})