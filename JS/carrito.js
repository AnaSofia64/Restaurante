document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".add-to-cart");
    const botonVerCarrito = document.querySelector(".view-cart");
    const botonHacerCompra = document.getElementById("hacer-compra");

    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        // Verificar si el producto ya está en el carrito
        let productoExistente = carrito.find(producto => producto.nombre === nombre);
        
        if (productoExistente) {
            productoExistente.cantidad += 1; // Si existe, aumenta la cantidad
        } else {
            carrito.push({ nombre, precio, cantidad: 1 }); // Si no existe, lo agrega
        }

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${nombre} ha sido agregado al carrito 🛒`);
    }

    // Agregar evento a todos los botones de "Agregar al Carrito"
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-name");
            const precio = parseFloat(boton.getAttribute("data-price"));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Redirigir a la página del carrito al hacer clic en "Ver Carrito"
    if (botonVerCarrito) {
        botonVerCarrito.addEventListener("click", () => {
            window.location.href = "carrito.html";
        });
    }

    // Procesar la compra al hacer clic en "Hacer Compra"
    if (botonHacerCompra) {
        botonHacerCompra.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío. Agrega productos antes de hacer la compra.");
                return;
            }

            // Aquí puedes agregar la lógica para procesar la compra, por ejemplo, enviar los datos a un servidor
            alert("Compra realizada con éxito. ¡Gracias por tu compra!");

            // Vaciar el carrito después de la compra
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            window.location.href = "PaginaPrincipal.html"; // Redirigir a la página principal o a una página de confirmación
        });
    }
});