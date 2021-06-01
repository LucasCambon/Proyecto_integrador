const express = require("express");
const app = express();
const path = require("path");

app.use('/public/img', express.static(__dirname +'/public/img'));
app.use('/public/css/estilos_ingreso.css', express.static(__dirname +'/public/css/estilos_ingreso.css'));
app.use('/public/css/estilos_registro.css', express.static(__dirname +'/public/css/estilos_registro.css'));
app.listen(3030, () =>
    console.log("Levantando el servidor")
    );


app.get("/registro", (req, res) => {
    let htmlPath= path.join(__dirname, "/views/registro.html")
    res.sendFile(htmlPath)
});

app.get("/ingreso", (req, res) => {
    let htmlPath= path.join(__dirname, "/views/ingreso.html")
    res.sendFile(htmlPath)
});

