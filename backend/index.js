const app = require("express")();
const server = require("http").createServer(app);
const mysql = require("mysql2")


app.get("/", (req, res) => {

    res.send("Hej socket server!");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3005",
        methods: ["GET", "POST"]
    }
});

// Listen for a connection event
io.on("connection", (socket) => {

    socket.on('nickname', (nickname) => {
        console.log(`${nickname} has connected to the chat`);
        io.emit("chat", {chat: `${nickname} has connected to the chat`, user: "Server-bot"})

        socket.on("disconnect", () => {
            console.log(`${nickname} has disconnected from the chat`);
            io.emit("chat", {chat: `${nickname} has disconnected from the chat`, user: "Server-bot"});
        });
    })

    socket.emit("chat", {chat: "Welcome", user: "Server-bot"})

    socket.on("chat", (arg) => {
        console.log("incoming chat", arg);
        io.emit("chat", arg)
    })

})

io.on("connection", (socket) => {
    socket.on("table", (arg) => {
        console.log("incoming table", arg);
    })
})

server.listen(3000);