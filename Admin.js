var usuarioAdmin = {
    email: "pastaslanona",
    password: "pastas123"
  };

  $(document).ready(function() {
    llenarTabla();
  });

function llenarTabla() {
  obtenerOpciones()
    .then(opciones => {
      var tabla = $('#tablaParaProductos');
      tabla.empty();

      console.log("Entra en las opciones:", opciones);

      // Llena la tabla con las opciones específicas de la comida
      for (var i = 0; i < opciones.length; i++) {
          var opcion = opciones[i];
          var row = '<tr><td>' + opcion.nombre + '</td><td>' + opcion.descripcion + '</td><td>' + '$' + opcion.precio + '</td></tr>';
          tabla.append(row);
      }
    })
    .catch(error => console.error('Error obteniendo las opciones:', error));
};


  function obtenerOpciones() {
    const url = './menu.json'; // La URL es relativa a la ubicación de tu archivo HTML
    
    return fetch(url)  // Se agrega el return aquí
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(menu => {
        if (menu != null) {
          return menu;  // Se retorna el resultado deseado
        } else {
          throw new Error('No pudimos conectar al json');
        }
      })
      .catch(error => console.error('Error fetching the menu:', error));
  };

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
      var emailInput = document.getElementById("username");
      var passwordInput = document.getElementById("password");
  
      var enteredEmail = emailInput.value;
      var enteredPassword = passwordInput.value;
  
      if (enteredEmail === usuarioAdmin.email && enteredPassword === usuarioAdmin.password) {
        Swal.fire({
          title: 'Inicio de sesion correcto!',
          text: 'Podes editar los precios y agregar nuevos productos!',
          icon: 'success'
        }).then(function () {
          // Redirigir al usuario a otra página HTML
          window.location.href = './Admin.html';
        });
      } else {
        Swal.fire({
          title: 'Credenciales incorrectas',
          text: 'Por favor, inténtelo de nuevo.',
          icon: 'error'
        });
      }
    });
  });