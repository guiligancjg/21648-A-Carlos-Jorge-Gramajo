const express = require('express')
const morgan = require('morgan')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)


// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan());