/*** REQUIRES ***/
const express = require("express");
const app = express();
const mainRoutes = require("./src/routes/mainRoutes")
const productsRoutes = require("./src/routes/productsRoutes")
const usersRoutes = require("./src/routes/usersRoutes")
const routesAPIS = require("./src/routes/routesAPIS")
const methodOverride =  require('method-override');
var path = require('path');
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");




/*** MIDDLEWARES ***/
app.use(session({
    secret:"Shhh, It´s a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, './public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies())
app.use(userLoggedMiddleware);






/*** PUERTO***/
app.listen(process.env.PORT || 3001, function() {
    console.log("Servidor corriendo");
})

/*** VISTAS ***/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*** RUTAS ***/
app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)
app.use("/APISpartan", routesAPIS)
