const showChatBtn = document.createElement("button");
const chatInput = document.createElement("input");

export default function init() {
    showChatBtn.innerText = "Chat";

    document.body.appendChild(showChatBtn)
    
    showChatBtn.addEventListener("click", createChat)
}

function createChat() {

}