if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready()
    
}


function ready(){
    
    let botonAgregar = document.getElementsByClassName("agregarCarrito")
    for (let i = 0; i<botonAgregar.length; i++) {
        let boton = botonAgregar[i]
        boton.addEventListener("click", (e) =>{
            agregarItem()
            Swal.fire(
                'Exito!',
                'Producto agregado al carrito!',
                'success'
              )
            
        }
        
    )}

}


function agregarItem() {
    let prodCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    let producto = {
        id: document.getElementById("idProd").innerText,
        name: document.getElementById("nomProd").innerText,
        price: parseFloat(document.getElementById("priceProd").innerText.replace("$","")),
        image: document.getElementById("imgProdCarrito").alt,
        cantidad: 0,
        subTotal: 0
    }
    if (prodCarrito != null){
        if (prodCarrito[producto.id] == undefined){
            prodCarrito = {
                ...prodCarrito,
                [producto.id]: producto
            }
        }
        let cantidadNueva = prodCarrito[producto.id].cantidad +=1;
        prodCarrito[producto.id].subTotal = cantidadNueva * producto.price;
    }
    else{
        producto.cantidad = 1;
        producto.subTotal = producto.cantidad * producto.price;
        prodCarrito = {
            [producto.id] : producto
        }
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodCarrito))
    total ()
}

function total () {
    carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    totalActual = 0
    for (let producto in carrito){
        totalActual += carrito[producto].subTotal
    }
    totalActual = Math.round(totalActual * 100) / 100
    console.log("$ " +totalActual)
    localStorage.setItem("totalCarrito", JSON.stringify(totalActual))
}

