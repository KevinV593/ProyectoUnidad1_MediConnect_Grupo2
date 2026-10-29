
"use strict";

/* =========================================================
   MEDICONNECT
   Reagendamiento de citas médicas
   Flujo: notificación → horarios → resumen → confirmación
   ========================================================= */


/* =========================================================
   1. REFERENCIAS A LAS PANTALLAS
   ========================================================= */

const pantallaNotificacion = document.getElementById(
    "pantalla-notificacion"
);

const pantallaHorarios = document.getElementById(
    "pantalla-horarios"
);

const pantallaResumen = document.getElementById(
    "pantalla-resumen"
);

const pantallaConfirmacion = document.getElementById(
    "pantalla-confirmacion"
);

const pantallas = [
    pantallaNotificacion,
    pantallaHorarios,
    pantallaResumen,
    pantallaConfirmacion
];


/* =========================================================
   2. REFERENCIAS A LOS BOTONES
   ========================================================= */

const btnVerCitas = document.getElementById("btn-ver-citas");

const btnElegirHorario = document.getElementById(
    "btn-elegir-horario"
);

const btnVolverNotificacion = document.getElementById(
    "btn-volver-notificacion"
);

const btnCancelarSeleccion = document.getElementById(
    "btn-cancelar-seleccion"
);

const btnContinuarHorario = document.getElementById(
    "btn-continuar-horario"
);

const btnVolverHorarios = document.getElementById(
    "btn-volver-horarios"
);

const btnConfirmarReagendamiento = document.getElementById(
    "btn-confirmar-reagendamiento"
);

const btnFinalizarReagendamiento = document.getElementById(
    "btn-finalizar-reagendamiento"
);


/* =========================================================
   3. REFERENCIAS A LOS ELEMENTOS DE SELECCIÓN
   ========================================================= */

const opcionesFecha = document.querySelectorAll(".opcion-fecha");

const opcionesHora = document.querySelectorAll(".opcion-hora");

const mensajeSeleccion = document.getElementById(
    "mensaje-seleccion"
);


/* =========================================================
   4. ESTADO DE LA SELECCIÓN
   Conserva la fecha y hora elegidas por el paciente.
   ========================================================= */

const seleccion = {
    fecha: null,
    hora: null
};


/* =========================================================
   5. NAVEGACIÓN ENTRE LAS CUATRO PANTALLAS
   ========================================================= */

/**
 * Muestra una pantalla y oculta las demás.
 *
 * @param {string} idPantalla Identificador HTML de la pantalla.
 */
function mostrarPantalla(idPantalla) {
    const pantallaDestino = pantallas.find(
        (pantalla) => pantalla.id === idPantalla
    );

    if (!pantallaDestino) {
        console.error(
            `No se encontró la pantalla: ${idPantalla}`
        );
        return;
    }

    pantallas.forEach((pantalla) => {
        pantalla.hidden = pantalla !== pantallaDestino;
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/**
 * Abre la pantalla de selección de fecha y hora.
 */
function abrirSeleccionHorarios() {
    mostrarPantalla("pantalla-horarios");

    actualizarMensaje(
        "Selecciona una fecha para consultar los horarios disponibles."
    );
}


/**
 * Regresa a la notificación de cancelación.
 */
function regresarNotificacion() {
    mostrarPantalla("pantalla-notificacion");
}


/* =========================================================
   6. FORMATO DE FECHAS
   ========================================================= */

/**
 * Convierte una fecha ISO (AAAA-MM-DD) en una fecha legible.
 *
 * @param {string} fechaISO
 * @returns {string}
 */
function formatearFecha(fechaISO) {
    if (!fechaISO) {
        return "Fecha no seleccionada";
    }

    const [anio, mes, dia] = fechaISO.split("-").map(Number);

    const fecha = new Date(
        Date.UTC(anio, mes - 1, dia)
    );

    const texto = new Intl.DateTimeFormat("es-EC", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(fecha);

    return texto.charAt(0).toLocaleUpperCase("es-EC")
        + texto.slice(1);
}


/* =========================================================
   7. SELECCIÓN DE FECHA
   ========================================================= */

/**
 * Guarda la fecha elegida y reinicia la selección de hora.
 *
 * @param {HTMLButtonElement} boton
 */
function seleccionarFecha(boton) {
    const nuevaFecha = boton.dataset.fecha;

    if (!nuevaFecha) {
        return;
    }

    seleccion.fecha = nuevaFecha;
    seleccion.hora = null;

    // Actualizar el aspecto de las fechas.
    opcionesFecha.forEach((opcion) => {
        const estaSeleccionada = opcion === boton;

        opcion.classList.toggle(
            "seleccionada",
            estaSeleccionada
        );

        opcion.setAttribute(
            "aria-pressed",
            String(estaSeleccionada)
        );
    });

    // Limpiar la hora anterior y habilitar las disponibles.
    opcionesHora.forEach((opcion) => {
        const estaDisponible = opcion.classList.contains(
            "disponible"
        );

        opcion.disabled = !estaDisponible;

        opcion.classList.remove("seleccionada");

        opcion.setAttribute("aria-pressed", "false");
    });

    actualizarMensaje(
        `Has seleccionado el ${formatearFecha(nuevaFecha)}. ` +
        "Ahora elige uno de los horarios disponibles."
    );

    actualizarBotonContinuar();
}


/* =========================================================
   8. SELECCIÓN DE HORA
   ========================================================= */

/**
 * Guarda la hora elegida si está disponible.
 *
 * @param {HTMLButtonElement} boton
 */
function seleccionarHora(boton) {
    if (!seleccion.fecha) {
        actualizarMensaje(
            "Primero selecciona una fecha para consultar los horarios."
        );
        return;
    }

    if (
        boton.disabled ||
        !boton.classList.contains("disponible")
    ) {
        return;
    }

    const nuevaHora = boton.dataset.hora;

    if (!nuevaHora) {
        return;
    }

    seleccion.hora = nuevaHora;

    // Marcar visualmente la hora elegida.
    opcionesHora.forEach((opcion) => {
        const estaSeleccionada = opcion === boton;

        opcion.classList.toggle(
            "seleccionada",
            estaSeleccionada
        );

        opcion.setAttribute(
            "aria-pressed",
            String(estaSeleccionada)
        );
    });

    actualizarMensaje(
        `Has seleccionado el ${formatearFecha(seleccion.fecha)} ` +
        `a las ${seleccion.hora}.`
    );

    actualizarBotonContinuar();
}


/* =========================================================
   9. VALIDACIÓN DEL BOTÓN CONTINUAR
   ========================================================= */

/**
 * Solo permite continuar cuando hay fecha y hora.
 */
function actualizarBotonContinuar() {
    const seleccionCompleta = Boolean(
        seleccion.fecha && seleccion.hora
    );

    btnContinuarHorario.disabled = !seleccionCompleta;
}


/**
 * Pasa al resumen del reagendamiento.
 */
function continuarConSeleccion() {
    if (!seleccion.fecha || !seleccion.hora) {
        actualizarMensaje(
            "Selecciona una fecha y un horario disponible para continuar."
        );
        return;
    }

    // Preparar los datos antes de abrir el resumen.
    actualizarResumen();

    mostrarPantalla("pantalla-resumen");
}


/* =========================================================
   10. ACTUALIZAR LOS DATOS DEL RESUMEN
   ========================================================= */

/**
 * Muestra la selección del paciente en el resumen
 * y reutiliza esos datos en la pantalla de confirmación.
 */
function actualizarResumen() {
    const fechaTexto = formatearFecha(seleccion.fecha);
    const horaTexto = seleccion.hora;

    document.getElementById("resumen-fecha").textContent =
        fechaTexto;

    document.getElementById("resumen-hora").textContent =
        `${horaTexto} (Duración: 45 min)`;

    document.getElementById("confirmacion-fecha").textContent =
        fechaTexto;

    document.getElementById("confirmacion-hora").textContent =
        horaTexto;
}


/* =========================================================
   11. MENSAJES DE LA PANTALLA DE HORARIOS
   ========================================================= */

/**
 * Actualiza el mensaje que informa al paciente.
 *
 * @param {string} texto
 */
function actualizarMensaje(texto) {
    mensajeSeleccion.textContent = texto;
}


/* =========================================================
   12. VOLVER DEL RESUMEN A LOS HORARIOS
   ========================================================= */

/**
 * Regresa a los horarios conservando la selección actual.
 */
function volverAHorarios() {
    mostrarPantalla("pantalla-horarios");
}


/* =========================================================
   13. CONFIRMAR EL REAGENDAMIENTO
   ========================================================= */

/**
 * Muestra la pantalla de éxito del prototipo.
 *
 * Nota: no registra datos en un servidor ni envía correos.
 */
function confirmarReagendamiento() {
    if (!seleccion.fecha || !seleccion.hora) {
        mostrarPantalla("pantalla-horarios");

        actualizarMensaje(
            "Debes elegir una fecha y una hora antes de confirmar."
        );

        return;
    }

    actualizarResumen();

    mostrarPantalla("pantalla-confirmacion");
}


/* =========================================================
   14. BOTÓN VER MIS CITAS
   ========================================================= */

/**
 * La pantalla de Mis citas todavía no está implementada.
 */
function mostrarAvisoMisCitas() {
    window.alert(
        "La pantalla Mis citas todavía no está implementada " +
        "en este prototipo."
    );
}


/* =========================================================
   15. REGISTRO DE EVENTOS
   Aquí se conectan las funciones con los botones HTML.
   ========================================================= */

// Desde la notificación hasta los horarios.
btnElegirHorario.addEventListener(
    "click",
    abrirSeleccionHorarios
);

// Aviso provisional para Mis citas.
btnVerCitas.addEventListener(
    "click",
    mostrarAvisoMisCitas
);

// Volver a la notificación.
btnVolverNotificacion.addEventListener(
    "click",
    regresarNotificacion
);

btnCancelarSeleccion.addEventListener(
    "click",
    regresarNotificacion
);

// Seleccionar una fecha.
opcionesFecha.forEach((boton) => {
    boton.addEventListener("click", () => {
        seleccionarFecha(boton);
    });
});

// Seleccionar una hora.
opcionesHora.forEach((boton) => {
    boton.addEventListener("click", () => {
        seleccionarHora(boton);
    });
});

// Pasar de horarios al resumen.
btnContinuarHorario.addEventListener(
    "click",
    continuarConSeleccion
);

// Volver del resumen a los horarios.
btnVolverHorarios.addEventListener(
    "click",
    volverAHorarios
);

// Confirmar y mostrar el mensaje de éxito.
btnConfirmarReagendamiento.addEventListener(
    "click",
    confirmarReagendamiento
);

// Acción provisional para volver a Mis citas.
btnFinalizarReagendamiento.addEventListener(
    "click",
    mostrarAvisoMisCitas
);


/* =========================================================
   16. ESTADO INICIAL
   ========================================================= */

// El botón Continuar comienza deshabilitado.
actualizarBotonContinuar();

// Mostrar inicialmente la notificación.
mostrarPantalla("pantalla-notificacion");
