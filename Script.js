$(document).ready(function() {
    // Escucha el evento de clic en las "cards"
    

  });

  $('.card').click(function() {
    let comida = $(this).attr('data-comida'); // Obtiene el tipo de comida desde el atributo data-comida
    $('#genericModalTitle').text(comida); // Actualiza el título del modal con el tipo de comida seleccionado
    llenarModal(comida); // Llena el contenido del modal según el tipo de comida seleccionado
});

function llenarModal(comida) {
  obtenerOpciones(comida)
    .then(opciones => {
      var modalBody = $('#genericModalBody');
      modalBody.empty();

      console.log("Entra en las opciones:", opciones);

      // Llena la tabla con las opciones específicas de la comida
      for (var i = 0; i < opciones.length; i++) {
          var opcion = opciones[i];
          var row = '<tr><td>' + opcion.nombre + '</td><td>' + opcion.descripcion + '</td><td>' + '$' + opcion.precio + '</td></tr>';
          modalBody.append(row);
      }
    })
    .catch(error => console.error('Error obteniendo las opciones:', error));
};

function obtenerOpciones(comida) {
  const url = 'https://valencarballo1.github.io/LasPastasDeLaNona/menu.json'; // La URL es relativa a la ubicación de tu archivo HTML
  
  return fetch(url)  // Se agrega el return aquí
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(menu => {
      if (menu.hasOwnProperty(comida)) {
        return menu[comida];  // Se retorna el resultado deseado
      } else {
        throw new Error('Tipo de comida no encontrado');
      }
    })
    .catch(error => console.error('Error fetching the menu:', error));
};