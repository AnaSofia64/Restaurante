document.addEventListener("DOMContentLoaded", () => {
    const carritoTabla = document.getElementById("cart-items");
    const totalPrecio = document.getElementById("total-price");
    const botonVaciar = document.getElementById("vaciar-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para mostrar los productos en la tabla
    function actualizarCarrito() {
        carritoTabla.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button class="eliminar-item" data-index="${index}">❌</button></td>
            `;
            carritoTabla.appendChild(fila);
            total += producto.precio * producto.cantidad;
        });

        totalPrecio.textContent = total.toFixed(2);
    }

    // Eliminar un producto del carrito
    carritoTabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar-item")) {
            let index = e.target.getAttribute("data-index");
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }
    });

    // Vaciar todo el carrito
    botonVaciar.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    });

    actualizarCarrito();
});
