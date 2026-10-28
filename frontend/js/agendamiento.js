
/* ========================================
   DATOS DE EJEMPLO
   Sustituir por datos de la base de datos
   cuando se conecte el backend.
======================================== */

const medicos = [
    {
        nombre: "Dra. María Fernández",
        especialidad: "Pediatría",
        calificacion: 4.9,
        foto: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        nombre: "Dr. Carlos Mendoza",
        especialidad: "Pediatría",
        calificacion: 4.8,
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        nombre: "Dra. Andrea Torres",
        especialidad: "Cardiología",
        calificacion: 4.9,
        foto: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        nombre: "Dr. Daniel Castro",
        especialidad: "Dermatología",
        calificacion: 4.7,
        foto: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        nombre: "Dra. Sofía Ramírez",
        especialidad: "Medicina general",
        calificacion: 4.8,
        foto: "https://randomuser.me/api/portraits/women/65.jpg"
    }
];

/* ========================================
   ELEMENTOS HTML
======================================== */

const formulario = document.getElementById("formulario-busqueda");
const selector = document.getElementById("especialidad");
const listaMedicos = document.getElementById("lista-medicos");
const sinResultados = document.getElementById("sin-resultados");
const estadoInicial = document.getElementById("estado-inicial");
const cantidadResultados = document.getElementById("cantidad-resultados");
const mensajeValidacion = document.getElementById("mensaje-validacion");

/* ========================================
   BÚSQUEDA POR ESPECIALIDAD
======================================== */

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const especialidadSeleccionada = selector.value;

    if (!especialidadSeleccionada) {
        mensajeValidacion.hidden = false;
        selector.focus();
        return;
    }

    mensajeValidacion.hidden = true;
    estadoInicial.hidden = true;
    listaMedicos.innerHTML = "";
    cantidadResultados.textContent = "";

    const resultados = medicos.filter(function (medico) {
        return medico.especialidad === especialidadSeleccionada;
    });

    if (resultados.length === 0) {
        sinResultados.hidden = false;
        return;
    }

    sinResultados.hidden = true;

    cantidadResultados.textContent =
        resultados.length +
        (resultados.length === 1 ? " médico encontrado" : " médicos encontrados");

    resultados.forEach(function (medico) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-medico";

        const foto = document.createElement("img");
        foto.className = "foto-medico";
        foto.src = medico.foto;
        foto.alt = "Foto de " + medico.nombre;
        foto.loading = "lazy";

        // Mostrar un fondo si la imagen externa no carga.
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
        calificacion.textContent = "★ " + medico.calificacion.toFixed(1) + " / 5.0";

        const disponibilidad = document.createElement("span");
        disponibilidad.className = "disponibilidad";
        disponibilidad.textContent = "Disponible";

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

selector.addEventListener("change", function () {
    mensajeValidacion.hidden = true;
});
