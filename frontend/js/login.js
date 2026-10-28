
/* ========================================
   USUARIOS DE PRUEBA
   Solo para la maqueta académica
   ======================================== */

const usuarios = [
    {
        nombre: "Edwin David Guachi Cabrera",
        correo: "edwin.guachi@mediconnect.local",
        contrasena: "Edwin123!"
    },
    {
        nombre: "Lizbeth Shakira Pacha Chilig",
        correo: "lizbeth.pacha@mediconnect.local",
        contrasena: "Lizbeth123!"
    },
    {
        nombre: "Thais Yetsalem Santorum Sandoval",
        correo: "thais.santorum@mediconnect.local",
        contrasena: "Thais123!"
    },
    {
        nombre: "Kevin Alexander Vaca Guaman",
        correo: "kevin.vaca@mediconnect.local",
        contrasena: "Kevin123!"
    }
];


/* ========================================
   ELEMENTOS DEL FORMULARIO
   ======================================== */

const formulario = document.getElementById("formulario-login");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const mensaje = document.getElementById("mensaje-login");


/* ========================================
   VALIDACIÓN DEL INICIO DE SESIÓN
   ======================================== */

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const correoIngresado = campoCorreo.value.trim().toLowerCase();
    const contrasenaIngresada = campoContrasena.value;

    const usuarioEncontrado = usuarios.find(function (usuario) {

        return usuario.correo.toLowerCase() === correoIngresado &&
               usuario.contrasena === contrasenaIngresada;

    });

    if (usuarioEncontrado) {

        // Guardar el nombre para la demostración de la sesión.
        sessionStorage.setItem(
            "mediconnect_usuario",
            usuarioEncontrado.nombre
        );

        // Acceder a la pantalla principal.
        window.location.href = "index.html";

    } else {

        mensaje.textContent = "Usuario o contraseña incorrectos";
        mensaje.hidden = false;

        campoContrasena.value = "";
        campoContrasena.focus();

    }

});


/* ========================================
   OCULTAR EL ERROR AL VOLVER A ESCRIBIR
   ======================================== */

campoCorreo.addEventListener("input", ocultarMensaje);
campoContrasena.addEventListener("input", ocultarMensaje);

function ocultarMensaje() {
    mensaje.hidden = true;
    mensaje.textContent = "";
}
