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

    function obtenerOpciones(comida) {
      const url = 'https://valencarballo1.github.io/LasPastasDeLaNona/menu.json'; // La URL es relativa a la ubicación de tu archivo HTML
    
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(menu => {
          if (menu.hasOwnProperty(comida)) {
            console.log(menu[comida]);
          } else {
            console.log('Tipo de comida no encontrado');
          }
        })
        .catch(error => console.error('Error fetching the menu:', error));
    }
});