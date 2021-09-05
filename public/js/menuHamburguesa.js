if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded")
} 
else{
    
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
                
    function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }
    
    function ShowAndHide() {
        var x = document.getElementById("botonToggle");
        if (x.style.display == 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }
    
}