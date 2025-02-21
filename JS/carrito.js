document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById('carrito-items');
    const totalPago = document.getElementById('total-pago');

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach((producto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio * producto.cantidad}</td>
                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
            `;
            carritoItems.appendChild(row);
            total += producto.precio * producto.cantidad;
        });
        totalPago.textContent = total.toFixed(2);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(producto) {
        const index = carrito.findIndex(item => item.nombre === producto.nombre);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push(producto);
        }
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            const producto = {
                nombre: e.target.dataset.nombre,
                precio: parseFloat(e.target.dataset.precio),
                cantidad: 1
            };
            agregarAlCarrito(producto);
        }

        if (e.target.classList.contains('btn-eliminar')) {
            const index = e.target.dataset.index;
            eliminarDelCarrito(index);
        }

        if (e.target.classList.contains('btn-comprar')) {
            alert('Compra finalizada');
            carrito.length = 0;
            actualizarCarrito();
        }
    });

    actualizarCarrito();
});