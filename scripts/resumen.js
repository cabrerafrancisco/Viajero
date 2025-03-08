document.addEventListener("DOMContentLoaded", ()=> {
    const reservation = JSON.parse(localStorage.getItem("reservation"));

    if(!reservation){
        alert("No hay ninugna reserva guardada, seras redirigido al inicio...");
        window.location.href = "index.html";
        return;
    }

    renderSummary(reservation);
});

function renderSummary(reservation) {
    const summarySection = document.querySelector(".summary");

    summarySection.innerHTML = `
        <h2>Destino: ${reservation.city}</h2>
        <p><strong>Hotel:</strong> ${reservation.hotel}</p>
        <p><strong>Personas:</strong> ${reservation.persons}</p>
        <p><strong>Noches:</strong> ${reservation.nights}</p>
        <h3>Total a pagar: $${reservation.total}</h3>
    `;
}

//boton cancelar reserva
document.getElementById("cancel").addEventListener("click" , () => {
    localStorage.removeItem("reservation");
    alert("Reserva cancelada...");
    window.location.href = "index.html";
})

//formulario usuario
document.getElementById("user-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Reserva confimada!! Gracias por elegirnos para tu viaje");
    localStorage.clear();
    window.location.href = "index.html";
});
