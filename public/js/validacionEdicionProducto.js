if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {
    let formulario = document.getElementsByClassName("formularioRegistroProd")
    let botonEliminado = document.getElementsByClassName("botonEliminado")


    for (let i = 0; i<formulario.length; i++) {
        let formularioRegistro = formulario[i]
        formularioRegistro.addEventListener("submit", (e) => {
            checkInputs();
            if (checkErrores() == 0) {
                Swal.fire(
                    'Exito!',
                    'Producto editado correctamente!',
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
                location.reload
            }
    
        })
    }
    for (let i = 0; i<botonEliminado.length; i++) {
        let boton = botonEliminado[i]
        boton.addEventListener("submit", (e) => {
            Swal.fire(
                'Exito!',
                'Producto eliminado correctamente!',
                'success'
              )
        })
    }

    



}

function checkInputs() {

    ///INPUTS
    let nombre = document.getElementById("name")
    let description = document.getElementById("description")
    let precio = document.getElementById("price")
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

    /// CATEGORIA
    for (let i = 0; i < categoria.length; i++){
        console.log(categoria[i].value)
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
        
        if (errorRegis[i].value != "") {
            errores += 1
        }
        else{
            errores = errores
        }
        console.log(errorRegis[i])
    }
    return errores
}