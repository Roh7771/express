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
    {
        id: nextId++,
        text: 'Third post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Fourth post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Fifth post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Sixth post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Seventh post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Eighth post',
        type: 'Обычный',
        likes: -2,
    },
    {
        id: nextId++,
        text: 'Nineth post',
        type: 'Обычный',
        likes: -2,
    },
]

const server = express();

server.use(express.json());
server.use(cors());

server.get('/posts/get-old-posts/:lastSeenPostId', (req, res) => {
    const lastSeenPostId = +req.params['lastSeenPostId']
    let sendPosts;
    if (lastSeenPostId === 0) {
        sendPosts = posts.length < 5 ? posts : posts.slice(posts.length - 5);
    } else {
        const filteredPosts = posts.filter(post => post.id < lastSeenPostId);
        sendPosts = filteredPosts.length < 5 ? filteredPosts : filteredPosts.slice(filteredPosts.length - 5);    
    }
    res.send(sendPosts);
});

server.get('/posts/get-fresh-posts/:freshestPostId', (req, res) => {
    const freshestPostId = +req.params['freshestPostId'];
    const sendPosts = posts.filter(post => post.id > freshestPostId);
    res.send(sendPosts);
})

server.get('/posts/old-posts-check/:fifthPostId', (req, res) => {
    const fifthPostId = +req.params['fifthPostId'];
    if (fifthPostId === posts[0].id) {
        res.send(true);
        return;
    }
    res.send(false);
})

server.get('/posts/fresh-posts-check/:freshestPostId', (req, res) => {
    const freshestPostId = +req.params['freshestPostId'];
    if (posts.length === 0) {
        res.send(false);
        return;
    } else if (freshestPostId < posts[posts.length - 1].id) {
        res.send(true);
        return;
    }
    res.send(false);
})

server.delete('/posts/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    if (index === -1) {
        res.send('There is no such post');
        return;
    }
    posts.splice(index, 1);
    res.end();
})

server.post('/posts/like/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes++;
    res.send(`${posts[index].likes}`);
})

server.post('/posts/dislike/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes--
    res.send(`${posts[index].likes}`);
})

server.post('/posts', (req, res) => {
    const newPost = {
        id: nextId++,
        text: req.body.text,
        likes: 0,
        type: req.body.type
    }
    posts.push(newPost)
    res.send(newPost);
})

server.listen(process.env.PORT || '9999');