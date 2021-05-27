const express = require("express");
const app = express();
const path = require("path");

app.use('/public/img', express.static(__dirname +'/public/img'));
app.listen(3000, () =>
    console.log("Levantando el servidor")
    );      
app.use('/public/css/stylesDetalleDeProducto.css',express.static(__dirname + '/public/css/stylesDetalleDeProducto.css'));


app.get("/", (req, res) => {
    let htmlPath= path.join(__dirname, "/views/detalleDeProducto.html")
    res.sendFile(htmlPath)
});