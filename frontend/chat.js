import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000");

const chatContainer = document.createElement("div");
const chatOutput = document.createElement("p");
const writeMessageBox = document.querySelector('#write-message-box'); 
const chatBox = document.querySelector('#chat-box');

chatOutput.classList.add("chat-output");

export default function init() {
    chatBox.appendChild(chatContainer)
}


function createChat() {
    const chatInput = document.createElement("input");
    const sendChatBtn = document.createElement("button");

    chatInput.classList.add("chat-input");
    sendChatBtn.classList.add('send-chat-btn')

    chatInput.placeholder = "Message";
    sendChatBtn.innerText = "Send chat";


    writeMessageBox.appendChild(chatInput);
    writeMessageBox.appendChild(sendChatBtn);

    sendChatBtn.addEventListener("click", sendChat);
}

function sendChat() {
    const chatInput = document.querySelector(".chat-input");
    const inputNickName = document.querySelector('#inputNickName');

    const chatMsg = chatInput.value;
    const nickname = inputNickName.value;
    console.log("chatMsg2", chatMsg);

    socket.emit("chat", {chat: chatMsg, user: nickname});
}

getChatMsg();

function getChatMsg() {
    socket.on("chat", (arg) => {
    console.log("chat", arg);

    const username = document.createElement('p')
    username.innerText = 
    
    chatOutput.classList.add('chat-msg')
    chatOutput.innerHTML += "<li>" + arg.user + ": " + arg.chat + "</li>";
    console.log("chatOutput", chatOutput);
    chatBox.appendChild(chatOutput);
})
}

createChat();