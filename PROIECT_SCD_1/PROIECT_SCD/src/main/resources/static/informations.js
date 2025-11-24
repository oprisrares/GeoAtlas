function showInfo(countryId, countryName, continentName) {
    if (!countryId) return;

    fetch(`${API_URL}/informations/country/${countryId}`)
        .then(res => res.ok ? res.json() : Promise.reject("HTTP " + res.status))
        .then(data => {
            const info = Array.isArray(data) ? data[0] : data;
            const app = document.getElementById("content");

            const imgPath = `images/${countryName.toLowerCase()}.jpg`;

            if (!info) {
                app.innerHTML = `
                    <div class="info-background" style="background-image: url('${imgPath}')">
                        <div class="info-card">
                            <h2>${countryName}</h2>
                            <p>Nu există detalii pentru această țară.</p>
                            <button onclick="showAddDetailsForm(${countryId}, '${countryName}', '${continentName}')">
                                Adaugă detalii
                            </button>
                            <button onclick="showCountries('${continentName}')">⟵ Înapoi</button>
                        </div>
                    </div>
                `;
                return;
            }

            app.innerHTML = `
                <div class="info-background" style="background-image: url('${imgPath}')">
                    <div class="info-card">
                        <h2>${countryName}</h2>
                        <p><strong>PIB:</strong> ${info.gdp ?? 'N/A'}</p>
                        <p><strong>Densitate:</strong> ${info.density ?? 'N/A'}</p>
                        <p><strong>Industrie principală:</strong> ${info.mainIndustry ?? 'N/A'}</p>
                        <p><strong>Tip teren:</strong> ${info.terrainType ?? 'N/A'}</p>
                        <p><strong>Rată urbanizare:</strong> ${info.urbanRate ?? 'N/A'}%</p>
                        <button onclick="showCountries('${continentName}')">⟵ Înapoi</button>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error("Eroare info:", err);
            const app = document.getElementById("content");
            app.innerHTML = `
                <p>Eroare la încărcarea informațiilor.</p>
                <button onclick="showCountries('${continentName ?? ''}')">Înapoi</button>
            `;
        });
}



function showAddDetailsForm(countryId, countryName, continentName) {
    const app = document.getElementById("content");

    app.innerHTML = `
        <div class="info-card">
            <h2>${countryName}</h2>
            <p>Nu există detalii pentru această țară.</p>
            <h3>Adaugă Detalii</h3>
            <input id="gdp" placeholder="PIB" type="number" />
            <input id="density" placeholder="Densitate" type="number" />
            <input id="mainIndustry" placeholder="Industrie principală" />
            <input id="terrainType" placeholder="Tip teren" />
            <input id="urbanRate" placeholder="Rată urbanizare (%)" type="number" />
            <button id="saveDetailsBtn">Salvează detalii</button>
            <button onclick="showCountries('${continentName}')">⟵ Înapoi</button>
        </div>
    `;

    document.getElementById("saveDetailsBtn").addEventListener("click", () => {
        const details = {
            gdp: document.getElementById("gdp").value,
            density: document.getElementById("density").value,
            mainIndustry: document.getElementById("mainIndustry").value,
            terrainType: document.getElementById("terrainType").value,
            urbanRate: document.getElementById("urbanRate").value
        };

        // Trimite către backend
        fetch(`${API_URL}/informations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                country: { id: countryId },
                ...details
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then(() => {
                // După salvare, afișăm noile detalii
                showInfo(countryId, countryName, continentName);
            })
            .catch(err => {
                console.error("Eroare la salvarea detaliilor:", err);
                alert("Nu s-au putut salva detaliile. Verifică server-ul.");
            });
    });
}
