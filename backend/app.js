const path = require("path");
var cookieParser = require('cookie-parser')

const express = require('express')
const app = express();
const { connect } = require('./config/db')


const postRoutes = require('./routes/post')
const userRoutes = require("./routes/user");

connect();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})

app.use('/api/posts', postRoutes)
app.use("/api/user", userRoutes);

module.exports = app;