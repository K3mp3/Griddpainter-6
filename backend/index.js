const app = require("express")();
const server = require("http").createServer(app);

app.get("/", (req, res) => {

    res.send("Hej socket server!");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://192.168.0.145:5500",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Någon är här!");

    socket.emit("chat", {chat: "Welcome", user: "Server-bot"})

    socket.on("chat", (arg) => {
        console.log("incoming chat", arg);
        io.emit("chat", arg)
    })
})

server.listen(3000);