document.addEventListener('DOMContentLoaded', () => {
    const jdbcSteps = [
        { id: 'step1', text: 'Cargar Driver JDBC', order: 1 },
        { id: 'step2', text: 'Establecer Conexión (DriverManager.getConnection)', order: 2 },
        { id: 'step3', text: 'Crear Statement/PreparedStatement', order: 3 },
        { id: 'step4', text: 'Formular la Consulta SQL', order: 4 },
        { id: 'step5', text: 'Ejecutar Consulta (executeQuery/executeUpdate)', order: 5 },
        { id: 'step6', text: 'Procesar ResultSet (si es consulta SELECT)', order: 6 },
        { id: "step7", text: "Cerrar ResultSet", order: 7 },
        { id: 'step8', text: 'Cerrar Statement/PreparedStatement', order: 8 },
        { id: 'step9', text: 'Cerrar Conexión', order: 9 }
    ];

    const sourceContainer = document.getElementById('source-items-container');
    const dropZonesContainer = document.getElementById('drop-zones-container');
    const checkButton = document.getElementById('check-order-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackMessage = document.getElementById('feedback-message');

    let draggedItem = null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeGame() {
        sourceContainer.innerHTML = '<h2>Pasos Disponibles:</h2>'; // Mantener el título
        dropZonesContainer.innerHTML = '<h2>Orden Correcto:</h2>'; // Mantener el título
        feedbackMessage.textContent = '';
        feedbackMessage.className = '';

        // Crear y mostrar elementos arrastrables desordenados
        const shuffledSteps = shuffleArray([...jdbcSteps]);
        shuffledSteps.forEach(step => {
            const item = document.createElement('div');
            item.classList.add('draggable-item');
            item.textContent = step.text;
            item.setAttribute('draggable', true);
            item.dataset.id = step.id; // Usar el id para identificar
            item.dataset.order = step.order; // Guardar el orden correcto
            sourceContainer.appendChild(item);
        });

        // Crear zonas para soltar
        for (let i = 0; i < jdbcSteps.length; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.dataset.expectedOrder = i + 1; // El orden esperado para esta zona
            dropZonesContainer.appendChild(dropZone);
        }

        addDragDropListeners();
    }

    function addDragDropListeners() {
        const draggables = document.querySelectorAll('.draggable-item');
        const dropZones = document.querySelectorAll('.drop-zone');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggedItem = draggable;
                setTimeout(() => draggable.classList.add('dragging'), 0);
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
                draggedItem = null;
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault(); // Necesario para permitir soltar
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (draggedItem && zone.children.length === 0) { // Solo soltar si la zona está vacía
                    zone.appendChild(draggedItem);
                    draggedItem = null; // Limpiar item arrastrado
                } else if (draggedItem && zone.children.length > 0) {
                    // Si la zona ya tiene un item, devolver el arrastrado a la fuente
                    sourceContainer.appendChild(draggedItem);
                    draggedItem = null;
                }
            });
        });

        // Permitir devolver items a la zona de origen
        sourceContainer.addEventListener('dragover', e => {
            e.preventDefault();
        });
        sourceContainer.addEventListener('drop', e => {
            e.preventDefault();
            if (draggedItem && !sourceContainer.contains(draggedItem)) {
                sourceContainer.appendChild(draggedItem);
                draggedItem = null;
            }
        });
    }

    checkButton.addEventListener('click', () => {
        const dropZones = dropZonesContainer.querySelectorAll('.drop-zone');
        let correctOrder = true;
        if (dropZonesContainer.querySelectorAll('.draggable-item').length !== jdbcSteps.length) {
            feedbackMessage.textContent = 'Debes colocar todos los pasos en las ranuras.';
            feedbackMessage.className = 'incorrect';
            return;
        }

        dropZones.forEach((zone, index) => {
            const item = zone.querySelector('.draggable-item');
            if (!item || parseInt(item.dataset.order) !== (index + 1)) {
                correctOrder = false;
            }
        });

        if (correctOrder) {
            feedbackMessage.textContent = '¡Excelente! El orden es correcto.';
            feedbackMessage.className = 'correct';
        } else {
            feedbackMessage.textContent = 'El orden no es correcto. Inténtalo de nuevo.';
            feedbackMessage.className = 'incorrect';
        }
    });

    resetButton.addEventListener('click', initializeGame);

    // Iniciar el juego
    initializeGame();
});