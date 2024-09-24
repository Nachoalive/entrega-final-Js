class Usuario {
    constructor(nombre, username, password, avatar) {
        this.nombre = nombre;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }

    accederLogin(username, password) {
        return this.username === username && this.password === password;
    }
}

// Usuarios hardcodeados
const usuarios = [
    new Usuario("Invitado1", "Evaluador1", "coderhouse", "https://i.blogs.es/ebcba8/joker-heath-ledger/1200_800.jpeg")
];

// login
const loginLink = document.getElementById("login");
const titulo = document.getElementById("nombrelogin");

if (localStorage.getItem("sesionActiva")) {
    const sesionActual = JSON.parse(localStorage.getItem("sesionActiva"));
    titulo.innerHTML = `Bienvenido/a ${sesionActual.nombre} <img src="${sesionActual.avatar}" alt="Avatar" style="width: 40px; border-radius: 50%;">`;
    titulo.style.color = "green";
    loginLink.textContent = "Logout";
    loginLink.style.color = "red";
}

loginLink.addEventListener("click", (e) => {
    e.preventDefault();

    if (loginLink.textContent === "Logout") {
        Swal.fire({
            title: "¿Deseas cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("sesionActiva");
                titulo.textContent = "Iniciar Sesión";
                loginLink.textContent = "Login";
                loginLink.style.color = "";
                location.reload();
            }
        });
    } else {
        Swal.fire({
            title: "Iniciar Sesión",
            html: `<input type="text" id="username" class="swal2-input" placeholder="Usuario">
                   <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
            confirmButtonText: 'Iniciar Sesión',
            focusConfirm: false,
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value;
                const password = Swal.getPopup().querySelector('#password').value;
                
                
                if (username === '' || password === '') {
                    Swal.showValidationMessage(`Por favor ingresa ambos campos`);
                    return false;
                }
                return { username: username, password: password };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { username, password } = result.value;
                const usuario = usuarios.find(u => u.accederLogin(username, password));

                if (usuario) {
                    titulo.innerHTML = `Bienvenido/a ${usuario.nombre} <img src="${usuario.avatar}" alt="Avatar" style="width: 40px; border-radius: 50%;">`;
                    localStorage.setItem("sesionActiva", JSON.stringify(usuario));
                    Swal.fire({
                        title: `¡Bienvenido ${usuario.nombre}!`,
                        html: `<img src="${usuario.avatar}" alt="Avatar" style="width: 200px; border-radius: 50%;">`,
                        icon: 'success'
                    });
                    titulo.style.color = "green";
                    loginLink.textContent = "Logout";
                    loginLink.style.color = "red";
                } else {
                    Swal.fire("Error", "Usuario o Contraseña incorrectos", "error");
                }
            }
        });
    }
});