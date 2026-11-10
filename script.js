document.addEventListener("DOMContentLoaded", function() {
    const esLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    // 1. FORMULARIO
    const formulario = document.getElementById("miFormulario");
    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const tema = document.getElementById("tema").value;
            const mensaje = document.getElementById("mensaje").value.trim();
            const acepto = document.getElementById("acepto").checked;

            let errores = [];
            if (nombre === "") errores.push("El nombre es obligatorio.");
            if (email === "" || !email.includes("@")) errores.push("Ingresa un correo válido.");
            if (tema === "") errores.push("Debes seleccionar un tema.");
            if (mensaje === "") errores.push("El mensaje no puede estar vacío.");
            if (!acepto) errores.push("Debes aceptar los términos.");

            if (errores.length > 0) {
                alert("Errores:\n\n" + errores.join("\n"));
            } else {
                if (esLocal) {
                    const formData = new FormData(formulario);
                    fetch('guardar_mensaje.php', { method: 'POST', body: formData })
                    .then(response => response.text())
                    .then(data => {
                        alert("Servidor: " + data);
                        formulario.reset();
                    })
                    .catch(error => alert("Error al conectar con PHP. Revisa que XAMPP esté encendido."));
                } else {
                    alert("¡Enviado! (Modo GitHub)");
                    formulario.reset();
                }
            }
        });
    }

    // 2. TABLA DE MENSAJES
    const cuerpoTabla = document.getElementById("cuerpo-mensajes");
    const aviso = document.getElementById("aviso-mensajes");
    const tabla = document.getElementById("tabla-mensajes");

    if (cuerpoTabla) { 
        console.log("JS: Iniciando carga de tabla..."); 
        
        if (esLocal) {

            fetch('obtener_mensajes.php', { cache: 'no-store' })
                .then(response => {
                    if (!response.ok) throw new Error("Error HTTP: " + response.status);
                    return response.json();
                })
                .then(datos => {
                    if (datos.error) {
                        aviso.textContent = "Error de BD: " + datos.error;
                        aviso.style.color = "red";
                        return;
                    }

                    if (datos.length > 0) {
                        aviso.style.display = "none";
                        tabla.style.display = "table";
                        cuerpoTabla.innerHTML = ""; 
                        datos.forEach(msg => {
                            const fila = document.createElement("tr");
                            fila.innerHTML = `
                                <td>${msg.fecha}</td>
                                <td>${msg.nombre}</td>
                                <td>${msg.email}</td>
                                <td>${msg.tema}</td>
                                <td>${msg.mensaje}</td>
                            `;
                            cuerpoTabla.appendChild(fila);
                        });
                    } else {
                        aviso.textContent = "La base de datos está vacía. Envía un mensaje primero.";
                        aviso.style.color = "gray";
                    }
                })
        } else {
            aviso.textContent = "Los mensajes dinámicos solo se ven en localhost.";
        }
    }
});