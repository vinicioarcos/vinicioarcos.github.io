document.addEventListener('DOMContentLoaded', function() {
    const tablaContenidos = document.getElementById('tabla-contenidos');
    const libroContenido = document.getElementById('libro-contenido');
    const capituloAnterior = document.getElementById('capitulo-anterior');
    const capituloSiguiente = document.getElementById('capitulo-siguiente');

    const capitulos = [
        { titulo: "Introducción", archivo: "introduccion.html" },
        { titulo: "Capítulo 1: Fundamentos de la Evaluación de Impacto", archivo: "capitulo-1.html" },
        { titulo: "Capítulo 2: Métodos Cuantitativos", archivo: "capitulo-2.html" },
        // ... más capítulos ...
    ];

    let capituloActual = 0;

    function cargarCapitulo(index) {
        capituloActual = index;
        fetch(`contenido-libro/${capitulos[index].archivo}`)
            .then(response => response.text())
            .then(contenido => {
                libroContenido.innerHTML = contenido;
                actualizarBotonesNavegacion();
                actualizarEnlacesActivos();
                inicializarElementosInteractivos();
            })
            .catch(error => console.error('Error al cargar el capítulo:', error));
    }

    function actualizarBotonesNavegacion() {
        capituloAnterior.disabled = capituloActual === 0;
        capituloSiguiente.disabled = capituloActual === capitulos.length - 1;
    }

    function actualizarEnlacesActivos() {
        const enlaces = tablaContenidos.querySelectorAll('a');
        enlaces.forEach((enlace, index) => {
            if (index === capituloActual) {
                enlace.classList.add('active');
            } else {
                enlace.classList.remove('active');
            }
        });
    }

    function inicializarElementosInteractivos() {
        const reflexionTextarea = document.getElementById('reflexion-ejercicio');
        const guardarReflexionBtn = document.querySelector('.capitulo-interactivo button');

        if (reflexionTextarea && guardarReflexionBtn) {
            const reflexionGuardada = localStorage.getItem(`reflexion-capitulo-${capituloActual + 1}`);
            if (reflexionGuardada) {
                reflexionTextarea.value = reflexionGuardada;
            }

            guardarReflexionBtn.addEventListener('click', function() {
                const reflexion = reflexionTextarea.value;
                localStorage.setItem(`reflexion-capitulo-${capituloActual + 1}`, reflexion);
                alert('Tu reflexión ha sido guardada.');
            });
        }
    }

    function cargarTablaContenidos() {
        capitulos.forEach((capitulo, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = capitulo.titulo;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                cargarCapitulo(index);
            });
            li.appendChild(a);
            tablaContenidos.appendChild(li);
        });
    }

    capituloAnterior.addEventListener('click', () => {
        if (capituloActual > 0) {
            cargarCapitulo(capituloActual - 1);
        }
    });

    capituloSiguiente.addEventListener('click', () => {
        if (capituloActual < capitulos.length - 1) {
            cargarCapitulo(capituloActual + 1);
        }
    });

    cargarTablaContenidos();
    cargarCapitulo(0);
});

// Función global para el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Inicializar modo oscuro basado en la preferencia guardada
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
