const express = require("express");
const app = express();
const path = require("path");

app.use('/public/img', express.static(__dirname +'/public/img'));
app.listen(3000, () =>
    console.log("Levantando el servidor")
    );


app.get("/", (req, res) => {
    let htmlPath= path.join(__dirname, "/views/index.html")
    res.sendFile(htmlPath)
});

