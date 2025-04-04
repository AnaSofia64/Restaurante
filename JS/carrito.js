document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
    document.getElementById("hacer-compra").addEventListener("click", enviarPedido);
});

// 📌 Mostrar productos del carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let tablaCarrito = document.getElementById("cart-items");
    let totalPrecio = 0;

    tablaCarrito.innerHTML = ""; // Limpiar tabla

    carrito.forEach((item, index) => {
        let fila = document.createElement("tr");
        let totalProducto = item.precio * item.cantidad;
        totalPrecio += totalProducto;

        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" data-index="${index}" class="cantidad-input">
            </td>
            <td>$${totalProducto.toFixed(2)}</td>
            <td><button class="eliminar-btn" data-index="${index}">❌</button></td>
        `;

        tablaCarrito.appendChild(fila);
    });

    document.getElementById("total-price").textContent = totalPrecio.toFixed(2);

    // Eventos para actualizar o eliminar
    document.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("change", actualizarCantidad);
    });

    document.querySelectorAll(".eliminar-btn").forEach(btn => {
        btn.addEventListener("click", eliminarProducto);
    });
}

// 📌 Actualizar cantidad
function actualizarCantidad(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let index = event.target.dataset.index;
    let nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad < 1) {
        nuevaCantidad = 1;
        event.target.value = 1;
    }

    carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// 📌 Eliminar producto
function eliminarProducto(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let index = event.target.dataset.index;
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// 📌 Vaciar carrito completo
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// 📌 Enviar pedido o redirigir a formulario
function enviarPedido() {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const direccionInput = document.getElementById("direccion");

    // Si los campos no existen, redirigir a la página de pedido
    if (!nombreInput || !telefonoInput || !direccionInput) {
        console.warn("Campos de cliente no encontrados. Redirigiendo a página de pedido...");
        window.location.href = "Pedidos.html";
        return;
    }

    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const direccion = direccionInput.value.trim();

    if (!nombre || !telefono || !direccion) {
        mostrarModal("⚠️ Error", "Por favor, complete todos los campos del cliente.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        mostrarModal("⚠️ Carrito Vacío", "No hay productos en el carrito.");
        return;
    }

    const pedido = {
        nombre,
        telefono,
        direccion,
        pedido: carrito,
        total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    };

    fetch("TU_URL_DEL_GOOGLE_APPS_SCRIPT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            mostrarModal("✅ Pedido Exitoso", "Tu pedido ha sido enviado con éxito.");

            localStorage.removeItem("carrito");
            document.getElementById("cart-items").innerHTML = "";
            document.getElementById("total-price").textContent = "0.00";

            setTimeout(() => window.location.href = "Pedidos.html", 2000);
        }
    })
    .catch(error => {
        console.error("Error al enviar pedido:", error);
        mostrarModal("❌ Error", "Hubo un problema al enviar tu pedido. Inténtalo de nuevo.");
    });
}

// 📌 Modal para mostrar mensajes
function mostrarModal(titulo, mensaje) {
    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-texto").textContent = mensaje;
    document.getElementById("modal-mensaje").style.display = "flex";
}

// 📌 Cerrar modal
function cerrarModal() {
    document.getElementById("modal-mensaje").style.display = "none";
}