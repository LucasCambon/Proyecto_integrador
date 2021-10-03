if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {


    
    let formularioLogin = document.getElementsByClassName("formularioLogin")
    
        for (let i = 0; i<formularioLogin.length; i++) {
            let form = formularioLogin[i]
            form.addEventListener("submit", (e) => {
                guardarUsuario()
            })
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

function guardarUsuario() {

    let emailLogeado = document.getElementById("correo")
    let emailLogeadoValue = emailLogeado.value.trim()

    localStorage.setItem("usuarioLogeado", emailLogeadoValue)


}