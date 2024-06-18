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

function cardHtml(coches) {
    return `<div class="cards">
                    <h3 id="marca">${coches.modelo}</h3>
                    <img class="img-coches" src="${coches.foto}" alt="Coche de marca Corolla">
                    <ul>
                        <li id="gama">${coches.gama}</li>
                        <li id="año">${coches.año}</li>
                        <li id="importe">${coches.importe}</li>
                    </ul>
                    <button id='${coches.codigo}' class="button">Comprar</button>
                </div>`
}

function cargarCoches() {
    if (coches.length > 0) {
        cards.innerHTML = ""
        coches.forEach((coches) => conteinerCoches.innerHTML += cardHtml(coches))
        ActivarClick()
    } else { }
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








