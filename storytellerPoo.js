document.addEventListener('DOMContentLoaded', () => {
    const scenarios = [
        {
            id: 1,
            text: "Una biblioteca necesita un sistema para gestionar sus libros y los préstamos a los socios. Cada libro tiene un título, autor y un ISBN. Los socios tienen un nombre y un número de socio. Un socio puede tomar prestados varios libros, y un libro puede ser prestado a un socio.",
            solution: `
                <p>Posibles Clases Principales:</p>
                <ul>
                    <li><strong>Libro:</strong>
                        <ul>
                            <li>Atributos: titulo (String), autor (String), isbn (String), estaPrestado (boolean)</li>
                            <li>Métodos: prestar(), devolver(), obtenerInformacion()</li>
                        </ul>
                    </li>
                    <li><strong>Socio:</strong>
                        <ul>
                            <li>Atributos: nombre (String), numeroSocio (String), librosPrestados (List<Libro>)</li>
                            <li>Métodos: tomarPrestadoLibro(Libro), devolverLibro(Libro), listarLibrosPrestados()</li>
                        </ul>
                    </li>
                    <li><strong>Biblioteca:</strong> (Clase que gestiona las interacciones)
                        <ul>
                            <li>Atributos: catalogoLibros (List<Libro>), listaSocios (List<Socio>)</li>
                            <li>Métodos: registrarLibro(Libro), registrarSocio(Socio), realizarPrestamo(Socio, Libro), gestionarDevolucion(Socio, Libro)</li>
                        </ul>
                    </li>
                </ul>
                <p>Relaciones Clave:</p>
                <ul>
                    <li>Socio <strong>tiene una</strong> lista de Libros (Agregación/Composición con Libro, o Asociación con navegabilidad)</li>
                    <li>Biblioteca <strong>tiene una</strong> lista de Libros y <strong>tiene una</strong> lista de Socios (Agregación).</li>
                    <li>Podría haber una clase 'Prestamo' para gestionar mejor los detalles del préstamo (fecha, etc.).</li>
                </ul>
            `
        },
        {
            id: 2,
            text: "Un sistema de venta de entradas para un cine. El cine tiene varias salas, cada sala proyecta una película en diferentes horarios (sesiones). Los clientes pueden comprar entradas para una sesión específica, eligiendo su asiento si el sistema lo permite.",
            solution: `
                <p>Posibles Clases Principales:</p>
                <ul>
                    <li><strong>Pelicula:</strong>
                        <ul>
                            <li>Atributos: titulo (String), director (String), duracion (int), genero (String)</li>
                            <li>Métodos: obtenerSinopsis()</li>
                        </ul>
                    </li>
                    <li><strong>Sala:</strong>
                        <ul>
                            <li>Atributos: numeroSala (int), capacidad (int), tipoProyeccion (String)</li>
                            <li>Métodos: obtenerCapacidadDisponible()</li>
                        </ul>
                    </li>
                    <li><strong>Sesion:</strong>
                        <ul>
                            <li>Atributos: pelicula (Pelicula), sala (Sala), horario (LocalDateTime), asientosDisponibles (Map<Asiento, Boolean> o int)</li>
                            <li>Métodos: venderEntrada(Asiento), verificarDisponibilidad(Asiento)</li>
                        </ul>
                    </li>
                     <li><strong>Entrada:</strong>
                        <ul>
                            <li>Atributos: sesion (Sesion), asiento (Asiento), precio (double), idEntrada (String)</li>
                        </ul>
                    </li>
                    <li><strong>Cliente:</strong>
                        <ul>
                            <li>Atributos: nombre (String), email (String), historialEntradas (List<Entrada>)</li>
                            <li>Métodos: comprarEntrada(Sesion, Asiento), verHistorial()</li>
                        </ul>
                    </li>
                    <li><strong>Cine:</strong> (Gestor principal)
                        <ul>
                            <li>Atributos: listaSalas (List<Sala>), cartelera (List<Pelicula>), listaSesiones (List<Sesion>)</li>
                            <li>Métodos: agregarPelicula(Pelicula), programarSesion(Sesion), buscarSesionesPorPelicula(Pelicula)</li>
                        </ul>
                    </li>
                     <li><strong>Asiento:</strong> (Opcional, si hay selección de asiento)
                        <ul>
                            <li>Atributos: fila (String), numero (int), estaOcupado (boolean)</li>
                        </ul>
                    </li>
                </ul>
                <p>Relaciones Clave:</p>
                <ul>
                    <li>Sesion <strong>tiene una</strong> Pelicula y <strong>tiene una</strong> Sala (Asociación).</li>
                    <li>Cine <strong>tiene muchas</strong> Salas, <strong>tiene muchas</strong> Peliculas, <strong>tiene muchas</strong> Sesiones (Agregación).</li>
                    <li>Cliente <strong>puede tener muchas</strong> Entradas. Entrada <strong>pertenece a una</strong> Sesion.</li>
                    <li>Sala <strong>puede tener muchos</strong> Asientos (Composición).</li>
                </ul>
            `
        },
        {
            id: 3,
            text: "Una tienda online vende productos. Los productos pueden ser de diferentes tipos (ej. Electrónicos, Ropa, Libros). Cada producto tiene un nombre, precio y stock. Los clientes pueden añadir productos a un carrito de la compra y luego realizar un pedido. El pedido se asocia a un cliente y contiene una lista de los productos comprados y la cantidad.",
            solution: `
                <p>Posibles Clases Principales:</p>
                <ul>
                    <li><strong>Producto:</strong> (Podría ser abstracta o una clase base)
                        <ul>
                            <li>Atributos: nombre (String), precio (double), stock (int), idProducto (String)</li>
                            <li>Métodos: obtenerDescripcion(), actualizarStock(int)</li>
                        </ul>
                    </li>
                    <li><strong>Electronico (hereda de Producto):</strong>
                        <ul>
                            <li>Atributos: marca (String), garantiaMeses (int)</li>
                        </ul>
                    </li>
                    <li><strong>Ropa (hereda de Producto):</strong>
                        <ul>
                            <li>Atributos: talla (String), color (String), material (String)</li>
                        </ul>
                    </li>
                     <li><strong>Libro (hereda de Producto):</strong>
                        <ul>
                            <li>Atributos: autor (String), isbn (String), editorial (String)</li>
                        </ul>
                    </li>
                    <li><strong>Cliente:</strong>
                        <ul>
                            <li>Atributos: nombre (String), email (String), direccion (String), carrito (CarritoCompra)</li>
                            <li>Métodos: agregarAlCarrito(Producto, int), verCarrito(), realizarPedido()</li>
                        </ul>
                    </li>
                    <li><strong>CarritoCompra:</strong>
                        <ul>
                            <li>Atributos: items (Map<Producto, Integer>) (Producto y cantidad)</li>
                            <li>Métodos: agregarItem(Producto, int), eliminarItem(Producto), calcularTotal()</li>
                        </ul>
                    </li>
                    <li><strong>Pedido:</strong>
                        <ul>
                            <li>Atributos: cliente (Cliente), itemsPedido (List<ItemPedido>), fecha (LocalDate), total (double), estado (String)</li>
                            <li>Métodos: calcularTotalPedido(), actualizarEstado(String)</li>
                        </ul>
                    </li>
                     <li><strong>ItemPedido:</strong> (Representa un producto y su cantidad en un pedido específico)
                        <ul>
                            <li>Atributos: producto (Producto), cantidad (int), precioUnitario (double)</li>
                        </ul>
                    </li>
                </ul>
                <p>Relaciones Clave:</p>
                <ul>
                    <li>Electronico, Ropa, Libro <strong>SON UN TIPO DE</strong> Producto (Herencia/Generalización).</li>
                    <li>Cliente <strong>tiene un</strong> CarritoCompra (Composición o Agregación fuerte).</li>
                    <li>CarritoCompra <strong>contiene</strong> Productos (Asociación con multiplicidad).</li>
                    <li>Pedido <strong>pertenece a un</strong> Cliente (Asociación).</li>
                    <li>Pedido <strong>contiene muchos</strong> ItemPedido (Composición).</li>
                    <li>ItemPedido <strong>referencia a un</strong> Producto (Asociación).</li>
                </ul>
            `
        }
    ];

    let currentScenarioIndex = 0;
    const scenarioTextElement = document.getElementById('scenario-text');
    const classNameInput = document.getElementById('class-name-input');
    const addClassButton = document.getElementById('add-class-button');
    const classesListElement = document.getElementById('classes-list');
    const showSolutionButton = document.getElementById('show-solution-button');
    const nextScenarioButton = document.getElementById('next-scenario-button');
    const solutionAreaElement = document.getElementById('solution-area');
    const suggestedSolutionTextElement = document.getElementById('suggested-solution-text');

    function loadScenario(index) {
        const scenario = scenarios[index];
        scenarioTextElement.textContent = scenario.text;
        suggestedSolutionTextElement.innerHTML = scenario.solution; // Usar innerHTML para el formato
        solutionAreaElement.style.display = 'none'; // Ocultar solución al cargar nuevo escenario
        classesListElement.innerHTML = ''; // Limpiar clases identificadas del escenario anterior
        classNameInput.value = '';
        classNameInput.focus();
        showSolutionButton.disabled = false; // Habilitar botón de solución
    }

    addClassButton.addEventListener('click', () => {
        const className = classNameInput.value.trim();
        if (className) {
            const classItem = document.createElement('div');
            classItem.classList.add('class-entry'); // Nueva clase para mejor estilado

            const nameSpan = document.createElement('strong');
            nameSpan.textContent = className;
            classItem.appendChild(nameSpan);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.classList.add('remove-class-btn');
            removeBtn.onclick = () => {
                classItem.remove();
            };
            // Añadir el botón al final, después de los inputs
            // classItem.appendChild(removeBtn); // Se moverá después de los textareas

            // Input para Atributos
            const attributesLabel = document.createElement('label');
            attributesLabel.textContent = 'Atributos clave (ej: nombre:String, edad:int):';
            const attributesInput = document.createElement('textarea');
            attributesInput.placeholder = 'titulo:String, autor:String';
            attributesInput.rows = 2;
            classItem.appendChild(attributesLabel);
            classItem.appendChild(attributesInput);

            // Input para Métodos
            const methodsLabel = document.createElement('label');
            methodsLabel.textContent = 'Métodos clave (ej: calcular(), mostrarInfo()):';
            const methodsInput = document.createElement('textarea');
            methodsInput.placeholder = 'prestar(), devolver()';
            methodsInput.rows = 2;
            classItem.appendChild(methodsLabel);
            classItem.appendChild(methodsInput);

            // Input para Relaciones
            const relationsLabel = document.createElement('label');
            relationsLabel.textContent = 'Relaciones (ej: hereda_de Animal, tiene_un Motor):';
            const relationsInput = document.createElement('textarea');
            relationsInput.placeholder = 'tiene_varios Libro, hereda_de Vehiculo';
            relationsInput.rows = 2;
            classItem.appendChild(relationsLabel);
            classItem.appendChild(relationsInput);

            // Añadir el botón de eliminar después de todos los inputs
            classItem.appendChild(removeBtn);


            classesListElement.appendChild(classItem);
            classNameInput.value = '';
            classNameInput.focus();
        } else {
            alert("Por favor, introduce un nombre para la clase.");
        }
    });

    classNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addClassButton.click();
        }
    });

    showSolutionButton.addEventListener('click', () => {
        solutionAreaElement.style.display = 'block';
        showSolutionButton.disabled = true; // Deshabilitar después de mostrar
    });

    nextScenarioButton.addEventListener('click', () => {
        currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
        loadScenario(currentScenarioIndex);
    });

    // Cargar el primer escenario al iniciar
    loadScenario(currentScenarioIndex);
});