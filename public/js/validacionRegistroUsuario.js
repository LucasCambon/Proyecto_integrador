if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {
    let formulario = document.getElementsByClassName("formularioRegistro")
    


    for (let i = 0; i<formulario.length; i++) {
        let formularioRegistro = formulario[i]
        formularioRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            checkInputs();
    
        })
    }

    



}

function checkInputs() {

    ///INPUTS
    let nombre = document.getElementById("nombres")
    let apellido = document.getElementById("apellidos")
    let email = document.getElementById("correo")
    let contraseña = document.getElementById("contraseña")


    /// CARACTERES, NÚMEROS, MAYÚSCULAS Y MINÚSCULAS
    let obligatorio =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let noPermitido =  /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    /// NOMBRE
    let nombreValue = nombre.value
    
    if (nombreValue == "" || nombreValue.match(noPermitido) || /^\d+$/.test(nombreValue)) {
        setError(nombre, "Tiene que ingresar su nombre, no puede contener números o caracteres especiales")
    }
    else{
        setSucces(nombre)
    }


    /// APELLIDO
    let apellidoValue = apellido.value.trim()
    if (apellidoValue === "" || apellidoValue.match(noPermitido) || /^\d+$/.test(apellidoValue)) {
        setError(apellido, "Tiene que ingresar su apellido, no puede contener números o caracteres especiales")
    }
    else{
        setSucces(apellido)
    }


    /// EMAIL
    let emailValue = email.value.trim()
    let isEmail = /\S+@\S+\.\S+/.test(emailValue)

    if (emailValue != "" && isEmail) {
        setSucces(email)
    }
    else{
        setError(email, "Tiene que ingresar su correo electronico")
    }


    /// CONTRASEÑA
    let contraseñaValue = contraseña.value.trim()
    
    if (contraseñaValue.match(obligatorio)) {
        setSucces(contraseña)
    }
    else{
        setError(contraseña, "La contraseña debe tener mínimo 8 caracteres y contener una mayúscula, una minúscula y un caracter especial")
    }
}

function setError(input, mensaje) {
        
    let formControl = input.parentElement;
    let errorRegis = formControl.querySelector(".textErrorForm")
    errorRegis.innerText = mensaje
}

function setSucces(input) {
    let formControl = input.parentElement;
    let errorRegis = formControl.getElementsByClassName("textErrorForm")[0]
    errorRegis.innerText = ""
}