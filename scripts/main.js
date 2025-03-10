document.addEventListener("DOMContentLoaded", () => {
    fetch("data/place.json")
        .then(Response => Response.json())
        .then(data => renderCities(data))
        .then(error => console.error("Error al cargar ciudades" , error));
});

//aqui renderizamos las card
function renderCities(cities) {
    const citiesContainer = document.querySelector(".cities");

    cities.forEach(city => {
        const cityCard = document.createElement("div");
        cityCard.classList.add("card");

        cityCard.innerHTML = `
        <img src="${city.img}" alt="${city.city}">
            <h2>${city.city}</h2>
            <p>${city.desc}</p>
            <p><strong>Precio base: $${city.price}</strong></p>
            <button onclick="selectCity(${city.id})">Ver más</button>
        `;

        citiesContainer.appendChild(cityCard);        
    });
}

//cuando hace clic en ver mas el ID se guardas en localStorage
function selectCity(cityId){
    localStorage.setItem("selectedCity", cityId);
    window.location.href = "detalle.html";
}