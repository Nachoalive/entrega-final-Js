let pagina = 1;
let tituloActual = '';

const popularesBaseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1e5f0ed0c3701916e82595f1e706660b&language=en-ES&page=';
const btnbfre = document.getElementById('btnbfre');
const btnfrward = document.getElementById('btnfrward');

//carga y mostuestra las películas populares
const cargarPeliculasPopulares = (pagina) => {
    const url = `${popularesBaseUrl}${pagina}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const peliculas = data.results;
            mostrarPeliculasPopulares(peliculas);
        })
        .catch(error => console.error('Error:', error));
};

// busca películas por título
const buscarPeliculas = (titulo, pagina) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=1e5f0ed0c3701916e82595f1e706660b&query=${titulo}&language=es-ES&page=${pagina}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const peliculas = data.results;
            mostrarResultadosBusqueda(peliculas);
        })
        .catch(error => console.error('Error al buscar películas:', error));
};

// Muestra las peliculas populares en el contenedor
function mostrarPeliculasPopulares(peliculas) {
    const contenedor = document.getElementById('contenedor-peliculas');
    contenedor.innerHTML = '';

    peliculas.forEach(pelicula => {
        const peliculasElement = document.createElement('div');
        peliculasElement.classList.add('pelicula');
        peliculasElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
            <h3>${pelicula.title}</h3>
        `;
        peliculasElement.addEventListener('click', () => {
            window.location.href = `detalles.html?id=${pelicula.id}`;
        });
        contenedor.appendChild(peliculasElement);
    });
}

// Muestra resultados de búsqueda en su contenedor
function mostrarResultadosBusqueda(peliculas) {
    const contenedorBusqueda = document.getElementById('resultados-busqueda');
    contenedorBusqueda.innerHTML = ''; 

    if (peliculas.length === 0) {
        contenedorBusqueda.innerHTML = '<p style="color:white;">No se encontraron películas.</p>';
        return;
    }

    peliculas.forEach(pelicula => {
        const resultadoElement = document.createElement('div');
        resultadoElement.classList.add('pelicula');
        resultadoElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
            <h3>${pelicula.title}</h3>
        `;
        resultadoElement.addEventListener('click', () => {
            window.location.href = `detalles.html?id=${pelicula.id}`;
        });
        contenedorBusqueda.appendChild(resultadoElement);
    });
}

cargarPeliculasPopulares(pagina);

// botones para cargar más peliculas
btnfrward.addEventListener('click', () => {
    pagina += 1;
    cargarPeliculasPopulares(pagina);
});

btnbfre.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculasPopulares(pagina);
    }
});

// evento busqueda
document.getElementById('busqueda').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const titulo = document.getElementById('titulo').value;
    
    if (titulo.trim() === '') {
        document.getElementById('resultados-busqueda').innerHTML = '<p style="color:white;">Por favor, ingresa un título de película.</p>';
        return;
    }

    tituloActual = titulo;
    buscarPeliculas(titulo, pagina);
});
