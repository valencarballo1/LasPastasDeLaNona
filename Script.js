$(document).ready(function() {
    // Escucha el evento de clic en las "cards"
    $('.card').click(function() {
        var comida = $(this).attr('data-comida'); // Obtiene el tipo de comida desde el atributo data-comida
        $('#genericModalTitle').text(comida); // Actualiza el título del modal con el tipo de comida seleccionado
        llenarModal(comida); // Llena el contenido del modal según el tipo de comida seleccionado
    });

    // Función para llenar el contenido del modal según el tipo de comida
    function llenarModal(comida) {
        // Aquí puedes utilizar lógica condicional para llenar el contenido del modal según el tipo de comida seleccionado
        var opciones = obtenerOpciones(comida); // Función para obtener las opciones específicas de cada comida
        var modalBody = $('#genericModalBody');

        // Limpia el contenido actual del modal
        modalBody.empty();

        // Llena la tabla con las opciones específicas de la comida
        for (var i = 0; i < opciones.length; i++) {
            var opcion = opciones[i];
            var row = '<tr><td>' + opcion.nombre + '</td><td>' + opcion.descripcion + '</td><td>' + opcion.precio + '</td></tr>';
            modalBody.append(row);
        }
    }

    // Función para obtener las opciones específicas de cada comida (puedes reemplazar esto con tus datos reales)
    function obtenerOpciones(comida) {
        // Aquí puedes usar lógica condicional para obtener las opciones específicas de cada tipo de comida
        // Por ejemplo, si es "Pastas", devuelves un array de opciones de pastas; si es "Comidas Caseras", devuelves un array de opciones de comidas caseras, etc.

        // Ejemplo para Pastas
        if (comida === 'Pastas') {
            return [
                { nombre: 'Ravioles de pollo y verdura', descripcion: 'Salsa a elección', precio: '$2800' },
                { nombre: 'Otra opción de pastas', descripcion: 'Otra salsa', precio: '$XXXX' }
            ];
        }
        // Puedes agregar más lógica para otros tipos de comida aquí...
    }
});