const API_URL = "http://localhost:8081/api";
const app = document.getElementById("content");

function showHome() {
    app.innerHTML += `
        <h3>Întreabă AI</h3>
        <input id="aiInput" placeholder="Ex: Spune-mi despre Romania" />
        <button onclick="sendAI()">Trimite</button>
        <button onclick="toggleAI()">Închide</button>
        <pre id="aiOutput"></pre>
`;

    fetch(`${API_URL}/continents`)
        .then(r => r.json())
        .then(data => {
            app.innerHTML = "";

            // creare panouri
            const leftPanel = document.createElement("div");
            leftPanel.className = "left-panel";

            const rightPanel = document.createElement("div");
            rightPanel.className = "right-panel";
            rightPanel.innerHTML = `<img src="images/globe.png" alt="Glob Pământesc" />`;

            app.appendChild(leftPanel);
            app.appendChild(rightPanel);

            // carduri continente
            data.forEach((continent, index) => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                <h2>${continent.name}</h2>
                <p>Suprafață: ${continent.area ?? 'N/A'} km²</p>
                <button onclick="showCountries('${continent.name}')">Vezi Țările</button>
                <button onclick="editContinent(${continent.id})">Editează</button>
                <button onclick="deleteContinent(${continent.id})">Șterge</button>
            `;

                leftPanel.appendChild(card);

                // animație de intrare
                setTimeout(() => card.classList.add("show"), 100 + index*100);
            });

            // formular adăugare continent
            const addForm = document.createElement("form");
            addForm.innerHTML = `
                <h3>Adaugă Continent</h3>
                <input id="name" placeholder="Nume" />
                <input id="area" placeholder="Suprafață" type="number" />
                <button type="button" onclick="addContinent()">Adaugă</button>
            `;
            leftPanel.appendChild(addForm);
        });
}

function addContinent() {
    const name = document.getElementById("name").value;
    const area = document.getElementById("area").value;

    fetch(`${API_URL}/continents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, area })
    }).then(() => showHome());
}

function deleteContinent(id) {
    fetch(`${API_URL}/continents/${id}`, { method: "DELETE" })
        .then(() => showHome());
}
function editContinent(id) {
    const newName = prompt("Noul nume al continentului:");
    if (newName)
        fetch(`${API_URL}/continents/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName })
        }).then(() => showHome());
}
const askBtn = document.getElementById('ask-ai-btn');

if (askBtn) {
    askBtn.addEventListener('click', async () => {
        const country = document.getElementById('country-input')?.value.trim();
        if (!country) return alert('Te rog să introduci o țară.');

        const responseDiv = document.getElementById('ai-response');
        responseDiv.textContent = "Se procesează...";

        try {
            const res = await fetch('/ai/country-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country })
            });

            const data = await res.json();
            responseDiv.textContent = data.answer;
        } catch (err) {
            responseDiv.textContent = "A apărut o eroare.";
            console.error(err);
        }
    });
}


window.onload = showHome;
