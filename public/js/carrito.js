if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

function ready () {

    displayCarrito ()

    let botonVaciar = document.getElementById("botonVaciarCarrito")
    botonVaciar.addEventListener("click", vaciarCarrito)

    let inputCantidad = document.getElementsByClassName("cantidadCarrito")
    for (let i = 0; i<inputCantidad.length; i++) {
        let input = inputCantidad[i]
        input.addEventListener("change", updateCantidad)
    }

    let botonRemover = document.getElementsByClassName("botonTrash")
    for (let i = 0; i<botonRemover.length; i++) {
        let boton = botonRemover[i]
        boton.addEventListener("click", eliminarProd)
    }
    
}

function eliminarProd(event) {
    let boton = event.target
    let idProdCarrito = parseInt(boton.parentElement.getElementsByClassName("idProdCarrito")[0].innerText.replace("Codigo:",""))
    console.log("El ID del producto es: " + idProdCarrito)
    let itemsCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    console.log(itemsCarrito)
    for (let producto in itemsCarrito) {
        console.log(itemsCarrito[producto].id)
        if (itemsCarrito[producto].id == idProdCarrito) {
            delete itemsCarrito[producto]
        }
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(itemsCarrito))
    boton.parentElement.remove()
    updateTotal()
}


function updateCantidad(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        
        input.value = 1

    }
    else if(isNaN(input.value) || input.value > 99){

        input.value = 99

    }
    let idProdCarrito = parseInt(input.parentElement.getElementsByClassName("idProdCarrito")[0].innerText.replace("Codigo:",""))
    console.log("El ID del producto es: " + idProdCarrito)
    let itemsCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    console.log(itemsCarrito)
    for (let producto in itemsCarrito) {
        console.log(itemsCarrito[producto].id)
        if (itemsCarrito[producto].id == idProdCarrito) {
            console.log(itemsCarrito[producto].id)
            producto.cantidad = input.value
            itemsCarrito[producto].cantidad = input.value;
            itemsCarrito[producto].subTotal = input.value * itemsCarrito[producto].price;
        }
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(itemsCarrito))
    updateTotal()
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
                    <div class="d-flex flex-column align-items-center product-details">
                        <span class="font-weight-bold">${item.name}</span>
                    </div>
                    <div class="d-flex flex-column align-items-center product-details">
                        <input class="cantidadCarrito" type="number" id="quantity" name="quantity" value="${item.cantidad}" min="1" max="99">
                        <span class="text-grey idProdCarrito">Codigo: ${item.id}</span>
                    </div>
                    <div>
                        <span class="text-grey">Precio:</span>
                        <h5 class="text-grey precioCarrito">$ ${item.price}</h5>
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

function vaciarCarrito () {
    localStorage.clear()
    location.reload()
    displayCarrito ()
}

function updateTotal () {
    carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    totalActual = 0
    for (let producto in carrito){
        totalActual += carrito[producto].subTotal
    }
    totalActual = Math.round(totalActual * 100) / 100
    console.log("$ " +totalActual)
    localStorage.setItem("totalCarrito", JSON.stringify(totalActual))

    let totalAPagar = document.querySelector(".contPago"); // vista del total en el carrito
    totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total:</h5> <h5 class="text-grey dinero totalCarrito">$ ${totalActual}</h5>
            </li>
        </ul>
    `
}