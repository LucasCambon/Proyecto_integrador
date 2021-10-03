if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {


    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales incorrectas!'
    })


}