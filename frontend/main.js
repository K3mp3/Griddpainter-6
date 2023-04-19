import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000");

const chatContainer = document.createElement("div");
const showChatBtn = document.createElement("button");
const chatInput = document.createElement("input");

export default function init() {
    showChatBtn.innerText = "Chat";

    document.body.appendChild(chatContainer)
    chatContainer.appendChild(showChatBtn)
    
    showChatBtn.addEventListener("click", createChat)
}

function createChat() {
    const chatInput = document.createElement("input");
    const sendChatBtn = document.createElement("button");

    chatInput.classList.add("chat-input");

    chatInput.placeholder = "Message";
    sendChatBtn.innerText = "Send chat";


    chatContainer.appendChild(chatInput);
    chatContainer.appendChild(sendChatBtn);

    sendChatBtn.addEventListener("click", sendChat);
}

function sendChat(e) {
    const chatInput = document.querySelector(".chat-input");

    const chatMsg = chatInput.value;
    console.log("chatMsg2", chatMsg);

    socket.emit("chat",{chat: chatMsg});

    getChatMsg();
}

function getChatMsg() {
    /*const chat = document.createElement("p");
    chatContainer.appendChild(chat);
    socket.on("chat message", function(msg) {
        console.log("msg", msg);
    })*/
}