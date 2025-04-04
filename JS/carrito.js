function enviarPedido() {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

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
            setTimeout(() => window.location.reload(), 2000);
        }
    })
    .catch(error => {
        console.error("Error al enviar pedido:", error);
        mostrarModal("❌ Error", "Hubo un problema al enviar tu pedido. Inténtalo de nuevo.");
    });
}

// Agregar evento al botón
function enviarPedido() {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

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
            setTimeout(() => window.location.reload(), 2000);
        }
    })
    .catch(error => {
        console.error("Error al enviar pedido:", error);
        mostrarModal("❌ Error", "Hubo un problema al enviar tu pedido. Inténtalo de nuevo.");
    });
}
