// Funciones del carrito de compras
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = ${item.name} - $${item.price.toFixed(2)};
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = Total: $${total.toFixed(2)};
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

// Función para realizar la compra
function purchaseCart() {
    if (cart.length === 0) {
        document.getElementById("purchase-summary").innerHTML = "<p>El carrito está vacío. No hay nada para comprar.</p>";
        return;
    }

    let summaryHTML = "<h2>Resumen de tu compra</h2><ul>";
    let total = 0;

    cart.forEach((item) => {
        summaryHTML += <li>${item.name} - $${item.price.toFixed(2)}</li>;
        total += item.price;
    });

    summaryHTML += </ul><p><strong>Total: $${total.toFixed(2)}</strong></p>;
    summaryHTML += <button onclick="closeSummary()">Cerrar</button>;

    document.getElementById("purchase-summary").innerHTML = summaryHTML;
    document.getElementById("purchase-summary").style.display = "block";
    document.getElementById("delivery-form").style.display = "block";
}

// Enviar pedido a la hoja "Pedidos" con POST
async function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (!name || !address || !phone) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const orderData = {
        nombre: name,
        telefono: phone,
        direccion: address,
        items: cart.map(item => ${item.name} (${item.price.toFixed(2)})).join(", "),
        total: cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    };

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxeYg6D1Rbe5udMH_1z5RS0Tv8c70skfWITrW7lFWsS-5Tzw0QK_xR09z6XjZA2RkudEg/exec?sheet=Pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
            mode: "no-cors"
        });
        
        if (!response.ok) throw new Error(Error HTTP: ${response.status});

        const result = await response.json();
        console.log("Pedido registrado:", result);

        showConfirmation(name, address, phone);
        clearCart();
    } catch (error) {
        console.error("Error enviando pedido:", error);
    }
}

// Mostrar confirmación de pedido
function showConfirmation(name, address, phone) {
    let confirmationHTML = `
        <h2>Pedido Confirmado</h2>
        <p>Gracias, <strong>${name}</strong>.</p>
        <p>Tu pedido será enviado a: <strong>${address}</strong></p>
        <p>Nos pondremos en contacto al <strong>${phone}</strong>.</p>
        <button onclick="closeConfirmation()">Cerrar</button>
    `;

    document.getElementById("order-confirmation").innerHTML = confirmationHTML;
    document.getElementById("order-confirmation").style.display = "flex";
    document.getElementById("delivery-form").style.display = "none";
    document.getElementById("order-form").reset();
}

// Funciones de cierre de resumen y confirmación
function closeConfirmation() {
    document.getElementById("order-confirmation").style.display = "none";
}

function closeSummary() {
    document.getElementById("purchase-summary").style.display = "none";
}