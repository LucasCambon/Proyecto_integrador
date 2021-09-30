if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {


    let emailLogeado = document.getElementsByClassName("emailLogeado")
    for (let i = 0; i<emailLogeado.length; i++) {
        let email = emailLogeado[i]
        console.log(email.innerText)
        localStorage.setItem("usuarioLogeado", email.innerText)
    }


    let botonCerrar = document.getElementsByClassName("cerrarSesion")
    for (let i = 0; i<botonCerrar.length; i++) {
        let  boton = botonCerrar[i]
        boton.addEventListener("click", borrarUsuario)
        
    }


}


function borrarUsuario() {
    localStorage.removeItem("usuarioLogeado")
}