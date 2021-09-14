if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {
    let formulario = document.getElementsByClassName("formularioLogin")
    console.log(formulario)


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
        setError(contraseña, "Tiene que ingresar su correo electronico")
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