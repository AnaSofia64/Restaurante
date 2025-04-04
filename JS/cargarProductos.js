document.addEventListener("DOMContentLoaded", () => {
    const categoria = document.currentScript.getAttribute("data-categoria");

    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhecoVUmx0qX6r_nnaKmxlHl43TktqUE_8KYYOCO2GaCSSzEfiDfPugoDDd0FVtW_q-hMI2EBUHHObU6HLClXHCcc3lrvhqngf4I6xeCgAriq7xM4Li4RwsjgGiEVPl5Icg-mMr-UKvcPjRJ0RoJzNdZEAIYbyTlU-8nu7DkCqiX0g_opqczZ_QO9C9o3WHXVBWXWDJ69S9xXZRNxPy9ejwa4Pg8KudqJNPbP90l0hgKGd3-jCHSv5OCP6hosPtvSTxSRRj_S_8mQSu1r87OZ3VbKnMngMNdYI57Oyb&lib=MrKbA4NRqFMdJIit5cDsRHAtV4n4glF8-")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("productos");

        const filtrados = data.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());

        if (filtrados.length === 0) {
            contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        filtrados.forEach(producto => {
            const div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button class="add-to-cart" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
            `;
            contenedor.appendChild(div);
        });
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });
});
