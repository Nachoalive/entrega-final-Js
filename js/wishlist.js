// trae la wishlist
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


let agregadasWl = (arr) => {
    const contenedor = document.getElementById("listaWL");
    if (contenedor) {
        contenedor.innerHTML = ''; 

        arr.forEach(movie => {
            const divPelicula = document.createElement("div");
            divPelicula.className = 'pelicula';
            divPelicula.innerHTML = `
                <p>Nombre: ${movie.title}</p>
                <p>Año: ${movie.release_date}</p>
                <button class="remover-wishlist" data-title="${movie.title}">Remover</button>
            `;
            contenedor.appendChild(divPelicula);
        });

        // remueve peliculas
        document.querySelectorAll('.remover-wishlist').forEach(button => {
            button.addEventListener('click', (e) => {
                const title = e.target.getAttribute('data-title');
                wishlist = wishlist.filter(movie => movie.title !== title);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                agregadasWl(wishlist);
            });
        });
    }
};


const agregarAWishlist = (pelicula) => {
   
    
    if (wishlist.some(item => item.title === pelicula.title) === false) {
        wishlist.push(pelicula);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        agregadasWl(wishlist);

        Swal.fire({
            title: '¡Añadido!',
            text: `${pelicula.title} se ha añadido a tu wishlist.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });

    } else {
        alert("La película ya está en la wishlist.");
    }
};


document.addEventListener('DOMContentLoaded', () => {
    agregadasWl(wishlist);
});

// muestra peliculas en "tuwishlist.html"
document.addEventListener('DOMContentLoaded', function() {
    const wishlistContainer = document.getElementById('wishlist-container');
    
    
    if (wishlistContainer) {
        wishlistContainer.innerHTML = '';

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = '<p>No tienes películas en tu wishlist.</p>';
        } else {
            wishlist.forEach(pelicula => {
                const peliculaElement = document.createElement('div');
                peliculaElement.classList.add('pelicula-bloque');

                peliculaElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                    <h3>${pelicula.title}</h3>
                    <button class="eliminar-wishlist" data-title="${pelicula.title}">Eliminar de la Wishlist</button>
                `;
                wishlistContainer.appendChild(peliculaElement);
            });

        
            document.querySelectorAll('.eliminar-wishlist').forEach(boton => {
                boton.addEventListener('click', (e) => {
                    const title = e.target.getAttribute('data-title');
                    wishlist = wishlist.filter(pelicula => pelicula.title !== title);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    location.reload();
                });
            });
        }
    }
});
