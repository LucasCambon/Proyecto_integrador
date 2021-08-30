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
    displayCarrito ()
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


function displayCarrito () {
    let itemsCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")); // items en memoria
    let montoTotal = JSON.parse(localStorage.getItem("totalCarrito")); // valor total en memoria
    let carritoCompleto = document.querySelector(".itemsCarrito"); // vista de los items en el carrito
    let totalAPagar = document.querySelector(".contPago"); // vista del total en el carrito
    itemsCarrito.innerHTML = ' ';
    totalAPagar.innerHTML = ' ';
    Object.values(itemsCarrito).map(item => {
        if (item.id == undefined){
            delete item
        }
        else{
            carritoCompleto.innerHTML += `
                <div class="d-flex flex-row justify-content-between align-items-center p-2 producto mt-4 px-3 rounded itemCarrito">
                    <div class="mr-1"><img class="rounded" src="/img/${item.image}" width="70" alt="${item.image}"></div>
                    <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${item.name}</span>
                        <div class="d-flex flex-row product-desc">
                            <div class="size mr-1"><span class="text-grey">Codigo:</span><span class="font-weight-bold">&nbsp;${item.id}</span></div>
                        </div>
                    </div>
                    <div>
                        <input class="cantidadCarrito" type="number" id="quantity" name="quantity" value="${item.cantidad}" min="1" max="99">
                    </div>
                    <div>
                        <h5 class="text-grey precioCarrito">$ ${item.price}</h5>
                        <h5 class="text-grey precioCarrito">$ ${item.subTotal}</h5>
                    </div>
                    <button class="btn btn-outline-secondary botonTrash" type="button"><i class="fa fa-trash mb-1 text-danger"></i> Remover</button>
                </div>
            `
        }
    })
    totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total:</h5> <h5 class="text-grey dinero totalCarrito">$ ${montoTotal}</h5>
            </li>
        </ul>
    `
}

