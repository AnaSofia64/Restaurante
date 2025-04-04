document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu-items");
    const category = menuContainer.getAttribute("data-category"); // Obtiene la categoría de la página actual
    const googleSheetsUrl = "https://script.google.com/macros/s/AKfycbyPOOnPfOflIV7WYqm-N9OkLjsx6QwY-FrtX8vm1dFvPPkRZKbfKtYuvSHdFKL8CpjUfw/exec";

    fetch(googleSheetsUrl)
        .then(response => response.json())
        .then(data => {
            const filteredItems = data.filter(item => item.Categoria.toLowerCase() === category.toLowerCase());
            menuContainer.innerHTML = ""; // Limpia el contenido antes de agregar los datos

            filteredItems.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
                    <img src="${item.Imagen}" alt="${item.Nombre}">
                    <h3>${item.Nombre}</h3>
                    <p>${item.Descripcion}</p>
                    <span class="price">$${item.Precio}</span>
                    <button class="add-to-cart" data-name="${item.Nombre}" data-price="${item.Precio}">Agregar</button>
                `;
                menuContainer.appendChild(menuItem);
            });

            // Agregar eventos a los botones de agregar al carrito
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    addToCart(this.dataset.name, this.dataset.price);
                });
            });
        })
        .catch(error => console.error("Error al obtener datos:", error));
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} agregado al carrito`);
}
