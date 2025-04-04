document.addEventListener("DOMContentLoaded", () => {
    fetchMenu();
});

async function fetchMenu() {
    try {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi9Dj5IvkxpcLM8zX2crbzttt5Wcqv3bXO8ng91iNFRKDKvbf7u-kdif_1Sxt5HvD4oLavhPkH0zTHavhawgRJ6jbGicakmQH8IKmt1jqAc02TkeikbO0RGntvAN5MNYe-IOZiWswiNAmC16olMBsA0xKeFQmjEoJoHXs5wQ69HektYs2JqroBkfdXkUfzhx9bSS1M02a-SvS9pwnS8zqqv-OO-Y1wr7lY7mBRKg_TuX82XAHVTzzD-YwGUCG79hgkJgWH7TI4nnB0hqIfvSWee1Q3psg5irOb2Ik9REE4e8pYeSxM&lib=MrKbA4NRqFMdJIit5cDsRHAtV4n4glF8-");

        if (!response.ok) throw new Error(⁠ Error HTTP: ${response.status} ⁠);

        const data = await response.json();

        console.log("📦 Respuesta completa:", data);
        console.log("📄 Datos:", data.data);

        renderMenu(data.data); // Ajustar esto si necesitas cambiar el nombre del campo
    } catch (error) {
        console.error("❌ Error al obtener el menú:", error);
    }
}


function renderMenu(items) {
    console.log("Datos recibidos:", items);

    items.forEach(item => {
        const categoria = item.Categoria?.toLowerCase().trim(); // ejemplo: "Entrada"
        const nombre = item.Nombre?.trim();
        const precio = parseFloat(item.Precio);
        const descripcion = item["Descripción"]?.trim();
        const imagen = item.Imagen || "placeholder.jpg";

        // Mapea la categoría al data-category del HTML
        let categoriaId = "";
        if (categoria.includes("entrada")) categoriaId = "entrada";
        else if (categoria.includes("plato")) categoriaId = "plato-fuerte";
        else if (categoria.includes("postre")) categoriaId = "postre";
        else if (categoria.includes("bebida")) categoriaId = "bebida";
        else return; // Si no se reconoce, no lo muestra

        const container = document.querySelector(⁠ .menu-items[data-category="${categoriaId}"] ⁠);
        if (!container) return;

        // Crear la tarjeta del producto
        const card = document.createElement("div");
        card.classList.add("menu-item");

        card.innerHTML = `
            <img src="${imagen}" alt="${nombre}" class="menu-image">
            <h4 class="menu-name">${nombre}</h4>
            <p class="menu-description">${descripcion}</p>
            <p class="menu-price">$${precio.toFixed(2)}</p>
            <button onclick="addToCart('${nombre}', ${precio})">Agregar al Carrito</button>
        `;

        container.appendChild(card);
    });
}

// Función de carrito (puedes moverla a carrito.js si lo prefieres)
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(⁠ ${name} agregado al carrito ⁠);
}