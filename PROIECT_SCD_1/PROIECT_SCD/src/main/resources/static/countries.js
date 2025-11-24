function showCountries(continentName) {
    const app = document.getElementById("content");

    if (!continentName) {
        console.error("continentName este undefined");
        app.innerHTML = "<p>Nu s-a selectat niciun continent.</p>";
        return;
    }

    fetch(`${API_URL}/countries/continent/${continentName}`)
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                console.error("Data nu este array:", data);
                app.innerHTML = "<p>Nu există țări pentru acest continent.</p>";
                return;
            }

            app.innerHTML = `
                <div class="header">
                    <button onclick="showHome()">⟵ Înapoi la continente</button>
                    <h2>${continentName}</h2>
                </div>
            `;

            data.forEach((country, index) => {
                const card = document.createElement("div");
                card.className = "card";

                // imagine statică pentru țară
                const imgPath = `images/${country.name.toLowerCase()}.jpg`;

                card.innerHTML = `
                    <img src="${imgPath}" alt="Imagine ${country.name}" 
                         onerror="this.onerror=null;this.src='images/default.jpg';" 
                         style="max-width:200px; margin-bottom:10px;">
                    <h2>${country.name}</h2>
                    <p>Populație: ${country.population}</p>
                `;

                // Buton detalii
                const infoBtn = document.createElement("button");
                infoBtn.textContent = "Detalii";
                infoBtn.addEventListener("click", () => showInfo(country.id, country.name, continentName));
                card.appendChild(infoBtn);

                // Buton ștergere
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Șterge";
                deleteBtn.addEventListener("click", () => deleteCountry(country.id, continentName));
                card.appendChild(deleteBtn);

                app.appendChild(card);

                // animație card
                setTimeout(() => card.classList.add("show"), 100 + index * 100);
            });

            // Form pentru adăugarea unei țări
            const form = document.createElement("form");
            form.innerHTML = `
                <h3>Adaugă Țară</h3>
                <input id="cName" placeholder="Nume" />
                <input id="cPopulation" placeholder="Populație" type="number" />
                <input id="cGdp" placeholder="PIB" type="number" />
                <button type="button" id="addCountryBtn">Adaugă</button>
            `;
            app.appendChild(form);

            document.getElementById("addCountryBtn")
                .addEventListener("click", () => addCountry(continentName));
        })
        .catch(err => {
            console.error("Eroare la încărcarea țărilor:", err);
            app.innerHTML = `<p>Nu se pot încărca țările. Verifică server-ul.</p>
                             <button onclick="showHome()">Înapoi</button>`;
        });
}
function addCountry(continentName) {
    const name = document.getElementById("cName").value.trim();
    const population = document.getElementById("cPopulation").value.trim();
    const gdp = document.getElementById("cGdp").value.trim();

    if (!name || !population || !gdp) {
        alert("Completează toate câmpurile!");
        return;
    }

    // STEP 1: Fetch all continents and find the right one
    fetch(`${API_URL}/continents`)
        .then(res => res.json())
        .then(continents => {
            const continent = continents.find(c =>
                c.name.toLowerCase() === continentName.toLowerCase()
            );

            if (!continent) {
                alert("Continentul nu a fost găsit în baza de date!");
                throw new Error("Continent not found");
            }

            const newCountry = {
                name: name,
                population: Number(population),
                gdp: Number(gdp),
                continent: { id: continent.id }
            };

            // STEP 2: Send POST request to create country
            return fetch(`${API_URL}/countries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCountry)
            });
        })
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
        .then(() => {
            alert("Țara a fost adăugată cu succes!");
            showCountries(continentName); // refresh page
        })
        .catch(err => {
            console.error("Eroare la adăugare:", err);
            alert("Nu s-a putut adăuga țara.");
        });
}



function deleteCountry(countryId, continentName) {
    if (!confirm("Sigur vrei să ștergi această țară?")) return;

    fetch(`${API_URL}/countries/${countryId}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
        })
        .then(() => {
            alert("Țara a fost ștearsă!");
            showCountries(continentName); // refresh page
        })
        .catch(err => {
            console.error("Eroare la ștergere:", err);
            alert("Nu s-a putut șterge țara.");
        });
}

