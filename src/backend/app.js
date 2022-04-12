const express = require('express')
const app = express();

const posts = [
    {
        id: 1,
        title: 'First post',
        content: 'Content for 1st post'
    },
    {
        id: 2,
        title: 'Second post',
        content: 'Content for 1st post'
    },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})

app.get('/api/posts', (req, res) => {
    res.status(200).json({
        success: true,
        posts: posts,
    })
});

app.post('/api/posts', (req, res) => {
    const post = req.body;
    this.post = post;
    res.status(200).json({
        success: true,
    })
});

module.exports = app;