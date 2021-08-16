const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controlador =
{
    index: (req, res) => {
        res.render("index",{productos:products})
    }
}

module.exports = controlador;