// ========================================
// MediConnect: interacciones del médico
// Prototipo académico con datos simulados
// ========================================

const tarjetaCarlos = document.getElementById("cita-carlos");
const botonCancelar = document.getElementById("boton-cancelar-carlos");

const fondoModal = document.getElementById("fondo-modal");
const botonCerrarModal = document.getElementById("cerrar-modal");
const botonVolver = document.getElementById("boton-volver");
const botonConfirmar = document.getElementById("boton-confirmar");
const tipoCancelacion = document.getElementById("tipo-cancelacion");
const errorModal = document.getElementById("error-modal");

const estadoCarlos = document.getElementById("estado-carlos");
const mensajeCarlos = document.getElementById("mensaje-carlos");
const accionesCarlos = document.getElementById("acciones-carlos");

const avisoGlobal = document.getElementById("aviso-global");
const tituloAviso = document.getElementById("titulo-aviso");
const textoAviso = document.getElementById("texto-aviso");
const cerrarAviso = document.getElementById("cerrar-aviso");

let citaEnProceso = false;

// Abre el modal de confirmación.
function abrirModal() {
    if (citaEnProceso) {
        return;
    }

    fondoModal.hidden = false;
    errorModal.hidden = true;
    document.body.style.overflow = "hidden";
    botonCerrarModal.focus();
}

// Cierra el modal sin realizar cambios.
function cerrarModal() {
    fondoModal.hidden = true;
    document.body.style.overflow = "";

    if (!citaEnProceso) {
        botonCancelar.focus();
    }
}

// Muestra un aviso visual dentro de la demostración.
function mostrarAviso(titulo, mensaje) {
    tituloAviso.textContent = titulo;
    textoAviso.textContent = mensaje;
    avisoGlobal.hidden = false;
}

// Confirma la cancelación y cambia el estado de la cita.
function confirmarCancelacion() {
    const motivo = tipoCancelacion.value;

    if (!motivo) {
        errorModal.hidden = false;
        return;
    }

    if (citaEnProceso) {
        return;
    }

    citaEnProceso = true;

    // Cambiar la tarjeta al estilo deshabilitado de Figma.
    tarjetaCarlos.classList.add("reprogramacion-en-curso");

    estadoCarlos.textContent = "Reprogramación en curso";

    mensajeCarlos.replaceChildren();

    const punto = document.createElement("span");
    punto.className = "punto-estado";

    const textoEstado = document.createElement("span");
    textoEstado.textContent =
        "Cita afectada por " + motivo.toLowerCase() +
        ". Se está gestionando la reprogramación.";

    mensajeCarlos.append(punto, textoEstado);

    // Deshabilitar las acciones de esta cita.
    const botones = accionesCarlos.querySelectorAll("button");

    botones.forEach((boton) => {
        boton.disabled = true;
    });

    // Cerrar el modal y mostrar la confirmación simulada.
    cerrarModal();

    mostrarAviso(
        "Cancelación confirmada",
        "La cita de Carlos Mendoza quedó marcada para reprogramación. " +
        "En esta demostración se simula que el paciente recibió una notificación."
    );
}

// Eventos de interacción.
botonCancelar.addEventListener("click", abrirModal);

botonCerrarModal.addEventListener("click", cerrarModal);
botonVolver.addEventListener("click", cerrarModal);

botonConfirmar.addEventListener("click", confirmarCancelacion);

cerrarAviso.addEventListener("click", () => {
    avisoGlobal.hidden = true;
});

// Cerrar el modal al hacer clic fuera de su contenido.
fondoModal.addEventListener("click", (evento) => {
    if (evento.target === fondoModal) {
        cerrarModal();
    }
});

// Permitir cerrar el modal con Escape.
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !fondoModal.hidden) {
        cerrarModal();
    }
});