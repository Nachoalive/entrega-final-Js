let pagina = 1;
const popularesBaseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1e5f0ed0c3701916e82595f1e706660b&language=es-ES&page=';

const btnbfre = document.getElementById('btnbfre');
const btnfrward = document.getElementById('btnfrward');

// Muestra las películas populares
const cargarPeliculasPopulares = (pagina) => {
    const url = `${popularesBaseUrl}${pagina}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const peliculas = data.results;
            mostrarPeliculas(peliculas); 
        })
        .catch(error => console.error('Error:', error));
};


function mostrarPeliculas(peliculas) {
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


cargarPeliculasPopulares(pagina);

// botones para paginación
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
