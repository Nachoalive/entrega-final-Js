// guarda la id
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const detallesUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1e5f0ed0c3701916e82595f1e706660b&language=es-ES`;

fetch(detallesUrl)
  .then(respuesta => respuesta.json())
  .then(data => {
    mostrarDetallesPelicula(data);
  })
  .catch(error => console.error('Error:', error));

function mostrarDetallesPelicula(pelicula) {
  const contenedorDetalles = document.getElementById('detalles-pelicula');

  // muestra detalles
  contenedorDetalles.innerHTML = `
    <div class="detalles-izquierda">
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
    </div>
    <div class="detalles-derecha">
      <h2>${pelicula.title}</h2>
      <p>${pelicula.overview}</p>
      <p><strong>Fecha de lanzamiento:</strong> ${pelicula.release_date}</p>
      <p><strong>Rating:</strong> ${pelicula.vote_average}</p>
      <p><strong>Duración:</strong> ${pelicula.runtime} minutos</p>
      <button id="agregar-wishlist">Agregar a la Wishlist</button>
    </div>
  `;

  const btnWishlist = document.getElementById('agregar-wishlist');
  btnWishlist.addEventListener('click', () => {
    agregarAWishlist(pelicula);
  });
}

// agrega la película a la wishlist y guardar en localStorage
function agregarAWishlist(pelicula) {
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    
    if (wishlist.some(item => item.id === pelicula.id) === false) {
        
        wishlist.push({
            id: pelicula.id,
            title: pelicula.title,
            poster_path: pelicula.poster_path
        });

        // Guardar la wishlist actualizada en localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        Swal.fire('Añadido a la Wishlist', `${pelicula.title} se ha agregado a tu wishlist.`, 'success');
    } else {
        Swal.fire('Ya está en la Wishlist', `${pelicula.title} ya está en tu wishlist.`, 'info');
    }
}
