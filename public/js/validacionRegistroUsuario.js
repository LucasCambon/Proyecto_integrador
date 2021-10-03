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
            checkInputs();
            if (checkErrores() == 0) {
                Swal.fire(
                    'Exito!',
                    'Usuario registrado correctamente!',
                    'success'
                  )
            }
            else{
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Revise los campos!'
                })

            }
    
        })
    }

    



}

function checkInputs() {

    ///INPUTS
    let nombre = document.getElementById("nombres")
    let apellido = document.getElementById("apellidos")
    let email = document.getElementById("correo")
    let contraseña = document.getElementById("contraseña")
    let imagen = document.getElementById("imagenPerfil")

    /// CARACTERES, NÚMEROS, MAYÚSCULAS Y MINÚSCULAS
    let obligatorio =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let noPermitido =  /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    /// NOMBRE
    let nombreValue = nombre.value
    
    if (nombreValue == "" || nombreValue.match(noPermitido) || /^\d+$/.test(nombreValue) || nombreValue.length > 50 || nombreValue.length < 2) {
        setError(nombre, "El nombre debe tener entre 2 y 50 caracteres. No puede contener caracteres especiales o números.")
    }
    else{
        setSucces(nombre)
    }


    /// APELLIDO
    let apellidoValue = apellido.value.trim()
    if (apellidoValue === "" || apellidoValue.match(noPermitido) || /^\d+$/.test(apellidoValue) || apellidoValue.length > 50 || nombreValue.length < 2) {
        setError(apellido, "El apellido debe tener entre 2 y 50 caracteres. No puede contener caracteres especiales o números.")
    }
    else{
        setSucces(apellido)
    }


    /// EMAIL
    let emailValue = email.value.trim()
    let isEmail = /\S+@\S+\.\S+/.test(emailValue)

    if (emailValue != "" && isEmail && emailValue.length < 150) {
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


    /// IMAGEN
    let imagenValue = imagen.value.trim()
    let validExtensions = ['jpg','png','jpeg','gif'];
    let extImagen = imagenValue.split(".").pop()

    console.log(extImagen)
    for (let i = 0; i <= validExtensions.length; i++){
        if (imagenValue !== "" && validExtensions.includes(extImagen) ) {
            setSucces(imagen)
        }
        else{
            setError(imagen, "Adjunte una imagen con formato: " + validExtensions + " y peso máximo 10mb.")
        }
    }

}

function setError(input, mensaje) {
        
    let formControl = input.parentElement;
    let errorRegis = formControl.querySelector(".textErrorForm")
    errorRegis.innerText = mensaje
    input.classList.add("errorInput")
}

function setSucces(input) {
    let formControl = input.parentElement;
    let errorRegis = formControl.getElementsByClassName("textErrorForm")[0]
    errorRegis.innerText = ""
    input.classList.remove("errorInput")
}


function checkErrores() {
    let errores = 0
    let errorRegis = document.getElementsByClassName("textErrorForm")
    for (i = 0; i<errorRegis.length; i++) {
        
        if (errorRegis[i].innerText != "") {
            errores += 1
        }
        else{
            errores = errores
        }
        console.log(errorRegis[i].innerText)
    }
    return errores
}