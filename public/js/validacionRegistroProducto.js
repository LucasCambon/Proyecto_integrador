if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {
    let formulario = document.getElementsByClassName("formularioRegistroProd")
    


    for (let i = 0; i<formulario.length; i++) {
        let formularioRegistro = formulario[i]
        formularioRegistro.addEventListener("submit", (e) => {  
            checkInputs();
            if (checkErrores() == 0) {
                Swal.fire(
                    'Exito!',
                    'Producto registrado correctamente!',
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
    let nombre = document.getElementById("name")
    let description = document.getElementById("description")
    let precio = document.getElementById("price")
    let imagen = document.getElementById("image")
    let categoria = document.getElementsByClassName("category")

    /// CARACTERES, NÚMEROS, MAYÚSCULAS Y MINÚSCULAS
    let noPermitido =  /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    /// NOMBRE
    let nombreValue = nombre.value
    
    if (nombreValue == "" || nombreValue.match(noPermitido) || /^\d+$/.test(nombreValue)) {
        setError(nombre, "El nombre del producto debe tener entre 5 y 40 caracteres. No puede contener caracteres especiales o números.")
    }
    else{
        setSucces(nombre)
    }


    /// DESSCRIPCION
    let descriptionValue = description.value.trim()
    if (descriptionValue === "" || descriptionValue.match(noPermitido) || /^\d+$/.test(descriptionValue) || descriptionValue.length < 20 || descriptionValue.length > 200) {
        setError(description, "Ingrese la descripcion del producto, no puede contener números o caracteres especiales y debe tener entre 20 y 200 caracteres")
    }
    else{
        setSucces(description)
    }


    /// PRECIO
    let precioValue = precio.value.trim()
    let isPrecio = /^(?!.*(,,|,\.|\.,|\.\.))[\d.,]+$/.test(precioValue)

    if (isPrecio && precioValue <= 999999.99 && precioValue >= 0.01) {
        setSucces(precio)
    }
    else{
        setError(precio, "Precio invalido, el valor debe ser númerico entre 0.01 - 999999.99")
    }

    /// IMAGEN
    let imagenValue = imagen.value.trim()
    let validExtensions = ['jpg','png','jpeg','gif'];
    let extImagen = imagenValue.split(".").pop()

    for (let i = 0; i <= validExtensions.length; i++){
        if (imagenValue !== "" && validExtensions.includes(extImagen) ) {
            setSucces(imagen)
        }
        else{
            setError(imagen, "Adjunte una imagen con formato: " + validExtensions + " y peso máximo 10mb.")
        }
    }

    /// CATEGORIA
    for (let i = 0; i < categoria.length; i++){
        if (categoria[i].checked == true) {
            
            let formControl = categoria[i].parentElement.parentElement.parentElement;
            let errorRegis = formControl.getElementsByClassName("textErrorForm")[0]
            errorRegis.innerText = ""
            break
            
        }
        else{
            let formControl = categoria[i].parentElement.parentElement.parentElement;
            let errorRegis = formControl.querySelector(".textErrorForm")
            errorRegis.innerText = "Debe seleccionar una categoría"
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
