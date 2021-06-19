const controladorUsers  =
{
    perfil: (req, res) => {
        res.render("./users/perfil");
    },
    registro: (req, res) =>{
        res.render("./users/registro");
    },
    ingreso: (req, res) =>{
        res.render("./users/ingreso");
    },
}

module.exports = controladorUsers;