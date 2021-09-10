if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

function ready () {
    console.log(JSON.parse(localStorage.getItem("productosEnCarrito")))
    if (JSON.parse(localStorage.getItem("productosEnCarrito")) == null){
        displayCarritoVacio()
    }
    else{
        displayCarrito ()
    }

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
    let idProdCarrito = parseInt(document.getElementsByClassName("idProdCarrito")[0].innerText.replace("Cod:",""))
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
                <div class="container-xl">
                    <div class="row">   
                        <div class="col">
                            <div class="mr-1 mx-0">
                                <img class="rounded w-50" src="/img/${item.image}" width="70" alt="${item.image}">
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-column align-items-center product-details">
                                <span class="amarillo">${item.name}</span>
                                <span class="text-grey idProdCarrito small">Cod:${item.id}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex flex-column align-items-center product-details">
                                <input class="cantidadCarrito" type="number" id="quantity" name="quantity" value="${item.cantidad}" min="1" max="99">
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <h5 class="amarillo precioCarrito">$ ${item.price}</h5>
                            </div>
                        </div>
                        <div class="col">    
                            <div>
                                <button class="btn btn-outline-secondary botonTrash" type="button"><i class="fa fa-trash mb-1 text-danger"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    })
    totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total:</h5> <h5 class="text-white dinero totalCarrito">$ ${montoTotal}</h5>
            </li>
        </ul>
    `
}

function vaciarCarrito () {
    localStorage.removeItem("productosEnCarrito")
    updateTotal()
    location.reload()
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
                <h5 class="des">Total:</h5><h5 class="dinero totalCarrito">$ ${totalActual}</h5>
            </li>
        </ul>
    `
}

function displayCarritoVacio () {
    let montoTotal = JSON.parse(localStorage.getItem("totalCarrito")); // valor total en memoria
    let totalAPagar = document.querySelector(".contPago"); // vista del total en el carrito
        totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total:</h5> <h5 class="text-grey dinero totalCarrito">$ ${montoTotal}</h5>
            </li>
        </ul>
    `
}