const app = require("express")();
const server = require("http").createServer(app);
const connection = require("./conn");
const mysql = require("mysql2")

const gridRouter = require("./routes/grid")

app.use("/grid", gridRouter);

app.get("/", (req, res) => {

    res.send("Hej socket server!");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://192.168.0.145:5500",
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

app.post("/savetable", function(req, res) {
    res.json("funkar");
})

server.listen(3000);