# Backend — MediConnect

## 1. Descripción

MediConnect es un proyecto académico desarrollado para la Unidad 1 de Ingeniería de Software. El presente prototipo implementa la interfaz frontend de un sistema de gestión y reagendamiento de citas médicas.

## 2. Estado de implementación

**Estado: No implementado en esta fase.**

El backend no forma parte del alcance de la versión actual del prototipo. Las interfaces utilizan datos ficticios y estáticos para representar el flujo de interacción del paciente ante la cancelación de una cita médica por una emergencia del especialista.

## 3. Justificación

La implementación se centra en demostrar visualmente la navegación y las interacciones principales del proceso de reagendamiento, sin necesidad de desarrollar una infraestructura de servidor.

Por este motivo, en esta versión:

- No existe un servidor backend implementado.
- No se dispone de una API para gestionar las citas.
- No se utiliza una base de datos para almacenar información.
- La selección y confirmación de horarios se simulan en el navegador.
- No se realizan notificaciones reales ni se persisten los cambios después de recargar la página.

Los datos utilizados son ficticios y tienen fines exclusivamente demostrativos.

## 4. Tecnologías utilizadas

La versión actual se desarrolla con tecnologías frontend:

- HTML5 para la estructura de las interfaces.
- CSS3 para los estilos y el diseño responsivo.
- JavaScript para la navegación y las interacciones del prototipo.

## 5. Posibles implementaciones futuras

En una fase posterior, el backend podría incorporar:

- Una API para gestionar pacientes, especialistas y citas médicas.
- Una base de datos para almacenar y consultar las reservas.
- Validación de disponibilidad de horarios desde el servidor.
- Persistencia de las solicitudes de reagendamiento.
- Autenticación y autorización de usuarios.
- Notificaciones sobre cancelaciones y confirmaciones.

Estas funcionalidades son propuestas futuras y no forman parte de la implementación actual.

## 6. Ejecución

No se requiere iniciar un servidor backend para utilizar el prototipo actual. La interfaz frontend puede ejecutarse siguiendo las instrucciones documentadas en el README principal del repositorio.
