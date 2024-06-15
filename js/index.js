/*
<div class="cards">
                    <h3 id="marca">Toyota Corolla</h3>
                    <img class="img-coches" src="image/corolla.PNG" alt="Coche de marca Corolla">
                    <ul>
                        <li id="gama">Coche de gama media</li>
                        <li id="año">Año 2024</li>
                        <li id="importe">25.000€</li>
                    </ul>
                    <button class="button">Comprar</button>
                </div>
*/
// objeto del tipo HTMLElement
const titulo = document.getElementById("marca");
const cards = document.getElementsByClassName("cards");
const conteinerCoches = document.querySelector('#conteinerCoches')
const carrito = document.querySelector('.carrito')





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
    const botonAgregar = document.querySelectorAll('button.button')
    if (botonAgregar.length > 0) {
        botonAgregar.forEach((boton) => {
            boton.addEventListener ("click", ()=>{
                const cocheSeleccionado = coches.find((coche)=> coche.codigo == boton.id)
                CompraCarrito.push(cocheSeleccionado)
                console.table(CompraCarrito)

                // Guardar en localStorage
                localStorage.setItem('compraCarrito', JSON.stringify(CompraCarrito));
            })
        })
    }
}




carrito.addEventListener("click", () => {
    if (CompraCarrito.length > 0) {
        location.href = "page/carrito.html"
    } else {
        alert("Debes cargar un coche al carrito")
    }
})

carrito.addEventListener("mousemove", () => {
    if (CompraCarrito.length > 0) {
        carrito.title = "Hay un coche en el carrito"
    } else {
        (CompraCarrito.length = 0)
        carrito.title = "Debes incluir un coche al carrito"
    }
})








