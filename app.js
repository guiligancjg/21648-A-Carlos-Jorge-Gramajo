require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const blogRutas = require('./routes/blog.routes');
const { sequelize } = require('./conexion_mysql');

require('ejs');

const puerto = process.env.PORT || 3000;
const app = express();

// Conexión Base de Datos
sequelize.authenticate()
    .then(()=> {console.log('CONEXIÓN A LA BASE DE DATOS OK')})
    .catch( error => {console.log('EL ERROR DE CONEXIÓN ES: '+ error)})
  

/* ****************************************** */

// Middlewares
app.use(express.json());
app.use(cors(app.js));
app.use(morgan());
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));


// Routes

app.use(blogRutas);

// Establece el tipo MIME adecuado para la imagen JPEG
app.get('/img/banner.jpg', (req, res) => {
  
  res.type('image/jpeg');
  // Envía el archivo de imagen
  res.sendFile(__dirname + '/public/img/banner.jpg');
});

app.get('/img/nosotros.jpg', (req, res) => {
  
  res.type('image/jpeg');
  // Envía el archivo de imagen
  res.sendFile(__dirname + '/public/img/nosotros.jpg');
});

app.get('/img/contacto.jpg', (req, res) => {
  
  res.type('image/jpeg');
  // Envía el archivo de imagen
  res.sendFile(__dirname + '/public/img/contacto.jpg');
});

/* ************************************************** */

app.listen(puerto, () => {
    console.log(`Esta funcionando el SERVIDOR!!! en http://localhost:${puerto}`);
});





