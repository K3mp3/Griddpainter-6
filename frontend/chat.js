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

    chatInput.placeholder = "Message";

    chatContainer.appendChild(chatInput);
}