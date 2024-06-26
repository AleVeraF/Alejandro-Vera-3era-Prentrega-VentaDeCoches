const seleccionaCoche = document.querySelector("select#seleccionarCoche")
const seleccionaMeses = document.querySelector("input#seleccionarMeses")
const btnFinanciar = document.querySelector("button.button")
const btnUltimaFinanciacion = document.querySelector("button#recuperar")
const importe = document.querySelector("p.importe")
const comprar = document.querySelector("button#comprar")
const quitar = document.querySelector("button#quitar")
const cargando = "<img src='../image/cargando.gif'>"
const iva = 1.21
const interes = 1.18;

const arrayHistorial = []

function mensajeOk(titulo, mensaje, icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        timer: 4500,
        showConfirmButton: false,
    });
}

function cargarFinanciarCoches() {

    coches.forEach((coche) => {
        seleccionaCoche.innerHTML += `<option>${coche.modelo}</option>`
    })

}
function importeFinanciado(modeloCoche) {
    let resultado = coches.find((coche) => coche.modelo === modeloCoche);
    return resultado ? resultado.importe : null;
}

function recuperarUltimaFinanciacion() {
    return JSON.parse(localStorage.getItem("ultimoCocheAFinanciar"))
}

function guardarFinanciacion() {
    const ultimaFinanciacion = {
        fecha: new Date(),
        valorCoche: importe.textContent
    }
    localStorage.setItem("ultimoCocheAFinanciar", JSON.stringify(ultimaFinanciacion))
}

btnFinanciar.addEventListener('click', () => {
    const modeloSeleccionado = seleccionaCoche.value
    const mesesSeleccionados = seleccionaMeses.value
    const importeCoche = importeFinanciado(modeloSeleccionado)
    if (importeCoche !== null) {
        btnFinanciar.innerHTML = cargando
        setTimeout(() => {
            const pagoMensual = (parseInt(importeCoche)) / (parseInt(mesesSeleccionados)) * iva * interes
            importe.textContent = `El importe a pagar mensual es: ${pagoMensual.toFixed(2)} €`
            arrayHistorial.push({ modelo: modeloSeleccionado, meses: mesesSeleccionados, importe: importeCoche })
            guardarFinanciacion()
            btnFinanciar.textContent = "Financiar"

        }, 5000)

    } else {
        alert("No has seleccionado ningún coche")
    }
})

btnUltimaFinanciacion.addEventListener("click", () => {
    const ultimaFinanciacion = recuperarUltimaFinanciacion()
    if (ultimaFinanciacion !== null) {
        mensajeOk("Su última financiación fue el: " + ultimaFinanciacion.fecha + ultimaFinanciacion.valorCoche)
    } else {
        alert("No has solicitando ninguna financiación previamente.")
    }
})

cargarFinanciarCoches()
const CompraCarrito = JSON.parse(localStorage.getItem('compraCarrito')) || [];


function mostrarCarrito() {
    const carritoContenido = document.getElementById('carritoContenido');
    if (CompraCarrito.length > 0) {
        CompraCarrito.forEach((coche) => {
            carritoContenido.innerHTML += `
                    <div class="carrito-item">
                        <h3>${coche.modelo}</h3>
                        <ul>
                            <li>Gama: ${coche.gama}</li>
                            <li>Año: ${coche.año}</li>
                            <li>Importe: ${coche.importe}</li>
                        </ul>
                    </div>`;
        });
    } else {
        carritoContenido.innerHTML = "<p>No hay coches en el carrito.</p>";
    }
}

mostrarCarrito();

comprar.addEventListener("click", () => {

    Swal.fire({
        title: "Finalizar compra",
        text: "El método de pago del coche será al contado ¿Es correcto?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",


    })
        .then((result) => {
            if (result.isConfirmed) {
                const mensajeComprar = document.querySelector("div#mensajeComprar")
    mensajeComprar.classList.add("compraRealizada")
    carritoContenido.innerHTML = "No hay coches en el carrito"
    localStorage.removeItem("compraCarrito")
    mensajeOk("¡Los datos de la compra han sido confirmados!", "Puedes ir a la pasarela de pago al realizar el pago correspondiente", "success")

            }
        })
    
})

quitar.addEventListener ("click", () => {

    carritoContenido.innerHTML = "No hay coches en el carrito"
    mensajeOk("¡Coche eliminado correctamente!","", "success")

})
