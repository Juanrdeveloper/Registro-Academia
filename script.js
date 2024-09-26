let jugadores = [];
let editIndex = -1;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const tarjeta = document.getElementById('tarjeta').value.trim();
    const categoria = document.getElementById('categoria').value;
    const matricula = document.getElementById('matricula').value;
    const mensualidad = document.getElementById('mensualidad').value;

    // Validaciones
    const tarjetaRegex = /^[0-9]{6,10}$/;
    if (!tarjetaRegex.test(tarjeta)) {
        alert('La tarjeta de identidad debe contener entre 6 y 10 dígitos.');
        return;
    }

    // Crear un objeto jugador
    const jugador = {
        nombre,
        apellido,
        tarjeta,
        categoria,
        matricula: parseFloat(matricula),
        mensualidad: parseFloat(mensualidad)
    };

    if (editIndex === -1) {
        // Agregar jugador al array
        jugadores.push(jugador);
    } else {
        // Actualizar jugador existente
        jugadores[editIndex] = jugador;
        editIndex = -1; // Resetear editIndex
    }

    mostrarJugadores();
    document.getElementById('registrationForm').reset();
});

function mostrarJugadores() {
    const lista = document.getElementById('jugadoresList');
    lista.innerHTML = ''; // Limpiar la lista

    jugadores.forEach((jugador, index) => {
        const li = document.createElement('li');
        li.className = 'jugador-item';
        li.innerHTML = `
            ${jugador.nombre} ${jugador.apellido} - ${jugador.tarjeta} (${jugador.categoria === 'sub15' ? 'Sub 15' : 'Sub 17'}) - Matrícula: $${jugador.matricula.toFixed(2)}, Mensualidad: $${jugador.mensualidad.toFixed(2)}
            <div class="btn-group">
                <button class="btn" onclick="editarJugador(${index})">Editar</button>
                <button class="btn btn-delete" onclick="eliminarJugador(${index})">Eliminar</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function editarJugador(index) {
    const jugador = jugadores[index];
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('apellido').value = jugador.apellido;
    document.getElementById('tarjeta').value = jugador.tarjeta;
    document.getElementById('categoria').value = jugador.categoria;
    document.getElementById('matricula').value = jugador.matricula;
    document.getElementById('mensualidad').value = jugador.mensualidad;
    document.getElementById('editIndex').value = index; // Guardar el índice del jugador a editar
    editIndex = index; // Establecer el índice de edición
}

function eliminarJugador(index) {
    jugadores.splice(index, 1);
    mostrarJugadores();
}
