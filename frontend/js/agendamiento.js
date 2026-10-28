
/* ========================================
   DATOS DE EJEMPLO
   ======================================== */

const medicos = [
    {
        nombre: "Dra. María Fernández",
        especialidad: "Pediatría",
        calificacion: 4.9,
        foto: "https://randomuser.me/api/portraits/women/44.jpg",
        modalidades: ["Presencial", "Virtual"]
    },
    {
        nombre: "Dr. Carlos Mendoza",
        especialidad: "Pediatría",
        calificacion: 4.8,
        foto: "https://randomuser.me/api/portraits/men/32.jpg",
        modalidades: ["Presencial"]
    },
    {
        nombre: "Dra. Andrea Torres",
        especialidad: "Cardiología",
        calificacion: 4.9,
        foto: "https://randomuser.me/api/portraits/women/68.jpg",
        modalidades: ["Presencial", "Virtual"]
    },
    {
        nombre: "Dr. Daniel Castro",
        especialidad: "Dermatología",
        calificacion: 4.7,
        foto: "https://randomuser.me/api/portraits/men/46.jpg",
        modalidades: ["Virtual"]
    },
    {
        nombre: "Dra. Sofía Ramírez",
        especialidad: "Medicina general",
        calificacion: 4.8,
        foto: "https://randomuser.me/api/portraits/women/65.jpg",
        modalidades: ["Presencial", "Virtual"]
    }
];


/* ========================================
   ELEMENTOS HTML
   ======================================== */

const formulario = document.getElementById("formulario-busqueda");
const selector = document.getElementById("especialidad");

const botonesModalidad = document.querySelectorAll(".boton-modalidad");

const listaMedicos = document.getElementById("lista-medicos");
const sinResultados = document.getElementById("sin-resultados");
const mensajeInicial = document.getElementById("mensaje-inicial");
const cantidadMedicos = document.getElementById("cantidad-medicos");
const mensajeValidacion = document.getElementById("mensaje-validacion");

let modalidadSeleccionada = "Presencial";


/* ========================================
   SELECCIÓN DE MODALIDAD
   ======================================== */

botonesModalidad.forEach(function (boton) {

    boton.addEventListener("click", function () {

        modalidadSeleccionada = boton.dataset.modalidad;

        botonesModalidad.forEach(function (otroBoton) {
            otroBoton.classList.remove("activo");
            otroBoton.setAttribute("aria-pressed", "false");
        });

        boton.classList.add("activo");
        boton.setAttribute("aria-pressed", "true");

    });

});


/* ========================================
   BÚSQUEDA DE MÉDICOS
   ======================================== */

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const especialidadSeleccionada = selector.value;

    // Validar que se seleccione una especialidad.
    if (!especialidadSeleccionada) {

        mensajeValidacion.textContent =
            "Selecciona una especialidad para continuar.";

        mensajeValidacion.hidden = false;
        selector.focus();

        return;
    }

    mensajeValidacion.textContent = "";
    mensajeValidacion.hidden = true;

    // Limpiar resultados anteriores.
    listaMedicos.innerHTML = "";
    sinResultados.hidden = true;
    mensajeInicial.hidden = true;

    // Buscar por especialidad y modalidad.
    const resultados = medicos.filter(function (medico) {

        return medico.especialidad === especialidadSeleccionada &&
               medico.modalidades.includes(modalidadSeleccionada);

    });

    // Actualizar el contador.
    cantidadMedicos.textContent =
        resultados.length +
        (resultados.length === 1
            ? " médico encontrado"
            : " médicos encontrados");

    // Mostrar mensaje si no existen resultados.
    if (resultados.length === 0) {

        sinResultados.hidden = false;

        return;
    }

    sinResultados.hidden = true;

    // Crear una tarjeta por cada médico encontrado.
    resultados.forEach(function (medico) {

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-medico";

        const foto = document.createElement("img");
        foto.className = "foto-medico";
        foto.src = medico.foto;
        foto.alt = "Foto de " + medico.nombre;
        foto.loading = "lazy";

        foto.addEventListener("error", function () {
            foto.removeAttribute("src");
            foto.alt = "Foto no disponible";
        });

        const datos = document.createElement("div");
        datos.className = "datos-medico";

        const nombre = document.createElement("h3");
        nombre.textContent = medico.nombre;

        const especialidad = document.createElement("p");
        especialidad.className = "especialidad-medico";
        especialidad.textContent = medico.especialidad;

        const calificacion = document.createElement("p");
        calificacion.className = "calificacion";
        calificacion.textContent =
            "★ " + medico.calificacion.toFixed(1) + " / 5.0";

        const disponibilidad = document.createElement("span");
        disponibilidad.className = "disponibilidad";
        disponibilidad.textContent =
            "Modalidad: " + modalidadSeleccionada;

        datos.append(
            nombre,
            especialidad,
            calificacion,
            disponibilidad
        );

        tarjeta.append(foto, datos);
        listaMedicos.appendChild(tarjeta);

    });

});


/* ========================================
   VALIDACIÓN DEL SELECTOR
   ======================================== */

selector.addEventListener("change", function () {

    mensajeValidacion.textContent = "";
    mensajeValidacion.hidden = true;

});
