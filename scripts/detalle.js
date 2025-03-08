document.addEventListener("DOMContentLoaded", () => {
    const cityId = localStorage.getItem("selectedCity");

    if (!cityId) {
        alert("No se ha seleccionado una ciudad. Redirigiendo al inicio...");
        window.location.href = "index.html";
        return;
    }

    fetch("data/place.json")
        .then(response => response.json())
        .then(data => {
            const city = data.find(item => item.id == cityId);
            if (city) {
                renderCityDetails(city);
            } else {
                alert("Error cargando los datos de la ciudad.");
                window.location.href = "index.html";
            }
        })
        .catch(error => console.error("Error al cargar la ciudad:", error));
});

function renderCityDetails(city) {
    const cityInfo = document.querySelector(".city-info"); //esto es en el section RECORDA

    cityInfo.innerHTML = `
        <h2>${city.city}</h2>
        <img src="${city.img}" alt="${city.city}">
        <p>${city.desc}</p>
        <br></br>
        <h3>Precio base: $${city.price}</h3>
        <br></br>
        <h3>Hoteles disponibles:</h3>
        <select id="hotel-select">
            ${city.hotels.map(hotel => `<option value="${hotel.price}">${hotel.name} - $${hotel.price} por noche</option>`).join("")}
        </select>
    `;

    setupCalculator(city);
}

function setupCalculator(city) {
    const personsInput = document.getElementById("persons"); //input
    const nightsInput = document.getElementById("nights"); //input
    const hotelSelect = document.getElementById("hotel-select"); //HOTEL que elige
    const totalPriceEl = document.getElementById("total-price");
    const continueBtn = document.getElementById("continue");

    function calculateTotal() {
        const persons = parseInt(personsInput.value) || 1;
        const nights = parseInt(nightsInput.value) || 1;
        const hotelPrice = parseInt(hotelSelect.value) || 0;
        const total = (city.price + (nights * hotelPrice)) * persons;
        totalPriceEl.textContent = total;
    }

    personsInput.addEventListener("input", calculateTotal); // calcula total con cada cambio
    nightsInput.addEventListener("input", calculateTotal);  // calcula total con cada cambio
    hotelSelect.addEventListener("change", calculateTotal);   // calcula total con cada cambio
    calculateTotal();

    continueBtn.addEventListener("click", () => {
        const reservation = {
            city: city.city,
            priceBase: city.price,
            hotel: hotelSelect.options[hotelSelect.selectedIndex].text,
            hotelPrice: parseInt(hotelSelect.value),
            persons: parseInt(personsInput.value),
            nights: parseInt(nightsInput.value),
            total: parseInt(totalPriceEl.textContent)
        };

        localStorage.setItem("reservation", JSON.stringify(reservation));
        window.location.href = "resumen.html";
    });
}
