const chatButton = document.getElementById("chat-button");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatSend = document.getElementById("chat-send");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Arată/ascunde chatul
chatButton.onclick = () => chatWindow.style.display = "flex";
chatClose.onclick = () => chatWindow.style.display = "none";

// Trimite prompt-ul către Ollama
async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatMessages.innerHTML += `<div class="user-msg">${text}</div>`;
    chatInput.value = "";

    const responseDiv = document.createElement("div");
    responseDiv.className = "ai-msg";
    responseDiv.innerHTML = "Se încarcă...";
    chatMessages.appendChild(responseDiv);

    const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3",
            prompt: `Spune-mi informații despre țara: ${text}`
        })
    });

    const reader = res.body.getReader();
    let result = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const json = JSON.parse(chunk);
        result += json.response;
        responseDiv.innerHTML = result;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.onclick = sendMessage;

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
