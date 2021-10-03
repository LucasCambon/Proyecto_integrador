if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {
    let formulario = document.getElementsByClassName("formularioLogin")



    for (let i = 0; i<formulario.length; i++) {
        let formularioRegistro = formulario[i]
        formularioRegistro.addEventListener("submit", (e) => {    
            checkInputs();
            if (checkErrores() != 0) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Complete los campos!'
                  })
            }
        })
    }

    



}

function checkInputs() {

    ///INPUTS
    let email = document.getElementById("correo")
    let contraseña = document.getElementById("contraseña")
    console.log(email)
    

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
    
    if (contraseñaValue == "") {
        setError(contraseña, "Tiene que ingresar su contraseña")
    }
    else{
        setSucces(contraseña)
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
        console.log(errorRegis[i])
    }
    return errores
}