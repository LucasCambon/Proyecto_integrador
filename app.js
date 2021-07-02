const express = require("express");
const app = express();
const mainRoutes = require("./src/routes/mainRoutes")
const productsRoutes = require("./src/routes/productsRoutes")
const usersRoutes = require("./src/routes/usersRoutes")
const methodOverride =  require('method-override');
var path = require('path');

app.use(express.static(path.join(__dirname, './public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)

