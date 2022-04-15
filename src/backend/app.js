const express = require('express')
const app = express();
const { connect } = require('./config/db')
const postRoutes = require('./routes/post')
const path = require("path");

connect();

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
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})

app.use('/api/posts', postRoutes)

module.exports = app;