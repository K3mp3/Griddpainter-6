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

    // << listen to cellClicked event and then broadcast it to all connected clients using io.emit
    socket.on('cellClicked', (data) => {
        console.log(`Cell ${data.cellID} clicked with color ${data.color}`);
        io.emit('updateCell', data);
      });

    socket.on('nickname', (nickname) => {
        console.log(`${nickname} has connected to the chat`);
        io.emit("chat", {chat: `${nickname} has connected to the chat`, user: "Server-bot"})

        socket.on("disconnect", () => {
            console.log(`${nickname} has disconnected from the chat`);
            io.emit("chat", {chat: `${nickname} has disconnected from the chat`, user: "Server-bot"});
        });
    })


    socket.on('clear board', () => {
        console.log('Rensa grid för alla användare')
        io.emit('clear board')
    })

    socket.emit("chat", {chat: "Welcome", user: "Server-bot"})

    socket.on("chat", (arg) => {
        console.log("incoming chat", arg);
        io.emit("chat", arg)
    })

    socket.on("restoreTable", (arg) => {
        console.log("restore table", arg);
        io.emit("restoreTable", arg);
    })

})


server.listen(3000);