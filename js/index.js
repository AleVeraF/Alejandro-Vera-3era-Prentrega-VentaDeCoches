const titulo = document.getElementById("marca");
const cards = document.getElementsByClassName("cards");
const conteinerCoches = document.querySelector('#conteinerCoches')
const carrito = document.querySelector('.carrito')

function mensajeOk (titulo, mensaje, icono) { Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
    timer: 3500,
    showConfirmButton: false,
  });
}

function cardHtml(coche) {  // Asegúrate de que el parámetro es 'coche'
    return `<div class="cards">
                <h3 id="marca">${coche.modelo}</h3>
                <img class="img-coches" src="${coche.foto}" alt="Coche de marca ${coche.modelo}">
                <ul>
                    <li id="gama">${coche.gama}</li>
                    <li id="año">${coche.año}</li>
                    <li id="importe">${coche.importe}</li>
                </ul>
                <button id='${coche.codigo}' class="button">Comprar</button>
            </div>`;
}

function cargarCoches() {
    fetch('./data/coches.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(coches => {
            const conteinerCoches = document.getElementById('conteinerCoches');
            conteinerCoches.innerHTML = "";
            coches.forEach(coche => {  // Asegúrate de que el parámetro es 'coche'
                conteinerCoches.innerHTML += cardHtml(coche);
            });
            ActivarClick();
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function ActivarClick() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Compraste el coche con código: ' + button.id);
        });
    });
}

cargarCoches();

const CompraCarrito = []

const botonComprar = document.querySelectorAll('button.button')

function ActivarClick() {
    const botonAgregar = document.querySelectorAll('button.button');
    if (botonAgregar.length > 0) {
        botonAgregar.forEach((boton) => {
            boton.addEventListener("click", () => {
                if (CompraCarrito.length > 0) {
                    mensajeOk ("Solo puedes agregar un coche al carrito", "Ya tienes un coche en el carrito", "error");
                } else {
                    const cocheSeleccionado = coches.find((coche) => coche.codigo == boton.id);
                    if (cocheSeleccionado) {
                        CompraCarrito.push(cocheSeleccionado);
                        console.table(CompraCarrito);
                        mensajeOk ("¡Coche agregado al carrito!","!Puedes ir al carrito para finalizar la compra!", "success")

                        
                        localStorage.setItem('compraCarrito', JSON.stringify(CompraCarrito));
                    } else {
                        console.error(`No se encontró el coche con código: ${boton.id}`);
                    }
                }
            });
        });
    }
}
carrito.addEventListener("click", () => {
    if (CompraCarrito.length > 0) {
        location.href = "page/carrito.html";
    } else {
        mensajeOk ("No has seleccionado ningún coche", "Debes agregar un coche al carrito", "warning");
    }
});

carrito.addEventListener("mousemove", () => {
    if (CompraCarrito.length > 0) {
        carrito.title = "Hay un coche en el carrito"
    } else {
        (CompraCarrito.length = 0)
        carrito.title = "Debes incluir un coche al carrito"
    }
})








