if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} 
else{
    ready ()
        
}


function ready () {


    fetch("http://localhost:3001/apiSpartan/usuarios")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.data.forEach(usuario => {
            if (usuario.email == localStorage.getItem("usuarioLogeado")){
                if (usuario.administrador == true){
                    
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Requiere permisos de adminsitrador!'
                    }).then(function(){
                        window.location = "http://localhost:3001/"
                    })
                }
            }
        });
        if (!localStorage.getItem("usuarioLogeado")) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Requiere permisos de adminsitrador!'
            }).then(function(){
                window.location = "http://localhost:3001/"
            })
        }
    })
    .catch( error => console.log(error))
   


}


