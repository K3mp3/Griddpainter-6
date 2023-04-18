const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

io.on("connection", function(socket) {
    console.log("User connected");

    socket.on("disconnect", function() {
        console.log("User diconnected")
    })

    socket.on("chat", function(msg) {
        console.log("msg", msg);
        io.emit("chat message", msg);
        console.log(msg);
    })
})

module.exports = {app: app, server: server};
