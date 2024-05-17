document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios(); // cargar usuarios almacenados al cargar la página
});

document.getElementById('formLogin').addEventListener('submit', (event) => {
    event.preventDefault(); // evitar el comportamiento por defecto del formulario

    procesarLogin(); // procesar el inicio de sesión
});

function cargarUsuarios() {
    let divResultados = document.getElementById('resultados');
    let datosAlmacenados = localStorage.getItem('usuarios'); // obtener datos de usuarios del local storage
    if (datosAlmacenados) {
        let arrayUsuarios = JSON.parse(datosAlmacenados);
        if (arrayUsuarios.length > 0) {
            // mostrar usuarios registrados en el elemento 'resultados'
            divResultados.innerHTML = '<h2>Usuarios registrados:</h2>' + arrayUsuarios.map(user => user.nombre).join('<br>');
        }
    }
}

function procesarLogin() {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;

    let resultado = validarUsuario(nombre, correo, contraseña); // validar los datos de inicio de sesión

    mostrarNotificacion(resultado.mensaje, resultado.exito ? 'exito' : 'error'); // Mostrar notificación

    if (resultado.exito) {
        almacenarUsuario(nombre, correo, contraseña); // almacenar usuario si la validación es exitosa
    }
}

function validarUsuario(nombre, correo, contraseña) {
    if (nombre && correo && contraseña) { // verificar que todos los campos estén completos
        let regCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regCorreo.test(correo)) { // verificar que el correo tenga un formato válido
            return { exito: true, mensaje: `Hola ${nombre}!, iniciaste sesión exitosamente.` }; // mensaje de éxito
        } else {
            return { exito: false, mensaje: 'Por favor, ingresá un correo electrónico válido.' }; // mensaje de error de correo inválido
        }
    } else {
        return { exito: false, mensaje: 'Por favor, completá todos los campos.' }; // Mensaje de error de campos incompletos
    }
}

function mostrarNotificacion(mensaje, tipo) {
    let divNotificacion = document.getElementById('notificacion');
    divNotificacion.innerHTML = mensaje; // Mostrar el mensaje
    divNotificacion.className = tipo; // Establecer la clase CSS para el estilo de la notificación
    divNotificacion.style.display = 'block'; // Mostrar
}

function almacenarUsuario(nombre, correo, contraseña) {
    let divResultados = document.getElementById('resultados');
    let datosAlmacenados = localStorage.getItem('usuarios'); // obtener datos de usuarios de local storage
    let arrayUsuarios = datosAlmacenados ? JSON.parse(datosAlmacenados) : []; // Convertir datos de usuarios a array
    arrayUsuarios.push({ nombre, correo, contraseña }); // agregar nuevo usuario al array
    localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios)); // almacenra array actualizado en el almacenamiento local
    // mostrar lista actualizada de usuarios en el elemento 'resultados'
    divResultados.innerHTML = '<h2>Usuarios Registrados:</h2>' + arrayUsuarios.map(user => user.nombre).join('<br>');
}
