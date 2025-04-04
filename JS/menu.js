let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchMenu();
    document.getElementById("order-form").addEventListener("submit", submitOrder);
});

async function fetchMenu() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxoVAfSVZZkLi1P6Y7zr2aVZyOGE_Qemh77w2PimIGmEGUHw2_bev9XlX5IWHD38yX2bQ/exec?sheet= Menu");
        
        if (!response.ok) throw new Error(Error HTTP: ${response.status});
        
        const data = await response.json();
        renderMenu(data.data);
    } catch (error) {
        console.error("Error al obtener el menú:", error);
    }
}

function renderMenu(items) {
    console.log("Datos recibidos:", items);
    
    const menuContainer = document.getElementById("menu");
    menuContainer.innerHTML = ""; // Limpiar el menú antes de cargar los datos
    
    const categories = {};

    items.forEach((item) => {
        if (!categories[item.Plato]) {
            categories[item.Plato] = [];
        }
        categories[item.Plato].push(item);
    });

    for (const category in categories) {
        const section = document.createElement("div");
        section.classList.add("menu-section");
        section.id = category;

        const title = document.createElement("h2");
        title.textContent = 🍽️ ${category};
        section.appendChild(title);

        categories[category].forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card", "menu-item-container");

            const img = document.createElement("img");
            img.src = item.imagen || "placeholder.jpg";
            img.alt = item["Nombre "]; // Corregido el acceso a la clave con espacio
            img.classList.add("menu-image");

            const name = document.createElement("h2");
            name.className = "menu-name";
            name.textContent = item["Nombre "]; // Corregido el acceso a la clave con espacio

            const desc = document.createElement("p");
            desc.className = "overlay-text";
            desc.textContent = item.Descripcion;

            const price = document.createElement("p");
            price.className = "menu-price";
            price.textContent = $${parseFloat(item["Precio "]).toFixed(2)}; // Corregido el acceso a la clave con espacio

            const btn = document.createElement("button");
            btn.textContent = "Agregar al Carrito";
            btn.onclick = () => addToCart(item["Nombre "], parseFloat(item["Precio "]));

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(desc);
            card.appendChild(price);
            card.appendChild(btn);

            section.appendChild(card);
        });

        menuContainer.appendChild(section);
    }
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} agregado al carrito`);
}
