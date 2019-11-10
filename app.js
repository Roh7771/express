const express = require('express');
const cors = require('cors');

let nextId = 1;

const posts = [
    {
        id: nextId++,
        text: 'First post',
        type: 'Обычный',
        likes: 5,
    },
    {
        id: nextId++,
        text: 'Second post',
        type: 'Обычный',
        likes: -2,
    },
]

const server = express();

server.use(express.json());
server.use(cors());

server.get('/posts', (req, res) => {
    res.send(posts);
});

server.delete('/posts/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    if (index === -1) {
        res.status(404);
        res.send('There is no such post');
        return;
    }
    posts.splice(index, 1);
    res.send(posts);
})

server.delete('/posts/like/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes++;
    res.send(posts);
})

server.delete('/posts/dislike/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes--;
    res.send(posts);
})

server.post('/posts', (req, res) => {
    posts.push({
        id: nextId++,
        text: req.body.text,
        likes: 0,
        type: req.body.type
    })
    res.send(posts);
})

server.listen(process.env.PORT || '9999');