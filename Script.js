document.addEventListener('DOMContentLoaded', function () {
            const menuContainer = document.getElementById('menu-items');
            const modal = document.querySelector('.modal');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const closeModal = document.querySelectorAll('.modal-close');

            // Cargar los elementos del menú
            fetch('https://valencarballo1.github.io/LasPastasDeLaNona/menu.json')
                .then(response => response.json())
                .then(data => {
                    const menuItems = Object.keys(data).map(key => ({
                        name: key,
                        description: `Conoce nuestra variedad de ${key.toLowerCase()} para disfrutar en nuestro local.`,
                        image: getImageForItem(key),
                        options: data[key]
                    }));

                    menuItems.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.className = 'bg-white overflow-hidden shadow-lg rounded-lg';
                        itemElement.innerHTML = `
                            <img class="h-48 w-full object-cover" src="${item.image}" alt="${item.name}">
                            <div class="p-6">
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">${item.name}</h3>
                                <p class="text-gray-600 mb-4">${item.description}</p>
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Ver opciones
                                </button>
                            </div>
                        `;
                        menuContainer.appendChild(itemElement);

                        const button = itemElement.querySelector('button');
                        button.addEventListener('click', () => {
                            llenarModal(item.name, item.options);
                        });
                    });
                })
                .catch(error => console.error('Error cargando el menú:', error));

            function llenarModal(comida, opciones) {
                modalTitle.textContent = comida;
                modalDescription.innerHTML = '';

                const table = document.createElement('table');
                table.className = 'w-full';
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th class="text-left">Nombre</th>
                            <th class="text-left">Descripción</th>
                            <th class="text-left">Precio</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                opciones.forEach(opcion => {
                    const row = table.querySelector('tbody').insertRow();
                    row.innerHTML = `
                        <td>${opcion.nombre}</td>
                        <td>${opcion.descripcion}</td>
                        <td>$${opcion.precio}</td>
                    `;
                });

                modalDescription.appendChild(table);
                modal.classList.remove('opacity-0', 'pointer-events-none');
                document.body.classList.add('modal-active');
            }

            closeModal.forEach(close => {
                close.addEventListener('click', () => {
                    modal.classList.add('opacity-0', 'pointer-events-none');
                    document.body.classList.remove('modal-active');
                });
            });

            function getImageForItem(itemName) {
                const imageMap = {
                    'Pastas': 'https://s1.eestatic.com/2015/03/16/cocinillas/cocinillas_18508298_116119534_1706x960.jpg',
                    'Comidas Caseras': 'https://media.istockphoto.com/id/1191080960/es/foto/desayuno-turco-tradicional-y-personas-que-toman-varios-alimentos-amplia-composici%C3%B3n.jpg?s=612x612&w=0&k=20&c=q9c3Bm6ZgYzYeHPbc4GSVW7KQwZE9eqclxGH1hD6gVM=',
                    'Hamburguesas': 'https://www.alqueria.com.co/sites/default/files/hamburguesa-con-amigos-y-salsa-de-champinones_0.jpg',
                    'Empanadas': 'https://www.recetasnatura.com.ar/sites/default/files/655_x_475-_web_naturaempanadas_de_roastbeef_desmenuzado.jpg',
                    'Pizza': 'https://arteflame.com/cdn/shop/articles/The_10_Best_Pizza_Toppings_and_Why_They_Reign_Supreme.webp?v=1717620006&width=1600',
                    'Bebidas': 'https://gestoriapastor.org/wp-content/uploads/2021/01/the-refrescos.jpg'
                };
                return imageMap[itemName] || 'ruta/a/imagen/por/defecto.jpg';
            }
        });
