if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

function ready () {
    console.log(JSON.parse(localStorage.getItem("productosEnCarrito")))
    if (JSON.parse(localStorage.getItem("productosEnCarrito")) == null){
        updateTotal()
        displayCarritoVacio()
    }
    else{
        updateTotal()
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

    /*let formEnvio = document.getElementsByClassName("formEnvioCarrito")
    for (let i = 0; i<formEnvio.length; i++) {
        let form = formEnvio[i]
        form.addEventListener("submit", enviarDatos)
    }

    /*let botonFinalizar = document.getElementsByClassName("botonFinalizar")
    for (let i = 0; i<botonFinalizar.length; i++) {
        let boton = botonFinalizar[i]
        boton.addEventListener("click", (e) => {
            Swal.fire(
                'Compra finalizada!',
                'Revise su casilla de correo para continuar!',
                'success'
              ).then(function() {
                    vaciarCarrito()
              })
        })
    }*/


}

function eliminarProd(event) {
    let boton = event.target
    let idProdCarrito = parseInt(boton.parentElement.getElementsByClassName("idProdCarrito")[0].innerText.replace("Cod:",""))
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
    let idProdCarrito = parseInt(input.parentElement.getElementsByClassName("idProdCarrito")[0].innerText.replace("Cod:",""))
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
                <div class="d-flex justify-content-center align-items-center p-2 producto mt-4 px-3 rounded itemCarrito gap-2 ">
                    <div class="mr-1" style="min-width: 100px; width: 200px" >
                        <img class="rounded img-fluid img-thumbnail " src="/img/${item.image}" alt="${item.image}">
                    </div>
                    <div class="d-flex flex-column align-items-center product-details w-50">
                        <span class="font-weight-bold mb-2 bd-highlight text-center">${item.name}</span>
                        <span class="text-grey mb-1">Cantidad</span><input class="cantidadCarrito mb-2" type="number" id="quantity" name="quantity" value="${item.cantidad}" min="1" max="99">
                        <span class="text-grey idProdCarrito bd-highlight">Cod: ${item.id}</span>
                        <h5 class="amarillo precioCarrito bd-highlight">$ ${item.price}</h5>
                    </div>
                    <button class="btn btn-outline-secondary botonTrash" type="button"><i class="fa fa-trash mb-1 text-danger"></i> </button>
                </div>
            `
        }
    })
    totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total: $</h5> <h5 class="text-grey dinero totalCarrito">${montoTotal} <input type="hidden" name="montoTotal" value="999" id="montoTotal"></input></h5>
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
                <h5 class="des">Total:</h5> <h5 class="text-grey dinero totalCarrito">$ ${totalActual}</h5>
            </li>
        </ul>
    `
}

function displayCarritoVacio () {
    let montoTotal = JSON.parse(localStorage.getItem("totalCarrito")); // valor total en memoria
    if (!montoTotal) {
        montoTotal = 0
    }
    let totalAPagar = document.querySelector(".contPago"); // vista del total en el carrito
        totalAPagar.innerHTML = `
        <ul class="pago">
            <li class="d-flex flex-row align-items-center tot">
                <h5 class="des">Total:</h5> <h5 class="text-grey dinero totalCarrito">$ ${montoTotal}</h5>
            </li>
        </ul>
    `
}


function datoUsuario(){
    let inputUsuario = document.getElementById("idUsuario")
    fetch("http://localhost:3001/apiSpartan/usuarios")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.data.forEach(usuario => {
            if (usuario.email == localStorage.getItem("usuarioLogeado")){
                inputUsuario.value = usuario.id
            }
        });
    })
    .catch( error => console.log(error))
}


function enviarCarrito(){
    let itemsCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    let montoTotal = JSON.parse(localStorage.getItem("totalCarrito")); // valor total en memoria
    let inputTotal = document.getElementById("totalCarrito")
    let inputProd = document.getElementById("itemsCarrito")
    let arrCarrito = []
    for (producto in itemsCarrito){
        arrCarrito.push(itemsCarrito[producto])
    }
    inputTotal.value = montoTotal
    inputProd.value = JSON.stringify(arrCarrito)
    console.log(inputProd)
    
}

enviarCarrito()
datoUsuario()