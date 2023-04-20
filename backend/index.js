const app = require("express")();
const server = require("http").createServer(app);

app.get("/", (req, res) => {

    res.send("Hej socket server!");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

// Listen for a connection event
io.on("connection", (socket) => {
    socket.on('nickname', (nickname) => {
        console.log(`${nickname} has connected to the chat`);
    })

    socket.emit("chat", {chat: "Welcome", user: "Server-bot"})

    socket.on("chat", (arg) => {
        console.log("incoming chat", arg);
        io.emit("chat", arg)
    })
})

server.listen(3000);