const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('ejs');


const app = express();

// Middlewares
app.use(express.json());
app.use(cors(app.js));
app.use(morgan());
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));

// Routes
const blogRutas = require('./routes/blog.routes');
app.use(blogRutas);


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000);





