import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000");

let sendMessage = document.getElementById("sendMessage");
let sendBtn = document.getElementById("sendBtn");
let messages = document.getElementById("messages");

socket.on("chat", (arg) => {
    console.log("chat", arg);

    messages.innerHTML += arg.chat + " | from: " + arg.user + "<br/>";
})

sendBtn.addEventListener("click", () => {
    socket.emit("chat", {chat: sendMessage.value, user: "Janne"});
})