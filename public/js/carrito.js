if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

function ready () {
    let botonEliminar = document.getElementsByClassName("botonTrash")
    for (let i = 0; i < botonEliminar.length; i++) {
    let boton = botonEliminar[i]
    boton.addEventListener("click", removeItem)
    }

    let cantidadInputs = document.getElementsByClassName("cantidadCarrito")
    for (let i = 0; i<cantidadInputs.length; i++) {
        let input = cantidadInputs[i]
        input.addEventListener("change", cantidadCambiada)
    }

}

function removeItem(event){
    let clickBoton = event.target
    clickBoton.parentElement.remove()
    updateTotal()
}

function cantidadCambiada(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}


function updateTotal() {
    let carritoCompleto = document.getElementsByClassName("carritoCompleto")[0]
    let items = carritoCompleto.getElementsByClassName("itemCarrito")
    let total = 0
    for (let i = 0; i < items.length; i++){
        let item = items[i]
        let precioItem = item.getElementsByClassName("precioCarrito")[0]
        let cantidadItem = item.getElementsByClassName("cantidadCarrito")[0]

        let precio = parseFloat(precioItem.innerText.replace("$", ""))
        let cantidad = cantidadItem.value

        total = total + (precio * cantidad)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("totalCarrito")[0].innerText = "$" + total
}